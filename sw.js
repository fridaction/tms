/* TMS PWA service worker — mise a jour automatique
   Strategie :
   - HTML (l'app) : reseau d'abord, cache en secours -> tu as toujours la derniere
     version des que le telephone a du reseau, et l'app fonctionne hors ligne.
   - Autres fichiers : cache d'abord, rafraichi en arriere-plan.
*/
const CACHE = "tms-app";
const CORE = ["./", "./index.html", "./manifest.webmanifest", "./icon.png"];

self.addEventListener("install", function (e) {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(CORE); }).catch(function () {}));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; })
                           .map(function (k) { return caches.delete(k); }));
  }));
  self.clients.claim();
});

function isHtml(req) {
  return req.mode === "navigate" ||
         (req.headers.get("accept") || "").indexOf("text/html") > -1 ||
         /index\.html($|\?)/.test(req.url);
}

self.addEventListener("fetch", function (e) {
  const req = e.request;
  if (req.method !== "GET") return;                    // les envois vers le pilote passent direct

  if (isHtml(req)) {                                   // reseau d'abord
    e.respondWith(
      fetch(req).then(function (res) {
        const copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put("./index.html", copy); }).catch(function () {});
        return res;
      }).catch(function () {
        return caches.match("./index.html").then(function (hit) {
          return hit || caches.match("./");
        });
      })
    );
    return;
  }

  e.respondWith(                                        // cache d'abord + rafraichissement
    caches.match(req).then(function (hit) {
      const net = fetch(req).then(function (res) {
        const copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(req, copy); }).catch(function () {});
        return res;
      }).catch(function () { return hit; });
      return hit || net;
    })
  );
});

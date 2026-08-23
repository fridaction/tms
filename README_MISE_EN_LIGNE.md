# Mettre l'app TMS en ligne (GitHub Pages) — 10 minutes

Objectif : une adresse HTTPS permanente, accessible depuis n'importe où (maison, travail,
simulateur, autres instructeurs), avec fonctionnement **hors ligne** une fois installée.

---

## 1. Créer un compte GitHub (si tu n'en as pas)

https://github.com/signup — utilise ton adresse **perso**, pas l'adresse pro.

## 2. Créer le dépôt

1. Clique sur **+** en haut à droite → **New repository**
2. **Repository name** : `tms`
3. Coche **Public** (obligatoire pour l'hébergement gratuit)
4. Coche **Add a README file**
5. **Create repository**

## 3. Envoyer les 4 fichiers

Dans le dépôt : bouton **Add file** → **Upload files**.

Glisse les 4 fichiers du dossier `PWA` :

- `index.html`
- `manifest.webmanifest`
- `sw.js`
- `icon.png`

Puis, en bas de la page, bouton vert **Commit changes**.

> Ne glisse pas le dossier `PWA` lui-même, seulement les 4 fichiers qu'il contient —
> sinon l'adresse deviendrait `.../tms/PWA/` au lieu de `.../tms/`.

## 4. Activer la publication

1. Onglet **Settings** du dépôt (en haut)
2. Menu de gauche : **Pages**
3. **Source** : `Deploy from a branch`
4. **Branch** : `main`, dossier `/ (root)` → **Save**
5. Attends 1 à 2 minutes, recharge la page : l'adresse s'affiche en haut.

Elle ressemble à : `https://TONPSEUDO.github.io/tms/`

## 5. Installer sur l'iPhone

1. Ouvre l'adresse dans **Safari**
2. Bouton Partager → **Sur l'écran d'accueil**
3. Lance l'app depuis l'icône, **en Wi-Fi**, une première fois : le mode hors ligne s'installe
4. Test : active le mode avion et relance l'icône — l'app doit s'ouvrir

À partir de là, l'app fonctionne au simulateur sans réseau. Les envois (**Submit to pilot**)
partent dès que le téléphone retrouve du réseau.

---

## Mettre à jour l'app plus tard

Dans le dépôt : ouvre `index.html` → icône crayon → sélectionne tout → colle la nouvelle
version → **Commit changes**. Les téléphones prennent la mise à jour au prochain lancement
connecté, automatiquement.

## Ce que voient les autres instructeurs

L'adresse est publique, mais elle ne contient **aucune donnée** : l'app est vide au
chargement, et chaque instructeur travaille dans son propre téléphone. Les sessions
soumises arrivent dans ton Google Sheet, anonymisées.

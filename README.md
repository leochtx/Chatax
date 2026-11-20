# Site CHATAX

Site vitrine statique (HTML/CSS/JS, aucune dépendance à installer).

```
index.html              page unique : hero, projets, prestations, contact
assets/css/style.css    styles (couleurs et typo en variables en haut du fichier)
assets/js/projets.js    LISTE DES PROJETS : c'est ici qu'on ajoute / retire du contenu
assets/js/main.js       filtres, ouverture des projets, visionneuse photo/vidéo, formulaire
assets/projets/<projet>/
    cover.jpg           couverture de la carte
    photos/             001.jpg, 002.jpg…                (facultatif)
    visuels/            001.jpg, 002.jpg…                (facultatif)
    videos/             001.mp4 + 001-poster.jpg…        (facultatif)
assets/img/brand/       logo, favicon
```

Un projet (club, événement, marque…) peut contenir seulement des photos, seulement des visuels,
seulement des vidéos, ou un mélange. Le site n'affiche que ce qui existe.

## Voir le site en local

```bash
python3 -m http.server 4173
```

Puis ouvrir http://localhost:4173.

## Ajouter du contenu à un projet existant

1. Déposer les fichiers dans le bon sous-dossier en continuant la numérotation
   (ex. `assets/projets/padelshot-barentin/visuels/013.jpg`).
   Un sous-dossier qui n'existe pas encore (ex. `photos/` pour ALCL) peut simplement être créé.
2. Dans `assets/js/projets.js`, mettre à jour le nombre : `photos: 21, visuels: 13, videos: 3`.

## Créer un nouveau projet

1. Créer `assets/projets/mon-projet/` avec `cover.jpg` et les sous-dossiers voulus.
2. Ajouter un bloc dans `assets/js/projets.js` (l'ordre de la liste = l'ordre sur le site) :
   ```js
   { key: "mon-projet", title: "Tournoi de Lille 2026", kind: "Événement", photos: 40, visuels: 6 },
   ```
   Lien optionnel en haut du projet : `link: { href: "https://…", label: "Voir le site" }`.

## Projet découpé en matchs / éditions (ex. LMTT)

```js
{ key: "lmtt", category: "long", title: "Lille Métropole Tennis de Table", kind: "Matchs", folders: true, partsLabel: "matchs",
  parts: [
    { key: "vs-saarbrucken", title: "LMTT vs Saarbrücken", kind: "Ligue des champions · 13.11.2026", photos: 103 },
    { key: "vs-amiens", title: "LMTT vs Amiens", kind: "Match · 22.09.2026", photos: 178 },
  ] },
```
Fichiers : `assets/projets/lmtt/vs-amiens/photos/001.jpg…` (et `visuels/`, `videos/` si besoin).
Pour un nouveau match : créer le dossier, y mettre les photos numérotées, ajouter une ligne dans `parts`.
Les photos doivent être redimensionnées (1600 px max) avant d'être ajoutées, sinon le site devient lourd.

Chaque projet a un lien direct partageable : `https://votre-site.fr/#projet/padelshot-barentin`.

Si une image est introuvable, un emplacement rayé « Image à remplacer » s'affiche à la place : rien ne casse.

## Sections et textes de projet

Dans `assets/js/projets.js` :
- `category: "event"` → section « Événements » ; `category: "long"` → section « Projets au long cours ».
- `desc` → la phrase qui apparaît en petit quand on touche ou survole la carte.
- En bas de chaque projet : un dossier par type de contenu (Visuels, Photos, Vidéos, seulement ceux qui existent)
  et un bouton « Tout voir ». `covers: { photos: "photos/050.jpg" }` permet de choisir la couverture d'un dossier.
- `folders: true` avec `parts` → le projet s'ouvre sur des dossiers séparés (ex. LMTT : un dossier par match).
- `story` → texte affiché à l'ouverture du projet : `lead` (phrase d'accroche), `facts` (Cadre, Période…),
  `text` (paragraphes), `missions` (liste « Ce que j'ai fait »), `illustrations` (4 à 6 images + légende),
  Les images utilisées seulement dans le texte vont dans `assets/projets/<projet>/story/`.

## Formulaire de contact

Le formulaire envoie les demandes via Formspree (https://formspree.io/f/xppdjzyp) vers chatax.off@gmail.com. Si l'envoi échoue, le visiteur voit l'email et le téléphone pour écrire directement.

Pour recevoir les messages directement :
1. Créer un formulaire gratuit sur https://formspree.io
2. Coller son URL dans `assets/js/main.js` : `const FORM_ENDPOINT = "https://formspree.io/f/xxxxxx";`

## Mise en ligne

Glisser le dossier sur Vercel ou Netlify (déploiement statique, aucune configuration).
Poids total : ~135 Mo, dont ~85 Mo de vidéos (chargées uniquement à la lecture).

/* =========================================================
   PROJETS — à modifier pour ajouter / retirer du contenu
   ---------------------------------------------------------
   Un dossier par projet :
     assets/projets/<key>/cover.jpg          couverture de la carte
     assets/projets/<key>/photos/001.jpg…    (facultatif)
     assets/projets/<key>/visuels/001.jpg…   (facultatif)
     assets/projets/<key>/videos/001.mp4 + 001-poster.jpg…  (facultatif)
     assets/projets/<key>/story/…            images utilisées seulement dans le texte

   category : "event" (section Événements) ou "long" (section Projets au long cours)
   desc : une phrase, affichée en petit quand on touche / survole la carte
   photoCover : photo utilisée dans la bande de photos quand la couverture est une affiche ou un logo
   covers : couverture des dossiers Photos / Visuels / Vidéos du projet (facultatif)
     ex. covers: { photos: "photos/050.jpg", videos: "videos/009-poster.jpg" }
   photos / visuels / videos : nombre de fichiers de chaque type

   parts + folders: true  → le projet s'ouvre sur des dossiers séparés
     (ex. un match = un dossier : assets/projets/lmtt/vs-amiens/photos/…
      avec sa propre cover.jpg)

   story → texte de présentation affiché à l'ouverture, avec quelques
     illustrations, puis un bouton « Voir tout le projet ».
     illustrations : chemin relatif au dossier du projet + légende.
   ========================================================= */
// À augmenter (2, 3, 4…) après avoir remplacé une image cover.jpg, pour que les visiteurs voient la nouvelle.
window.CHATAX_COVERS_VERSION = 10;

window.CHATAX_PROJECTS = [
  /* ---------------- ÉVÉNEMENTS (du plus récent au plus ancien) ---------------- */
  {
    key: "tennis-de-table",
    category: "photo", // album photo seulement (catégorie Photos)
    desc: "Reportages photo sur des tournois de tennis de table, en France et en Belgique.",
    title: "Tournois de tennis de table",
    short: "Tournois",
    kind: "Photos",
    folders: true,
    partsLabel: "tournois",
    parts: [
      { key: "compiegne", title: "Tournoi de Compiègne", kind: "Tournoi · Novembre 2026", photos: 6 },
      { key: "saint-laurent-blangy", title: "Tournoi de Saint-Laurent-Blangy", kind: "Tournoi · Octobre 2026", photos: 23 },
      { key: "nieppe", title: "Tournoi de Nieppe", kind: "Tournoi · Septembre 2026", photos: 15 },
      { key: "wattignies", title: "Tournoi de Wattignies", kind: "Tournoi · Août 2026", photos: 21 },
      { key: "merelbeke", title: "Tournoi de Merelbeke", kind: "Tournoi · Belgique · Août 2026", photos: 9 },
      { key: "wenduine", title: "Tournoi de Wenduine", kind: "Tournoi · Belgique · Août 2026", photos: 9 },
      { key: "flers", title: "Tournoi de Flers", kind: "Tournoi · Mai 2026", photos: 17 },
      { key: "grand-quevilly", title: "Tournoi international de Grand-Quevilly", kind: "Tournoi international · Mai 2026", photos: 14 },
      { key: "petit-quevilly", title: "Tournoi de Petit-Quevilly", kind: "Tournoi · Mai 2026", photos: 17 },
      { key: "laigle", title: "Tournoi de L'Aigle", kind: "Tournoi · Avril 2026", photos: 16 },
      { key: "beauvais", title: "Tournoi de Beauvais", kind: "Tournoi · Janvier 2026", photos: 17 },
    ],
  },

  {
    key: "lisieux-24h",
    coverFit: "contain", // affiche ou logo : montrée en entier
    photoCover: "cover-photo.jpg",
    category: "event",
    desc: "Communication et photos du tournoi de 24 heures de l'ASTT Lisieux, depuis cinq éditions.",
    title: "Les 24 h de Lisieux",
    kind: "Tournoi · ASTT Lisieux",
    photos: 26, visuels: 20,
    story: {
      lead: "Un tournoi de tennis de table qui dure 24 heures non-stop. Depuis cinq ans, c'est moi qui en assure la communication.",
      facts: [
        { k: "Organisateur", v: "ASTT Lisieux" },
        { k: "Depuis", v: "5 éditions" },
        { k: "Rôle", v: "Communication de l'événement, photos" },
      ],
      text: [
        "Les 24 h de Lisieux, c'est le grand rendez-vous de l'année pour l'ASTT Lisieux : des équipes jouent jour et nuit, dans une vraie ambiance de fête autour des tables. J'en gère la communication depuis cinq éditions.",
        "Chaque année, il faut donner envie de s'inscrire, puis faire vivre l'événement : ouverture des inscriptions, compte à rebours, nombre d'équipes inscrites, programme, buvette. Avec un ton qui fait sourire, comme l'affiche façon Astérix et Obélix.",
        "Pendant le tournoi, l'événement est diffusé en live sur Twitch et je le couvre en photo. Les photos de l'édition 2026 sont à voir dans « Voir tout le projet ».",
      ],
      missions: [
        "Communication des 24 h depuis cinq éditions",
        "Affiches, inscriptions, programme, buvette",
        "Live Twitch de l'événement",
        "Reportage photo du tournoi",
      ],
      illustrations: [
        { src: "visuels/008.jpg", cap: "Affiche des 24 h de Lisieux" },
        { src: "photos/016.jpg", cap: "Édition 2026" },
        { src: "visuels/011.jpg", cap: "Affiche façon Astérix et Obélix" },
        { src: "visuels/013.jpg", cap: "25 équipes inscrites" },
        { src: "photos/004.jpg", cap: "Édition 2026" },
        { src: "visuels/018.jpg", cap: "Live Twitch des 24 h" },
      ],
    },
  },

  {
    key: "cdf-laval-2026",
    coverFit: "contain", // affiche ou logo : montrée en entier
    photoCover: "cover-photo.jpg",
    category: "event",
    desc: "Reportage photo aux championnats de France de tennis de table, à Laval.",
    title: "Championnats de France · Laval 2026",
    kind: "Tennis de table · Photos",
    photos: 56,
  },

  {
    key: "cdf-universitaires",
    coverPos: "50% 30%", // cadrage de la couverture (cartes paysage sur mobile)
    photoCover: "cover-photo.jpg",
    category: "event",
    desc: "Reportage photo aux championnats de France universitaires 2026.",
    title: "Championnats de France universitaires 2026",
    kind: "Tennis de table · Photos",
    photos: 25,
  },

  {
    key: "spo-rouen",
    coverFit: "contain", // affiche ou logo : montrée en entier
    category: "event",
    desc: "Bénévole communication et buvette pour les finales de Pro A, à la Kindarena de Rouen.",
    title: "SPO Rouen · Finales de Pro A",
    kind: "Bénévolat · 2025",
    visuels: 1,
    story: {
      lead: "Bénévole pour les finales du championnat de France de Pro A, le plus haut niveau du tennis de table français, à la Kindarena de Rouen.",
      facts: [
        { k: "Événement", v: "Finales de Pro A, Kindarena (Rouen)" },
        { k: "Date", v: "29 juin 2025" },
        { k: "Organisation", v: "SPO Rouen Tennis de Table, FFTT" },
        { k: "Rôle", v: "Bénévole communication & buvette" },
      ],
      text: [
        "Pour les finales de Pro A, j'ai rejoint l'équipe de bénévoles du SPO Rouen. J'ai participé à la communication de l'événement et à la création des affiches.",
        "Parmi elles, l'affiche de la buvette : un visuel pensé pour être compris en un coup d'œil par le public, avec les formules, les prix et le fonctionnement des tickets. Le jour J, j'étais aussi derrière la buvette, au contact des spectateurs.",
      ],
      missions: [
        "Communication de l'événement",
        "Création des affiches",
        "Affiche et tenue de la buvette",
      ],
      illustrations: [
        { src: "visuels/001.jpg", cap: "Affiche de la buvette" },
      ],
    },
  },

  /* ---------------- ALBUMS PHOTO (section Photo uniquement) ----------------
     category "photo" : n'apparaît ni dans Projets ni dans Événements.
     dir : dossier repris d'un autre projet (les photos ne sont pas copiées deux fois).
     cover : couverture du dossier, chemin relatif au dossier de l'album. */
  {
    key: "pro-a",
    category: "photo",
    title: "Pro A",
    kind: "Tennis de table · Photos",
    desc: "Les matchs de Pro A, le plus haut niveau français.",
    folders: true,
    partsLabel: "matchs",
    parts: [
      { key: "spo-anmtt", title: "SPO Rouen vs Alliance Nîmes-Montpellier TT", kind: "Pro A · 24.11.2026", photos: 106, videos: 20 },
      { key: "alcl", dir: "alcl-grand-quevilly", cover: "alcl-cover.jpg", title: "ALCL Grand-Quevilly", kind: "Pro A Dames · 02.04.2026", photos: 45 },
    ],
  },

  {
    key: "pro-b",
    category: "photo",
    title: "Pro B",
    kind: "Tennis de table · Photos",
    desc: "Les matchs de Pro B.",
    folders: true,
    partsLabel: "matchs",
    parts: [
      { key: "vs-amiens", dir: "lmtt/vs-amiens", title: "LMTT vs Amiens", kind: "Pro B · 22.09.2026", photos: 82 },
    ],
  },

  {
    key: "ligue-des-champions",
    category: "photo",
    title: "Ligue des champions",
    kind: "Tennis de table · Photos",
    desc: "Les soirées européennes.",
    folders: true,
    partsLabel: "matchs",
    parts: [
      { key: "vs-saarbrucken", dir: "lmtt/vs-saarbrucken", title: "LMTT vs Saarbrücken", kind: "Ligue des champions · 13.11.2026", photos: 53 },
    ],
  },

  /* ---------------- ACCOMPAGNEMENT (du plus récent au plus ancien) ---------------- */
  {
    key: "lmtt",
    strip: false, // ses deux matchs sont dans les albums Pro B et Ligue des champions
    category: "long",
    desc: "Reportages photo des matchs du club, jusqu'en Ligue des champions.",
    title: "Lille Métropole Tennis de Table",
    short: "LMTT",
    kind: "Club de tennis de table",
    folders: true,
    partsLabel: "matchs",
    parts: [
      { key: "vs-saarbrucken", title: "LMTT vs Saarbrücken", kind: "Ligue des champions · 13.11.2026", photos: 53 },
      { key: "vs-amiens", title: "LMTT vs Amiens", kind: "Match · 22.09.2026", photos: 82 },
    ],
  },

  {
    key: "padelshot-barentin",
    category: "long",
    desc: "Stage de Licence 2 : rendre visible un complexe de padel tout juste ouvert.",
    title: "Padelshot Rouen-Barentin",
    kind: "Stage · Licence 2",
    photos: 16, visuels: 13, videos: 3,
    story: {
      lead: "Deux mois de stage dans un complexe de padel récemment ouvert, avec une mission claire : le rendre visible face à la concurrence locale.",
      facts: [
        { k: "Cadre", v: "Stage de Licence 2 Gestion, IAE Rouen Normandie" },
        { k: "Période", v: "Avril – mai 2026" },
        { k: "Rôle", v: "Gestion, communication & marketing" },
      ],
      text: [
        "Le Padelshot Rouen-Barentin venait d'ouvrir et devait se faire une place à côté de clubs déjà installés. J'ai pris en charge les contenus du club : photos des joueurs sur les terrains, affiches d'événements et publications régulières sur les réseaux sociaux.",
        "Une partie importante du stage a porté sur le lancement d'une nouvelle activité : l'espace tennis de table. Il a fallu tout expliquer simplement, des tarifs au matériel disponible, en passant par la réservation en ligne et le groupe WhatsApp des joueurs.",
        "En parallèle, j'étais sur le terrain au quotidien : accueil, relation client et vente au bar, en restauration et à la boutique, ainsi que l'animation des heures creuses.",
      ],
      missions: [
        "Photos des joueurs et des événements du club",
        "Affiches et visuels pour les réseaux sociaux",
        "Lancement et promotion de l'espace tennis de table",
        "Vidéos courtes pour Instagram",
        "Accueil, vente et animation des heures creuses",
      ],
      illustrations: [
        { src: "story/arrivee.jpg", cap: "Arrivée au Padelshot, avril 2026" },
        { src: "visuels/006.jpg", cap: "Affiche d'événement" },
        { src: "visuels/007.jpg", cap: "Lancement de l'espace ping" },
        { src: "photos/011.jpg", cap: "Photo sur les terrains" },
        { src: "visuels/010.jpg", cap: "Comment réserver" },
        { src: "visuels/012.jpg", cap: "Horaires de l'espace ping" },
      ],
    },
  },

  {
    key: "alcl-grand-quevilly",
    category: "long",
    desc: "Service civique : toute la communication d'un club de Pro A Dames.",
    title: "ALCL Grand-Quevilly TT",
    kind: "Service civique",
    photos: 45, visuels: 69, videos: 9,
    covers: { videos: "videos/009-poster.jpg" },
    reel: "002", // vidéo montrée dans la page Services
    story: {
      lead: "Une saison en service civique à gérer toute la communication d'un club qui évolue au plus haut niveau, avec son équipe de Pro A Dames.",
      facts: [
        { k: "Cadre", v: "Service civique" },
        { k: "Période", v: "Saison 2025 – 2026" },
        { k: "Rôle", v: "Communication, événementiel & encadrement" },
      ],
      text: [
        "À l'ALCL Grand-Quevilly, je gérais l'ensemble des réseaux sociaux du club : résultats, annonces de matchs, présentations des joueuses de Pro A, stages et événements. Chaque match avait son affiche, diffusée en ligne et chez les commerçants de Grand-Quevilly.",
        "J'ai aussi réalisé les lives des matchs professionnels, retransmis sur la chaîne YouTube de la Fédération française de tennis de table, ainsi que des vidéos et des interviews des membres du club.",
        "Je photographie aussi les rencontres du club, comme le match de Pro A Dames du 2 avril 2026 à Grand-Quevilly.",
        "Côté événementiel, j'ai participé à l'organisation du loto, du tournoi international et des rencontres de Pro A. J'ai également mis à jour le site web du club et encadré régulièrement les entraînements des jeunes et des adultes.",
      ],
      missions: [
        "Gestion complète des réseaux sociaux du club",
        "Affiches de matchs, résultats et présentations d'équipe",
        "Lives des matchs pro sur la chaîne YouTube de la FFTT",
        "Vidéos et interviews des membres",
        "Événementiel : loto, tournoi international, Pro A",
        "Mise à jour du site web du club",
      ],
      illustrations: [
        { src: "visuels/040.jpg", cap: "Match day Pro A Dames" },
        { src: "photos/023.jpg", cap: "Match de Pro A Dames, avril 2026" },
        { src: "visuels/053.jpg", cap: "Présentation de l'équipe de Pro A" },
        { src: "visuels/065.jpg", cap: "Tournoi international" },
        { src: "story/equipe.jpg", cap: "Avec l'équipe du club" },
        { src: "visuels/037.jpg", cap: "Annonce du nouveau site" },
      ],
    },
  },

  {
    key: "boumassa",
    // playlist « dernières vidéos » de la chaîne : se met à jour toute seule à chaque nouvelle vidéo
    youtubeUploads: "UUuFXRCHIN-U5LYn8ZAztiqw",
    category: "long",
    desc: "Vlogs de tournois en France et en Belgique, lancés entre amis.",
    title: "Boumassa",
    kind: "Chaîne YouTube",
    visuels: 17,
    link: { href: "https://www.youtube.com/@BOUMASSA_Normandie", label: "Voir la chaîne YouTube" },
    story: {
      lead: "Un format de vlogs lancé entre amis pour raconter les tournois de tennis de table de l'intérieur, en France et en Belgique.",
      facts: [
        { k: "Lancement", v: "Août 2025" },
        { k: "Format", v: "Vlogs de tournois & Shorts" },
        { k: "Partenaire", v: "Multiset Sport" },
      ],
      text: [
        "Boumassa suit les week-ends de tournoi tels qu'ils se passent : Wattignies, Nieppe, Lisieux, et jusqu'en Belgique à Wenduine ou Merelbeke. On filme, on monte et on raconte, du premier match au retour en voiture.",
        "La chaîne compte une quarantaine de vidéos, entre des formats longs qui suivent un tournoi du début à la fin et des Shorts, pour près de 600 abonnés. Chaque vidéo a sa miniature, pensée pour donner envie de cliquer en une seconde.",
        "Le projet est sponsorisé par Multiset Sport.",
      ],
      missions: [
        "Tournage sur les tournois",
        "Montage des vlogs et des Shorts",
        "Création des miniatures YouTube",
      ],
      illustrations: [
        { src: "visuels/001.jpg", cap: "Les 24 h de Lisieux" },
        { src: "visuels/002.jpg", cap: "Wenduine, premier tournoi belge" },
        { src: "visuels/004.jpg", cap: "Merelbeke" },
        { src: "visuels/013.jpg", cap: "Open de Lille" },
      ],
    },
  },

  {
    key: "multiset-sport",
    category: "long",
    desc: "Visuels, supports et photos pour une boutique spécialisée, partenaire de Boumassa.",
    title: "Multiset Sport",
    kind: "Boutique spécialisée",
    photos: 33, visuels: 9,
    story: {
      lead: "Des visuels pour un magasin spécialisé en tennis de table, badminton et squash, partenaire de Boumassa.",
      facts: [
        { k: "Client", v: "Multiset Sport, Rouen" },
        { k: "Lien", v: "Sponsor de Boumassa" },
        { k: "Livrables", v: "Visuels réseaux, supports & photos" },
      ],
      text: [
        "Multiset Sport accompagne le projet Boumassa. En retour, j'ai réalisé des supports pour la boutique : bannières aux couleurs de la marque, carte de contact, annonces d'horaires et publications pour mettre en avant les nouveautés et les promotions.",
        "L'objectif : des visuels simples, lisibles et cohérents avec l'identité bleu et jaune de la marque, prêts à être publiés.",
        "Une séance photo dans la boutique complète le tout : les rayons, le matériel et l'équipe, pour illustrer les publications avec de vraies images du magasin.",
      ],
      missions: [
        "Bannières et supports aux couleurs de la marque",
        "Publications promotionnelles",
        "Annonces pratiques (horaires, nouveautés)",
        "Photos de la boutique, du matériel et de l'équipe",
      ],
      illustrations: [
        { src: "photos/007.jpg", cap: "L'équipe de la boutique" },
        { src: "photos/014.jpg", cap: "Le rayon padel" },
        { src: "visuels/006.jpg", cap: "Publication promotionnelle" },
        { src: "visuels/009.jpg", cap: "Annonce des horaires" },
        { src: "visuels/007.jpg", cap: "Nouvelle collection" },
        { src: "visuels/004.jpg", cap: "Bannière de contact" },
      ],
    },
  },

  {
    key: "astt-lisieux",
    category: "long",
    desc: "Community manager et entraîneur du club en 2023-2024.",
    title: "ASTT Lisieux",
    kind: "Community management",
    visuels: 21,
    story: {
      lead: "Community manager et entraîneur d'un club normand : faire grandir ses réseaux et lui donner une vraie personnalité.",
      facts: [
        { k: "Cadre", v: "Community manager & entraîneur" },
        { k: "Période", v: "Saison 2023 – 2024" },
        { k: "Rôle", v: "Réseaux sociaux, encadrement des jeunes" },
      ],
      text: [
        "J'ai développé les comptes Instagram et Facebook de l'ASTT Lisieux, avec une nette croissance de l'audience. Chaque match et chaque événement avait sa publication : photos, vidéos, visuels de résultats.",
        "Le club a une identité forte et décalée : une mascotte officielle, Baduf, des visuels « la sentence » pour présenter les joueurs, les arrivées et les départs annoncés comme un mercato, et des résultats de championnat publiés chaque journée.",
        "En parallèle, j'encadrais les jeunes du club, avec les diplômes d'initiateur de club et d'animateur fédéral.",
      ],
      missions: [
        "Développement d'Instagram et de Facebook",
        "Publication à chaque match et événement",
        "Visuels de résultats, de joueurs et de mercato",
        "Visuels autour de Baduf, la mascotte du club",
        "Encadrement des jeunes",
      ],
      illustrations: [
        { src: "visuels/002.jpg", cap: "Baduf, mascotte officielle du club" },
        { src: "visuels/012.jpg", cap: "« La sentence », présentation d'un joueur" },
        { src: "visuels/003.jpg", cap: "Arrivées au club" },
        { src: "visuels/016.jpg", cap: "Résultats du championnat" },
        { src: "visuels/005.jpg", cap: "Tournoi et AG du club" },
        { src: "visuels/001.jpg", cap: "Le starter pack Baduf" },
      ],
    },
  },

];

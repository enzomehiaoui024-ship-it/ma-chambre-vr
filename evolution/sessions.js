// Une entrée par séance d'entraînement (la plus récente en premier).
// Images : evolution/<date>/avant_<nom>.jpg et apres_<nom>.jpg
window.SESSIONS = [
  {
    date: "2026-11-20",
    titre: "Séance 18 — touche un meuble dans le plan 3D pour voir sa fiche",
    avant: 57.75, apres: 58.75,
    scores: { meubles: [9.75, 9.75], eclairage: [9.5, 9.5], coherence: [7.5, 8], liste: [8, 8], vr: [8, 8], plan: [7.5, 8], video: [7.5, 7.5] },
    changements: [
      "Dans le plan 3D, touche n'importe quel meuble ou objet : il s'entoure d'un cadre vert et sa fiche s'ouvre (nom, modèle, magasin, prix, lien vers le produit)",
      "« Aussi ici » : les autres articles au même endroit (ex. sur le lit : housse, couette, matelas, drap, protège-matelas)",
      "Les prix des fiches viennent directement de la liste d'achat : une seule source, toujours à jour",
      "73 articles de la liste sont maintenant cliquables dans la chambre"
    ],
    images: [
      ["fiche-commode", "Commode : fiche et cadre de sélection"],
      ["fiche-ecran", "Écran gaming"],
      ["fiche-pc", "Boîtier du PC sous le bureau"],
      ["fiche-plaid", "Plaid sur le lit"]
    ],
    ensuite: "Placer les étagères à pochettes, les supports vinyles et le « Now Playing » (à décider avec Enzo)."
  },
  {
    date: "2026-11-20",
    titre: "Séance 17 — vidéo de visite v4",
    avant: 57.25, apres: 57.75,
    scores: { meubles: [9.75, 9.75], eclairage: [9.5, 9.5], coherence: [7.5, 7.5], liste: [8, 8], vr: [8, 8], plan: [7.5, 7.5], video: [7, 7.5] },
    changements: [
      "Les titres apparaissent pile quand la caméra arrive sur le meuble (avant, ils avaient une seconde de retard)",
      "La vidéo montre toutes les améliorations de la nuit : lumière des lampes, vue par la fenêtre, suspension en papier, sneakers, tapis, platine…"
    ],
    video: "video/visite.mp4", poster: "video/visite_poster.jpg",
    images: [],
    ensuite: "Version verticale de la vidéo pour le téléphone."
  },
  {
    date: "2026-11-20",
    titre: "Séance 16 — manettes visibles dans le casque",
    avant: 56.75, apres: 57.25,
    scores: { meubles: [9.75, 9.75], eclairage: [9.5, 9.5], coherence: [7.5, 7.5], liste: [8, 8], vr: [7.5, 8], plan: [7.5, 7.5], video: [7, 7] },
    changements: [
      "Dans le casque, tes manettes ne sont plus des boîtes : poignée inclinée, tête ronde avec stick, deux boutons et gâchette",
      "Elles restent visibles même dans le noir (mode nuit cosy)"
    ],
    images: [["manettes-vr", "Manette dans le casque (nuit cosy)"]],
    ensuite: "Vidéo refaite avec toutes les améliorations de la nuit."
  },
  {
    date: "2026-11-20",
    titre: "Séance 15 — suspension GULLSUDARE en papier de riz",
    avant: 56.5, apres: 56.75,
    scores: { meubles: [9.5, 9.75], eclairage: [9.5, 9.5], coherence: [7.5, 7.5], liste: [8, 8], vr: [7.5, 7.5], plan: [7.5, 7.5], video: [7, 7] },
    changements: [
      "La boule du plafond ressemble enfin à la vraie GULLSUDARE : papier de riz tendu sur un fil en spirale (34 nervures), ouverture en bas et anneau en haut",
      "Texture de papier fibreux",
      "Les titres de la visite (bouton « Lancer la visite ») apparaissent maintenant au bon moment"
    ],
    images: [
      ["suspension-jour", "Suspension, le jour"],
      ["suspension-dessous", "Vue de dessous"],
      ["suspension-cosy", "Nuit cosy"]
    ],
    ensuite: "Vidéo refaite avec toutes les améliorations de la nuit."
  },
  {
    date: "2026-11-20",
    titre: "Séance 14 — vue par la fenêtre et sneakers",
    avant: 56, apres: 56.5,
    scores: { meubles: [9.5, 9.5], eclairage: [9, 9.5], coherence: [7.5, 7.5], liste: [8, 8], vr: [7.5, 7.5], plan: [7.5, 7.5], video: [7, 7] },
    changements: [
      "Immeubles dehors refaits : façades en pierre, en brique ou claires, fenêtres avec cadres, rebords, rideaux, balcons",
      "La nuit, les fenêtres allumées ont une lumière dégradée plus naturelle",
      "Ciel de jour plus profond avec des nuages doux, arbres avec un vrai feuillage",
      "Sneakers refaites : semelle en deux couches, bout arrondi, col, languette, lacets et languette au talon"
    ],
    images: [
      ["fenetre-jour", "Vue par la fenêtre, le jour"],
      ["fenetre-nuit", "Vue par la fenêtre, la nuit"],
      ["fenetre-coucher", "Coucher de soleil"],
      ["sneakers-mur", "Étagères à sneakers"],
      ["sneakers-portant", "Sneakers sur le portant"]
    ],
    ensuite: "Refaire la vidéo avec toutes les améliorations de la nuit."
  },
  {
    date: "2026-11-20",
    titre: "Séance 13 — derniers prix estimés remplacés",
    avant: 55.5, apres: 56,
    scores: { meubles: [9.5, 9.5], eclairage: [9, 9], coherence: [7.5, 7.5], liste: [7.5, 8], vr: [7.5, 7.5], plan: [7.5, 7.5], video: [7, 7] },
    changements: [
      "Boîtier : modèle précis, Lian Li LANCOOL 207 noir à 89,95 € (4 ventilateurs inclus, la carte graphique rentre)",
      "Casque : SteelSeries Arctis Nova 5 Wireless à 139,95 €",
      "Matelas VALEVÅG : 279 € sur ikea.fr, mais en 140x200 → à vérifier pour ton lit en 140x190",
      "Nouveau total : 7 388,50 € (chambre 3 519,89 € + gaming 3 868,61 €)"
    ],
    images: [],
    ensuite: "Il ne reste qu'un prix estimé : clavier + souris + tapis (selon les modèles que tu préfères)."
  },
  {
    date: "2026-11-20",
    titre: "Séance 12 — lumière des lampes plus réaliste",
    avant: 55, apres: 55.5,
    scores: { meubles: [9.5, 9.5], eclairage: [8.5, 9], coherence: [7.5, 7.5], liste: [7.5, 7.5], vr: [7.5, 7.5], plan: [7.5, 7.5], video: [7, 7] },
    changements: [
      "Le lampadaire arc éclaire maintenant vers le bas, comme un vrai abat-jour : flaque de lumière sur le lit et le tapis, plafond au-dessus plus sombre",
      "La lampe FORSÅ éclaire vers le clavier au lieu de toute la pièce",
      "Le spot au sol éclaire le ficus par en dessous, les LED des étagères à sneakers éclairent vers le bas",
      "Même amélioration dans le casque VR"
    ],
    images: [
      ["nuit-cosy-lumiere", "Nuit cosy"],
      ["lampadaire-arc", "Lampadaire arc (soir)"],
      ["ficus-spot", "Ficus éclairé par le spot"],
      ["bureau-soir", "Bureau le soir"],
      ["soir-lit", "Lit le soir"]
    ],
    ensuite: "Revoir la vidéo avec la nouvelle lumière et des titres mieux calés."
  },
  {
    date: "2026-11-20",
    titre: "Séance 10 — confort en VR",
    avant: 54.5, apres: 55,
    scores: { meubles: [9.5, 9.5], eclairage: [8.5, 8.5], coherence: [7.5, 7.5], liste: [7.5, 7.5], vr: [7, 7.5], plan: [7.5, 7.5], video: [7, 7] },
    changements: [
      "Quand tu avances au stick ou que tu tournes, les bords de la vue s'assombrissent doucement : ça évite d'avoir mal au cœur dans le casque",
      "Bouton « Confort : oui / non » dans le menu pour l'enlever si tu n'en as pas besoin",
      "Le compteur d'images par seconde est passé en haut du menu"
    ],
    images: [
      ["vignette-marche", "Vue pendant la marche (bords assombris)"],
      ["menu-confort", "Menu avec le bouton Confort"]
    ],
    ensuite: "Éclairage : reflets légers sur le parquet et l'écran de la TV."
  },
  {
    date: "2026-11-20",
    titre: "Séance 9 — petits objets de la liste ajoutés",
    avant: 54, apres: 54.5,
    scores: { meubles: [9.5, 9.5], eclairage: [8.5, 8.5], coherence: [7, 7.5], liste: [7.5, 7.5], vr: [7, 7], plan: [7.5, 7.5], video: [7, 7] },
    changements: [
      "Tapis de passage au bord du lit (côté bureau)",
      "Les 2 multiprises KOPPLA (une côté lit, une sous le bureau) avec leurs câbles",
      "Goulottes blanches : une le long du pied du bureau, une entre la TV et la commode",
      "Spot au sol derrière la monstera (il y en avait un seul, derrière le ficus)"
    ],
    images: [],
    ensuite: "À décider avec toi : où mettre les 2 étagères à pochettes MOSSLANDA, les 3 supports muraux et le support « Now Playing » (le mur au-dessus du Kallax a déjà 4 cadres)."
  },
  {
    date: "2026-11-20",
    titre: "Séance 8 — nouvelle vidéo de visite",
    avant: 52, apres: 54,
    scores: { meubles: [9.5, 9.5], eclairage: [8.5, 8.5], coherence: [7, 7], liste: [7.5, 7.5], vr: [7, 7], plan: [7.5, 7.5], video: [5, 7] },
    changements: [
      "Vidéo refaite avec tous les nouveaux meubles et le même moteur que le plan 3D (ombres douces, textures corrigées)",
      "Deux nouveaux moments : nuit cosy avec la lune, puis ciné Ambilight",
      "Titres animés à jour (prix, modèles) + écran de début et de fin",
      "La visite du bouton « Lancer la visite » du plan 3D suit le même parcours"
    ],
    video: "video/visite_v3.mp4", poster: "video/visite_v3_poster.jpg",
    images: [],
    ensuite: "Caler les titres un peu plus tôt sur les mouvements de caméra."
  },
  {
    date: "2026-11-19",
    titre: "Séance 7 — plan 3D sur iPhone",
    avant: 51.5, apres: 52,
    scores: { meubles: [9.5, 9.5], eclairage: [8.5, 8.5], coherence: [7, 7], liste: [7.5, 7.5], vr: [7, 7], plan: [7, 7.5], video: [5, 5] },
    changements: [
      "Écran vertical : l'angle de vue s'élargit tout seul, on voit beaucoup plus de la chambre sur le téléphone",
      "L'aide « 1 doigt : tourner · 2 doigts : zoom » ne passe plus sous le bouton Mon évolution, et disparaît quand tu commences à toucher",
      "Les rangées de boutons s'estompent sur la droite pour montrer qu'on peut les faire défiler"
    ],
    images: [
      ["ensemble-telephone", "Vue d'ensemble sur iPhone"],
      ["bureau-telephone", "Bureau gaming sur iPhone"]
    ],
    ensuite: "Refaire la vidéo de visite avec toutes les améliorations."
  },
  {
    date: "2026-11-19",
    titre: "Séance 6 — housse de couette, oreillers, platine vinyle",
    avant: 51, apres: 51.5,
    scores: { meubles: [9, 9.5], eclairage: [8.5, 8.5], coherence: [7, 7], liste: [7.5, 7.5], vr: [7, 7], plan: [7, 7], video: [5, 5] },
    changements: [
      "Housse de couette olive : plis doux de tissu (comme une vraie housse en percale)",
      "Oreillers plus moelleux, bombés au centre avec une couture tout autour",
      "Platine AT-LP60X : vinyle avec ses sillons et reflet, couvercle transparent ouvert, contrepoids du bras et repose-bras",
      "Correction : on voit maintenant la platine même en gros plan"
    ],
    images: [
      ["platine-gros-plan", "Platine vinyle de près"],
      ["platine-kallax", "Platine sur le Kallax"],
      ["housse-plis", "Housse de couette"],
      ["lit-oreillers", "Oreillers et coussins"]
    ],
    ensuite: "Plan 3D sur téléphone : vérifier les boutons et la fluidité ; puis la vidéo de visite."
  },
  {
    date: "2026-11-19",
    titre: "Séance 5 — prix de la liste revérifiés",
    avant: 50.5, apres: 51,
    scores: { meubles: [9, 9], eclairage: [8.5, 8.5], coherence: [7, 7], liste: [7, 7.5], vr: [7, 7], plan: [7, 7], video: [5, 5] },
    changements: [
      "SSD 2 To : 200 € → 299,99 €. Les SSD ont beaucoup augmenté cette année ; meilleure offre trouvée : Acer Predator GM9000 (encore plus rapide, Gen5)",
      "Alimentation : modèle précis choisi, Corsair RM850e à 134,95 € chez LDLC",
      "Chaise Sihoo Doro C300 : 309,99 € (entre 285 et 380 € selon le vendeur)",
      "Carte graphique RX 9070 XT : prix confirmé autour de 850-900 €, avec les liens des offres du jour",
      "Nouveau total : 7 349,60 € (chambre 3 490,89 € + gaming 3 858,71 €)"
    ],
    images: [],
    ensuite: "Lit : coutures de la housse et oreillers plus moelleux ; platine vinyle."
  },
  {
    date: "2026-11-19",
    titre: "Séance 4 — textures corrigées, ombres douces, tapis berbère",
    avant: 49.5, apres: 50.5,
    scores: { meubles: [8.5, 9], eclairage: [8, 8.5], coherence: [7, 7], liste: [7, 7], vr: [7, 7], plan: [7, 7], video: [5, 5] },
    changements: [
      "Bug trouvé et corrigé : sur les meubles à bords arrondis, les motifs étaient étirés. Le tapis berbère montre maintenant ses vrais losanges, le bois de la commode a un grain fin",
      "Plaid SÖRBYSKOGEN : fines lignes noires dessinées sur fond crème, comme le vrai, au lieu d'un gros trait",
      "Ombres du soleil douces : nettes au pied des meubles et floues quand l'objet est loin (comme dans la réalité)",
      "Tapis : losanges tracés à la main, un peu irréguliers"
    ],
    images: [
      ["tapis-ombres", "Tapis berbère et ombres"],
      ["lit-plaid", "Plaid au pied du lit"],
      ["nuit-cosy-plaid4", "Nuit cosy"],
      ["coucher-soleil", "Coucher de soleil"]
    ],
    ensuite: "Revérifier les prix de la liste, puis le lit (coutures, oreillers moelleux)."
  },
  {
    date: "2026-11-19",
    titre: "Séance 3 — VR : téléportation, mode assis, fluidité",
    avant: 48.5, apres: 49.5,
    scores: { meubles: [8.5, 8.5], eclairage: [8, 8], coherence: [7, 7], liste: [7, 7], vr: [6, 7], plan: [7, 7], video: [5, 5] },
    changements: [
      "Téléportation : pousse le stick droit vers l'avant, vise le sol, relâche. L'arc est vert si l'endroit est libre, rouge sur un meuble (lit, bureau, commode…)",
      "Mode assis dans le menu : la chambre se met à la bonne hauteur quand tu joues assis",
      "Compteur de fluidité (images par seconde) dans le menu, avec un point vert, jaune ou rouge",
      "Le menu est réorganisé avec un bouton de plus"
    ],
    images: [
      ["menu-vr", "Menu dans le casque"],
      ["teleportation", "Arc de téléportation (rouge : on ne se pose pas sur le lit)"]
    ],
    ensuite: "Éclairage : ombres plus douces et reflets légers sur le parquet ; revérifier les prix."
  },
  {
    date: "2026-11-19",
    titre: "Séance 2 — chaise Sihoo, pothos retombant, commode, pots",
    avant: 48, apres: 48.5,
    scores: { meubles: [8, 8.5], eclairage: [8, 8], coherence: [7, 7], liste: [7, 7], vr: [6, 6], plan: [7, 7], video: [5, 5] },
    changements: [
      "Chaise Sihoo Doro C300 refaite : dossier en filet (on voit à travers), courbe lombaire, assise avec bord arrondi, roulettes et accoudoirs 3D",
      "Pothos sur l'étagère et sur le rebord de fenêtre : feuilles en cœur panachées et tiges qui retombent",
      "Commode : fines ombres entre les tiroirs, comme une vraie commode",
      "Pots : terre visible, rebord sur le pot de la monstera, pot du ficus plus réaliste",
      "VR plus légère : ~146 k triangles au lieu de ~155 k"
    ],
    images: [
      ["chaise", "Chaise Sihoo au bureau"],
      ["pothos-etagere", "Pothos sur l'étagère"],
      ["commode", "Tiroirs de la commode"],
      ["monstera-pot", "Monstera près de la fenêtre"],
      ["ficus-pot", "Pot du ficus"]
    ],
    ensuite: "VR : téléportation, mode assis et compteur d'images par seconde."
  },
  {
    date: "2026-11-19",
    titre: "Séance 1 — plantes, lampe, plaid et vêtements",
    avant: 47, apres: 48,
    scores: { meubles: [7, 8], eclairage: [8, 8], coherence: [7, 7], liste: [7, 7], vr: [6, 6], plan: [7, 7], video: [5, 5] },
    changements: [
      "Ficus lyrata : vraies feuilles en forme de violon avec nervures, 5 branches et 72 feuilles",
      "Monstera : grandes feuilles découpées avec leurs trous",
      "Lampe FORSÅ : bras articulés et abat-jour orienté vers le clavier",
      "Plaid : motif tourbillon visible et franges",
      "Portant : vraies formes de vêtements (sweat à capuche, t-shirts, pantalon)",
      "Moteur 3D et VR : découpe des feuilles (transparence nette), VR toujours fluide (~155 k triangles)"
    ],
    images: [
      ["ficus", "Ficus près de la TV"],
      ["vue-ensemble", "Vue d'ensemble"],
      ["bureau-lampe", "Bureau et lampe FORSÅ"],
      ["portant", "Portant à vêtements"],
      ["nuit-cosy-plaid", "Nuit cosy, plaid sur le lit"],
      ["dessus", "Vu de dessus"]
    ],
    ensuite: "Ombres douces des lampes, ombre entre les tiroirs de la commode, chaise Sihoo plus fidèle."
  },
  {
    date: "2026-11-19",
    titre: "Version de référence (v3)",
    avant: null, apres: 47,
    scores: { meubles: [null, 7], eclairage: [null, 8], coherence: [null, 7], liste: [null, 7], vr: [null, 6], plan: [null, 7], video: [null, 5] },
    changements: [
      "Tous les meubles refaits en 3D avec leurs vraies dimensions",
      "7 ambiances dont nuit cosy avec la lune et ciné Ambilight",
      "Site VR pour le Quest 2 avec menu dans le casque"
    ],
    images: [],
    ensuite: ""
  }
];

# Journal des améliorations

**Objectif** : s'entraîner sur la chambre jusqu'à un niveau pro. Plus tard, le projet s'étendra à toute la maison : garder le code propre et réutilisable (meubles en fonctions, pièce paramétrable).

Séances : amélioration chaque nuit à 2h41 (heure de Paris), compte rendu à Enzo à 7h20.

Règle : **chaque version doit être meilleure que la précédente.** Chaque séance note son score sur la grille ci-dessous (avant / après, sur les mêmes vues de contrôle). On ne publie que si le score total augmente et qu'aucun critère ne baisse.

## Grille de score (sur 10 chacun)
1. Réalisme des meubles (formes, dimensions réelles, détails)
2. Éclairage et ambiances (jour, cosy, gaming, fête, ciné Ambilight)
3. Cohérence plan ↔ liste d'achat (chaque article visible et bien placé, mesures justes)
4. Liste d'achat (prix vérifiés récemment, liens qui marchent, total juste)
5. VR Quest 2 (fluidité estimée, contrôles, menu, confort)
6. Plan 3D téléphone (lisibilité, boutons, fluidité)
7. Vidéo de visite (qualité image, mouvements, titres) — si refaite

Vues de contrôle fixes (tools/preview.py) :
`[["jour",null,[290,150,60],[90,70,260]],["jour",null,[200,130,200],[20,70,120]],["jour",null,[230,120,250],[345,80,259]],["jour",null,[175,130,175],[80,90,30]],["jour",null,[230,130,140],[350,70,138]],["jour",null,[230,140,150],[210,90,10]],["cosy",null,[250,150,90],[60,70,260]],["jour","dessus",null,null]]`

---

## 2026-11-19 — Version de référence (v3)
- Meubles remodélisés en détail (bords arrondis, vraies dimensions), lit décalé de 15 cm, TV à 1,05 m, radiateur retiré.
- Ambiances : jour, coucher de soleil, soir chaud, gaming, fête, nuit cosy (lune, ville), ciné Ambilight.
- VR Quest 2 : menu dans le casque, rayon de visée, défilé auto. ~350 lots de dessin, ~158 k triangles.
- Liste : 7 214,67 € (chambre 3 490,89 € + gaming 3 723,78 €), prix GPU/RAM/écran revérifiés le 19/11.
- Scores de référence : meubles 7, éclairage 8, cohérence 7, liste 7, VR 6 (pas encore testée sur vrai casque), plan 3D 7, vidéo 5 (ancienne version) → **total 47/70**.

## 2026-11-19 — Séance 1 : plantes, lampe, plaid, vêtements
- Ficus lyrata : feuilles en violon avec nervures (texture découpée), 5 branches, 72 feuilles. Monstera : feuilles découpées avec trous.
- Lampe FORSÅ : bras articulés (tubes), abat-jour orienté vers le clavier, ampoule dans l'abat-jour.
- Plaid : motif tourbillon 512×256 et franges. Portant : sweat à capuche, t-shirts, pantalon.
- Moteur : `alphaTest` (shim2, gl2, vrgl) ; vrgl regroupe les petits plans dans les lots normaux.
- VR : 0 erreur, 346 lots, ~155 k triangles.
- Scores : meubles 7 → 8, autres inchangés → **47 → 48/70**. Images avant/après : `evolution/2026-11-19/`, page `evolution.html`.
- Ensuite : ombres douces des lampes, ombre entre les tiroirs, chaise Sihoo.

## 2026-11-19 — Séance 2 : chaise, pothos, commode, pots
- La grille accepte maintenant les demi-points (les gros critères montent par petites marches).
- Chaise Sihoo Doro C300 : dossier filet semi-transparent en deux parties (courbe lombaire), cadre, assise « waterfall », roulettes, accoudoirs 3D. Inclinaison du dossier corrigée (elle penchait vers l'avant).
- Pothos (étagère + fenêtre) : texture de feuille en cœur panachée, 14 feuilles + tiges retombantes (fonction `pothos()` réutilisable pour toute la maison).
- Commode : plan sombre derrière les façades → ombres entre tiroirs. Pots : texture de terre, rebords.
- VR : 0 erreur, 354 lots, ~146 k triangles.
- Scores : meubles 8 → 8,5 → **48 → 48,5/70**. Outil ajouté : `tools/evo_images.py`.

## 2026-11-19 — Séance 3 : VR (téléportation, mode assis, fluidité)
- Téléportation au stick droit (arc parabolique, atterrissage au pied du mur si l'arc touche un mur, zones interdites = meubles → arc rouge).
- Mode assis (+45 cm de hauteur de vue), compteur images/s dans le menu (point vert ≥ 68, jaune ≥ 55, rouge en dessous).
- Testé avec le casque simulé (xrmock : stick gauche immobile, inclinaison de manette `__ctlPitch`). 0 erreur.
- Scores : VR 6 → 7 → **48,5 → 49,5/70**.

## 2026-11-19 — Séance 4 : UV des boîtes arrondies, ombres douces, tapis
- **Bug** `RoundedBoxGeometry` (shim2.js) : les UV suivaient l'indice des subdivisions, donc la partie plate d'une face n'utilisait qu'une petite tranche de la texture (motifs énormes et étirés). UV maintenant proportionnelles à la position → toutes les textures RB sont à la bonne échelle (tapis, plaid, bois…).
- Ombres du soleil (gl2) : PCSS léger (recherche de bloqueurs 8 points + filtre 16 points en spirale tournée par pixel) → pénombre qui grandit avec la distance.
- Plaid : motif de fines lignes répété. Tapis berbère : losanges un peu irréguliers, plus grands.
- VR : 0 erreur, ~146 k triangles (la VR garde son filtre 4 points, plus rapide).
- Scores : meubles 8,5 → 9, éclairage 8 → 8,5 → **49,5 → 50,5/70**.

## 2026-11-19 — Séance 5 : prix
- SSD 2 To 200 → 299,99 € (Predator GM9000, Black November ; marché 300-360 €). Alimentation → Corsair RM850e (2025) 134,95 € LDLC. Chaise Sihoo 300 → 309,99 €. GPU : prix gardé à 899,90 €, confirmé (847,92 € à 889,99 € vus aujourd'hui, jusqu'à 1 400 € sur certaines fiches).
- **Total : 7 214,67 → 7 349,60 €** (gaming 3 858,71 €).
- Scores : liste 7 → 7,5 → **50,5 → 51/70**. Restent estimés : boîtier, périphériques, casque.

## 2026-11-19 — Séance 6 : lit et platine
- Housse : texture `quiltT` (plis doux : ellipses à dégradé, générateur local pour ne pas décaler `rnd`). Essai de matelassage rejeté (une housse en percale n'est pas matelassée).
- Oreillers : base RB + ellipsoïde pour le bombé + passepoil. Essai d'ellipsoïde sur les coussins rejeté (cercle visible).
- Platine : disque à sillons (plan alphaTest), couvercle acrylique ouvert contre le mur, contrepoids, repose-bras.
- VR : 0 erreur, 361 lots, ~149 k triangles.
- Scores : meubles 9 → 9,5 → **51 → 51,5/70**.

## 2026-11-19 — Séance 7 : plan 3D sur téléphone
- `FV()` dans app_gl.js : en portrait, fov vertical = 2·atan(tan(f/2)/√aspect) → champ horizontal plus large sans effet fish-eye.
- Aide déplacée à gauche (z-index), masquée 2,5 s après le premier toucher ; fondu à droite des rangées de boutons.
- Vérifié en émulation iPhone (390×844, tactile). Scores : plan 7 → 7,5 → **51,5 → 52/70**.

## 2026-11-20 — Séance 8 : vidéo de visite v3
- Parcours de la visite allongé à 68,5 s : ajout nuit cosy (fenêtre + lune) et ciné Ambilight ; `SCHED` gère COSY et CINE ; titres mis à jour.
- `window.__renderAt(t,W,H)` dans app_gl.js : rendu image par image + titres dessinés en 2D (pour la vidéo). Rendu 1280×720, 30 i/s, ~1,2 s/image ; rendu reprenable image par image (`frames/f_%05d.jpg`) car la machine peut redémarrer.
- Fichier : `video/visite.mp4` (14,8 Mo), affiché sur la page Évolution.
- Scores : vidéo 5 → 7 → **52 → 54/70**. À faire : avancer les titres de ~1 s.

## 2026-11-20 — Séance 9 : cohérence plan ↔ liste
- Ajoutés : tapis de passage, 2 multiprises KOPPLA + câbles, 2 goulottes, 2e spot plante.
- Manquent encore (emplacement à décider avec Enzo) : MOSSLANDA ×2, supports vinyles muraux ×3, « Now Playing », brosse à vinyles, patère (cachée quand la porte est ouverte).
- Scores : cohérence 7 → 7,5 → **54 → 54,5/70**.

## 2026-11-20 — Séance 10 : vignette de confort VR
- Plan 32×32 cm à 12 cm devant la tête (dynamique, renderOrder 20), texture radiale (transparent jusqu'à 36 %, noir à 72 %), opacité = vitesse du stick gauche ou 1 pendant ~0,3 s après un virage. Bouton « Confort » dans le menu (activé par défaut).
- Mock XR : `window.__gpL` (manette gauche) exposée pour les tests.
- Leçon : une opacité < 1 sur un dégradé déjà transparent se voit à peine dans le champ de vue réel ; l'intensité doit aller jusqu'à 1.
- Scores : VR 7 → 7,5 → **54,5 → 55/70**.

## 2026-11-20 — Séance 11 : reflets (essai rejeté)
- Essai : reflet d'environnement Fresnel + reflet de la fenêtre (intersection du rayon réfléchi avec le plan z=370) dans gl2 et vrgl.
- Résultat : différence très faible (léger brillant sur le bureau et l'écran), poignées noires devenues grises, image un peu plus « voilée ». **Pas meilleur → annulé, rien publié.**
- Piste pour plus tard : reflet planaire du parquet seulement (rendu miroir flouté), ou un « spot » de reflet de fenêtre peint dans la texture du sol en mode jour.

## 2026-11-20 — Séance 12 : lampes directionnelles
- `userData.spot=[dx,dy,dz,cosOuter]` sur les PointLight (room.js) ; uniforme `uPS[]` dans gl2 et vrgl : atténuation `mix(.14,1,smoothstep(cos,cos+.3,dot(-L,dir)))` (14 % de lumière hors du cône = abat-jour qui diffuse un peu).
- Cônes : arc (bas, .15), FORSÅ (vers le clavier, .45), spot plante (haut, .55), LED sneakers (bas, .1).
- Mode jour inchangé ; soir/cosy plus contrastés, plafond moins brûlé. VR : 0 erreur.
- Scores : éclairage 8,5 → 9 → **55 → 55,5/70**.

## 2026-11-20 — Séance 13 : prix
- Boîtier → Lian Li LANCOOL 207 noir 89,95 € (LDLC). Casque → Arctis Nova 5 Wireless 139,95 € (LDLC). Matelas VALEVÅG 250 → 279 € (ikea.fr, 140x200 : **taille 140x190 à confirmer avec Enzo**).
- Total : 7 349,60 → **7 388,50 €**. Scores : liste 7,5 → 8 → **55,5 → 56/70**.

## 2026-11-20 — Séance 14 : extérieur et sneakers
- `facT(lit,k)` : 4 styles de façade (pierre, gris, brique, blanc), cadres, rideaux, balcons, bandeaux ; fenêtres allumées en dégradé. Ciel 512² avec nuages en dégradés radiaux. Arbres texturés (feuillage).
- Générateurs locaux + simulation de l'ancienne consommation de `rnd()` (`for(i<56)rnd()` et boucle des fenêtres) → le reste de la chambre garde exactement la même disposition aléatoire.
- Sneakers : nouvelle fonction `sneaker()` (semelle 2 couches, bout ellipsoïde, col, languette, lacets, talon). VR ~152 k triangles.
- Scores : éclairage/ambiances 9 → 9,5 → **56 → 56,5/70**.

## 2026-11-20 — Séance 15 : suspension GULLSUDARE
- Lathe 36 segments, 34 nervures (creux de 2,2 % entre les fils), ouvertures haut (5 cm) et bas (7,5 cm), anneau métallique, texture fibres de papier, DoubleSide.
- Titres de la visite recalés sur les images clés (sujet ±1,2 s).
- Les meubles approchent du maximum : notation au quart de point pour ce critère.
- Scores : meubles 9,5 → 9,75 → **56,5 → 56,75/70**.

## 2026-11-20 — Séance 16 : manettes VR
- `ctrl` = 8 pièces par main (poignée, tête, anneau, stick + capuchon, 2 boutons, gâchette), matrices locales multipliées par la pose `gripSpace` ; légère émission pour rester lisibles la nuit. Design générique (pas de copie de marque).
- Mock XR : `__ctlPos` / `__ctlYaw` pour placer la manette devant les yeux.
- Scores : VR 7,5 → 8 → **56,75 → 57,25/70**.

## 2026-11-20 — Séance 17 : vidéo v4
- Même parcours, titres recalés, toutes les améliorations des séances 10 à 16. Rendu en 6 lots reprenables (~50 min, la machine a redémarré pendant le dernier lot sans perte grâce aux images sur disque).
- `video/visite.mp4` = v4 ; la v3 est gardée (`video/visite_v3.mp4`) pour comparer sur la page Évolution.
- Scores : vidéo 7 → 7,5 → **57,25 → 57,75/70**.

## 2026-11-20 — Séance 18 : fiches produit dans le plan 3D
- `source/catalog.js` : 50 boîtes cliquables (cm) → ids de la liste ; `source/items.js` généré par `tools/build.py` depuis `liste_achat.html` (une seule source pour les prix ; le build signale les ids inconnus).
- `app_gl.js` : tap court (< 9 px, < 450 ms) → rayon caméra, intersection des boîtes, la plus proche (et la plus petite si deux boîtes se touchent à 5 cm près). Cadre vert (12 arêtes + remplissage additif) + fiche (magasin, nom, modèle, prix × qté, « prix vérifié », note, lien produit ou recherche magasin, « Aussi ici »).
- Non cliquables : pochettes, supports vinyles, « Now Playing » (emplacement à décider), étagères flottantes Action, chevilles.
- Publication du plan 3D : ajouter `items.js` et `catalog.js` aux fichiers de l'artifact.
- Scores : cohérence 7,5 → 8, plan 3D 7,5 → 8 → **57,75 → 58,75/70**.

## 2026-11-20 — Séance 19 : prix des périphériques et des coussins
- `periph` : proposition Corsair K70 Core TKL 92,95 € (LDLC) + Logitech G305 39,99 € (logitech.fr, promo ; 66,95 € LDLC) + The G-Lab Pad Selenium 90x40 14,90 € (Grosbill) = 147,84 € (au lieu de 200 € estimés). **À valider par Enzo.**
- `coussins2` : PROFETBLOMMA ikea.fr 4,49 € (3,99 € sur la fiche, 4,49 € sur la liste des coussins ; on garde le plus haut). Lien ikea.fr.
- Reste estimé : spots plantes (25 €).
- Total : 7 388,50 → **7 325,34 €**. Scores : liste 8 → 8,5 → **58,75 → 59,25/70**.

## 2026-11-20 — Séance 20 : fiches produit en VR
- `vr.html` charge `items.js` + `catalog.js` (inlinés par build.py). Poignée (buttons[1]) d'une manette, menu fermé : rayon → `pickCat` (même règle que le plan 3D : la plus proche, la plus petite à 5 cm près) → 12 arêtes vertes + panneau 56×23 cm (canvas 1024×420) à ≤ 70 cm devant la tête, tourné vers elle ; disparaît 5 s après.
- Sous-titre du menu et aide de la page mis à jour. Mock : `__gp.buttons[1]` + `__ctlPitch`.
- VR : 0 erreur. Scores : VR 8 → 8,5 → **59,25 → 59,75/70**.

## 2026-11-20 — Séance 21 : vidéo verticale + matelas 140x190
- Vidéo verticale 720×1280 (2 055 images, rendu reprenable `framesV/`, x264 veryfast CRF 23, faststart) → `video/visite_vertical.mp4` (17,5 Mo) + affiche. Page Évolution : champ `vertical` et `videoCap`.
- MALM haut 140x190 revérifié sur ikea.fr : 199 × 156 cm, tête 100 cm (= modèle 3D). VALEVÅG ferme 140x190 existe : 249 € (promo depuis le 9/11, 279 € avant). Question à Enzo retirée.
- Total : 7 325,34 → **7 295,34 €**. Scores : cohérence 8 → 8,25, liste 8,5 → 8,75, vidéo 7,5 → 8 → **59,75 → 60,5/70**.

## 2026-11-20 — Séance 22 : mode Mesures du plan 3D
- `source/mesures.js` : 15 cotes `[x1,y1,z1,x2,y2,z2,nom]` (longueur calculée, « Passage » en blanc). `app_gl.js` : barres + talons 3D (MeshBasic, sans ombre), étiquettes HTML projetées à chaque image, cachées sous la barre de boutons et bornées à l'écran ; le bouton vole vers la vue de dessus.
- Passages vérifiés : lit ↔ commode 121 cm, bureau ↔ lit 91 cm, portant ↔ lit 133 cm (≥ 80 cm partout).
- Scores : cohérence 8,25 → 8,5, plan 3D 8 → 8,5 → **60,5 → 61,25/70**.

## 2026-11-20 — Séance 23 : mesures en VR
- Menu VR agrandi (canvas 1024×900, MH 56,25) avec « Afficher les mesures ». Barres (MeshBasic) + étiquettes canvas 512×128 (plan 32×8 cm) tournées vers la tête à chaque image, agrandies au-delà de 1,1 m (`k = dist/110`). 30 objets dynamiques de plus seulement quand c'est affiché.
- VR : 0 erreur. Scores : VR 8,5 → 8,75 → **61,25 → 61,5/70**.

## 2026-11-20 — Séance 24 : derniers prix estimés
- Suspension GULLSUDARE/HAVSDJUP 45 cm : 8,49 € (ikea.fr ; 70 cm à 11,99 €) au lieu de 30 € estimés. Spots plantes : lot de 2 spots de sol 3 W, télécommande, 32,59 € (Leroy Merlin, vendeur partenaire).
- Restent non confirmés cette semaine : carte mère + AIO (B850 Gaming Plus WiFi vue à 209,99 € chez TopAchat), barre de son Ultimea Apollo S40 (89,99 € en promo Cdiscount en juin, 129,99 € prix public).
- Total : 7 295,34 → **7 281,42 €**. Scores : liste 8,75 → 9 → **61,5 → 61,75/70**.

## 2026-11-20 — Séance 25 : prix de la carte mère
- `cm` comptait 309,90 € (= prix carte + AIO), alors que l'AIO MSI MAG Coreliquid A13 360 est offert avec VIVACOOLING : la carte seule est à 219,95 € chez Materiel.net (offre jusqu'au 30/11/2026). Lien produit ajouté.
- Total : 7 281,42 → **7 191,47 €**. Scores : liste 9 → 9,25 → **61,75 → 62/70**.

## 2026-11-21 — Séance 26 : Echo Show 5 et compatibilité Alexa (demande d'Enzo)
- Enzo choisit l'Echo Show 5 (3e gén.) pour piloter l'éclairage. Ajouté en 3D sur la table de chevet (écran 22:30 + boutons d'ambiance inventés) et dans la liste (109,99 €, souvent 59,99–74,99 € en promo).
- Vérification de chaque lumière : Tapo L920-5, L530E, L900-5, P100 = compatibles Alexa (FAQ TP-Link). Rubans Action et Paulmann = télécommande seule → remplacés par 2 × Tapo L900-5 (16,99 €). FADO ×2, FORSÅ, spots plantes, ruban bureau → prises Tapo P100 (pack de 4 à 34,99 € + 1 à 12,90 €). Ruban TV USB : s'allume avec la TV. Bougies LED : à la main.
- Erreur corrigée : FORSÅ = culot E14 → SOLHETTA E14 ; SOLHETTA E27 ramenées à 1 lot (2 FADO, culot E27 confirmé).
- Lampadaire OMBRAGE : E27 confirmé mais « épuisé » (109,99 €) → à remplacer (décision Enzo).
- Total 7 191,47 € → 7 328,49 €. VR : 0 erreur, 384 lots, ~161 k triangles.
- Scores : cohérence 8,5 → 8,75, liste 9,25 → 9,5 → **62 → 62,5/70**.

## 2026-11-21 — Séance 27 : ambiance « Ciné immersif » (demande d'Enzo, aperçu)
- Enzo veut l'Ambilight sur tout l'éclairage. Tapo ne synchronise pas l'écran → proposition Govee (caméra Envisual T2 car les applis de la TV Google TV ne passent pas par une box HDMI ; rubans RGBIC ; ampoules E27 ; DreamView). **Panier inchangé à sa demande** : il veut d'abord voir le rendu.
- `ambi.js` : si `ambiRoom` > 0, les zones de l'image pilotent les lumières (gauche → sneakers, droite → lampadaire, haut → suspension, bas+droite → ruban sous le lit, moyenne → tête de lit) avec un lissage (k = 1 − e^(−5·dt)) ; halos et ampoules suivent aussi.
- Nouvelle ambiance `cine2` dans le plan 3D (bouton) et la VR (menu réorganisé : 8 ambiances).
- `preview.py` : 5e élément facultatif = code JS (ex. `window.__ambiFix=10` pour figer l'image du film).
- VR : 0 erreur, 384 lots, ~161 k triangles. Scores : éclairage 9,5 → 9,75 → **62,5 → 62,75/70**.

- Mise à jour 03:40 : Enzo abandonne l'idée (« on oublie »). Ambiance `cine2` retirée du plan 3D et de la VR (code ramené à f2168c1), score ramené à **62,5/70**. Panier toujours inchangé. L'outil `preview.py` (5e élément JS) est gardé.

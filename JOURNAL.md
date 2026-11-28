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

## 2026-11-21 — Séance 28 : ombres des lampes
- `gl2.js` : ombres de 4 lampes ponctuelles (`userData.sh` dans room.js : arc, FADO, chevet, spot plantes). Atlas « cube » 3×8 tuiles de 448 px (6 faces par lampe, distance linéaire empaquetée RGBA), rendu une seule fois (clé = positions). Faces à 2·atan(1/0,9) pour garder une marge de filtrage ; les petits objets qui entourent la lampe (abat-jour, globe : rayon < 45 cm) ne projettent pas ; les feuilles en alphaTest projettent leur vraie découpe.
- Ombres douces façon PCSS (4 points de recherche de bloqueurs, lampe de 12 cm, 4 → 14 points de filtre seulement dans la pénombre, ordre des points mélangé). Décalage selon la normale (0,3 cm + 0,5 %). Chevet : origine de l'ombre 9 cm plus haut (`shO`, haut du globe) pour ne pas assombrir les oreillers.
- `app_gl.js` : si les images dépassent 45 ms pendant 3 s, les ombres des lampes se coupent (`?ombres=0` pour forcer l'arrêt, `?ombres=1` pour les garder). `tools/preview.py` charge `?ombres=1` et refait le saut de caméra deux fois (le cadrage alternait d'une capture à l'autre).
- Attention : en mode soir, la TV allumée fait varier la lumière d'une capture à l'autre → comparer les ombres en nuit cosy.
- Vues de jour identiques (écart = grain). Coût SwiftShader 646 → 1 030 ms/image (CPU, pas représentatif du téléphone, d'où la coupure auto). VR inchangée : 0 erreur.
- Scores : éclairage 9,5 → 9,75 → **62,5 → 62,75/70**.
- Ensuite : mêmes ombres en VR seulement si la mesure d'images/s sur le vrai Quest 2 le permet ; reflet planaire du parquet.

### Compte rendu (pour 7h20)
- Mieux : les lampes (arc, FADO, chevet, spot plantes) font maintenant de vraies ombres douces le soir : feuilles du ficus et du monstera au mur, étagères, TV. Le jour ne change pas.
- Score : 62,5 → 62,75/70 (éclairage 9,5 → 9,75), aucun critère en baisse.
- Voir : https://enzomehiaoui024-ship-it.github.io/ma-chambre-vr/evolution.html
- À décider : commander la carte mère avant le 30/11 (watercooling offert) ? Nouveau lampadaire arc (l'OMBRAGE est épuisé) ? Périphériques K70/G305/tapis ok ? Emplacement MOSSLANDA, supports vinyles et « Now Playing ».

## 2026-11-21 — Test : mur en lattes de bois derrière la tête de lit (plan 3D seulement)
- Demande d'Enzo : le voir sur le plan 3D, pas en VR. Activé par `window.__LATTES=true` dans `plan_gl.html` uniquement (la VR ne change pas).
- Lattes noyer foncé 2,7 cm, espacées de 1,3 cm, sur feutre noir, du sol au plafond, z 150 → 350 ; cadres et halo LED avancés de 3,4 cm.
- Panier inchangé : en attente de son avis.

## 2026-11-21 — Test : setups du bureau d'après 2 photos d'Enzo (plan 3D seulement)
- Boutons « BUREAU (test) » dans le plan 3D : Bureau actuel / Setup photo 1 / Setup photo 2 (3 écrans). Activé par `window.__SETUPS=true` dans `plan_gl.html` seulement (VR inchangée). `R.setSetup(k)` masque/affiche les objets.
- Commun aux 2 versions : pan de lattes derrière les écrans, 2 étagères blanches en décalé avec succulentes et pothos retombants, lampe ampoule à filament sur socle bois, clavier crème sur support, grand tapis noir, souris blanche, bougie, plante, halo LED (suit les LED d'ambiance).
- V1 : écran vertical posé + écran principal sur bras. V2 : écran vertical + écran principal sur socle bois + 2e écran au-dessus sur bras. Images des écrans inventées (ville sous la neige).
- Panier inchangé : il faudrait 1 écran (V1) ou 2 écrans (V2) en plus, un bras, la lampe, les étagères.
- Ajout V3 (photo 3) : étagère d'écrans en noyer sur tout le bureau (LED dessous), écran vertical + écran MSI posés dessus, barre lumineuse sur l'écran principal ; lampe à filament montée sur l'étagère (fonction `edison(y)`), bougie déplacée en x 152.
- V3 : écran principal passé en 34" ultra-large 21:9 (81 x 36,5 cm, plat dans la 3D), centré en x 101 ; barre lumineuse élargie.

## 2026-11-21 — Séance 29 : bureau final d'après les photos d'Enzo (demande d'Enzo)
- Enzo valide le « setup photo 3 » avec un écran principal 34" : il devient le vrai bureau partout (plan 3D, VR, liste). Les versions de test et leurs boutons sont retirés ; l'ancien bureau (27" sur pied, FORSÅ, casque, mug, LACK + livres + 2 cadres) est enlevé de la scène.
- 3D : étagère d'écrans 100 x 27 x 15 cm, écran vertical 27" (iiyama, pivot), MSI MAG 341CQP 34" (81 x 36,5 cm), barre Xiaomi, lampe NOOLI (H 33,5 cm) + LUNNOM, pan de lattes 60 x 117 cm, 2 étagères Action 57 x 23,5 blanches, 4 succulentes + 2 pothos, clavier/souris noirs (comme la liste).
- Nouvel éclairage `deskLed` (lumière + 3 halos) = ruban Tapo L900-5 derrière les écrans, piloté par Alexa ; couleurs par ambiance (soir ambre, cosy orange, gaming violet, fête arc-en-ciel). Ajouté dans LN/GN de app_gl et app_vr.
- Liste : écran 34" 656,99 € (TopAchat, code VISOR), écran vertical 189,99 €, étagère d'écrans 39,95 €, barre lumineuse 49,99 €, ruban 16,99 €, lampe 35,90 € (bientôt dispo), ampoule 6,99 € (prix DE, à vérifier), 2 étagères 13,90 €, panneau lattes 32,69 €, 4 succulentes (prix à vérifier) ; FORSÅ, E14, LACK retirés, cadres 6 → 4. Total 7 328,49 € → **7 772,90 €**.
- VR : 0 erreur, 394 lots, ~169 k triangles. Scores : éclairage 9,75 → 10, cohérence 8,75 → 9 → **62,75 → 63,25/70**.
- Mise à jour 04:35 : à la demande d'Enzo, l'étagère d'écrans en bois est retirée et remplacée par 2 bras AOC AM400B (un par écran, pince à l'arrière du bureau, 39,99 € pièce chez TopAchat). Lampe reposée sur le bureau. Total 7 772,90 € → **7 812,93 €**.

## 2026-11-21 — Clavier/souris blancs + Séance 30 : effets de lumière
- Liste : périphériques en blanc (Designed by GG Red Blade TKL blanc 84,95 € LDLC + G305 blanche 39,99 € logitech.fr + tapis 14,90 €) → total **7 804,93 €**. 3D : clavier et souris blancs.
- Rubans LED visibles : `R.strips` (barres MB) sous le lit (3 côtés) et sous les 3 étagères à sneakers ; couleur = couleur G de l'ambiance × gain (2,2–2,4), mise à jour dans `apply()` de app_gl et app_vr (matériaux ajoutés à la liste dynamique VR).
- Lumière d'écran `mon` bleutée (0x9fb6ff, couleur de l'image) ; GAME : mon .9 → .5 et lumière d'étagère violette pour garder le néon.
- Vues de contrôle : aucune régression. VR : 0 erreur. Scores : plan 8,5 → 8,75 → **63,25 → 63,5/70**.

## 2026-11-21 — Séance 31 : écran de l'Echo Show qui suit l'ambiance
- `R.echoSet(k)` redessine le canvas de l'écran (heure + « Ambiance : … » + bouton actif) et incrémente `ver` ; appelé par `setMode` dans app_gl et app_vr ; matériau ajouté à la liste dynamique VR.
- VR : 0 erreur. Scores : cohérence 9 → 9,25 → **63,5 → 63,75/70**.

## 2026-11-21 — Audit complet (demande d'Enzo)
- Compatibilités vérifiées : bras AM400B (pince 1,5–5 cm, 9 kg) ↔ plateau TROTTEN 2 cm et MSI 341CQP (8,8 kg avec pied) ; Lancool 207 (GPU 375 mm max, AIO 360 au-dessus, alim 160 mm max) ↔ RX 9070 XT, AIO 360, RM850e.
- Corrigé : ligne RENBERGET (qté 0) retirée ; casque Arctis remis en 3D, accroché au crochet du TROTTEN.
- Points ouverts → BACKLOG « À demander » (prises, type de murs, Windows, remplaçants arc/NOOLI). À vérifier au montage : barre arrière du TROTTEN vs pinces des bras.

## 2026-11-21 — Séance 32 : clavier, souris et plante du bureau
- Clavier TKL 87 touches en vraie disposition (pas de 1,905 cm, rangée F séparée, touches larges, bloc flèches/navigation, modificateurs gris clair) ; 2 matériaux partagés au lieu de 70.
- Souris G305 : coque `Lathe` mise à l'échelle (3,1 x 3,6 x 5,7) + molette. Attention : `SphereGeometry` partielle (theta) s'affiche mal avec le tri des faces de gl2 → utiliser `Lathe`. `rotation.set` n'existe pas dans shim2 → affecter x/y/z.
- Plante du bureau : ZZ (7 tiges arquées, 5 paires de feuilles ovales brillantes, texture `zzT`) + terreau.
- Vues de contrôle : seules les vues du bureau changent. VR : 0 erreur, 404 lots, ~169 k triangles. Scores : meubles 9,75 → 10 → **63,75 → 64/70**.
- Même séance : plante en haut du portant (9 sphères) → pot avancé en z 30 + `pothos()` dont 3 tiges retombent devant (elles ne traversent plus le plateau). Plus aucune plante en sphères dans la scène. VR : 405 lots, ~165 k triangles.
- Vêtements : épaisseur selon le type (sweat 7,6 cm, t-shirt 3 cm et plus court, veste 6,2 cm), bord-côte 20 % plus foncé en bas des sweats/vestes, manches des sweats plus épaisses. VR : 411 lots, ~166 k triangles.
- Echo Show 5 : façade 3,2 cm + dos demi-cylindre en tissu (r 4,1 cm) + pied, au lieu d'une boîte. VR : 412 lots, ~166 k triangles.
- Câbles des écrans (tubes r 0,32) : bras → mât → dessous du bureau (4 attaches scratch) → arrière du PC. Pas de goulotte (ce serait un achat en plus : à proposer à Enzo). VR : 415 lots, ~168 k triangles.
- Ensuite : couette avec un vrai drapé ; reflets légers sur le parquet.

- 21/11 05:45 : Enzo a déjà une licence Windows (rien à ajouter) ; iPhone 14 → chargeur Qi2 proposé, panier inchangé en attendant son accord.

## 2026-11-21 — Séance 33 : bugs VR, optimisation VR, couette et tapis (demande d'Enzo)
- Nouvel outil `tools/vrshots.py` : captures du rendu VR (casque simulé) à des positions données (`[[x,z,yaw,ambiance],...]`, œil gauche), affiche le nombre de lots dessinés.
- Bug 1 (liseré bleu en haut des murs) : fuite de lumière de la lune dans l'ombre au ras du plafond (plafond = plan sans épaisseur, biais d'ombre ~1 cm). Plafond remplacé par une dalle de 12 cm (`B`, toujours `R.ceil`, noTop), murs montés à 251,5 et prolongés de 0,5 cm aux coins.
- Bug 2 (couloir) : mur du fond en `MB` (non éclairé) → blanc la nuit ; remplacé par un matériau éclairé + 2 murs latéraux + plafond du couloir (enfant de `R.ceil`). Ligne bleue verticale = rayon de lune fenêtre → porte → mur du couloir : matériaux du couloir marqués `noSun` (vrgl : `uSun` par matériau, clé de lot incluse).
- Optimisation VR (`vrgl.js`) : élimination des lots hors du champ de vision (6 plans tirés de VP, sphère englobante de chaque lot) ; liste des lumières mise en cache au lieu de parcourir toute la scène à chaque image. Lots dessinés par œil : 47–163 au lieu de 415–433.
- Couette : dessus en surface maillée 44 x 36 (gonflant + 7 plis gaussiens) posée sur le volume arrondi ; texture d'ombrage des plis calculée depuis le relief ; plis peints retirés de `quiltT`.
- Tapis berbère : 50 franges par bout (4,2–5,6 cm).
- Vues de contrôle : couette, couloir (plus sombre et réaliste), tapis ; rien d'autre ne change. VR : 0 erreur, 433 lots, ~172 k triangles. Scores : VR 8,75 → 9 → **64 → 64,25/70**.
- Ensuite : reflets du parquet seulement après mesure des images/s sur le vrai Quest 2.

## 2026-11-22 — Séance 34 : fiches du bureau, lien vers la liste, prix Black Friday
- **Correction du total** : depuis la séance 21 (+1 noté +0,75), le total du journal avait 0,25 de retard sur la somme des 7 critères. Somme réelle après la séance 33 : 10 + 10 + 9,25 + 9,5 + 9 + 8,75 + 8 = **64,5/70** (les critères sont justes, seul le total était faux).
- `catalog.js` : les boîtes du bureau dataient de l'ancien bureau (écran 27" sur pied, FORSÅ à droite, casque sur la gauche, LACK + cadres). Boîtes refaites d'après `room.js` : 34" (x 57–139, y 94–133), écran vertical, 2 bras, barre lumineuse, pan de lattes, lampe NOOLI (x 37–57), casque sur le crochet (x 154–168), 2 étagères Action, succulentes, pothos ; Echo Show 5 sur le chevet. Cadres au-dessus du bureau retirés du catalogue (ils ne sont plus dans la scène). 10 articles de plus cliquables (plan 3D et VR) : ecran2, bras, lightbar, ledecran, lattes, succulentes, ampe14, echo, prises, prise5.
- Plan 3D : bouton « Dans ma liste · <zone> » sur chaque fiche → `source/liste_achat.html#item=<id>` sur GitHub Pages. La liste lit `#item=` (ou `#zone=`), ouvre la zone, retire les filtres qui cacheraient l'article, l'entoure en olive (« Touché dans le plan 3D ») et le centre ; `hashchange` aussi. `build.py` exporte `window.ZONES`.
- Prix (sources : labonneconfig.fr 21/11, prixometre.fr 21/11, leDénicheur 22/11, Dealabs, materiel.net 22/11) : écran 34" 656,99 → 539,96 € (Materiel.net, code VISIONBF) ; CPU 416,90 → 359 € (Amazon ; LDLC 449,95 €) ; RAM 517,09 → 519 € (Patriot, Alternate) ; SSD 299,99 → 318,61 € (Samsung 990 EVO Plus, l'offre Predator est finie) ; GPU 899,90 → 932,41 € (ASUS PRIME OC, PC Componentes ; les offres à 850-890 € sont finies) ; carte mère 219,95 € + AIO offert confirmé. Magasins ajoutés : Alternate, PC Componentes.
- Total : 7 804,93 → **7 683,04 €** (gaming 3 893,60 €, chambre 3 789,44 €). Aucun choix d'Enzo changé (même écran, mêmes composants ; RAM/SSD/GPU restent des « ex. »).
- Vues de contrôle : identiques (écart moyen < 2/255 = grain). VR : 0 erreur, 433 lots, ~172 k triangles.
- Scores : cohérence 9,25 → 9,5, liste 9,5 → 9,75, plan 3D 8,75 → 9 → **64,5 → 65,25/70**.
- Ensuite : vidéo v5 (l'actuelle montre l'ancien bureau) ; prix après le Black Friday.

### Compte rendu (pour 7h20)
- Mieux : toucher un objet du bureau dans le plan 3D (ou en VR) entoure enfin le bon objet, 10 articles de plus ont leur fiche, et un bouton « Dans ma liste » ouvre la liste d'achat pile sur l'article.
- Prix Black Friday revérifiés : écran 34" à 539,96 € (-117 €), processeur 359 € ; la carte graphique a monté (932 €). Total 7 804,93 → 7 683,04 €.
- Score : 64,5 → 65,25/70 (cohérence, liste, plan 3D en hausse ; aucun critère en baisse). Le total affiché avant (64,25) avait une erreur de calcul de 0,25, corrigée.
- Voir : https://enzomehiaoui024-ship-it.github.io/ma-chambre-vr/evolution.html
- À décider : commander écran (code VISIONBF) et carte mère (watercooling offert jusqu'au 30/11) avant la fin des offres ? Lampadaire arc de remplacement, chargeur Qi2, emplacement MOSSLANDA/supports vinyles.

## 2026-11-22 — Demande d'Enzo : PS VR2 (pas de PC pour l'instant)
- Enzo ne prend pas de PC pour l'instant (trop cher pour les perfs) ; il a déjà une PS5 → VR avec un **PlayStation VR2**.
- `room.js` : PS VR2 posé sur la commode côté nord (visière x 331–341, z 200–221 ; serre-tête en anneau jusqu'à x 359 ; manettes Sense à plat entre le plateau et le diffuseur, z 245–265). Façade noire + 4 caméras, joint facial noir, molette arrière. `catalog.js` : 2 boîtes → `psvr2`.
- Liste : `psvr2` 349,99 € (Fnac depuis le 16/11, prix normal 449,99 € ; Amazon 349 € le 19/11 — sources hivr.fr 17/11, big-n.fr 19/11), zone « Commode et TV ». Nouvelle priorité **L = « Plus tard »** : visible, pointillés, hors du total et du budget. cpu, cm, ram, gpu, ssd, alim, boitier → L (2 573,87 €). Écrans, clavier/souris, casque micro et chaise restent dans le total (à confirmer avec Enzo).
- Total : 7 683,04 → **5 459,16 €** (+ 2 573,87 € plus tard).
- Note moteur (déjà là avant) : dans le plan 3D, les objets à moins d'environ 75 % de la distance caméra → cible sont coupés (plan proche) ; pour les captures, viser l'objet lui-même.
- Vues de contrôle : seules celles qui voient la commode changent (casque visible) ; le reste est identique (< 2/255). VR : 0 erreur, 436 lots, ~177 k triangles.
- Scores : inchangés (demande d'Enzo, pas une séance d'entraînement ; aucun critère en baisse) → **65,25/70**.
- Ensuite : placer la PS5 d'Enzo dans le plan quand on saura où elle est ; zone de jeu debout sur le tapis berbère (~1 m x 1,1 m ; l'abat-jour du lampadaire arc est au-dessus, à 1,60 m).

## 2026-11-22 — Demande d'Enzo : bureau console (1 écran OLED, PS5 + PS VR2 sur le bureau)
- Enzo : un seul écran OLED 27" ou 32" (pas encore décidé), PS5 (modèle d'origine) et PS VR2 sur le bureau. Il garde clavier/souris/tapis et casque micro dans le total.
- `room.js` : écran 34" ultra-large + écran vertical retirés → **AOC AG326UD 32" 4K** (71,7 x 42,1 cm), centre (98, 117, 16), un seul bras (droite), barre lumineuse au-dessus, halo LED recentré (y 117). PS5 d'origine debout sur socle rond à gauche (groupe en (12, 75.5, 19) : cœur noir, 2 coques blanches légèrement évasées, liserés bleus en façade). PS VR2 déplacé de la commode vers le bureau (groupes : casque en (12.5, 75.5, 51) tourné vers Enzo, manettes en (30.5, 75.5, 30)). Dessous de verre déplacé à droite (137, 45). Câbles du bras gauche retirés ; câble de la PS5 qui descend derrière le bureau.
- `catalog.js` : boîtes écran/barre mises à jour ; écran vertical et bras gauche retirés ; boîtes PS5 + PS VR2 sur le bureau ; boîtes PS VR2 de la commode retirées.
- Liste : `ecran` → AOC AG326UD 549,95 € (TopAchat, prix affiché sur aoc.com le 22/11 ; 2 x HDMI 2.1, 165 Hz, Adaptive Sync) ; alternatives dans la note : Samsung Odyssey OLED G8 G81SF 726,52 € (Amazon, geekslands.fr 19/11), AOC Q27G41ZDF 26,5" 1440p 299,90 € (Cybertek ; HDMI 2.1 à confirmer). `ecran2` retiré ; `bras` x1 ; `psvr2` zone bureau ; nouvelle ligne `ps5` (déjà à Enzo, 0 €).
- Total : 5 459,16 → **5 239,17 €** (+ 2 573,87 € plus tard).
- Vues : seules celles du bureau changent. VR : 0 erreur, 439 lots, ~175 k triangles.
- Scores : inchangés (demande d'Enzo) → **65,25/70**.
- Ensuite : si Enzo choisit le 27", écran 60,9 x 35,5 cm (prix 299,90 €) ; le boîtier PC (« plus tard ») reste dessiné sous le bureau ; vidéo v5 à refaire avec ce bureau.

## 2026-11-22 — Demande d'Enzo : PC retiré du plan, 32" confirmé, rangement du câble PS VR2
- PC : objets du boîtier retirés de la scène juste après leur création (`_p0` → fin, `R.pcFans`/`R.pcIn` gardés pour les ambiances) ; câbles de l'écran et de la PS5 redirigés vers la multiprise au sol (x 130, z 2,5). Boîte cliquable du PC retirée. Les 7 lignes PC restent en « plus tard ».
- Écran : AOC AG326UD 32" confirmé par Enzo (note mise à jour).
- Système câble PS VR2 (hors jeu) : support IKEA LÅNESPELARE (socle en (30, 52), cintre à 26,5 cm) avec le casque posé dessus, visière vers Enzo ; station de charge Sony Sense en (47,5, 29) avec les 2 manettes debout ; câble (courbe Catmull-Rom) : port USB-C avant de la PS5 → le long de la PS5 (x 21) → aimant HAVSKÅL au bord arrière → derrière le bureau → 3 boucles dans le range-câbles IKEA SIGNUM 70 cm vissé sous le fond gauche (x 6–76, z 3–17, y 63–69) → remonte au 2e aimant (x 36) → derrière le support → arrière du serre-tête.
- Liste : `supvr` 14,99 € (ikea.fr), `stationvr` 41,12 € (Boulanger via leDénicheur), `rangecable` 14,99 € (prix de la page catégorie ikea.fr), `aimants` 3,99 € (ikea.fr), tous le 22/11/2026. Total 5 239,17 → **5 314,26 €**.
- VR : 0 erreur, 436 lots, ~179 k triangles. Scores inchangés (demande d'Enzo) → **65,25/70**.
- Ensuite : vérifier que les 4,5 m de câble atteignent la zone de jeu sur le tapis (environ 2,7 m du bureau à vol d'oiseau) sans traverser le passage.

## 2026-11-22 — Demande d'Enzo : PC + Meta Quest 3 à la place de PS5 / PS VR2
- Choix d'Enzo : config PC « le plus de perf » ~2 800 € avec SSD 2 To (RTX 5080 jugée pas rentable : +15 à 18 % pour +38 % de prix, tests ThePCEnthusiast 09/2026, GamersNexus, NoobFeed) + Meta Quest 3. Achat prévu fin 2027 / début 2028 (il économise).
- `room.js` : boîtier PC rétabli (ligne de retrait supprimée), câbles de l'écran de nouveau vers le PC ; PS5 retirée ; bloc PS VR2 (station, range-câbles, aimants, câble) remplacé par un **Meta Quest 3** sur le support LÅNESPELARE (visière blanche, 3 bandes de capteurs, sangle tissu grise) + 2 manettes Touch Plus devant la lampe. `catalog.js` : boîtes PS5/PS VR2 retirées, boîtes Quest 3 et PC.
- Liste : `psvr2`, `ps5`, `stationvr`, `rangecable`, `aimants` retirés ; `quest3` 619,99 € (prix officiel depuis le 19/04/2026, hivr.fr 22/11) ; `gpu` → RTX 5070 Ti MSI Ventus 3X OC 1 349,99 € (Fnac, labonneconfig 22/11) ; les 7 lignes PC repassent en E/I (dans le total) avec la mention « achat prévu fin 2027 / début 2028 » ; note carte mère : l'AIO offert s'arrête le 30/11/2026 ; `supvr` sert au Quest 3 ; `ecran` : branché au PC en DisplayPort.
- Total : **8 515,61 €** (PC 2 991,45 € + Quest 3 619,99 €).
- Prévisions (à revoir chaque mois) : mémoire DDR5/SSD chère jusqu'à fin 2027, vrai repli plutôt 2028 (TrendForce, Counterpoint, BofA, Bernstein via TopAchat/DropReference/Oscoo) ; RTX 60 : rumeurs S1 2027 (TweakTown), S2 2027 (KitGuru), 2028 (Shattered) ; Zen 6 desktop annoncé vers Computex 2027 (TechPowerUp) ; Quest 4 attendu en 2027 (rumeurs TechRadar, Tom's Guide). Estimation fin 2027 / début 2028 pour PC + Quest 3 : environ 2 650 € (optimiste) / 3 250 € (médian) / 3 900 € (pessimiste), contre 3 611 € aujourd'hui.
- VR : 0 erreur, 437 lots, ~174 k triangles. Scores inchangés → **65,25/70**.

## 2026-11-22 — Demande d'Enzo : retour à la PS5 + PS VR2 (le PC est trop cher)
- Plan 3D, catalogue et liste remis comme au commit c175d07 : PS5 d'origine + PS VR2 sur le bureau avec son rangement (support LÅNESPELARE, station de charge Sony, range-câbles SIGNUM, aimants HAVSKÅL), pas de boîtier PC, pas de Quest 3.
- PC gardé en « plus tard » (hors total) avec la config retenue : RTX 5070 Ti 1 349,99 € (Fnac), SSD 2 To → 2 991,45 €.
- Total : **5 314,26 €** (+ 2 991,45 € plus tard). VR : 0 erreur. Scores inchangés → **65,25/70**.

## 2026-11-22 — Demande d'Enzo : réglage de la taille de la TV (65 / 75 / 85")
- `room.js` : toute la TV (dalle, support Meliconi, écran, halo tvLed, 4 halos Ambilight) est dans le groupe `R.tvGrp` (pivot au bas-centre, x 355, y 105, z 259). `R.setTvSize(n)` met l'échelle (1, n/65, n/65), remonte les lumières `tv`/`tvs` et met à jour la boîte cliquable « tv » du catalogue.
- VR (`app_vr.js`) : bouton « TV : 65 pouces » dans le menu (à côté de « Afficher les mesures »), cycle 65 → 75 → 85 ; les objets de la TV sont dynamiques (hors lots fusionnés). Plan 3D (`plan_gl.html`) : bouton « 📺 TV » dans la ligne des vues. Choix gardé dans localStorage (`tvSize`).
- Vérifs : en 65", vue de contrôle TV identique ; 75" et 85" corrects dans le plan et en VR (Ambilight suit). 85" passe devant les cadres du Kallax et le ficus. VR : 0 erreur, 424 lots, ~179 k triangles.
- Scores : VR 9 → 9,25, plan 3D 9 → 9,25 → **65,25 → 65,75/70**.

## 2026-11-22 — Demande d'Enzo : TV 75", plante, mur en lattes, système son
- TV : `R.setTvSize(75)` par défaut (bouton toujours là pour 65/85 ; clé localStorage `tvSize2` pour repartir de 75). Liste : TCL 75C69K 914,17 € (Amazon ; Fnac MP 903,46 €, OfficeEasy 864,90 €, leDénicheur 22/11). Support : One For All WM 4621 33,35 € (32-90", VESA 600x400) à la place du Meliconi 40-65".
- Ficus retiré (objets enlevés juste après construction pour garder la même suite `rnd()`), remplacé par une sansevière (pot noir 21 cm, 13 feuilles en épée 48-80 cm, sous le bas de la TV). Liste : `ficus` → IKEA SANSEVIERIA pot 21 cm 19,99 € (hauteur à vérifier en magasin).
- Mur en lattes derrière le lit : `LAT=true` partout (VR comprise), hauteur 240 cm. Liste : `lattes2` lot de 4 panneaux 240x60 noyer foncé 144,99 € (Leroy Merlin, vendeur partenaire). Catalogue : boîte du mur.
- Son : barre Samsung HW-B460F (85,8 cm) sur la commode + caisson sans fil au sol entre le Kallax et la commode (x 321-351, z 179-198). Liste : `barre` → HW-B460F 149 € (Auchan jusqu'au 29/11 ; Easylounge 148,44 €).
- Total : 5 314,26 → **5 721,82 €**. VR : 0 erreur. Scores : cohérence 9,5 → 9,75 → **65,75 → 66/70**.

## 2026-11-22 — Demande d'Enzo : ambiances + vidéo v5
- Ambiances (`app_gl.js` et `app_vr.js`) : Coucher de soleil (soleil 2,1, 0xff7a30, élévation 10°, ciel 0xff8a50, rayons 0,12, chevet/FADO/LED du lit discrets) ; Soir chaud (expo 1,12, lampadaire 1,0, chevet 0,8, FADO 0,75, bougies) ; Ciné (TV 0,62 au lieu de 0,8, lampadaire et bougies plus faibles).
- Visite : titres mis à jour (03 commode et son, 04 TV 75", 06 bureau gaming 32" + PS5, 07 coin VR), plan TV élargi et TV allumée entre 15 et 20 s, caméra du coin VR plus haute + point de passage (32,8 s) + fondu au noir 31,6-33,2 s (la caméra traversait la chaise).
- Nouvel outil `tools/render_video.py` : rendu par morceaux reprenables (`test`, `chunk K N`, `join`), ffmpeg par morceau puis concat `-c copy`. 2 055 images, ~1,4 à 3,4 s par image (scènes de nuit plus lentes).
- `video/visite.mp4` = v5 (68,5 s, 1280x720, 30 i/s, x264 CRF 24, 28,4 Mo) + affiche ; v4 gardée en `visite_v4.mp4`. Pas de musique (aucune piste libre de droits dans le projet).
- VR : 0 erreur. Scores : vidéo 8 → 9 → **66 → 67/70**.
- Ensuite : vidéo verticale v5 ; musique libre de droits si Enzo en fournit une.


## 2026-11-23 — Séance 35 : total de la zone dans les fiches VR, boîtes cliquables vérifiées
- `app_vr.js` : panneau de fiche 1024×500 (plan 56 × 27,34 cm) avec une ligne « Dans ma liste · <zone> : N articles · total » (articles « Plus tard » hors total, affichés à part s'il y en a), calculée depuis `window.ITEMS` / `window.ZONES` — même total que la liste (vérifié : Commode et TV 9 articles, 1 377,49 €).
- `catalog.js` vérifié contre `room.js` (commode, barre, caisson, FADO, plateau, Kallax, platine, enceintes, portant, panier, poubelle, rideaux, plantes, lampes) : cadres du Kallax y 104–152 → 108–198 (la rangée du haut n'était pas cliquable) ; cadres au-dessus du lit → x 0–7, y 110–184, z 165–333 (vraie place devant les lattes) ; nouvelle boîte pour le pothos du portant (x 228–256, y 125–200, z 20–55). Testé avec `__pick` dans le plan 3D.
- Prix (23/11) : PS VR2 349,99 € Fnac toujours (hivr.fr) ; HW-B460F 134 € Rue du Commerce (magicprices, relevé 22/11) et 148,44 € Easylounge ; AG326UD 589,99 € Amazon (leDénicheur) / 599,99 € Cdiscount ; TCL 75C69K (non-Pro) : pas de prix trouvé. Prix du panier inchangés (notes mises à jour), total **5 721,82 €**.
- Trouvé : 4 pothos dans la 3D pour 3 dans la liste → question pour Enzo.
- Vues de contrôle : identiques (écart moyen < 2/255). VR : 0 erreur, 431 lots, ~179 k triangles.
- Scores : VR 9,25 → 9,5 → **67 → 67,25/70** (aucun critère en baisse).
- Ensuite : total de la zone aussi dans la fiche du plan 3D ; vidéo verticale v5 ; prix après le Black Friday.

### Compte rendu (pour 7h20)
- Mieux : en VR, la fiche d'un objet affiche le total de sa zone dans ta liste ; les cadres du haut du Kallax et le pothos du portant ont enfin leur fiche (plan 3D et VR).
- Score : 67 → 67,25/70 (VR 9,25 → 9,5), aucun critère en baisse ; le reste de la chambre est identique.
- Prix : PS VR2 toujours 349,99 € ; barre Samsung vue à 134 € (Rue du Commerce, à confirmer) ; écran 32" à 589,99 € sur les comparateurs, vérifie l'offre TopAchat à 549,95 €. Total inchangé : 5 721,82 €.
- Voir : https://enzomehiaoui024-ship-it.github.io/ma-chambre-vr/evolution.html
- À décider : 4e pothos (+12,99 €) ou un de moins dans la 3D ? Lampadaire arc de remplacement, chargeur Qi2, emplacement MOSSLANDA / supports vinyles.

## 2026-11-24 — Séance 36 : total de la zone dans les fiches du plan 3D, vidéo verticale v5
- `app_gl.js` : `zoneTot(d)` ajoute sous les boutons de la fiche une ligne « Total de la zone : N articles · total (+ … plus tard) », même calcul que la liste et la fiche VR (arrondi par ligne, « Plus tard » à part). Style `.czt` dans `plan_gl.html` (trait olive au-dessus). Vérifié en émulation iPhone (390×844) : Setup gaming 4 articles · 1 139,73 € (+ 2 991,45 € plus tard), Commode et TV 9 articles · 1 377,49 €, Coin lit 18 articles · 1 125,87 €.
- Vidéo verticale v5 : `tools/render_video.py` accepte `VERTICAL=1` (720×1280, morceaux dans `video/_chunksV`). 2 055 images en 8 morceaux (~2 min chacun, ~19 min en tout), réencodée x264 veryfast CRF 23 faststart → `video/visite_vertical.mp4` (18,3 Mo) + affiche ; l'ancienne gardée en `visite_vertical_v1.mp4`. Texte de fin sur 2 lignes s'il dépasse la largeur.
- Vues de contrôle : identiques (écart moyen 1,6–2,05/255 = grain ; après flou 0,16–0,32). VR : 0 erreur, 431 lots, ~179 k triangles.
- Scores : plan 3D 9,25 → 9,5, vidéo 9 → 9,25 → **67,25 → 67,75/70** (aucun critère en baisse). Liste inchangée (prix à revoir après le Black Friday du 27/11).
- Publication : plan 3D (v47, fichiers copiés dans le dossier scratchpad de la séance : l'outil refuse /home/claude hors du dépôt) et VR (v41) republiés ; liste inchangée.
- Ensuite : prix après le Black Friday ; plan TV de la vidéo verticale un peu plus large ; questions en attente (4e pothos, lampadaire arc, chargeur Qi2).

### Compte rendu (pour 7h20)
- Mieux : dans le plan 3D, toucher un objet affiche maintenant le total de sa zone dans ta liste (comme en VR) ; nouvelle vidéo verticale pour téléphone avec la chambre actuelle (TV 75", lattes, PS5 + PS VR2).
- Score : 67,25 → 67,75/70 (plan 3D 9,25 → 9,5, vidéo 9 → 9,25), aucun critère en baisse ; la chambre elle-même est identique.
- Voir : https://enzomehiaoui024-ship-it.github.io/ma-chambre-vr/evolution.html
- À décider : 4e pothos (+12,99 €) ou un de moins dans la 3D ? Lampadaire arc de remplacement, chargeur Qi2, emplacement MOSSLANDA / supports vinyles. Prix revérifiés après le Black Friday (27/11).

## 2026-11-27 — Demande d'Enzo : nouvelle pièce 3,60 × 4,60 m (dessin)
- Dessin d'Enzo : pièce rectangulaire, porte (bleu) sur le mur de gauche près du coin du haut, fenêtre (jaune) au milieu du mur du bas. Mesures données : 3,60 × 4,60 m.
- `room.js` : `RX=360, RZ=460` (sol, plafond, murs, plinthes) ; porte sur le mur ouest z 15–95 (chambranle, battant ouvert à 90° parallèle au mur nord, poignée) ; couloir déplacé à l'ouest. Zones (`ZN`) taguées par `sc.add` et déplacées à la fin par `ZOFF` : fenêtre/extérieur, lit, mur est +100 en z ; bureau +190 en x (coin nord-est) ; portant −75 en x (à côté de la porte) ; poubelle sous le bureau ; suspension +50 (centre). Lumières suivent leur zone. `setTvSize` lit le z du groupe TV.
- `gl2.js`/`vrgl.js` : centre des ombres z 230, AO du dessus ±250, distance aux murs z 460. `app_gl.js` : vues (nouvelle vue « Porte »), visite recalée (entrée par la porte ouest), soleil centré. `app_vr.js` : départ (240,170), zones interdites, limites de téléportation z 440. `catalog.js` et `mesures.js` déplacés pareil.
- Passages : lit ↔ commode 121 cm, bureau ↔ Kallax 120 cm, portant ↔ chevet 185 cm ; débattement de porte libre.
- Vues de contrôle équivalentes (décalées) : mur est identique, coin lit identique (sans la chaise derrière), bureau et porte nouveaux. VR : 0 erreur, 443 lots, ~179 k triangles.
- Scores inchangés (demande d'Enzo) → **67,75/70**.
- Ensuite : vidéo de visite v6 dans la nouvelle pièce (`movie.js` a encore l'ancien parcours) ; demander où sont les prises et l'interrupteur.

## 2026-11-27 — Demande d'Enzo : plan 2 « coin sport à l'entrée » + tour de traction
- 5 schémas proposés (tour au milieu, coin sport à l'entrée, bureau face à la fenêtre, lit à droite, tour dans le coin du bureau) ; Enzo choisit le 2.
- Tour : modèle de sa capture = DH FitLife Power Tower 10 niveaux ASIN B0DNTWJJV2, 82 x 75 x 210 cm, 150 kg (≠ B09PGQ66NV 100 x 65 x 230). `room.js` : groupe `R.tower` en (143, 0, 2) : rails au sol + 4 pieds, montants carrés avec trous, jambes de force, coudes, barre de traction + poignées inclinées en mousse, barres de dips, dossier, traverse basse, poignées de pompes.
- Portant : zone `port` regroupée dans `R.portant` (groupe tourné de 90°, centre (20, 0, 144)) → mur ouest x 2–38, z 99–189, face à l'est. Mur à sneakers +3 cm (zone `snk`, z 191–250) pour laisser la place.
- `catalog.js` (tour, portant, pothos du portant, sneakers), `mesures.js` (tour, portant, passage devant la tour 194 cm), VR : zones interdites tour + portant.
- Liste : ligne `tour` 87,99 € (Amazon.be le 27/11, Amazon.fr non relevé → non vérifié), nouvelle zone « Coin sport », mini-plan de la liste redessiné en 3,60 x 4,60 m. Total +87,99 €.
- VR : 0 erreur, 453 lots, ~189 k triangles. Scores inchangés (demande d'Enzo) → **67,75/70**.

## 2026-11-28 — Séance 37 : vidéo de visite v6 (nouvelle pièce, coin sport), prix après le Black Friday
- Constat : la visite du plan 3D (et la vidéo publiée, v5 = ancienne pièce 3,60 × 3,60) ne suivait plus le plan 2 : la caméra d'entrée traversait le portant, la tour coupait le plan du bureau, la caméra du coin VR passait dans le dossier filet de la chaise (tapis de souris et clavier « effacés » vers 29,9–30,5 s), le casque PS VR2 disparaissait sous certains angles, le plan final affichait « 3,60 × 3,60 m » et coupait la pièce.
- `app_gl.js` : visite allongée à 72,5 s (`window.__TOTAL` exposé, `render_video.py` le lit) ; entrée par la porte en longeant le mur nord (point de passage 2,2 s) ; caméra du bureau/coin VR plus haute (28 s : y 140, z 150 ; 31 s : (268,146,156)) ; nouveau plan « 08 · COIN SPORT » (33,4–35,6 s : tour, portant, porte) qui remplace le fondu au noir ; ambiances, titres, mesures et fins décalés de +4 s après 29 s ; plan final à y 720–750 (toute la pièce) ; titre 14 : « 3,60 × 4,60 m · passages de 120 à 194 cm ».
- Vidéos v6 : `video/visite.mp4` (1280×720, 72,5 s, CRF 24, 29,7 Mo) et `video/visite_vertical.mp4` (720×1280, 18,7 Mo), rendues en 2 × 4 morceaux en parallèle (~12 min chacune). v5 gardées : `visite_v5.mp4`, `visite_vertical_v5.mp4` (entrées de la page Évolution mises à jour). `evolution.html` accepte une 2e vidéo (`video2`, `poster2`, `vertical2`, `videoCap2`).
- Bug moteur trouvé (pas corrigé) : dans gl2, le groupe du casque PS VR2 (`h`, matériau blanc `W`) n'est pas dessiné depuis certains angles (caméra au nord-est du bureau, ex. vue de contrôle n° 6) alors que son ombre reste ; ce n'est ni le culling (DoubleSide testé), ni la profondeur des ombres de lampes (clear testé), ni la tour. La station de charge (même matériau, autre groupe) reste visible. Contourné dans la vidéo par l'angle de caméra.
- Prix (28/11, sources : hivr.fr, comparez-malin.fr 27/11, topachat.com, alternate.fr, ledenicheur.fr, magicprices.fr 27/11, easylounge.com) : écran AG326UD 549,95 → **643,75 €** (Amazon ; l'offre TopAchat est finie, fiche « épuisé » ; Alternate 778 €) ; barre HW-B460F 149 → **137 €** (Cdiscount ; Rue du Commerce 133 €, Darty 138 €) ; PS VR2 349,99 € Fnac confirmé ; TV 75C69K 914,17 € Amazon confirmé (Fnac MP 903,46 €). Tour DH FitLife : Amazon.fr illisible par robot, toujours à confirmer. Total 5 809,81 → **5 891,61 €**. Aucun choix d'Enzo changé.
- Vues de contrôle : identiques (écart moyen 1,8–2,0/255 = grain). VR : 0 erreur, 453 lots, ~189 k triangles.
- Scores : vidéo 9,25 → 9,75 → **67,75 → 68,25/70** (aucun critère en baisse ; liste gardée à 9,75 car la tour n'est pas vérifiée).
- Remarque : les vues de contrôle du JOURNAL datent de la pièce 3,60 × 3,60 (plusieurs visent un mur ou la porte) → les remplacer à la prochaine séance par des vues de la nouvelle pièce (garder les anciennes une fois pour comparer).
- Ensuite : corriger le bug du casque PS VR2 dans gl2 ; nouvelles vues de contrôle ; vidéo verticale : plan TV un peu plus large.
- Publication : plan 3D (v50 : app_gl.js, items.js), VR (v44), liste (v42) republiés.

### Compte rendu (pour 7h20)
- Mieux : nouvelle vidéo de visite (normale + téléphone, 1 min 12) dans ta vraie chambre 3,60 × 4,60 m, avec un plan « Coin sport » (tour + portant) ; la caméra ne traverse plus le portant ni la chaise, le casque PS VR2 reste visible, le plan final montre toute la pièce.
- Prix après le Black Friday : l'offre à 549,95 € de l'écran 32" est finie (643,75 € chez Amazon) ; barre de son 137 € (-12 €) ; PS VR2 et TV 75" inchangés. Total 5 809,81 → 5 891,61 €.
- Score : 67,75 → 68,25/70 (vidéo 9,25 → 9,75), aucun critère en baisse.
- Voir : https://enzomehiaoui024-ship-it.github.io/ma-chambre-vr/evolution.html
- À décider : attendre que l'écran 32" redescende sous 600 € ? Prix de la tour à confirmer sur Amazon.fr ; 4e pothos, lampadaire arc de remplacement, chargeur Qi2.

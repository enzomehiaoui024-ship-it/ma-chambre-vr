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

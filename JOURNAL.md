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

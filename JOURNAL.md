# Journal des améliorations

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

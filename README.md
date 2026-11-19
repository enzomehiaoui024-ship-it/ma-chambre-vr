# Ma chambre — plan 3D, VR Quest 2 et liste d'achat

Site VR en ligne : https://enzomehiaoui024-ship-it.github.io/ma-chambre-vr/

## Le projet
Chambre de 3,60 × 3,60 m (13 m²), thème **noir & olive**, setup gaming.
- Porte : mur nord, à droite (x 265–345).
- Fenêtre : milieu du mur sud (x 120–240, y 90–210). Pas de radiateur.
- Lit MALM 140×190 brun noir dans le coin sud-ouest, à 15 cm du mur de la fenêtre (x 0–199, z 171–327).
- Bureau TROTTEN 160×80 dans le coin nord-ouest, PC sous le bureau à droite.
- Mur est : Kallax 77×77 (vinyles, platine, enceintes), commode 6 tiroirs 120×40×76, TV 65" au mur (bas de l'écran à 1,05 m).
- Portant GRÅFJÄLLET entre le bureau et la porte. Ficus dans le coin sud-est, lampadaire arc à côté.

Repère (cm) : x vers l'est (0–360), z vers le sud (0–360), y vers le haut (plafond 250).

## Fichiers (`source/`)
| Fichier | Rôle |
|---|---|
| `room.js` | **Modèle de la chambre** : tous les meubles, textures, lumières. Partagé par toutes les pages. |
| `shim2.js` | Mini moteur « type three.js » hors ligne (géométries dont RoundedBox et Lathe). |
| `gl2.js` | Moteur de rendu du plan 3D et de la vidéo (ombres, AO, bloom, ACES). |
| `vrgl.js` | Moteur allégé pour la VR (géométrie fusionnée, 8 lumières max par zone). |
| `ambi.js` | TV Ambilight (image animée + halo qui suit les bords). |
| `app_gl.js` + `plan_gl.html` | Plan 3D interactif (téléphone). |
| `app_vr.js` + `vr.html` | Site VR (WebXR, manettes, menu dans le casque). |
| `movie.js` + `index2.html` + `cap2.py` | Vidéo de visite (rendu image par image + ffmpeg). |
| `liste_achat.html` | Appli « Ma chambre cosy » : liste d'achat (lignes `["id","Nom","Modèle",qté,prix,...]`). |

## Outils (`tools/`)
- `python3 tools/build.py` : reconstruit `index.html` (site VR autonome) à partir de `source/`.
- `python3 tools/preview.py out '[["cosy",null,[250,150,90],[60,70,260]]]'` : rendus de contrôle.
- `python3 tools/test_vr.py` : teste la VR avec un casque simulé.

## Pages publiées (claude.ai, privées)
- Plan 3D : artifact `d04dff50-792e-4b46-989b-c57bf4c257d9` (index.html = plan_gl.html + shim2.js, room.js, gl2.js, ambi.js, app_gl.js)
- VR : artifact `61050b9c-0a00-450a-b708-b810528dc2c7` (index.html = bundle)
- Liste d'achat : artifact `1c516de1-9cab-47d0-b39a-d84ef1fe1eb8` (index.html = liste_achat.html)

Voir `JOURNAL.md` (historique + scores) et `BACKLOG.md` (idées d'amélioration).

## Évolution
La page `evolution.html` montre chaque séance d'entraînement (avant / après, scores). Chaque séance ajoute une entrée en tête de `evolution/sessions.js` et ses images dans `evolution/<date>/avant_<nom>.jpg` / `apres_<nom>.jpg` (900 px max, JPEG 80).

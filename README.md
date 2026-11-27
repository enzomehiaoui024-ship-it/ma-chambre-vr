# Ma chambre — plan 3D, VR Quest 2 et liste d'achat

Site VR en ligne : https://enzomehiaoui024-ship-it.github.io/ma-chambre-vr/

## Le projet
Chambre de 3,60 × 4,60 m (16,6 m², plan d'Enzo du 27/11/2026), thème **noir & olive**, setup gaming.
- Porte : mur ouest, près du coin nord (z 15–95), ouverte contre le mur nord.
- Fenêtre : milieu du mur sud (x 120–240, y 90–210, z 460). Pas de radiateur.
- Lit MALM 140×190 brun noir dans le coin sud-ouest, à 33 cm du mur de la fenêtre (x 0–199, z 271–427).
- Bureau TROTTEN 160×80 dans le coin nord-est (x 190–350, z 0–80), PS5 + PS VR2 dessus.
- Mur est : Kallax 77×77 (z 200–277), commode 6 tiroirs 120×40×76 (z 299–419), TV 75" au mur (bas de l'écran à 1,05 m, centre z 359).
- Coin sport (plan 2, 27/11) : tour de traction DH FitLife 82×75×210 contre le mur nord (x 102–184, z 2–77) ; portant GRÅFJÄLLET tourné contre le mur ouest entre la porte et les sneakers (z 99–189). Sansevière dans le coin sud-est, lampadaire arc à côté.

Repère (cm) : x vers l'est (0–360), z vers le sud (0–460), y vers le haut (plafond 250).
Dans `room.js`, chaque meuble est construit dans une zone (`ZN`) et `ZOFF` déplace chaque zone d'un bloc à la fin (lit/mur est/fenêtre +100 en z, bureau +190 en x…).

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

## Fiches produit du plan 3D
`source/catalog.js` relie des boîtes (cm) aux ids de la liste. `tools/build.py` régénère `source/items.js` depuis `liste_achat.html`. Si un meuble bouge, mets sa boîte à jour.

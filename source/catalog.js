// Zones cliquables du plan 3D : [x0,x1, y0,y1, z0,z1] en cm (repère de room.js, pièce 3,60 x 4,60 m) → articles de la liste d'achat.
// Le premier id est l'article principal, les suivants s'affichent en « aussi ici ».
// Quand un meuble bouge dans room.js, mets sa boîte à jour ici (tools/check_catalog.py vérifie les ids).
window.CATALOG = [
  // coin lit
  [[0, 199, 0, 46, 271, 427], ["lit", "boites", "led"]],
  [[0, 8, 46, 100, 271, 427], ["lit", "ledtete"]],
  [[0, 3.4, 0, 240, 250, 450], ["lattes2"]],
  [[8, 199, 46, 62, 271, 427], ["housse", "couette", "matelas", "drap", "protege"]],
  [[6, 55, 55, 92, 278, 422], ["oreillers", "coussins", "coussins2"]],
  [[155, 196, 48, 64, 273, 425], ["plaid"]],
  [[0, 7, 110, 184, 265, 433], ["cadres2", "posters"]],
  [[0, 36, 0, 59, 223, 268], ["chevet", "multi"]],
  [[4, 32, 59, 88, 231, 260], ["lchevet", "ampoules"]],
  [[7, 23, 59, 69, 254, 268], ["echo", "prises"]],
  [[58, 148, 0, 2, 210, 268], ["passage"]],
  // mur à sneakers
  [[0, 36, 0, 92, 188, 220], ["boitesneak"]],
  [[0, 26, 118, 200, 186, 247], ["sneakers", "ledsneak"]],
  // bureau gaming
  [[190, 350, 71, 75.5, 0, 80], ["bureau", "ledbureau", "cables"]],
  [[190, 197, 0, 71, 34, 46], ["bureau", "cables"]],
  [[343, 350, 0, 71, 34, 46], ["bureau", "cables"]],
  [[190, 198, 0, 4, 2, 78], ["bureau"]],
  [[342, 350, 0, 4, 2, 78], ["bureau"]],
  // bureau final (séance 29) : écrans sur bras, lattes, étagères blanches — boîtes refaites à la séance 34
  [[252, 324, 95, 139, 8, 21], ["ecran", "ledecran"]],
  [[262, 314, 137, 141, 9, 19], ["lightbar"]],
  [[194, 210, 75.5, 117, 5, 33], ["ps5", "psvr2"]],
  [[209, 231, 75.5, 107, 40, 72], ["psvr2", "supvr"]],
  [[229, 246, 75.5, 91, 24, 34], ["stationvr", "psvr2"]],
  [[196, 266, 62, 71, 2, 18], ["rangecable", "psvr2"]],
  [[208, 229, 75.5, 80, 0, 6], ["aimants", "psvr2"]],
  [[314, 322, 71, 104, 0, 9], ["bras", "cables"]],
  [[228, 288, 75, 192, 0, 3], ["lattes", "ledecran"]],
  [[230, 320, 75, 79.5, 34, 74], ["periph"]],
  [[227, 247, 75, 110, 5, 23], ["lbureau", "ampe14", "prises"]],
  [[344, 358, 46, 74, 33, 47], ["casque"]],
  [[214, 271, 189, 196, 0, 24], ["etbureau", "ledbureau", "prise5"]],
  [[282, 339, 167, 174, 0, 24], ["etbureau", "ledbureau", "prise5"]],
  [[242, 268, 196, 205, 5, 17], ["succulentes", "etbureau"]],
  [[300, 328, 174, 183, 5, 17], ["succulentes", "etbureau"]],
  [[215, 230, 160, 206, 4, 22], ["pothos", "etbureau"]],
  [[324, 342, 140, 184, 4, 24], ["pothos", "etbureau"]],
  [[242, 298, 0, 75, 76, 134], ["chaise2"]],
  [[246, 294, 75, 124, 120, 138], ["chaise2"]],
  [[196, 232, 0, 50, 40, 76], ["linge"]],
  [[318, 342, 0, 27, 33, 57], ["poubelle"]],
  // portant
  [[93, 183, 0, 176, 2, 38], ["portant", "cintres"]],
  [[153, 181, 125, 200, 20, 55], ["pothos", "pots"]],
  // coin vinyles
  [[321, 360, 0, 77, 200, 277], ["kallax", "brosse"]],
  [[323, 358, 77, 90, 220, 258], ["platine"]],
  [[328, 355, 77, 103, 201, 218], ["enceintes"]],
  [[328, 355, 77, 103, 259, 276], ["enceintes"]],
  [[356, 360, 108, 198, 202, 272], ["cadres", "posters"]],
  // commode + TV
  [[320, 360, 0, 76, 299, 419], ["commode", "organis"]],
  [[320, 331, 76, 83, 315, 403], ["barre"]],
  [[320, 353, 0, 36, 278, 299], ["barre"]],
  [[333, 359, 76, 105, 394, 420], ["champi", "ampoules"]],
  [[335, 357, 76, 80, 321, 345], ["plateau", "bougies"]],
  [[335, 357, 76, 84, 377, 393], ["livres"]],
  [[344, 354, 76, 101, 362, 374], ["diffuseur"]],
  [[350, 358, 104, 190, 286, 432], ["tv", "support", "ledtv"]],
  // centre
  [[200, 320, 0, 2, 258, 428], ["tapis"]],
  [[284, 316, 0, 12, 422, 454], ["arc", "ampcouleur"]],
  [[188, 240, 180, 210, 336, 388], ["arc", "ampcouleur"]],
  [[156, 204, 176, 228, 206, 254], ["suspension", "ampcouleur"]],
  // fenêtre
  [[60, 300, 0, 240, 440, 458], ["rideaux", "tringle"]],
  [[138, 163, 88, 114, 446, 474], ["pothos", "pots"]],
  [[322, 352, 0, 95, 424, 454], ["ficus", "spots", "pots"]],
  [[198, 254, 0, 112, 408, 460], ["monstera", "spots", "pots"]],
  // porte
  [[3, 83, 0, 205, 14, 22], ["pateres", "crochets"]]
];

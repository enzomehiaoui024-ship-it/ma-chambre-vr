// Zones cliquables du plan 3D : [x0,x1, y0,y1, z0,z1] en cm (repère de room.js) → articles de la liste d'achat.
// Le premier id est l'article principal, les suivants s'affichent en « aussi ici ».
// Quand un meuble bouge dans room.js, mets sa boîte à jour ici (tools/check_catalog.py vérifie les ids).
window.CATALOG = [
  // coin lit
  [[0, 199, 0, 46, 171, 327], ["lit", "boites", "led"]],
  [[0, 8, 46, 100, 171, 327], ["lit", "ledtete"]],
  [[8, 199, 46, 62, 171, 327], ["housse", "couette", "matelas", "drap", "protege"]],
  [[6, 55, 55, 92, 178, 322], ["oreillers", "coussins", "coussins2"]],
  [[155, 196, 48, 64, 173, 325], ["plaid"]],
  [[0, 4, 120, 210, 178, 322], ["cadres2", "posters"]],
  [[0, 36, 0, 59, 123, 168], ["chevet", "multi"]],
  [[4, 32, 59, 88, 131, 160], ["lchevet", "ampoules"]],
  [[7, 23, 59, 69, 154, 168], ["echo", "prises"]],
  [[58, 148, 0, 2, 110, 168], ["passage"]],
  // mur à sneakers
  [[0, 36, 0, 92, 88, 120], ["boitesneak"]],
  [[0, 26, 118, 200, 86, 147], ["sneakers", "ledsneak"]],
  // bureau gaming
  [[0, 160, 71, 75.5, 0, 80], ["bureau", "ledbureau", "cables"]],
  [[0, 7, 0, 71, 34, 46], ["bureau", "cables"]],
  [[153, 160, 0, 71, 34, 46], ["bureau", "cables"]],
  [[0, 8, 0, 4, 2, 78], ["bureau"]],
  [[152, 160, 0, 4, 2, 78], ["bureau"]],
  // bureau final (séance 29) : écrans sur bras, lattes, étagères blanches — boîtes refaites à la séance 34
  [[62, 134, 95, 139, 8, 21], ["ecran", "ledecran"]],
  [[72, 124, 137, 141, 9, 19], ["lightbar"]],
  [[4, 20, 75.5, 117, 5, 33], ["ps5", "psvr2"]],
  [[19, 41, 75.5, 107, 40, 72], ["psvr2", "supvr"]],
  [[39, 56, 75.5, 91, 24, 34], ["stationvr", "psvr2"]],
  [[6, 76, 62, 71, 2, 18], ["rangecable", "psvr2"]],
  [[18, 39, 75.5, 80, 0, 6], ["aimants", "psvr2"]],
  [[124, 132, 71, 104, 0, 9], ["bras", "cables"]],
  [[38, 98, 75, 192, 0, 3], ["lattes", "ledecran"]],
  [[40, 130, 75, 79.5, 34, 74], ["periph"]],
  [[37, 57, 75, 110, 5, 23], ["lbureau", "ampe14", "prises"]],
  [[154, 168, 46, 74, 33, 47], ["casque"]],
  [[24, 81, 189, 196, 0, 24], ["etbureau", "ledbureau", "prise5"]],
  [[92, 149, 167, 174, 0, 24], ["etbureau", "ledbureau", "prise5"]],
  [[52, 78, 196, 205, 5, 17], ["succulentes", "etbureau"]],
  [[110, 138, 174, 183, 5, 17], ["succulentes", "etbureau"]],
  [[25, 40, 160, 206, 4, 22], ["pothos", "etbureau"]],
  [[134, 152, 140, 184, 4, 24], ["pothos", "etbureau"]],
  [[52, 108, 0, 75, 76, 134], ["chaise2"]],
  [[56, 104, 75, 124, 120, 138], ["chaise2"]],
  [[6, 42, 0, 50, 40, 76], ["linge"]],
  [[146, 170, 0, 27, 80, 104], ["poubelle"]],
  // portant
  [[168, 258, 0, 176, 2, 38], ["portant", "cintres"]],
  // coin vinyles
  [[321, 360, 0, 77, 100, 177], ["kallax", "brosse"]],
  [[323, 358, 77, 90, 120, 158], ["platine"]],
  [[328, 355, 77, 103, 101, 118], ["enceintes"]],
  [[328, 355, 77, 103, 159, 176], ["enceintes"]],
  [[356, 360, 104, 152, 102, 172], ["cadres", "posters"]],
  // commode + TV
  [[320, 360, 0, 76, 199, 319], ["commode", "organis"]],
  [[320, 332, 76, 84, 218, 300], ["barre"]],
  [[333, 359, 76, 105, 294, 320], ["champi", "ampoules"]],
  [[335, 357, 76, 80, 221, 245], ["plateau", "bougies"]],
  [[335, 357, 76, 84, 277, 293], ["livres"]],
  [[344, 354, 76, 101, 262, 274], ["diffuseur"]],
  [[350, 358, 104, 190, 186, 332], ["tv", "support", "ledtv"]],
  // centre
  [[200, 320, 0, 2, 158, 328], ["tapis"]],
  [[284, 316, 0, 12, 322, 354], ["arc", "ampcouleur"]],
  [[188, 240, 180, 210, 236, 288], ["arc", "ampcouleur"]],
  [[156, 204, 176, 228, 156, 204], ["suspension", "ampcouleur"]],
  // fenêtre
  [[60, 300, 0, 240, 340, 358], ["rideaux", "tringle"]],
  [[138, 163, 88, 114, 346, 374], ["pothos", "pots"]],
  [[314, 358, 0, 205, 318, 360], ["ficus", "spots"]],
  [[198, 254, 0, 112, 308, 360], ["monstera", "spots", "pots"]],
  // porte
  [[338, 348, 0, 205, 2, 85], ["pateres", "crochets"]]
];

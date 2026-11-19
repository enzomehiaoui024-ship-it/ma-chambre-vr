// Une entrée par séance d'entraînement (la plus récente en premier).
// Images : evolution/<date>/avant_<nom>.jpg et apres_<nom>.jpg
window.SESSIONS = [
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

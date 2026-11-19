// Une entrée par séance d'entraînement (la plus récente en premier).
// Images : evolution/<date>/avant_<nom>.jpg et apres_<nom>.jpg
window.SESSIONS = [
  {
    date: "2026-11-19",
    titre: "Séance 4 — textures corrigées, ombres douces, tapis berbère",
    avant: 49.5, apres: 50.5,
    scores: { meubles: [8.5, 9], eclairage: [8, 8.5], coherence: [7, 7], liste: [7, 7], vr: [7, 7], plan: [7, 7], video: [5, 5] },
    changements: [
      "Bug trouvé et corrigé : sur les meubles à bords arrondis, les motifs étaient étirés. Le tapis berbère montre maintenant ses vrais losanges, le bois de la commode a un grain fin",
      "Plaid SÖRBYSKOGEN : fines lignes noires dessinées sur fond crème, comme le vrai, au lieu d'un gros trait",
      "Ombres du soleil douces : nettes au pied des meubles et floues quand l'objet est loin (comme dans la réalité)",
      "Tapis : losanges tracés à la main, un peu irréguliers"
    ],
    images: [
      ["tapis-ombres", "Tapis berbère et ombres"],
      ["lit-plaid", "Plaid au pied du lit"],
      ["nuit-cosy-plaid4", "Nuit cosy"],
      ["coucher-soleil", "Coucher de soleil"]
    ],
    ensuite: "Revérifier les prix de la liste, puis le lit (coutures, oreillers moelleux)."
  },
  {
    date: "2026-11-19",
    titre: "Séance 3 — VR : téléportation, mode assis, fluidité",
    avant: 48.5, apres: 49.5,
    scores: { meubles: [8.5, 8.5], eclairage: [8, 8], coherence: [7, 7], liste: [7, 7], vr: [6, 7], plan: [7, 7], video: [5, 5] },
    changements: [
      "Téléportation : pousse le stick droit vers l'avant, vise le sol, relâche. L'arc est vert si l'endroit est libre, rouge sur un meuble (lit, bureau, commode…)",
      "Mode assis dans le menu : la chambre se met à la bonne hauteur quand tu joues assis",
      "Compteur de fluidité (images par seconde) dans le menu, avec un point vert, jaune ou rouge",
      "Le menu est réorganisé avec un bouton de plus"
    ],
    images: [
      ["menu-vr", "Menu dans le casque"],
      ["teleportation", "Arc de téléportation (rouge : on ne se pose pas sur le lit)"]
    ],
    ensuite: "Éclairage : ombres plus douces et reflets légers sur le parquet ; revérifier les prix."
  },
  {
    date: "2026-11-19",
    titre: "Séance 2 — chaise Sihoo, pothos retombant, commode, pots",
    avant: 48, apres: 48.5,
    scores: { meubles: [8, 8.5], eclairage: [8, 8], coherence: [7, 7], liste: [7, 7], vr: [6, 6], plan: [7, 7], video: [5, 5] },
    changements: [
      "Chaise Sihoo Doro C300 refaite : dossier en filet (on voit à travers), courbe lombaire, assise avec bord arrondi, roulettes et accoudoirs 3D",
      "Pothos sur l'étagère et sur le rebord de fenêtre : feuilles en cœur panachées et tiges qui retombent",
      "Commode : fines ombres entre les tiroirs, comme une vraie commode",
      "Pots : terre visible, rebord sur le pot de la monstera, pot du ficus plus réaliste",
      "VR plus légère : ~146 k triangles au lieu de ~155 k"
    ],
    images: [
      ["chaise", "Chaise Sihoo au bureau"],
      ["pothos-etagere", "Pothos sur l'étagère"],
      ["commode", "Tiroirs de la commode"],
      ["monstera-pot", "Monstera près de la fenêtre"],
      ["ficus-pot", "Pot du ficus"]
    ],
    ensuite: "VR : téléportation, mode assis et compteur d'images par seconde."
  },
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

// Une entrée par séance d'entraînement (la plus récente en premier).
// Images : evolution/<date>/avant_<nom>.jpg et apres_<nom>.jpg
window.SESSIONS = [
  {
    date: "2026-11-27",
    titre: "Demande d'Enzo — nouvelle chambre 3,60 × 4,60 m, porte sur le mur de gauche",
    avant: 67.75, apres: 67.75,
    scores: { meubles: [10, 10], eclairage: [10, 10], coherence: [9.75, 9.75], liste: [9.75, 9.75], vr: [9.5, 9.5], plan: [9.5, 9.5], video: [9.25, 9.25] },
    changements: [
      "La chambre fait maintenant 3,60 m de large (mur de la fenêtre) sur 4,60 m de long, d'après ton dessin",
      "La porte est sur le mur de gauche, tout près du coin du haut ; ouverte, elle se range contre le mur du bureau",
      "La fenêtre reste au milieu du mur du bas, le lit garde ses 33 cm devant la fenêtre",
      "Bureau déplacé dans le coin opposé à la porte, portant juste à côté de l'entrée, poubelle sous le bureau",
      "Kallax, commode, TV 75\" et sansevière gardent leur place face au lit ; la suspension est au centre de la nouvelle pièce",
      "Passages : lit ↔ commode 1,21 m, bureau ↔ Kallax 1,20 m, rien dans le débattement de la porte",
      "VR : départ, téléportation et zones interdites mis à jour ; mesures, fiches cliquables et visite du plan 3D aussi"
    ],
    images: [["dessus", "Vue de dessus : 3,60 × 3,60 → 3,60 × 4,60 m"], ["porte", "La nouvelle porte, le portant et les sneakers"], ["lit", "Le coin lit ne change pas"], ["bureau", "Le bureau dans le coin nord-est"]],
    ensuite: "Refaire la vidéo de visite avec la nouvelle pièce ; vérifier les prises et l'interrupteur près de la nouvelle porte."
  },
  {
    date: "2026-11-24",
    titre: "Séance 36 — total de la zone dans les fiches du plan 3D, vidéo verticale v5",
    avant: 67.25, apres: 67.75,
    scores: { meubles: [10, 10], eclairage: [10, 10], coherence: [9.75, 9.75], liste: [9.75, 9.75], vr: [9.5, 9.5], plan: [9.25, 9.5], video: [9, 9.25] },
    changements: [
      "Plan 3D : quand tu touches un objet, sa fiche montre maintenant le total de sa zone dans ta liste (ex. « 4 articles · 1 139,73 € (+ 2 991,45 € plus tard) » pour le setup gaming), comme en VR",
      "Le total est calculé exactement comme dans la liste d'achat : les articles « Plus tard » (le PC) sont à part",
      "Nouvelle vidéo verticale pour le téléphone avec la chambre actuelle : TV 75\", mur en lattes derrière le lit, bureau avec PS5 et PS VR2 rangé sur son support",
      "Sur la vidéo verticale, le texte de fin passe sur 2 lignes s'il est trop large",
      "Le reste de la chambre ne change pas (8 vues de contrôle identiques)"
    ],
    video: "video/visite_vertical.mp4", poster: "video/visite_vertical_poster.jpg", vertical: true, videoCap: "Vidéo pour téléphone v5 (verticale, 1 min 08)",
    images: [["fiche_ecran", "Fiche de l'écran 32\" dans le plan 3D : ligne « Total de la zone » en bas"], ["fiche_tv", "Fiche de la TV : 9 articles · 1 377,49 € pour la zone Commode et TV"], ["video_lit", "Vidéo verticale : l'ancienne n'avait pas le mur en lattes"], ["video_tv", "Vidéo verticale : TV 65\" éteinte → TV 75\" allumée"], ["video_bureau", "Vidéo verticale : ancien PC → PS5 + PS VR2 sur son support"]],
    ensuite: "Prix après le Black Friday (27/11) : TV 75\", barre Samsung, écran 32\", PS VR2. Questions à Enzo : 4e pothos, lampadaire arc de remplacement, chargeur Qi2."
  },
  {
    date: "2026-11-23",
    titre: "Séance 35 — total de la zone dans les fiches VR, cadres du Kallax et pothos du portant cliquables",
    avant: 67, apres: 67.25,
    scores: { meubles: [10, 10], eclairage: [10, 10], coherence: [9.75, 9.75], liste: [9.75, 9.75], vr: [9.25, 9.5], plan: [9.25, 9.25], video: [9, 9] },
    changements: [
      "En VR, la fiche d'un objet montre maintenant le total de sa zone dans ta liste (ex. « Commode et TV : 9 articles · 1 377,49 € »), car le lien « Dans ma liste » ne s'ouvre pas dans le casque",
      "Les 2 cadres du haut au-dessus du Kallax n'étaient pas cliquables : c'est corrigé (plan 3D et VR)",
      "La boîte des cadres au-dessus du lit suit leur vraie place (devant le mur en lattes)",
      "Le pothos en haut du portant a sa fiche (avant, on tombait sur le portant)",
      "Prix revérifiés : PS VR2 toujours à 349,99 € (Fnac), barre Samsung vue à 134 € chez Rue du Commerce (à confirmer), écran 32\" : les comparateurs montrent 589,99 €, vérifie l'offre TopAchat à 549,95 €",
      "Le reste de la chambre ne change pas (8 vues de contrôle identiques)"
    ],
    images: [["fiche_vr", "Fiche VR de la TV : ligne « Dans ma liste » avec le total de la zone"], ["cadres_kallax", "Cadre du haut au-dessus du Kallax : rien → sa fiche"], ["pothos_portant", "Pothos du portant : fiche du portant → fiche du pothos"], ["vue_tv", "Vue de contrôle TV : identique"]],
    ensuite: "Il y a 4 pothos dans la 3D pour 3 dans la liste : à décider avec Enzo (en ajouter un ou en retirer un). Prix TV 75\" et barre de son après le Black Friday."
  },
  {
    date: "2026-11-22",
    titre: "Demande d'Enzo — vidéo v5 de la chambre + ambiances plus belles",
    avant: 66, apres: 67,
    video: "video/visite.mp4", poster: "video/visite_poster.jpg", videoCap: "Vidéo de visite v5 (1 min 08) : TV 75\", bureau console, PS VR2, ambiances",
    scores: { meubles: [10, 10], eclairage: [10, 10], coherence: [9.75, 9.75], liste: [9.75, 9.75], vr: [9.25, 9.25], plan: [9.25, 9.25], video: [8, 9] },
    changements: [
      "Nouvelle vidéo de visite (1 min 08, 1280 x 720) : la chambre d'aujourd'hui avec la TV 75\" qui s'allume, le bureau console (écran 32\" 4K, PS5), le coin VR et le mur en lattes",
      "Titres mis à jour (commode et son, TV 75\", bureau gaming, coin VR) et fondu au noir entre le coin VR et le coucher de soleil",
      "Coucher de soleil plus doré : soleil plus bas et plus orange, ciel chaud, rayons plus marqués",
      "Soir chaud plus chaleureux : lampadaire, chevet et FADO plus forts, bougies allumées",
      "Ciné Ambilight : image de la TV moins délavée, pièce plus sombre autour"
    ],
    images: [],
    ensuite: "Refaire la vidéo verticale pour téléphone avec la chambre actuelle."
  },
  {
    date: "2026-11-22",
    titre: "Demande d'Enzo — TV 75 pouces, sansevière à la place du ficus, mur en lattes derrière le lit, système son 2.1",
    avant: 65.75, apres: 66,
    scores: { meubles: [10, 10], eclairage: [10, 10], coherence: [9.5, 9.75], liste: [9.75, 9.75], vr: [9.25, 9.25], plan: [9.25, 9.25], video: [8, 8] },
    changements: [
      "La TV passe en 75 pouces (TCL 75C69K, 167 x 96 cm) sur un support One For All qui accepte cette taille",
      "Le ficus qui cachait la TV est remplacé par une sansevière (feuilles droites, sous le bas de la TV)",
      "Le mur en lattes noyer derrière le lit est gardé pour de vrai : il apparaît aussi en VR et il est dans la liste (lot de 4 panneaux 240 x 60 cm)",
      "Système son : Samsung HW-B460F 2.1 (barre de 86 cm sur la commode + caisson sans fil au sol entre le Kallax et la commode), 149 €",
      "Total de la liste : 5 314,26 € → 5 721,82 €"
    ],
    images: [["tv75_mur", "TV 75 pouces, sans le ficus"], ["tv75_cosy", "Le lit et le mur en lattes"], ["son_caisson", "Le caisson de basses entre le Kallax et la commode"]],
    ensuite: "Vérifier la hauteur de la sansevière en magasin (60-80 cm) ; prix de la TV après le Black Friday."
  },
  {
    date: "2026-11-22",
    titre: "Demande d'Enzo — réglage de la taille de la TV (65, 75 ou 85 pouces) en VR et dans le plan 3D",
    avant: 65.25, apres: 65.75,
    scores: { meubles: [10, 10], eclairage: [10, 10], coherence: [9.5, 9.5], liste: [9.75, 9.75], vr: [9, 9.25], plan: [9, 9.25], video: [8, 8] },
    changements: [
      "Nouveau bouton « TV : 65 pouces » dans le menu VR (bouton Y) : il passe à 75 puis 85 pouces, et revient à 65",
      "Même bouton « 📺 TV » dans le plan 3D, ligne des vues",
      "La TV grandit vers le haut et sur les côtés (le bas reste à 1,05 m), avec son halo Ambilight ; ton choix est gardé pour la prochaine visite",
      "En 85 pouces, la TV passe devant les cadres du Kallax et le ficus : c'est normal, c'est pour voir si ça rentre"
    ],
    images: [["tv75", "65 pouces → 75 pouces"], ["tv85", "65 pouces → 85 pouces (Ciné Ambilight)"]],
    ensuite: "Si Enzo choisit 75 pouces : mettre la TV 75\" dans la liste et décaler le ficus vers la fenêtre."
  },
  {
    date: "2026-11-22",
    titre: "Demande d'Enzo — retour à la PS5 + PS VR2 (le PC passe en « plus tard »)",
    avant: 65.25, apres: 65.25,
    scores: { meubles: [10, 10], eclairage: [10, 10], coherence: [9.5, 9.5], liste: [9.75, 9.75], vr: [9, 9], plan: [9, 9], video: [8, 8] },
    changements: [
      "Le bureau redevient console : ta PS5 et le PS VR2 rangé (support, station de charge, câble caché sous le bureau)",
      "Le PC et le Quest 3 sont retirés du plan ; le PC reste dans la liste en « plus tard » avec la config choisie (RTX 5070 Ti, SSD 2 To, 2 991,45 €)",
      "Total de la liste : 5 314,26 €"
    ],
    images: [["rangement_vr", "Le PS VR2 rangé sur le bureau"], ["bureau_sanspc", "Le bureau console"]],
    ensuite: "Suivre le prix du PS VR2 (349,99 € pendant le Black Friday)."
  },
  {
    date: "2026-11-22",
    titre: "Demande d'Enzo — retour au PC (RTX 5070 Ti, SSD 2 To) + Meta Quest 3 à la place de PS5 / PS VR2",
    avant: 65.25, apres: 65.25,
    scores: { meubles: [10, 10], eclairage: [10, 10], coherence: [9.5, 9.5], liste: [9.75, 9.75], vr: [9, 9], plan: [9, 9], video: [8, 8] },
    changements: [
      "Le PC revient sous le bureau (achat prévu fin 2027 / début 2028) : Ryzen 7 9800X3D + RTX 5070 Ti + 32 Go + SSD 2 To = 2 991,45 €",
      "La PS5 et le PS VR2 (avec sa station et le range-câbles) sont retirés ; le Meta Quest 3 est posé sur le support à gauche du bureau, ses 2 manettes devant la lampe",
      "Liste : Quest 3 512 Go à 619,99 € ; carte graphique RTX 5070 Ti à 1 349,99 € (Fnac) ; le PC compte de nouveau dans le total",
      "Total de la liste : 8 515,61 € (dont PC 2 991,45 € et Quest 3 619,99 €)",
      "VR : 0 erreur (~174 k triangles)"
    ],
    images: [
      ["bureau_pc_q3", "Le bureau avec le PC dessous et le Quest 3"],
      ["coin_quest3", "Le Quest 3 sur son support"],
      ["pc_gaming", "Le bureau en ambiance Gaming"]
    ],
    ensuite: "Suivre les prix du PC chaque mois (surtout carte graphique, mémoire, SSD) jusqu'au Black Friday 2027 (26/11/2027) et aux soldes d'hiver (12/01/2028)."
  },
  {
    date: "2026-11-22",
    titre: "Demande d'Enzo — PC retiré du plan, écran 32\" choisi, rangement propre du PS VR2",
    avant: 65.25, apres: 65.25,
    scores: { meubles: [10, 10], eclairage: [10, 10], coherence: [9.5, 9.5], liste: [9.75, 9.75], vr: [9, 9], plan: [9, 9], video: [8, 8] },
    changements: [
      "Le boîtier du PC n'est plus sous le bureau (il reste dans la liste en « plus tard ») ; les câbles de l'écran et de la PS5 descendent directement à la multiprise",
      "Écran 32\" 4K confirmé (AOC AG326UD, 549,95 €)",
      "Rangement du PS VR2 quand tu ne joues pas : casque sur un support IKEA LÅNESPELARE, manettes debout dans la station de charge Sony, câble tenu par 2 aimants au bord du bureau et ses boucles cachées dans un range-câbles IKEA SIGNUM sous le bureau",
      "Liste : support 14,99 €, station de charge 41,12 €, range-câbles 14,99 €, aimants 3,99 € (+75,09 €) → total 5 314,26 €",
      "VR : 0 erreur (~179 k triangles)"
    ],
    images: [
      ["bureau_sanspc", "Le bureau sans le PC"],
      ["rangement_vr", "Le PS VR2 rangé : support, station de charge, câble caché"]
    ],
    ensuite: "Quand Enzo joue : le câble sort du range-câbles ; vérifier qu'il atteint la zone de jeu (tapis berbère, environ 2,7 m du bureau)."
  },
  {
    date: "2026-11-22",
    titre: "Demande d'Enzo — bureau console : un seul écran OLED 32\" 4K, PS5 et PS VR2 sur le bureau",
    avant: 65.25, apres: 65.25,
    scores: { meubles: [10, 10], eclairage: [10, 10], coherence: [9.5, 9.5], liste: [9.75, 9.75], vr: [9, 9], plan: [9, 9], video: [8, 8] },
    changements: [
      "Un seul écran : le 34\" ultra-large et l'écran vertical sont remplacés par un 32\" OLED 4K (AOC AG326UD, 71,7 x 42,1 cm) sur un seul bras, avec la barre lumineuse au-dessus",
      "Ta PS5 (modèle d'origine, 39 cm de haut) est debout sur son socle à gauche du bureau",
      "Le PS VR2 quitte la commode : le casque est posé devant la PS5 et les 2 manettes Sense entre la PS5 et la lampe",
      "Liste : écran 32\" 4K à 549,95 € (2 HDMI 2.1 pour la PS5 en 4K 120 Hz) ; option 27\" notée dans la fiche (AOC Q27G41ZDF, 299,90 €) ; écran vertical retiré ; 1 seul bras",
      "Total de la liste : 5 459,16 € → 5 239,17 €",
      "VR : 0 erreur (~175 k triangles)"
    ],
    images: [
      ["bureau_ps5", "Le bureau avec un seul écran 32\""],
      ["coin_ps5", "La PS5 et le PS VR2 à gauche du bureau"],
      ["bureau_gaming", "Le bureau en ambiance Gaming"]
    ],
    ensuite: "Enzo choisit 27\" ou 32\" ; si 27\", remplacer l'écran du plan (60,9 x 35,5 cm). Le PC (« plus tard ») est encore sous le bureau dans le plan."
  },
  {
    date: "2026-11-22",
    titre: "Demande d'Enzo — PS VR2 sur la commode, PC gaming mis « plus tard »",
    avant: 65.25, apres: 65.25,
    scores: { meubles: [10, 10], eclairage: [10, 10], coherence: [9.5, 9.5], liste: [9.75, 9.75], vr: [9, 9], plan: [9, 9], video: [8, 8] },
    changements: [
      "Nouveau : le casque PlayStation VR2 et ses 2 manettes Sense, posés sur la commode côté porte (vraies dimensions : 21 x 16 x 28 cm), avec leur fiche dans le plan 3D et en VR",
      "Liste d'achat : PS VR2 ajouté à 349,99 € (Fnac, Black Friday ; prix normal 449,99 €). Il se branche sur ta PS5 avec un seul câble",
      "Le PC gaming (processeur, carte mère, mémoire, carte graphique, SSD, alimentation, boîtier = 2 573,87 €) passe en « Plus tard » : toujours visible dans la liste, mais hors du total",
      "Total de la liste : 7 683,04 € → 5 459,16 €",
      "VR : 0 erreur (~177 k triangles)"
    ],
    images: [
      ["psvr2_jour", "Le PS VR2 et les manettes sur la commode"],
      ["psvr2_gaming", "Même coin en ambiance Gaming"],
      ["commode_tv", "Commode et TV (vue de contrôle)"]
    ],
    ensuite: "Placer ta PS5 dans le plan 3D (où est-elle ?) ; décider si les écrans, le clavier et la chaise du bureau passent aussi en « plus tard »."
  },
  {
    date: "2026-11-22",
    titre: "Séance 34 — fiches du bureau justes, bouton « Dans ma liste », prix Black Friday",
    avant: 64.5, apres: 65.25,
    scores: { meubles: [10, 10], eclairage: [10, 10], coherence: [9.25, 9.5], liste: [9.5, 9.75], vr: [9, 9], plan: [8.75, 9], video: [8, 8] },
    changements: [
      "Quand tu touches un objet du bureau, le cadre vert entoure enfin le bon objet : écran 34\", écran vertical, lampe, étagères, casque (avant, les cadres étaient restés à l'emplacement de l'ancien bureau)",
      "10 articles de plus ont leur fiche dans le plan 3D et en VR : écran vertical, bras d'écran, barre lumineuse, ruban LED des écrans, pan de lattes, plantes grasses, ampoule de la lampe, Echo Show 5, prises connectées",
      "Nouveau bouton « Dans ma liste » sur chaque fiche : il ouvre la liste d'achat directement sur cet article, entouré en vert",
      "Prix revérifiés pour le Black Friday : écran 34\" 539,96 € (au lieu de 656,99 €), processeur 359 € (au lieu de 416,90 €), mémoire 519 €, SSD 318,61 €, carte graphique 932,41 € (elle a augmenté), carte mère 219,95 € avec watercooling offert jusqu'au 30/11",
      "Total de la liste : 7 804,93 € → 7 683,04 € (-121,89 €), sans changer aucun de tes choix",
      "VR : 0 erreur (~172 k triangles)"
    ],
    images: [
      ["ecran34", "Fiche de l'écran 34\" (cadre vert)"],
      ["lampe34", "Fiche de la lampe du bureau"],
      ["etagere34", "Fiche des étagères du bureau"],
      ["fiche34", "Fiche sur iPhone avec « Dans ma liste »"],
      ["liste34", "La liste s'ouvre sur l'article touché"]
    ],
    ensuite: "Refaire la vidéo de visite avec le nouveau bureau ; revérifier les prix des composants après le Black Friday (27/11)."
  },
  {
    date: "2026-11-21",
    titre: "Séance 33 — bugs VR corrigés, VR plus légère, couette drapée, franges du tapis",
    avant: 64, apres: 64.25,
    scores: { meubles: [10, 10], eclairage: [10, 10], coherence: [9.25, 9.25], liste: [9.5, 9.5], vr: [8.75, 9], plan: [8.75, 8.75], video: [8, 8] },
    changements: [
      "Bug VR corrigé : le liseré lumineux bleu en haut des murs, sous le plafond (la lumière de la lune passait à travers l'arête)",
      "Bug VR corrigé : la ligne bleue verticale dans le couloir, et le mur du couloir qui restait blanc et éclairé en pleine nuit",
      "VR plus fluide : le casque ne dessine plus que ce qui est dans ton champ de vision (environ 2 à 8 fois moins d'objets à dessiner selon où tu regardes)",
      "Couette avec un vrai drapé : gonflant et plis doux en relief, au lieu de plis peints en triangles",
      "Franges en coton aux deux bouts du tapis berbère"
    ],
    images: [
      ["vr-plafond33", "VR : arête du plafond et couloir"],
      ["couette33", "Couette drapée"],
      ["tapis33", "Franges du tapis"]
    ],
    ensuite: "Reflets légers sur le parquet (seulement si le Quest 2 reste fluide) ; tester la VR sur le vrai casque."
  },
  {
    date: "2026-11-21",
    titre: "Séance 32 — bureau (clavier TKL, souris G305, plante ZZ) et plante du portant",
    avant: 63.75, apres: 64,
    scores: { meubles: [9.75, 10], eclairage: [10, 10], coherence: [9.25, 9.25], liste: [9.5, 9.5], vr: [8.75, 8.75], plan: [8.75, 8.75], video: [8, 8] },
    changements: [
      "Le clavier blanc a maintenant la vraie disposition d'un TKL 87 touches : rangée F séparée, Tab, Maj, Entrée, barre d'espace et bloc des flèches",
      "La souris a la forme bombée de la G305 (11,6 x 6,2 cm) avec sa molette, au lieu d'une simple boule",
      "La plante du bureau devient une plante ZZ réaliste (tiges arquées, feuilles brillantes par paires) au lieu de boules vertes",
      "La plante en haut du portant (des boules vertes) devient un vrai pothos dont les tiges retombent devant les vêtements",
      "Vêtements du portant plus réalistes : t-shirts fins, sweats et vestes plus épais, bord-côte plus foncé en bas des sweats",
      "L'Echo Show 5 a sa vraie forme : façade plate et dos arrondi en tissu (avant : une simple boîte)",
      "Câbles des écrans rangés : ils suivent les bras, longent le dessous du bureau avec des attaches et descendent proprement au PC",
      "VR : 0 erreur (~168 k triangles)"
    ],
    images: [
      ["bureau32", "Bureau (jour)"],
      ["bureau32-cosy", "Bureau (nuit cosy)"],
      ["plante32", "Plante ZZ"],
      ["plante-portant33", "Pothos du portant"],
      ["portant33", "Portant (vue de face)"],
      ["echo32", "Echo Show 5"],
      ["cables32", "Câbles sous le bureau"]
    ],
    ensuite: "Couette avec un vrai drapé ; reflets légers sur le parquet."
  },
  {
    date: "2026-11-21",
    titre: "Séance 31 — l'écran de l'Echo Show suit l'ambiance",
    avant: 63.5, apres: 63.75,
    scores: { meubles: [9.75, 9.75], eclairage: [10, 10], coherence: [9, 9.25], liste: [9.5, 9.5], vr: [8.75, 8.75], plan: [8.75, 8.75], video: [8, 8] },
    changements: [
      "L'écran de l'Echo Show 5 affiche l'ambiance en cours (Nuit cosy, Jour, Gaming, Ciné…) avec le bon bouton allumé, comme une vraie routine Alexa",
      "L'heure change avec l'ambiance : 14:20 le jour, 22:00 en gaming, 23:10 en nuit cosy…",
      "Marche dans le plan 3D et dans la VR (quand tu changes d'ambiance avec le menu ou les boutons A/B)"
    ],
    images: [
      ["echo-cosy", "Nuit cosy"],
      ["echo-gaming", "Gaming"],
      ["echo-jour", "Jour"]
    ],
    ensuite: "Reflets légers des LED sur le parquet ; remplacer le lampadaire arc épuisé (à valider avec Enzo)."
  },
  {
    date: "2026-11-21",
    titre: "Séance 30 — effets de lumière : rubans LED visibles, lumière des écrans",
    avant: 63.25, apres: 63.5,
    scores: { meubles: [9.75, 9.75], eclairage: [10, 10], coherence: [9, 9], liste: [9.5, 9.5], vr: [8.75, 8.75], plan: [8.5, 8.75], video: [8, 8] },
    changements: [
      "On voit maintenant la ligne lumineuse des rubans LED sous le lit et sous les étagères à sneakers (pas seulement le halo), dans la couleur de l'ambiance",
      "La lumière des écrans prend la couleur de l'image affichée (bleu nuit) au lieu d'un violet fixe",
      "En gaming, la lumière des étagères du bureau passe au violet pour garder l'ambiance néon",
      "Clavier et souris blancs ajoutés (liste + 3D)"
    ],
    images: [
      ["led-lit-cosy", "Lit en nuit cosy : la ligne LED sous le lit"],
      ["led-lit-gaming", "Lit en gaming"],
      ["led-bureau-gaming", "Bureau en gaming"],
      ["led-sneakers", "Étagères à sneakers le soir"]
    ],
    ensuite: "Rayons de lune par la fenêtre la nuit ; reflets doux des LED sur le parquet."
  },
  {
    date: "2026-11-21",
    titre: "Séance 29 — nouveau bureau d'après les photos d'Enzo",
    avant: 62.75, apres: 63.25,
    scores: { meubles: [9.75, 9.75], eclairage: [9.75, 10], coherence: [8.75, 9], liste: [9.5, 9.5], vr: [8.75, 8.75], plan: [8.5, 8.5], video: [8, 8] },
    changements: [
      "Bureau choisi par Enzo : écran vertical 27\" à gauche + écran principal 34\" ultra-large, chacun sur son bras d'écran (AOC AM400B)",
      "Ruban LED Tapo derrière les écrans, piloté par l'Echo Show 5 : orange le soir, violet en gaming, couleurs en fête",
      "Pan de lattes noyer, 2 étagères blanches avec plantes grasses et pothos retombants, lampe à ampoule apparente, barre lumineuse sur l'écran",
      "Plan 3D, VR et liste d'achat mis à jour ensemble (total 7 328,49 € → 7 812,93 €)"
    ],
    images: [
      ["bureau-cosy", "Bureau en nuit cosy : avant → après"],
      ["bureau-gaming", "Bureau en mode gaming : la LED passe au violet"]
    ],
    ensuite: "Vérifier sur ikea.fr le prix de l'ampoule LUNNOM et des plantes grasses ; surveiller le retour en stock de la lampe NOOLI."
  },
  {
    date: "2026-11-21",
    titre: "Séance 28 — les lampes font enfin des ombres",
    avant: 62.5, apres: 62.75,
    scores: { meubles: [9.75, 9.75], eclairage: [9.5, 9.75], coherence: [8.75, 8.75], liste: [9.5, 9.5], vr: [8.75, 8.75], plan: [8.5, 8.5], video: [8, 8] },
    changements: [
      "Le lampadaire arc, la lampe FADO de la commode, la lampe de chevet et le spot des plantes projettent maintenant de vraies ombres (avant, seul le soleil en faisait)",
      "Le soir, les feuilles du ficus et du monstera dessinent leurs ombres sur le mur et les rideaux, la TV et les étagères à sneakers aussi",
      "Ombres douces : plus l'objet est loin du mur, plus le bord de l'ombre est flou, comme avec une vraie lampe",
      "Sur un téléphone trop lent, le plan 3D coupe ces ombres tout seul pour rester fluide (le mode jour ne change pas)"
    ],
    images: [
      ["ombres-ficus-commode", "Ficus et monstera près de la commode (nuit cosy)"],
      ["ombres-coin-ficus", "Coin du ficus : ombres des feuilles au mur"],
      ["ombres-fenetre", "Vers la fenêtre : lampadaire, monstera, rideaux"],
      ["ombres-bureau", "Bureau : étagères à sneakers et casque"],
      ["ombres-lit", "Vue de contrôle du lit (nuit cosy)"]
    ],
    ensuite: "Essayer les mêmes ombres en VR si le Quest 2 reste fluide, et revérifier les prix des composants avant la fin de l'offre carte mère (30/11)."
  },
  {
    date: "2026-11-21",
    titre: "Séance 27 — « Ciné immersif » testé puis retiré",
    avant: 62.5, apres: 62.5,
    scores: { meubles: [9.75, 9.75], eclairage: [9.5, 9.5], coherence: [8.75, 8.75], liste: [9.5, 9.5], vr: [8.75, 8.75], plan: [8.5, 8.5], video: [8, 8] },
    changements: [
      "Nouvelle ambiance « Ciné immersif » dans le plan 3D et dans la VR (menu du casque)",
      "Les rubans (sous le lit, tête de lit, sneakers), le lampadaire et la suspension prennent les couleurs de l'image, côté par côté, comme le système Govee DreamView",
      "Les couleurs changent en douceur, comme avec de vraies lumières Wi-Fi",
      "Aperçu seulement : la liste d'achat n'a pas changé",
      "Enzo a préféré ne pas le garder : l'ambiance est retirée du plan 3D et de la VR"
    ],
    images: [
      ["cine-tv", "Vers la TV : Ciné Ambilight → Ciné immersif"],
      ["cine-lit", "Vers le lit : toute la chambre suit le film"]
    ],
    ensuite: "On garde les lumières Tapo pilotées par l'Echo Show 5."
  },
  {
    date: "2026-11-21",
    titre: "Séance 26 — écran Echo Show 5 et lumières toutes compatibles Alexa",
    avant: 62, apres: 62.5,
    scores: { meubles: [9.75, 9.75], eclairage: [9.5, 9.5], coherence: [8.5, 8.75], liste: [9.25, 9.5], vr: [8.75, 8.75], plan: [8.5, 8.5], video: [8, 8] },
    changements: [
      "Echo Show 5 ajouté sur la table de chevet (3D + liste) : réveil et boutons des ambiances",
      "Chaque lumière vérifiée : rubans Action et Paulmann (télécommande seulement) remplacés par des Tapo L900-5 compatibles Alexa, et moins chers",
      "5 prises Tapo P100 pour les 2 FADO, la FORSÅ, les spots des plantes et le ruban du bureau",
      "Erreur corrigée : la FORSÅ prend une ampoule E14, pas E27 ; seulement 1 lot d'E27 pour les 2 FADO",
      "Lampadaire arc : culot E27 confirmé, mais affiché « épuisé » à 109,99 € → à remplacer",
      "Total de la liste : 7 191,47 € → 7 328,49 €"
    ],
    images: [
      ["echo-jour", "Table de chevet en journée"],
      ["echo-cosy", "Table de chevet en nuit cosy"]
    ],
    ensuite: "Trouver un lampadaire arc noir et marbre en stock ; régler les ambiances de l'Echo Show (routines Alexa)."
  },
  {
    date: "2026-11-20",
    titre: "Séance 25 — carte mère : le watercooling est vraiment offert",
    avant: 61.75, apres: 62,
    scores: { meubles: [9.75, 9.75], eclairage: [9.5, 9.5], coherence: [8.5, 8.5], liste: [9, 9.25], vr: [8.75, 8.75], plan: [8.5, 8.5], video: [8, 8] },
    changements: [
      "Erreur corrigée : la liste comptait 309,90 € pour la carte mère MSI B850 Gaming Plus WiFi + watercooling A13 360, alors que le watercooling est offert",
      "Vrai prix : 219,95 € chez Materiel.net avec le code VIVACOOLING (jusqu'au 30/11/2026) → 89,95 € économisés",
      "Total de la liste : 7 281,42 € → 7 191,47 €"
    ],
    images: [["liste-carte-mere", "Carte mère + watercooling"]],
    ensuite: "Commander la carte mère avant le 30/11 pour garder le watercooling offert."
  },
  {
    date: "2026-11-20",
    titre: "Séance 24 — plus aucun prix estimé dans la liste",
    avant: 61.5, apres: 61.75,
    scores: { meubles: [9.75, 9.75], eclairage: [9.5, 9.5], coherence: [8.5, 8.5], liste: [8.75, 9], vr: [8.75, 8.75], plan: [8.5, 8.5], video: [8, 8] },
    changements: [
      "Suspension boule papier GULLSUDARE + monture HAVSDJUP 45 cm : 8,49 € sur ikea.fr (elle était comptée 30 €)",
      "Spots pour les plantes : un vrai lot de 2 spots de sol 3 W avec télécommande, 32,59 € chez Leroy Merlin",
      "Total de la liste : 7 295,34 € → 7 281,42 €"
    ],
    images: [
      ["liste-suspension", "Suspension papier"],
      ["liste-spots", "Spots pour les plantes"]
    ],
    ensuite: "Revérifier la carte mère + watercooling et la barre de son (derniers prix pas encore confirmés cette semaine)."
  },
  {
    date: "2026-11-20",
    titre: "Séance 23 — les mesures aussi dans le casque VR",
    avant: 61.25, apres: 61.5,
    scores: { meubles: [9.75, 9.75], eclairage: [9.5, 9.5], coherence: [8.5, 8.5], liste: [8.75, 8.75], vr: [8.5, 8.75], plan: [8.5, 8.5], video: [8, 8] },
    changements: [
      "Nouveau bouton « Afficher les mesures » dans le menu VR : les mêmes cotes que le plan 3D apparaissent en vrai dans la chambre",
      "Les étiquettes se tournent toujours vers toi et grossissent quand elles sont loin, pour rester lisibles",
      "Les passages (lit ↔ commode, bureau ↔ lit, portant) sont en blanc : tu peux vérifier en marchant que ça passe"
    ],
    images: [
      ["vr-mesures", "Cotes du lit vues depuis le casque"]
    ],
    ensuite: "Vidéo v5 avec les mesures et les fiches produit."
  },
  {
    date: "2026-11-20",
    titre: "Séance 22 — bouton « Mesures » dans le plan 3D",
    avant: 60.5, apres: 61.25,
    scores: { meubles: [9.75, 9.75], eclairage: [9.5, 9.5], coherence: [8.25, 8.5], liste: [8.75, 8.75], vr: [8.5, 8.5], plan: [8, 8.5], video: [8, 8] },
    changements: [
      "Nouveau bouton « 📏 Mesures » : la caméra passe au-dessus et les cotes apparaissent (pièce 3,60 m, lit 199 × 156 cm, bureau 160 × 80, commode 120, Kallax 77, portant 90, porte 79, bas de la TV à 105 cm…)",
      "Les passages libres sont en blanc : 121 cm entre le lit et la commode, 91 cm derrière la chaise, 133 cm devant le portant",
      "Les étiquettes suivent la caméra quand tu tournes, et se cachent derrière les boutons",
      "Les cotes sont dans source/mesures.js : faciles à ajouter quand on fera le reste de la maison"
    ],
    images: [
      ["mesures-dessus", "Vue de dessus avec les cotes"],
      ["mesures-lit", "Cotes du lit en vue 3D"]
    ],
    ensuite: "Revoir la vidéo avec la nouvelle chaise et les fiches ; spots pour plantes."
  },
  {
    date: "2026-11-20",
    titre: "Séance 21 — vidéo pour téléphone et matelas à la bonne taille",
    avant: 59.75, apres: 60.5,
    scores: { meubles: [9.75, 9.75], eclairage: [9.5, 9.5], coherence: [8, 8.25], liste: [8.5, 8.75], vr: [8.5, 8.5], plan: [8, 8], video: [7.5, 8] },
    changements: [
      "Nouvelle vidéo de visite en vertical (720×1280), faite pour l'écran du téléphone : mêmes 68 secondes, titres adaptés à la largeur",
      "Matelas VALEVÅG : il existe bien en 140×190 (la taille du lit MALM, vérifiée : 199×156 cm). Lien corrigé et prix en promo 249 € au lieu de 279 €",
      "Total de la liste : 7 325,34 € → 7 295,34 €"
    ],
    video: "video/visite_vertical_v1.mp4", poster: "video/visite_vertical_v1_poster.jpg", vertical: true, videoCap: "Vidéo pour téléphone (verticale, 1 min 08)",
    images: [],
    ensuite: "Spots pour plantes : trouver le vrai prix ; placer les supports vinyles (à décider avec Enzo)."
  },
  {
    date: "2026-11-20",
    titre: "Séance 20 — fiches produit aussi dans le casque VR",
    avant: 59.25, apres: 59.75,
    scores: { meubles: [9.75, 9.75], eclairage: [9.5, 9.5], coherence: [8, 8], liste: [8.5, 8.5], vr: [8, 8.5], plan: [8, 8], video: [7.5, 7.5] },
    changements: [
      "En VR, vise un meuble et serre la poignée (bouton sous le majeur) : un rayon le touche, il s'entoure d'un cadre vert et sa fiche apparaît devant toi (magasin, nom, modèle, prix)",
      "« Aussi ici » liste les autres articles au même endroit",
      "La fiche reste 5 secondes après avoir relâché la poignée",
      "Mêmes données que le plan 3D et la liste : un prix changé dans la liste change partout"
    ],
    images: [
      ["vr-fiche-rideaux", "Rideaux visés depuis le casque"],
      ["vr-fiche-lit", "Lit : housse, couette, matelas…"]
    ],
    ensuite: "Vidéo verticale pour téléphone."
  },
  {
    date: "2026-11-20",
    titre: "Séance 19 — liste : périphériques et coussins au vrai prix",
    avant: 58.75, apres: 59.25,
    scores: { meubles: [9.75, 9.75], eclairage: [9.5, 9.5], coherence: [8, 8], liste: [8, 8.5], vr: [8, 8], plan: [8, 8], video: [7.5, 7.5] },
    changements: [
      "Clavier + souris + tapis : proposition précise au lieu d'un prix estimé (Corsair K70 Core TKL, Logitech G305, tapis 90×40) → 147,84 € au lieu de 200 €",
      "Coussins moutarde PROFETBLOMMA : lien ikea.fr (au lieu de la Suisse) et vrai prix 4,49 € au lieu de 9,99 €",
      "Total de la liste : 7 388,50 € → 7 325,34 €",
      "Les fiches du plan 3D affichent automatiquement ces nouveaux prix"
    ],
    images: [
      ["liste-peripheriques", "Clavier, souris et tapis"],
      ["liste-coussins", "Coussins moutarde"]
    ],
    ensuite: "Les périphériques sont une proposition : Enzo peut garder d'autres modèles."
  },
  {
    date: "2026-11-20",
    titre: "Séance 18 — touche un meuble dans le plan 3D pour voir sa fiche",
    avant: 57.75, apres: 58.75,
    scores: { meubles: [9.75, 9.75], eclairage: [9.5, 9.5], coherence: [7.5, 8], liste: [8, 8], vr: [8, 8], plan: [7.5, 8], video: [7.5, 7.5] },
    changements: [
      "Dans le plan 3D, touche n'importe quel meuble ou objet : il s'entoure d'un cadre vert et sa fiche s'ouvre (nom, modèle, magasin, prix, lien vers le produit)",
      "« Aussi ici » : les autres articles au même endroit (ex. sur le lit : housse, couette, matelas, drap, protège-matelas)",
      "Les prix des fiches viennent directement de la liste d'achat : une seule source, toujours à jour",
      "73 articles de la liste sont maintenant cliquables dans la chambre"
    ],
    images: [
      ["fiche-commode", "Commode : fiche et cadre de sélection"],
      ["fiche-ecran", "Écran gaming"],
      ["fiche-pc", "Boîtier du PC sous le bureau"],
      ["fiche-plaid", "Plaid sur le lit"]
    ],
    ensuite: "Placer les étagères à pochettes, les supports vinyles et le « Now Playing » (à décider avec Enzo)."
  },
  {
    date: "2026-11-20",
    titre: "Séance 17 — vidéo de visite v4",
    avant: 57.25, apres: 57.75,
    scores: { meubles: [9.75, 9.75], eclairage: [9.5, 9.5], coherence: [7.5, 7.5], liste: [8, 8], vr: [8, 8], plan: [7.5, 7.5], video: [7, 7.5] },
    changements: [
      "Les titres apparaissent pile quand la caméra arrive sur le meuble (avant, ils avaient une seconde de retard)",
      "La vidéo montre toutes les améliorations de la nuit : lumière des lampes, vue par la fenêtre, suspension en papier, sneakers, tapis, platine…"
    ],
    video: "video/visite_v4.mp4", poster: "video/visite_v4_poster.jpg",
    images: [],
    ensuite: "Version verticale de la vidéo pour le téléphone."
  },
  {
    date: "2026-11-20",
    titre: "Séance 16 — manettes visibles dans le casque",
    avant: 56.75, apres: 57.25,
    scores: { meubles: [9.75, 9.75], eclairage: [9.5, 9.5], coherence: [7.5, 7.5], liste: [8, 8], vr: [7.5, 8], plan: [7.5, 7.5], video: [7, 7] },
    changements: [
      "Dans le casque, tes manettes ne sont plus des boîtes : poignée inclinée, tête ronde avec stick, deux boutons et gâchette",
      "Elles restent visibles même dans le noir (mode nuit cosy)"
    ],
    images: [["manettes-vr", "Manette dans le casque (nuit cosy)"]],
    ensuite: "Vidéo refaite avec toutes les améliorations de la nuit."
  },
  {
    date: "2026-11-20",
    titre: "Séance 15 — suspension GULLSUDARE en papier de riz",
    avant: 56.5, apres: 56.75,
    scores: { meubles: [9.5, 9.75], eclairage: [9.5, 9.5], coherence: [7.5, 7.5], liste: [8, 8], vr: [7.5, 7.5], plan: [7.5, 7.5], video: [7, 7] },
    changements: [
      "La boule du plafond ressemble enfin à la vraie GULLSUDARE : papier de riz tendu sur un fil en spirale (34 nervures), ouverture en bas et anneau en haut",
      "Texture de papier fibreux",
      "Les titres de la visite (bouton « Lancer la visite ») apparaissent maintenant au bon moment"
    ],
    images: [
      ["suspension-jour", "Suspension, le jour"],
      ["suspension-dessous", "Vue de dessous"],
      ["suspension-cosy", "Nuit cosy"]
    ],
    ensuite: "Vidéo refaite avec toutes les améliorations de la nuit."
  },
  {
    date: "2026-11-20",
    titre: "Séance 14 — vue par la fenêtre et sneakers",
    avant: 56, apres: 56.5,
    scores: { meubles: [9.5, 9.5], eclairage: [9, 9.5], coherence: [7.5, 7.5], liste: [8, 8], vr: [7.5, 7.5], plan: [7.5, 7.5], video: [7, 7] },
    changements: [
      "Immeubles dehors refaits : façades en pierre, en brique ou claires, fenêtres avec cadres, rebords, rideaux, balcons",
      "La nuit, les fenêtres allumées ont une lumière dégradée plus naturelle",
      "Ciel de jour plus profond avec des nuages doux, arbres avec un vrai feuillage",
      "Sneakers refaites : semelle en deux couches, bout arrondi, col, languette, lacets et languette au talon"
    ],
    images: [
      ["fenetre-jour", "Vue par la fenêtre, le jour"],
      ["fenetre-nuit", "Vue par la fenêtre, la nuit"],
      ["fenetre-coucher", "Coucher de soleil"],
      ["sneakers-mur", "Étagères à sneakers"],
      ["sneakers-portant", "Sneakers sur le portant"]
    ],
    ensuite: "Refaire la vidéo avec toutes les améliorations de la nuit."
  },
  {
    date: "2026-11-20",
    titre: "Séance 13 — derniers prix estimés remplacés",
    avant: 55.5, apres: 56,
    scores: { meubles: [9.5, 9.5], eclairage: [9, 9], coherence: [7.5, 7.5], liste: [7.5, 8], vr: [7.5, 7.5], plan: [7.5, 7.5], video: [7, 7] },
    changements: [
      "Boîtier : modèle précis, Lian Li LANCOOL 207 noir à 89,95 € (4 ventilateurs inclus, la carte graphique rentre)",
      "Casque : SteelSeries Arctis Nova 5 Wireless à 139,95 €",
      "Matelas VALEVÅG : 279 € sur ikea.fr, mais en 140x200 → à vérifier pour ton lit en 140x190",
      "Nouveau total : 7 388,50 € (chambre 3 519,89 € + gaming 3 868,61 €)"
    ],
    images: [],
    ensuite: "Il ne reste qu'un prix estimé : clavier + souris + tapis (selon les modèles que tu préfères)."
  },
  {
    date: "2026-11-20",
    titre: "Séance 12 — lumière des lampes plus réaliste",
    avant: 55, apres: 55.5,
    scores: { meubles: [9.5, 9.5], eclairage: [8.5, 9], coherence: [7.5, 7.5], liste: [7.5, 7.5], vr: [7.5, 7.5], plan: [7.5, 7.5], video: [7, 7] },
    changements: [
      "Le lampadaire arc éclaire maintenant vers le bas, comme un vrai abat-jour : flaque de lumière sur le lit et le tapis, plafond au-dessus plus sombre",
      "La lampe FORSÅ éclaire vers le clavier au lieu de toute la pièce",
      "Le spot au sol éclaire le ficus par en dessous, les LED des étagères à sneakers éclairent vers le bas",
      "Même amélioration dans le casque VR"
    ],
    images: [
      ["nuit-cosy-lumiere", "Nuit cosy"],
      ["lampadaire-arc", "Lampadaire arc (soir)"],
      ["ficus-spot", "Ficus éclairé par le spot"],
      ["bureau-soir", "Bureau le soir"],
      ["soir-lit", "Lit le soir"]
    ],
    ensuite: "Revoir la vidéo avec la nouvelle lumière et des titres mieux calés."
  },
  {
    date: "2026-11-20",
    titre: "Séance 10 — confort en VR",
    avant: 54.5, apres: 55,
    scores: { meubles: [9.5, 9.5], eclairage: [8.5, 8.5], coherence: [7.5, 7.5], liste: [7.5, 7.5], vr: [7, 7.5], plan: [7.5, 7.5], video: [7, 7] },
    changements: [
      "Quand tu avances au stick ou que tu tournes, les bords de la vue s'assombrissent doucement : ça évite d'avoir mal au cœur dans le casque",
      "Bouton « Confort : oui / non » dans le menu pour l'enlever si tu n'en as pas besoin",
      "Le compteur d'images par seconde est passé en haut du menu"
    ],
    images: [
      ["vignette-marche", "Vue pendant la marche (bords assombris)"],
      ["menu-confort", "Menu avec le bouton Confort"]
    ],
    ensuite: "Éclairage : reflets légers sur le parquet et l'écran de la TV."
  },
  {
    date: "2026-11-20",
    titre: "Séance 9 — petits objets de la liste ajoutés",
    avant: 54, apres: 54.5,
    scores: { meubles: [9.5, 9.5], eclairage: [8.5, 8.5], coherence: [7, 7.5], liste: [7.5, 7.5], vr: [7, 7], plan: [7.5, 7.5], video: [7, 7] },
    changements: [
      "Tapis de passage au bord du lit (côté bureau)",
      "Les 2 multiprises KOPPLA (une côté lit, une sous le bureau) avec leurs câbles",
      "Goulottes blanches : une le long du pied du bureau, une entre la TV et la commode",
      "Spot au sol derrière la monstera (il y en avait un seul, derrière le ficus)"
    ],
    images: [],
    ensuite: "À décider avec toi : où mettre les 2 étagères à pochettes MOSSLANDA, les 3 supports muraux et le support « Now Playing » (le mur au-dessus du Kallax a déjà 4 cadres)."
  },
  {
    date: "2026-11-20",
    titre: "Séance 8 — nouvelle vidéo de visite",
    avant: 52, apres: 54,
    scores: { meubles: [9.5, 9.5], eclairage: [8.5, 8.5], coherence: [7, 7], liste: [7.5, 7.5], vr: [7, 7], plan: [7.5, 7.5], video: [5, 7] },
    changements: [
      "Vidéo refaite avec tous les nouveaux meubles et le même moteur que le plan 3D (ombres douces, textures corrigées)",
      "Deux nouveaux moments : nuit cosy avec la lune, puis ciné Ambilight",
      "Titres animés à jour (prix, modèles) + écran de début et de fin",
      "La visite du bouton « Lancer la visite » du plan 3D suit le même parcours"
    ],
    video: "video/visite_v3.mp4", poster: "video/visite_v3_poster.jpg",
    images: [],
    ensuite: "Caler les titres un peu plus tôt sur les mouvements de caméra."
  },
  {
    date: "2026-11-19",
    titre: "Séance 7 — plan 3D sur iPhone",
    avant: 51.5, apres: 52,
    scores: { meubles: [9.5, 9.5], eclairage: [8.5, 8.5], coherence: [7, 7], liste: [7.5, 7.5], vr: [7, 7], plan: [7, 7.5], video: [5, 5] },
    changements: [
      "Écran vertical : l'angle de vue s'élargit tout seul, on voit beaucoup plus de la chambre sur le téléphone",
      "L'aide « 1 doigt : tourner · 2 doigts : zoom » ne passe plus sous le bouton Mon évolution, et disparaît quand tu commences à toucher",
      "Les rangées de boutons s'estompent sur la droite pour montrer qu'on peut les faire défiler"
    ],
    images: [
      ["ensemble-telephone", "Vue d'ensemble sur iPhone"],
      ["bureau-telephone", "Bureau gaming sur iPhone"]
    ],
    ensuite: "Refaire la vidéo de visite avec toutes les améliorations."
  },
  {
    date: "2026-11-19",
    titre: "Séance 6 — housse de couette, oreillers, platine vinyle",
    avant: 51, apres: 51.5,
    scores: { meubles: [9, 9.5], eclairage: [8.5, 8.5], coherence: [7, 7], liste: [7.5, 7.5], vr: [7, 7], plan: [7, 7], video: [5, 5] },
    changements: [
      "Housse de couette olive : plis doux de tissu (comme une vraie housse en percale)",
      "Oreillers plus moelleux, bombés au centre avec une couture tout autour",
      "Platine AT-LP60X : vinyle avec ses sillons et reflet, couvercle transparent ouvert, contrepoids du bras et repose-bras",
      "Correction : on voit maintenant la platine même en gros plan"
    ],
    images: [
      ["platine-gros-plan", "Platine vinyle de près"],
      ["platine-kallax", "Platine sur le Kallax"],
      ["housse-plis", "Housse de couette"],
      ["lit-oreillers", "Oreillers et coussins"]
    ],
    ensuite: "Plan 3D sur téléphone : vérifier les boutons et la fluidité ; puis la vidéo de visite."
  },
  {
    date: "2026-11-19",
    titre: "Séance 5 — prix de la liste revérifiés",
    avant: 50.5, apres: 51,
    scores: { meubles: [9, 9], eclairage: [8.5, 8.5], coherence: [7, 7], liste: [7, 7.5], vr: [7, 7], plan: [7, 7], video: [5, 5] },
    changements: [
      "SSD 2 To : 200 € → 299,99 €. Les SSD ont beaucoup augmenté cette année ; meilleure offre trouvée : Acer Predator GM9000 (encore plus rapide, Gen5)",
      "Alimentation : modèle précis choisi, Corsair RM850e à 134,95 € chez LDLC",
      "Chaise Sihoo Doro C300 : 309,99 € (entre 285 et 380 € selon le vendeur)",
      "Carte graphique RX 9070 XT : prix confirmé autour de 850-900 €, avec les liens des offres du jour",
      "Nouveau total : 7 349,60 € (chambre 3 490,89 € + gaming 3 858,71 €)"
    ],
    images: [],
    ensuite: "Lit : coutures de la housse et oreillers plus moelleux ; platine vinyle."
  },
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

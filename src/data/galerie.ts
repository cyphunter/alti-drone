/**
 * Galerie de chantiers — Alti' Drone & Services.
 *
 * Toutes les images sont locales et optimisées (WebP, filigrane logo intégré) :
 *   • src   → variante grille (≈ 800 px) servie dans la mosaïque
 *   • full  → variante haute définition (≈ 1600 px) ouverte dans la visionneuse
 *
 * Les fichiers vivent dans `public/images/galerie/NN(.webp|-full.webp)`.
 * La numérotation `NN` correspond exactement au descriptif fourni par le client
 * (photo n°1 du descriptif = fichier 01) : pour remplacer une photo, réexporter
 * le WebP au même nom et ajuster `alt` / `caption` ci-dessous.
 *
 * Pour éditer la galerie sans toucher au code :
 *   - `alt`      : texte lu par les lecteurs d'écran + Google (factuel, précis)
 *   - `caption`  : légende courte affichée sous l'image
 *   - `category` : onglet de filtre (voir GALLERY_CATEGORIES)
 *   - `service`  : slug de la prestation liée (lien « Voir la prestation »)
 */

export const GALLERY_CATEGORIES = [
  "Toiture",
  "Façade & bardage",
  "Panneaux solaires",
  "Avant / Après",
  "Le drone en action",
] as const;

export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

export type GalleryItem = {
  id: string;
  /** Variante grille (~800 px de large). */
  src: string;
  /** Variante visionneuse haute définition (~1600 px). */
  full: string;
  alt: string;
  caption: string;
  category: GalleryCategory;
  /** Slug de la page service liée (facultatif). */
  service?: string;
  /** Commune du chantier (facultatif). */
  location?: string;
  /** Dimensions de la variante `full` (pour le ratio, évite le CLS). */
  width: number;
  height: number;
};

const G = "/images/galerie";
const item = (
  id: string,
  n: string,
  width: number,
  height: number,
  alt: string,
  caption: string,
  category: GalleryCategory,
  service?: string,
  location?: string,
): GalleryItem => ({
  id,
  src: `${G}/${n}.webp`,
  full: `${G}/${n}-full.webp`,
  alt,
  caption,
  category,
  ...(service ? { service } : {}),
  ...(location ? { location } : {}),
  width,
  height,
});

export const galerie: readonly GalleryItem[] = [
  // ─── 1 → Façade béton, Couëron (avant / après / composite) ─────────
  item("01-facade-beton-coueron-avant", "01", 1600, 1205,
    "Mur béton encrassé de traces noires avant nettoyage par Alti' Drone & Services à Couëron",
    "Façade béton encrassée — avant", "Façade & bardage", "nettoyage-de-facade-en-enduit", "Couëron"),
  item("02-facade-beton-coueron-apres", "02", 1600, 1205,
    "Mur béton propre après pulvérisation et rinçage basse pression à Couëron",
    "Façade béton nettoyée — Couëron", "Façade & bardage", "nettoyage-de-facade-en-enduit", "Couëron"),
  item("03-facade-beton-avant-apres", "03", 940, 788,
    "Comparatif avant / après d'une façade béton désencrassée sans haute pression, effet rémanent",
    "Avant / après façade béton", "Avant / Après", "nettoyage-de-facade-en-enduit", "Couëron"),

  // ─── 4 → Drone, toiture tuiles, La Plaine-sur-Mer ──────────────────
  item("04-drone-tuiles-la-plaine", "04", 1205, 1600,
    "Drone de pulvérisation en vol au-dessus d'une toiture en tuiles, application hydrofuge à La Plaine-sur-Mer",
    "Drone en action sur toiture en tuiles", "Toiture", "tuiles", "La Plaine-sur-Mer"),

  // ─── 5-6 → Panneaux solaires, Saint-Michel-Chef-Chef ───────────────
  item("05-panneaux-solaires-materiel", "05", 1205, 1600,
    "Drone et motopompe au sol devant une toiture de panneaux solaires à Saint-Michel-Chef-Chef",
    "Matériel prêt devant les panneaux solaires", "Panneaux solaires", "nettoyage-des-panneaux-solaires", "Saint-Michel-Chef-Chef"),
  item("06-drone-panneaux-solaires", "06", 1205, 1600,
    "Drone en vol rinçant des panneaux solaires à l'eau déminéralisée à Saint-Michel-Chef-Chef",
    "Drone en action sur panneaux solaires", "Panneaux solaires", "nettoyage-des-panneaux-solaires", "Saint-Michel-Chef-Chef"),

  // ─── 7-10 → Façade enduit, algues rouges, Saint-Michel ─────────────
  item("07-facade-enduit-algues-avant", "07", 1205, 1600,
    "Mur en enduit clair contaminé par des algues rouges avant traitement, coulures sous une toiture en tuiles",
    "Façade tachée d'algues rouges — avant", "Façade & bardage", "nettoyage-de-facade-en-enduit", "Saint-Michel-Chef-Chef"),
  item("08-facade-enduit-algues-apres", "08", 1205, 1600,
    "Mur en enduit blanc propre après traitement des algues rouges à Saint-Michel-Chef-Chef",
    "Façade enduit nettoyée — Saint-Michel", "Façade & bardage", "nettoyage-de-facade-en-enduit", "Saint-Michel-Chef-Chef"),
  item("09-facade-enduit-coulures-avant", "09", 1205, 1600,
    "Façade en enduit clair tachée de coulures brun-orangé avant traitement à Saint-Michel-Chef-Chef",
    "Façade en enduit encrassée — avant", "Façade & bardage", "nettoyage-de-facade-en-enduit", "Saint-Michel-Chef-Chef"),
  item("10-facade-enduit-coulures-apres", "10", 1600, 1205,
    "Façade en enduit propre et uniforme après traitement à Saint-Michel-Chef-Chef",
    "Façade en enduit ravivée — après", "Façade & bardage", "nettoyage-de-facade-en-enduit", "Saint-Michel-Chef-Chef"),

  // ─── 11 → Drone anti-mousse tuiles, Saint-Michel ───────────────────
  item("11-drone-antimousse-tuiles", "11", 1205, 1600,
    "Drone en vol pulvérisant un traitement anti-mousse sur une toiture en tuiles à Saint-Michel-Chef-Chef",
    "Drone en vol, anti-mousse sur tuiles", "Toiture", "tuiles", "Saint-Michel-Chef-Chef"),

  // ─── 12 → Zone test produit choc ───────────────────────────────────
  item("12-zone-test-produit-choc", "12", 1205, 1600,
    "Zone test nettoyée sur une dalle béton montrant l'effet immédiat du traitement choc",
    "Zone test, effet immédiat du produit", "Avant / Après", "nettoyage-de-facade-en-enduit"),

  // ─── 13 → Signalétique chantier ────────────────────────────────────
  item("13-panneau-chantier", "13", 1205, 1600,
    "Panneau de chantier Alti' Drone & Services « Toiture traitée par drone » fixé sur un portail",
    "Panneau de chantier Alti' Drone & Services", "Le drone en action"),

  // ─── 14 → Fibro-ciment à la perche ─────────────────────────────────
  item("14-fibro-ciment-perche", "14", 1600, 1205,
    "Pignon en bardage fibro-ciment gris traité à la perche télescopique, anti-mousse sans rinçage",
    "Traitement à la perche sur fibro-ciment", "Façade & bardage", "ardoises-fibro-ciment"),

  // ─── 15-17 → Terrasse, Rezé (avant / après) ────────────────────────
  item("15-terrasse-reze-avant", "15", 1205, 1600,
    "Terrasse en dalles damier fortement encrassée avant traitement à Rezé",
    "Terrasse en dalles encrassée — avant", "Avant / Après", undefined, "Rezé"),
  item("16-terrasse-reze-apres", "16", 1600, 1205,
    "Terrasse en dalles damier nettoyée et ravivée après traitement choc à Rezé",
    "Terrasse ravivée — Rezé", "Avant / Après", undefined, "Rezé"),
  item("17-terrasse-reze-veranda", "17", 1600, 1205,
    "Terrasse carrelée nettoyée devant une véranda à Rezé, sol humide après rinçage",
    "Terrasse carrelée nettoyée — Rezé", "Façade & bardage", undefined, "Rezé"),

  // ─── 18 → Signalétique, Rezé ───────────────────────────────────────
  item("18-panneau-reze", "18", 1205, 1600,
    "Panneau publicitaire Alti' Drone & Services devant une maison à Rezé",
    "Panneau Alti' Drone à Rezé", "Le drone en action", undefined, "Rezé"),

  // ─── 19 → Drone et rampe de pulvérisation ──────────────────────────
  item("19-drone-rampe-pulverisation", "19", 1600, 1172,
    "Drone hexacoptère de pulvérisation Alti' Drone avec sa rampe déployée, posé au sol",
    "Drone de pulvérisation au sol", "Le drone en action"),

  // ─── 20-22 → Saint-Brévin-les-Pins ─────────────────────────────────
  item("20-drone-toiture-st-brevin", "20", 1205, 1600,
    "Drone en vol au-dessus de la toiture en tuiles d'une maison en pierre à Saint-Brévin-les-Pins",
    "Drone en vol sur toiture — Saint-Brévin", "Toiture", "tuiles", "Saint-Brévin-les-Pins"),
  item("21-panneau-st-brevin", "21", 1205, 1600,
    "Panneau publicitaire Alti' Drone & Services fixé sur une clôture à Saint-Brévin-les-Pins",
    "Panneau Alti' Drone à Saint-Brévin", "Le drone en action", undefined, "Saint-Brévin-les-Pins"),
  item("22-drone-toiture-etage-st-brevin", "22", 1268, 1600,
    "Drone en vol traitant la toiture d'une maison à étage à Saint-Brévin-les-Pins",
    "Traitement toiture par drone — Saint-Brévin", "Toiture", "traitement-de-toiture", "Saint-Brévin-les-Pins"),

  // ─── 23 → Drone au sol, canne de pulvérisation ─────────────────────
  item("23-drone-canne-pulverisation", "23", 1205, 1600,
    "Drone hexacoptère Alti' Drone posé sur une pelouse, canne de pulvérisation déployée",
    "Drone au sol, canne déployée", "Le drone en action"),

  // ─── 24 → Drone sur bardage métallique ─────────────────────────────
  item("24-drone-bardage-metallique", "24", 1205, 1600,
    "Drone en vol nettoyant un bardage métallique vertical sur une maison à étage",
    "Drone en vol sur bardage métallique", "Façade & bardage", "nettoyage-bardage-metallique"),

  // ─── 25 → Rinçage du drone ─────────────────────────────────────────
  item("25-rincage-drone", "25", 1205, 1600,
    "Rinçage au jet d'eau d'un drone de nettoyage posé au sol après une intervention",
    "Rinçage du drone après chantier", "Le drone en action"),

  // ─── 26 → Signalétique, Saint-Brévin ───────────────────────────────
  item("26-panneau-st-brevin-portail", "26", 1205, 1600,
    "Panneau publicitaire Alti' Drone & Services fixé sur un portail à Saint-Brévin-les-Pins",
    "Panneau de chantier — Saint-Brévin", "Le drone en action", undefined, "Saint-Brévin-les-Pins"),

  // ─── 27-28 → Toitures tuiles pulvérisées (vue aérienne) ────────────
  item("27-toiture-tuiles-pulverisee-la-plaine", "27", 1600, 900,
    "Vue aérienne d'une toiture en tuiles fraîchement pulvérisée à l'anti-mousse à La Plaine-sur-Mer",
    "Toiture tuiles traitée à l'anti-mousse", "Toiture", "tuiles", "La Plaine-sur-Mer"),
  item("28-toiture-tuiles-pulverisee-st-michel", "28", 1600, 900,
    "Vue aérienne d'une toiture en tuiles traitée à l'anti-mousse à action lente à Saint-Michel-Chef-Chef",
    "Toiture tuiles après pulvérisation", "Toiture", "tuiles", "Saint-Michel-Chef-Chef"),

  // ─── 29 → Télépilote, fourgon, drone ───────────────────────────────
  item("29-telepilote-fourgon-drone", "29", 1600, 999,
    "Télépilote devant le fourgon floqué Alti' Drone & Services, drone de nettoyage posé au sol",
    "Télépilote, fourgon et drone au sol", "Le drone en action"),

  // ─── 30-34 → Drone toitures tuiles, Pornic ─────────────────────────
  item("30-drone-tuiles-pornic", "30", 1205, 1600,
    "Drone en vol pulvérisant un anti-mousse sur une toiture en tuiles à Pornic",
    "Drone en vol pulvérisant la toiture", "Toiture", "tuiles", "Pornic"),
  item("31-drone-tuiles-pornic-materiel", "31", 1600, 1205,
    "Drone en vol pulvérisant un anti-mousse sur une toiture en tuiles, matériel au sol à Pornic",
    "Drone en action sur toiture — Pornic", "Toiture", "tuiles", "Pornic"),
  item("32-drone-tuiles-pornic-tuyaux", "32", 1205, 1600,
    "Drone en vol pulvérisant la toiture, pulvérisateur et tuyaux de chantier au premier plan à Pornic",
    "Drone et matériel de pulvérisation", "Toiture", "tuiles", "Pornic"),
  item("33-drone-tuiles-pornic-pavillon", "33", 1205, 1600,
    "Drone en vol pulvérisant un anti-mousse sur la toiture en tuiles d'un pavillon à Pornic",
    "Anti-mousse par drone sur tuiles", "Toiture", "traitement-de-toiture", "Pornic"),
  item("34-drone-tuiles-pornic-plain-pied", "34", 1205, 1600,
    "Drone pulvérisant un anti-mousse au-dessus d'une toiture en tuiles de plain-pied à Pornic",
    "Traitement de toiture par drone — Pornic", "Toiture", "traitement-de-toiture", "Pornic"),

  // ─── 35-42 → Bardage PVC ───────────────────────────────────────────
  item("35-bardage-pvc-avant", "35", 1600, 1205,
    "Bardage PVC blanc encrassé par des traces vertes et des salissures avant nettoyage",
    "Bardage PVC encrassé — avant", "Façade & bardage", "nettoyage-bardage-pvc"),
  item("36-bardage-pvc-avant-detail", "36", 1600, 1205,
    "Bardage PVC blanc avec traces vertes et coulures de pollution avant nettoyage",
    "Salissures vertes sur bardage PVC", "Façade & bardage", "nettoyage-bardage-pvc"),
  item("37-bardage-pvc-apres", "37", 1600, 1205,
    "Bardage PVC blanc redevenu propre après nettoyage sans haute pression",
    "Bardage PVC propre — après", "Façade & bardage", "nettoyage-bardage-pvc"),
  item("38-bardage-pvc-apres-detail", "38", 1600, 1205,
    "Bardage PVC blanc nettoyé sans trace verte après intervention, sans haute pression",
    "Résultat après nettoyage du bardage PVC", "Façade & bardage", "nettoyage-bardage-pvc"),
  item("39-bardage-pvc-perche-pornic", "39", 1205, 1600,
    "Nettoyage d'un bardage PVC blanc à la perche à brosse avec produit dilué à Pornic",
    "Nettoyage du bardage PVC à la perche", "Façade & bardage", "nettoyage-bardage-pvc", "Pornic"),
  item("40-bardage-pvc-pignon-pornic", "40", 1205, 1600,
    "Pignon en bardage PVC clair propre après nettoyage à la perche à brosse à Pornic",
    "Pignon en bardage PVC propre", "Façade & bardage", "nettoyage-bardage-pvc", "Pornic"),
  item("41-bardage-pvc-annexe-pornic", "41", 1205, 1600,
    "Pignon d'annexe en bardage PVC blanc nettoyé, sol mouillé après rinçage à Pornic",
    "Bardage PVC nettoyé — Pornic", "Façade & bardage", "nettoyage-bardage-pvc", "Pornic"),
  item("42-bardage-pvc-facade-pornic", "42", 1600, 1205,
    "Longue façade latérale en bardage PVC blanc avec volets, nettoyée à Pornic",
    "Bardage PVC blanc nettoyé — Pornic", "Façade & bardage", "nettoyage-bardage-pvc", "Pornic"),

  // ─── 43 → Signalétique, Saint-Michel ───────────────────────────────
  item("43-panneau-st-michel", "43", 1205, 1600,
    "Panneau publicitaire Alti' Drone & Services « Toiture traitée par drone » sur un chantier à Saint-Michel-Chef-Chef",
    "Panneau Alti' Drone sur chantier", "Le drone en action", undefined, "Saint-Michel-Chef-Chef"),

  // ─── 44-48 → Préparation toiture (aiguilles de pins) ───────────────
  item("44-tuiles-aiguilles-degagees", "44", 1205, 1600,
    "Toiture en tuiles canal débarrassée des aiguilles de pins avant pulvérisation à Saint-Michel-Chef-Chef",
    "Tuiles dégagées des aiguilles de pins", "Toiture", "tuiles", "Saint-Michel-Chef-Chef"),
  item("45-tuiles-pretes-pulverisation", "45", 1600, 1205,
    "Toiture en tuiles canal nettoyée des aiguilles de pins, prête à la pulvérisation anti-mousse",
    "Tuiles prêtes à la pulvérisation", "Toiture", "tuiles", "Saint-Michel-Chef-Chef"),
  item("46-noue-aiguilles-pins", "46", 1205, 1600,
    "Noue de toiture en tuiles bouchée par les aiguilles de pins, avec perche de nettoyage",
    "Noue bouchée par les aiguilles de pins", "Toiture", "tuiles", "Saint-Michel-Chef-Chef"),
  item("47-balayage-aiguilles-pins", "47", 1600, 1205,
    "Nettoyage et balayage des aiguilles de pins sur une toiture en tuiles à la perche",
    "Balayage des aiguilles de pins", "Toiture", "tuiles", "Saint-Michel-Chef-Chef"),
  item("48-tuiles-apres-balayage", "48", 1600, 1205,
    "Toiture en tuiles canal après balayage des aiguilles de pins, vue d'ensemble à Saint-Michel-Chef-Chef",
    "Tuiles après balayage des aiguilles", "Toiture", "tuiles", "Saint-Michel-Chef-Chef"),

  // ─── 49-52 → Le drone et son matériel ──────────────────────────────
  item("49-drone-pret-decoller", "49", 1600, 900,
    "Drone de pulvérisation posé sur la pelouse près d'une maison, prêt à décoller (vue aérienne)",
    "Drone au sol prêt à décoller", "Le drone en action"),
  item("50-drone-vue-ciel", "50", 1600, 900,
    "Vue aérienne en plongée d'un drone de nettoyage posé sur une pelouse, tuyaux déroulés au sol",
    "Drone au sol vu du ciel", "Le drone en action"),
  item("51-drone-cour-maison", "51", 1205, 1600,
    "Drone de pulvérisation posé dans une cour devant une maison, tuyau et motopompe à proximité",
    "Drone prêt pour la pulvérisation", "Le drone en action"),
  item("52-drone-fourgon-canne", "52", 1205, 1600,
    "Drone hexacoptère posé devant un fourgon, canne de pulvérisation déployée au premier plan",
    "Drone et canne de pulvérisation", "Le drone en action"),

  // ─── 53 → Drone ardoises, Saint-Jean-de-Boiseau ────────────────────
  item("53-drone-ardoises-st-jean", "53", 1205, 1600,
    "Drone en vol pulvérisant une toiture en ardoises naturelles encrassée à Saint-Jean-de-Boiseau",
    "Pulvérisation drone sur ardoises", "Toiture", "ardoises-naturelles", "Saint-Jean-de-Boiseau"),

  // ─── 54 → Réservoir et motopompe ───────────────────────────────────
  item("54-reservoir-motopompe", "54", 1205, 1600,
    "Réservoir sur chariot relié à une motopompe avec bidons de produit, matériel de traitement",
    "Réservoir et motopompe du chantier", "Le drone en action"),

  // ─── 55-56 → Signalétique, Saint-Jean-de-Boiseau ───────────────────
  item("55-panneau-st-jean-rambarde", "55", 1205, 1600,
    "Panneau publicitaire Alti' Drone & Services « Toiture traitée par drone » à Saint-Jean-de-Boiseau",
    "Panneau de chantier — Saint-Jean", "Le drone en action", undefined, "Saint-Jean-de-Boiseau"),
  item("56-panneau-st-jean-portail", "56", 1205, 1600,
    "Panneau publicitaire Alti' Drone & Services sur un portail à Saint-Jean-de-Boiseau",
    "Panneau de chantier sur portail", "Le drone en action", undefined, "Saint-Jean-de-Boiseau"),

  // ─── 57-58 → Zone de décollage (vue aérienne) ──────────────────────
  item("57-zone-decollage-telepilote", "57", 1600, 900,
    "Vue aérienne d'une zone de décollage avec drone au sol et télépilote en gilet rouge",
    "Zone de décollage et drone au sol", "Le drone en action"),
  item("58-zone-decollage-ciel", "58", 1600, 900,
    "Vue aérienne d'une zone de décollage de drone avec télépilote et plateforme, toiture au premier plan",
    "Zone de décollage vue du ciel", "Le drone en action"),

  // ─── 59-61 → Toitures tuiles traitées (vue aérienne) ───────────────
  item("59-toiture-tuiles-la-plaine", "59", 1600, 900,
    "Vue aérienne d'une toiture en tuiles traitée à l'anti-mousse à La Plaine-sur-Mer",
    "Toiture en tuiles traitée anti-mousse", "Toiture", "tuiles", "La Plaine-sur-Mer"),
  item("60-toiture-tuiles-la-plaine-detail", "60", 1600, 900,
    "Vue aérienne rapprochée d'une toiture en tuiles fraîchement traitée à La Plaine-sur-Mer",
    "Tuiles fraîchement traitées — vue drone", "Toiture", "tuiles", "La Plaine-sur-Mer"),
  item("61-villa-tuiles-st-michel", "61", 1600, 900,
    "Vue aérienne d'une villa avec une grande toiture en tuiles traitée à Saint-Michel-Chef-Chef",
    "Toiture de villa en tuiles traitée", "Toiture", "tuiles", "Saint-Michel-Chef-Chef"),

  // ─── 62 → Préparation du mélange ───────────────────────────────────
  item("62-preparation-cuve", "62", 1205, 1600,
    "Préparation du mélange dans une cuve sur motopompe avant le traitement par drone",
    "Préparation du mélange dans la cuve", "Le drone en action"),

  // ─── 63-65 → Avant / après toitures (vue aérienne composite) ───────
  item("63-avant-apres-tuiles-la-plaine", "63", 1600, 635,
    "Comparaison avant / après en vue aérienne d'une toiture en tuiles traitée à La Plaine-sur-Mer",
    "Avant / après traitement de tuiles", "Avant / Après", "tuiles", "La Plaine-sur-Mer"),
  item("64-avant-apres-demoussage-la-plaine", "64", 1600, 736,
    "Vue aérienne avant / après d'une toiture en tuiles démoussée par drone à La Plaine-sur-Mer",
    "Avant / après démoussage de toiture", "Avant / Après", "tuiles", "La Plaine-sur-Mer"),
  item("65-avant-apres-toiture-la-plaine", "65", 1600, 743,
    "Comparaison avant / après en vue aérienne de toitures en tuiles traitées à La Plaine-sur-Mer",
    "Avant / après toiture en tuiles", "Avant / Après", "tuiles", "La Plaine-sur-Mer"),
] as const;

/** Récupère un item de galerie par son id (utilisé pour les images de mise en avant). */
export function getGalleryItem(id: string): GalleryItem {
  return galerie.find((g) => g.id === id) ?? galerie[0];
}

/**
 * Sélection mise en avant (mosaïque bento de la page d'accueil).
 * Les plus beaux visuels « drone en action » et résultats, dans un ordre étudié
 * pour la composition asymétrique (1er item = grande tuile).
 */
export const galerieFeatured: readonly GalleryItem[] = [
  getGalleryItem("64-avant-apres-demoussage-la-plaine"),
  getGalleryItem("11-drone-antimousse-tuiles"),
  getGalleryItem("30-drone-tuiles-pornic"),
  getGalleryItem("06-drone-panneaux-solaires"),
  getGalleryItem("27-toiture-tuiles-pulverisee-la-plaine"),
  getGalleryItem("04-drone-tuiles-la-plaine"),
];

/** Image « à propos » (portrait drone en action, section fondateur sur l'accueil). */
export const aboutImage: GalleryItem = getGalleryItem("04-drone-tuiles-la-plaine");

/**
 * Comparatifs avant / après interactifs (slider) — paires de photos distinctes
 * de même cadrage. Les composites pré-assemblés (03, 63, 64, 65, 12) restent
 * dans la grille sous le filtre « Avant / Après ».
 */
export type BeforeAfterPair = {
  id: string;
  title: string;
  location?: string;
  service?: string;
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  /** Ratio commun aux deux images (pour un slider sans décalage). */
  aspectRatio: string;
};

export const beforeAfterPairs: readonly BeforeAfterPair[] = [
  {
    id: "facade-beton-coueron",
    title: "Façade béton désencrassée",
    location: "Couëron",
    service: "nettoyage-de-facade-en-enduit",
    beforeSrc: `${G}/01-full.webp`,
    afterSrc: `${G}/02-full.webp`,
    beforeAlt: "Façade béton encrassée de traces noires avant nettoyage à Couëron",
    afterAlt: "Façade béton propre après pulvérisation et rinçage basse pression à Couëron",
    aspectRatio: "4 / 3",
  },
  {
    id: "facade-enduit-algues",
    title: "Algues rouges éliminées",
    location: "Saint-Michel-Chef-Chef",
    service: "nettoyage-de-facade-en-enduit",
    beforeSrc: `${G}/07-full.webp`,
    afterSrc: `${G}/08-full.webp`,
    beforeAlt: "Mur en enduit contaminé par des algues rouges avant traitement à Saint-Michel-Chef-Chef",
    afterAlt: "Mur en enduit blanc et propre après traitement des algues rouges à Saint-Michel-Chef-Chef",
    aspectRatio: "3 / 4",
  },
  {
    id: "bardage-pvc",
    title: "Bardage PVC ravivé",
    service: "nettoyage-bardage-pvc",
    beforeSrc: `${G}/35-full.webp`,
    afterSrc: `${G}/37-full.webp`,
    beforeAlt: "Bardage PVC blanc encrassé par des traces vertes avant nettoyage",
    afterAlt: "Bardage PVC blanc propre après nettoyage sans haute pression",
    aspectRatio: "4 / 3",
  },
];

/** Vidéo YouTube hero (lien actuel du site, affichée sur la home). */
export const heroVideo = {
  youtubeId: "JnO-BLM7LTM",
  title: "Alti' Drone & Services — nettoyage par drone en action",
};

/** Vidéo YouTube additionnelle — affichée uniquement sur la page galerie. */
export const galerieVideo = {
  youtubeId: "A8WsZQgiNRc",
  title: "Alti' Drone & Services — démonstration de nettoyage par drone",
};

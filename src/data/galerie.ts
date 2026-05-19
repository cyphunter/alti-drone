/**
 * Galerie de chantiers — images depuis le site actuel (assets.zyrosite.com).
 * Le script `scripts/download-assets.mjs` les télécharge dans public/images/galerie/.
 *
 * Tant que `scripts/download-assets.mjs` n'a pas été exécuté, les URLs restent
 * pointées vers les originaux zyrosite (whitelistés dans next.config.ts CSP).
 */

export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  service?: string; // slug de la page service liée
  width: number;
  height: number;
};

const ZYROSITE = "https://assets.zyrosite.com/cdn-cgi/image/format=auto,fit=cover";

export const galerie: readonly GalleryItem[] = [
  {
    id: "toit-demoussage-1",
    src: `${ZYROSITE},w=1440/mp84wMEb64sEBBPm/capture-d-a-c-cran-2026-03-05-222401-GrxtPltUu42uJVQB.png`,
    alt: "Toiture en ardoises avant nettoyage par drone à Pornic",
    caption: "Toiture ardoises avant traitement — secteur Pornic",
    service: "traitement-de-toiture",
    width: 1440,
    height: 1019,
  },
  {
    id: "toit-demoussage-2",
    src: `${ZYROSITE},w=1440/mp84wMEb64sEBBPm/capture-d-a-c-cran-2026-04-14-112856-WplduuVNBL3vCmrQ.png`,
    alt: "Toiture en cours de démoussage par drone Alti' Drone Services",
    caption: "Démoussage en cours — application produit action lente",
    service: "traitement-de-toiture",
    width: 1440,
    height: 756,
  },
  {
    id: "tuiles-chantier",
    src: `${ZYROSITE},w=1440/mp84wMEb64sEBBPm/capture-daa-c-cran-2026-01-28-174341-z34EuHSC98sSnwU3.png`,
    alt: "Tuiles terre cuite encrassées avant intervention",
    caption: "Tuiles terre cuite — avant intervention",
    service: "tuiles",
    width: 1440,
    height: 1159,
  },
  {
    id: "facade-bardage",
    src: `${ZYROSITE},w=1440/mp84wMEb64sEBBPm/capture-daa-c-cran-2026-01-28-175110-MWdwgwDYc4yvHDlc.png`,
    alt: "Façade et bardage nettoyés par drone — Pays de Retz",
    caption: "Nettoyage façade & bardage",
    service: "nettoyage-facade-bardage",
    width: 1440,
    height: 1406,
  },
  {
    id: "drone-vol",
    src: `${ZYROSITE},w=1440/mp84wMEb64sEBBPm/mvimg_20260320_100705-XVhSEnDOjFS7Ofxi.jpg`,
    alt: "Drone professionnel Alti' Drone Services en vol au-dessus d'un chantier",
    caption: "Drone professionnel en vol",
    width: 1440,
    height: 1914,
  },
  {
    id: "inspection",
    src: `${ZYROSITE},w=1440/mp84wMEb64sEBBPm/mvimg_20260317_104713-sOgFwhM17kUCYQlu.jpg`,
    alt: "Inspection technique d'une toiture par drone — Loire-Atlantique",
    caption: "Inspection technique de toiture",
    service: "traitement-de-toiture",
    width: 1440,
    height: 1159,
  },
  {
    id: "hero-action",
    src: `${ZYROSITE},w=1920/mp84wMEb64sEBBPm/651763254_122117680869200770_3613438175520487822_n-WMxVxRSE1FxEGg2s.jpg`,
    alt: "Allan Bouguendoura — pilote de drone Alti' Drone & Services",
    caption: "Allan Bouguendoura, fondateur",
    width: 1920,
    height: 1280,
  },
  {
    id: "tuiles-zoom",
    src: `${ZYROSITE},w=1440/mp84wMEb64sEBBPm/capture-daa-c-cran-2026-03-13-133611-3AWiULQ17Q8g4uPV.png`,
    alt: "Détail de tuiles après traitement hydrofuge",
    caption: "Détail tuiles — après hydrofuge",
    service: "traitement-de-toiture",
    width: 1440,
    height: 1440,
  },
  {
    id: "chantier-bardage",
    src: `${ZYROSITE},w=1440/mp84wMEb64sEBBPm/1000013801-WzTHv0jJNDHDcg21.jpg`,
    alt: "Bardage métallique nettoyé par drone — chantier professionnel",
    caption: "Bardage métallique — bâtiment professionnel",
    service: "nettoyage-bardage-metallique",
    width: 1440,
    height: 1080,
  },
] as const;

/** Vidéo YouTube hero (lien actuel du site). */
export const heroVideo = {
  youtubeId: "JnO-BLM7LTM",
  title: "Alti' Drone & Services — nettoyage par drone en action",
};

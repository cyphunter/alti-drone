/**
 * Source unique de vérité pour les informations du site Alti' Drone & Services.
 *
 * Le client (Allan) ou Kevin peut éditer ce fichier pour mettre à jour
 * coordonnées, slogans, navigation, mentions légales — sans toucher au reste du code.
 *
 * Le contenu plus volumineux (services, zones, galerie, FAQ, témoignages, stats)
 * est dans `src/data/*.ts` — un fichier par sujet.
 */

export const siteConfig = {
  // ─── Identité ─────────────────────────────────────────────────────
  name: "Alti' Drone & Services",
  shortName: "Alti' Drone",
  legalName: "ALTI' DRONE & SERVICES",
  baseline: "Nettoyage de toiture par drone à Pornic (Pays de Retz)",
  description:
    "Spécialiste du nettoyage et de l'entretien de toiture, façade, bardage et panneaux solaires par drone. Intervention en Loire-Atlantique : Pornic, La Plaine-sur-Mer, Saint-Brévin et tout le Pays de Retz. Devis gratuit.",

  // ─── URL & locale ────────────────────────────────────────────────
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://altidroneservices.fr",
  locale: "fr-FR",
  language: "fr",

  // ─── Contact ─────────────────────────────────────────────────────
  contact: {
    phone: "+33649452988",
    phoneDisplay: "06 49 45 29 88",
    email: "altidroneservices@gmail.com",
    address: "15B Allée Alphonse Convenant",
    postalCode: "44770",
    city: "La Plaine-sur-Mer",
    region: "Pays de la Loire",
    department: "Loire-Atlantique",
    country: "FR",
    countryName: "France",
    geo: { latitude: 47.1393, longitude: -2.1929 },
    openingHours: ["Mo-Sa 08:00-18:00"],
    openingHoursLabel: "Lundi — Samedi · 8h–18h",
    serviceRadiusKm: 60,
    primaryServiceArea: "Pornic & Pays de Retz",
  },

  // ─── Réseaux sociaux ─────────────────────────────────────────────
  social: {
    instagram: "https://www.instagram.com/alti_drone_services_44/",
    facebook: "",
    linkedin: "",
  },

  // ─── Mentions légales ────────────────────────────────────────────
  legal: {
    structure: "Entreprise individuelle",
    siret: "999 671 738 00014",
    siren: "999 671 738",
    publisher: "Allan Bouguendoura",
    foundedYear: 2025,
    host: {
      name: "Cloudflare Inc.",
      address: "101 Townsend Street, San Francisco, CA 94107, USA",
      url: "https://www.cloudflare.com",
    },
    dpoEmail: "altidroneservices@gmail.com",
  },

  // ─── Navigation principale ───────────────────────────────────────
  // « Accueil » n'est pas listé : le logo en haut à gauche y ramène déjà.
  navigation: [
    {
      label: "Services",
      href: "/services",
      children: [
        { label: "Traitement de toiture", href: "/traitement-de-toiture" },
        { label: "Tuiles", href: "/tuiles" },
        { label: "Ardoises naturelles", href: "/ardoises-naturelles" },
        { label: "Ardoises fibro-ciment", href: "/ardoises-fibro-ciment" },
        { label: "Nettoyage façade & bardage", href: "/nettoyage-facade-bardage" },
        { label: "Façade en enduit", href: "/nettoyage-de-facade-en-enduit" },
        { label: "Bardage métallique", href: "/nettoyage-bardage-metallique" },
        { label: "Bardage PVC", href: "/nettoyage-bardage-pvc" },
        { label: "Panneaux solaires", href: "/nettoyage-des-panneaux-solaires" },
      ],
    },
    { label: "Galerie", href: "/galeriedrone" },
    { label: "Contact", href: "/contactdrone" },
  ],

  // ─── Navigation footer (légal) ───────────────────────────────────
  footerNavigation: [
    { label: "Mentions légales", href: "/mentions-legales" },
    { label: "Politique de confidentialité", href: "/confidentialite" },
  ],

  // ─── Bandeau d'offre (mettre enabled: false pour désactiver) ─────
  promoBanner: {
    enabled: true,
    text: "Offre de lancement — tarif préférentiel sur vos prestations",
    ctaLabel: "Devis gratuit",
    ctaHref: "/contactdrone",
  },

  // ─── SEO / vérifications moteurs de recherche / branding ─────────
  seo: {
    /** Mots-clés repris dans la balise <meta name="keywords"> du layout. */
    globalKeywords: [
      "nettoyage toiture drone",
      "démoussage drone Pornic",
      "nettoyage façade drone",
      "nettoyage panneaux solaires drone",
      "hydrofuge toiture",
      "anti-mousse toiture",
      "télépilote DGAC",
      "Pornic 44",
      "Pays de Retz",
      "Loire-Atlantique",
      "Saint-Brévin",
      "La Plaine-sur-Mer",
      "nettoyage bardage drone",
      "inspection toiture drone",
    ] as readonly string[],
    /** Couleurs marque réutilisées dans les OG images / icônes générées dynamiquement. */
    brandColors: {
      primary: "#061a2e",
      accent: "#f4b400",
      paper: "#f3f1ec",
    },
    /** Handle Twitter (sans @). Vide si pas de compte. */
    twitterHandle: "" as string,
    /** Code de vérification Google Search Console (meta google-site-verification). */
    googleSiteVerification: "" as string,
    /** Code de vérification Bing Webmaster Tools (meta msvalidate.01). */
    bingSiteVerification: "" as string,
  },
} as const;

export type SiteConfig = typeof siteConfig;

/**
 * Construit une URL absolue canonique à partir d'un chemin.
 * Ex: canonicalUrl("/services") → "https://altidroneservices.fr/services"
 */
export function canonicalUrl(path: string): string {
  const base = siteConfig.url.replace(/\/+$/, "");
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${base}${clean === "/" ? "" : clean}`;
}

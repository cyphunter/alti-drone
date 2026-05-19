/**
 * Pages locales SEO — une par ville cœur du secteur d'intervention.
 *
 * Objectif : créer des portes d'entrée locales sur Google pour les requêtes
 * type « nettoyage toiture drone {ville} », « démoussage drone {ville} ».
 * Chaque page a un contenu unique (climat local, patrimoine bâti dominant,
 * particularités) pour éviter le duplicate content.
 *
 * Garder le slug court et naturel (les mots-clés vont dans le titre / h1 / meta).
 */

export type LocalPage = {
  /** Slug de la route : src/app/{slug}/page.tsx — sans accent, en kebab-case. */
  slug: string;
  /** Nom officiel de la commune avec accent. */
  city: string;
  /** Code postal principal. */
  postalCode: string;
  /** Distance approx depuis le siège (La Plaine-sur-Mer). */
  distanceKm: number;
  /** Coordonnées GPS de la mairie (pour JSON-LD Place). */
  geo: { latitude: number; longitude: number };
  /** Titre H1 de la page (1 seul). */
  h1: string;
  /** Eyebrow affiché au-dessus du H1 (code postal · département). */
  eyebrow: string;
  /** Méta-titre (≤ 60 caractères pour éviter troncature SERP). */
  metaTitle: string;
  /** Méta-description (~150 caractères, CTA + ville). */
  metaDescription: string;
  /** Mot-clé SEO principal — pour suivi de positionnement. */
  primaryKeyword: string;
  /** Phrase d'introduction (~2-3 phrases) située sous le H1. */
  intro: string;
  /** Paragraphe long localisé : climat, patrimoine, contexte (200-300 mots). */
  contextLocal: string;
  /** 3-4 particularités locales (puces) qui rendent le drone particulièrement adapté. */
  particularites: readonly string[];
  /** Communes voisines à mentionner (chips → SEO interne). */
  nearbyZones: readonly string[];
  /** FAQ spécifique à la ville (2-3 questions). */
  faq: readonly { question: string; answer: string }[];
};

export const localPages: readonly LocalPage[] = [
  // ─── Pornic ───────────────────────────────────────────────────
  {
    slug: "pornic",
    city: "Pornic",
    postalCode: "44210",
    distanceKm: 6,
    geo: { latitude: 47.1126, longitude: -2.1003 },
    h1: "Nettoyage par drone à Pornic",
    eyebrow: "Pornic · 44210 · Loire-Atlantique",
    metaTitle: "Nettoyage toiture & façade par drone à Pornic (44210)",
    metaDescription:
      "Démoussage de toiture, nettoyage de façade et panneaux solaires par drone à Pornic. Sans échafaudage, sans piétinement. Devis gratuit en 48 h.",
    primaryKeyword: "nettoyage toiture drone Pornic",
    intro:
      "Spécialiste du nettoyage par drone à Pornic, nous intervenons sur toitures, façades, bardages et panneaux solaires sans échafaudage et sans monter sur la couverture. Survol et devis gratuits, intervention rapide dans tout le Pays de Retz.",
    contextLocal:
      "Pornic, station balnéaire emblématique de la Côte de Jade, expose ses toitures à un climat atlantique exigeant : embruns marins, vents soutenus, alternance humidité–soleil. Le patrimoine bâti pornicais est particulièrement varié — vieilles maisons de pierre du centre historique, villas balnéaires Belle Époque, résidences secondaires modernes en bord de plage — chacun avec ses propres contraintes d'entretien. Les couvertures en tuiles canal, ardoises naturelles et tuiles béton souffrent du même fléau : mousses, lichens et noircissures qui retiennent l'humidité et fragilisent les matériaux. Notre approche par drone professionnel est particulièrement adaptée à Pornic, où les ruelles étroites du vieux Pornic, l'accessibilité limitée des villas de bord de mer et les copropriétés balnéaires rendent l'intervention en nacelle ou en échafaudage coûteuse et chronophage.",
    particularites: [
      "Forte exposition embruns marins en bord de plage et port de plaisance",
      "Accès ruelles étroites du centre historique : drone idéal",
      "Patrimoine balnéaire à préserver — pulvérisation contrôlée, pas de piétinement",
      "Demande syndic copropriétés en pleine croissance",
    ],
    nearbyZones: [
      "Le Clion-sur-Mer",
      "Sainte-Marie-sur-Mer",
      "La Plaine-sur-Mer",
      "Préfailles",
      "Saint-Michel-Chef-Chef",
      "La Bernerie-en-Retz",
    ],
    faq: [
      {
        question: "À quelle fréquence nettoyer sa toiture à Pornic ?",
        answer:
          "L'exposition marine à Pornic accélère l'encrassement : un démoussage tous les 2 à 4 ans est recommandé, plus rapproché en première ligne face à la mer. Un hydrofuge appliqué après traitement allonge ce délai à 5–7 ans.",
      },
      {
        question: "Intervenez-vous dans le centre historique de Pornic ?",
        answer:
          "Oui — le centre historique est précisément la zone où le drone fait la différence : ruelles étroites, accès limités, toitures hautes en tuiles canal anciennes. Aucun véhicule lourd, aucun échafaudage à monter, intervention en quelques heures.",
      },
      {
        question: "Pouvez-vous nettoyer une copropriété en bord de mer ?",
        answer:
          "Oui, les copropriétés balnéaires sont une partie importante de notre activité à Pornic. Devis sur dossier syndic, rapport photo HD remis pour archivage, planning adapté aux saisons touristiques.",
      },
    ],
  },

  // ─── La Plaine-sur-Mer ────────────────────────────────────────
  {
    slug: "la-plaine-sur-mer",
    city: "La Plaine-sur-Mer",
    postalCode: "44770",
    distanceKm: 0,
    geo: { latitude: 47.1393, longitude: -2.1929 },
    h1: "Nettoyage par drone à La Plaine-sur-Mer",
    eyebrow: "La Plaine-sur-Mer · 44770 · Loire-Atlantique",
    metaTitle: "Nettoyage toiture par drone à La Plaine-sur-Mer (44770)",
    metaDescription:
      "Démoussage de toiture, façade et panneaux solaires par drone à La Plaine-sur-Mer. Siège local — intervention immédiate, sans frais de déplacement.",
    primaryKeyword: "nettoyage toiture drone La Plaine-sur-Mer",
    intro:
      "La Plaine-sur-Mer est notre siège et notre terrain d'intervention quotidien : nettoyage de toitures, façades, bardages et panneaux solaires par drone, sans échafaudage. Survol et devis gratuits, intervention immédiate sans frais de déplacement.",
    contextLocal:
      "Commune balnéaire familiale de la Côte de Jade, La Plaine-sur-Mer accueille un mix unique de résidences principales et secondaires entre la Pointe Saint-Gildas, la plage Joalland et la plage des Cormiers. L'exposition continue aux vents atlantiques et aux embruns favorise une apparition rapide de mousses, lichens et algues sur les toitures — particulièrement sur les tuiles plates et ardoises naturelles qui dominent le bâti local. C'est ici qu'Alti' Drone & Services est implantée : intervention immédiate, sans frais de déplacement, parfaite connaissance du contexte climatique et du patrimoine bâti des Plainais. Notre approche par drone professionnel élimine les contraintes d'échafaudage, particulièrement précieuse pour les maisons à toits complexes ou aux accès limités du front de mer.",
    particularites: [
      "Siège local — aucun frais de déplacement, intervention rapide",
      "Tuiles plates et ardoises naturelles dominantes — méthode adaptée",
      "Exposition vent + embruns : encrassement rapide à anticiper",
      "Connaissance fine du bâti local et des contraintes côte de Jade",
    ],
    nearbyZones: [
      "Préfailles",
      "Pornic",
      "Saint-Michel-Chef-Chef",
      "Tharon-Plage",
      "La Bernerie-en-Retz",
      "Saint-Brévin-les-Pins",
    ],
    faq: [
      {
        question: "Quelle est votre disponibilité à La Plaine-sur-Mer ?",
        answer:
          "Étant implantés à La Plaine-sur-Mer, nous y intervenons en priorité, souvent sous quelques jours selon la météo. Aucun frais de déplacement n'est facturé sur la commune.",
      },
      {
        question: "Mon toit ardoise est-il compatible avec le nettoyage drone ?",
        answer:
          "Oui — l'ardoise naturelle (très présente à La Plaine-sur-Mer) est même un cas idéal pour le drone : aucun piétinement, donc aucun risque de fissure. Produit dosé pour le schiste, finition satinée préservée.",
      },
    ],
  },

  // ─── Préfailles ───────────────────────────────────────────────
  {
    slug: "prefailles",
    city: "Préfailles",
    postalCode: "44770",
    distanceKm: 4,
    geo: { latitude: 47.1357, longitude: -2.2188 },
    h1: "Nettoyage par drone à Préfailles",
    eyebrow: "Préfailles · 44770 · Loire-Atlantique",
    metaTitle: "Nettoyage toiture par drone à Préfailles (44770)",
    metaDescription:
      "Démoussage de toiture, façade et bardage par drone à Préfailles. Spécialiste embruns marins, sans échafaudage. Devis gratuit en 48 h.",
    primaryKeyword: "nettoyage toiture drone Préfailles",
    intro:
      "Préfailles est l'une des communes les plus exposées du Pays de Retz : nous y intervenons régulièrement pour le nettoyage de toitures et façades par drone, parfaitement adapté aux toitures usées par les embruns marins.",
    contextLocal:
      "Authentique village de la Côte de Jade, Préfailles présente un patrimoine bâti remarquable — maisons de pêcheurs en granit et ardoise, villas anciennes au bord de la Pointe Saint-Gildas, granges et hangars couverts en fibro-ciment historique. C'est aussi l'une des communes les plus exposées de Loire-Atlantique : la Pointe Saint-Gildas et les criques sauvages reçoivent un flux continu d'embruns marins et de vent océanique qui accélère le vieillissement des couvertures. Les toitures préfaillaises souffrent particulièrement : mousses persistantes, noircissures sur les ardoises, encrassement rapide des tuiles canal traditionnelles. Le drone est ici une solution premium — il permet d'accéder à des bâtiments isolés, en pleine zone exposée, sans installation lourde, et de traiter rapidement avant la saison touristique.",
    particularites: [
      "Embruns marins intenses (Pointe Saint-Gildas) — encrassement accéléré",
      "Patrimoine en pierre/ardoise/granit à préserver sans piétinement",
      "Bâti dispersé (maisons isolées) : déploiement drone rapide",
      "Forte présence de fibro-ciment ancien (granges, dépendances)",
    ],
    nearbyZones: [
      "La Plaine-sur-Mer",
      "Pornic",
      "Saint-Michel-Chef-Chef",
      "La Bernerie-en-Retz",
    ],
    faq: [
      {
        question: "Faut-il nettoyer plus souvent à Préfailles qu'ailleurs ?",
        answer:
          "Oui — la position de Préfailles à la pointe expose les toitures à une accumulation rapide de sel et d'humidité. Un démoussage tous les 2 à 3 ans est recommandé, suivi d'un hydrofuge pour ralentir la repousse des mousses.",
      },
      {
        question: "Pouvez-vous nettoyer une grange en fibro-ciment ancien ?",
        answer:
          "Oui — c'est précisément un cas d'usage idéal du drone : pas de contact mécanique, aucune abrasion sur un matériau pouvant contenir de l'amiante (cas du fibro pré-1997), aucun risque d'émission de fibres.",
      },
    ],
  },

  // ─── Saint-Michel-Chef-Chef ───────────────────────────────────
  {
    slug: "saint-michel-chef-chef",
    city: "Saint-Michel-Chef-Chef",
    postalCode: "44730",
    distanceKm: 8,
    geo: { latitude: 47.1791, longitude: -2.1442 },
    h1: "Nettoyage par drone à Saint-Michel-Chef-Chef",
    eyebrow: "Saint-Michel-Chef-Chef · 44730 · Loire-Atlantique",
    metaTitle: "Nettoyage toiture drone Saint-Michel-Chef-Chef (44730)",
    metaDescription:
      "Démoussage de toiture, façade et panneaux solaires par drone à Saint-Michel-Chef-Chef et Tharon-Plage. Sans nacelle, devis gratuit en 48 h.",
    primaryKeyword: "nettoyage toiture drone Saint-Michel-Chef-Chef",
    intro:
      "À Saint-Michel-Chef-Chef et Tharon-Plage, nous intervenons sur toitures, façades, bardages et panneaux solaires par drone professionnel. Une méthode rapide et sécurisée, idéale pour le bâti pavillonnaire et les villas balnéaires.",
    contextLocal:
      "Berceau des fameux Petits Beurres LU, Saint-Michel-Chef-Chef et son hameau côtier Tharon-Plage forment une station balnéaire familiale au patrimoine bâti contrasté : villas balnéaires fin XIXe et début XXe en front de mer, vagues de lotissements pavillonnaires récents en intérieur, mix de couvertures terre cuite, béton et ardoises naturelles. L'exposition aux vents d'ouest et aux embruns reste significative en bordure de plage tandis que les pavillons des rues secondaires souffrent davantage de l'humidité et de la végétation environnante. Notre intervention par drone s'adapte à ces deux profils : nettoyage rapide des grandes toitures pavillonnaires en tuile béton et traitement délicat des villas balnéaires anciennes, sans monter sur la couverture, sans piétinement et sans installation d'échafaudage qui ralentirait l'intervention.",
    particularites: [
      "Villas balnéaires anciennes en front de mer (ardoise, tuile)",
      "Pavillonnaire récent : grandes surfaces tuiles béton",
      "Demande syndic copropriétés en bord de plage (Tharon)",
      "Entretien tous les 3-4 ans en zone secondaire, plus en bord de mer",
    ],
    nearbyZones: [
      "Tharon-Plage",
      "La Plaine-sur-Mer",
      "Pornic",
      "Saint-Brévin-les-Pins",
      "Préfailles",
    ],
    faq: [
      {
        question: "Intervenez-vous à Tharon-Plage ?",
        answer:
          "Oui — Tharon-Plage fait partie de la commune de Saint-Michel-Chef-Chef et représente une part importante de nos interventions, notamment sur les villas balnéaires et copropriétés en front de mer.",
      },
      {
        question: "Pouvez-vous nettoyer un grand pavillon en tuile béton ?",
        answer:
          "Oui — le drone est particulièrement efficace sur les grandes surfaces : pulvérisation homogène, gain de temps majeur, aucun risque de casse comparé à une intervention humaine sur la toiture.",
      },
    ],
  },

  // ─── La Bernerie-en-Retz ──────────────────────────────────────
  {
    slug: "la-bernerie-en-retz",
    city: "La Bernerie-en-Retz",
    postalCode: "44760",
    distanceKm: 10,
    geo: { latitude: 47.0814, longitude: -2.0398 },
    h1: "Nettoyage par drone à La Bernerie-en-Retz",
    eyebrow: "La Bernerie-en-Retz · 44760 · Loire-Atlantique",
    metaTitle: "Nettoyage toiture par drone à La Bernerie-en-Retz (44760)",
    metaDescription:
      "Démoussage de toiture, façade, panneaux solaires par drone à La Bernerie-en-Retz. Spécialiste fibro-ciment et ardoises. Devis gratuit en 48 h.",
    primaryKeyword: "nettoyage toiture drone La Bernerie-en-Retz",
    intro:
      "À La Bernerie-en-Retz, nous intervenons sur le bâti varié de cette station balnéaire — pavillons, petits collectifs touristiques, granges anciennes — pour le nettoyage de toiture, façade et panneaux solaires par drone.",
    contextLocal:
      "Petite station balnéaire dynamique au sud du Pays de Retz, La Bernerie-en-Retz combine un bourg ancien, une plage de sable familiale, un golf et un parc résidentiel mixte. Le bâti local est représentatif des stations atlantiques du Sud-Loire : maisons individuelles à toiture mixte tuiles béton récentes / ardoises anciennes, nombreux fibro-ciment des années 60-70 sur granges et garages, petits collectifs touristiques avec couvertures parfois oubliées. La zone humide et la proximité d'étangs côtiers favorisent une apparition rapide de mousses et de lichens, particulièrement sur les pans nord et les toitures peu ensoleillées. Notre approche par drone permet d'intervenir vite et proprement sur ces typologies hétérogènes, sans aucun contact mécanique — précieux pour les fibro-ciment anciens qui ne supportent ni piétinement ni abrasion.",
    particularites: [
      "Forte présence de fibro-ciment ancien (drone = méthode la plus sûre)",
      "Mix tuiles béton récentes + ardoises sur bâti ancien",
      "Zone humide (étangs proches) — encrassement rapide en pan nord",
      "Petits collectifs touristiques : entretien périodique recommandé",
    ],
    nearbyZones: [
      "Les Moutiers-en-Retz",
      "Pornic",
      "Sainte-Pazanne",
      "La Plaine-sur-Mer",
    ],
    faq: [
      {
        question: "Le fibro-ciment ancien des granges peut-il être nettoyé ?",
        answer:
          "Oui — c'est même le cas où le drone fait toute la différence. Aucune abrasion mécanique, aucun risque d'émission de fibres si le matériau pose 1997 contient encore de l'amiante. Pulvérisation, séchage, rinçage à distance.",
      },
      {
        question: "Intervenez-vous sur le golf de la Bernerie ?",
        answer:
          "Oui — les bâtiments du golf et des résidences touristiques en bord de parcours font partie des clients que nous accompagnons. Intervention planifiée hors période de jeu pour éviter toute perturbation.",
      },
    ],
  },
] as const;

export const localPageSlugs = localPages.map((lp) => lp.slug);

export function getLocalPage(slug: string): LocalPage {
  const lp = localPages.find((x) => x.slug === slug);
  if (!lp) throw new Error(`Page locale inconnue : ${slug}`);
  return lp;
}

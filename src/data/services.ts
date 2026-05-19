/**
 * Catalogue des prestations Alti' Drone & Services.
 * Chaque entrée alimente :
 *   • la page service dédiée `/{slug}` (via ServiceTemplate)
 *   • la grille du hub `/services`
 *   • les cards de la home
 *   • les liens internes croisés (relatedSlugs)
 *   • les JSON-LD Service + FAQPage
 */

import type { LucideIcon } from "lucide-react";
import {
  Sprout,
  Building2,
  PanelTop,
  ShieldCheck,
  Layers,
  PaintBucket,
  Boxes,
  Mountain,
} from "lucide-react";

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type Service = {
  /** Slug = nom du dossier dans src/app/ — ne pas changer sans 301. */
  slug: string;
  title: string;
  h1: string;
  shortTitle: string;
  /** Description courte affichée dans les cards (≤ 160 caractères). */
  description: string;
  /** Mot-clé principal pour SEO. */
  primaryKeyword: string;
  metaTitle: string;
  metaDescription: string;
  icon: LucideIcon;
  /** Tag : "Toiture" | "Façade" | "Solaire" | "Aérien" — pour groupement hub. */
  group: "Toiture" | "Façade" | "Solaire" | "Aérien";
  /** Bloc « En quelques mots » : 2-3 phrases d'intro. */
  intro: string;
  /** Bullet points avantages (3-5 items courts). */
  avantages: readonly string[];
  /** Méthode / déroulé d'une intervention (3-5 étapes). */
  methode: readonly { titre: string; texte: string }[];
  /** Matériaux ou supports traités. */
  supports: readonly string[];
  /** Indication de durée typique (texte libre). */
  duree?: string;
  /** Prix indicatif (laisser vide pour ne pas afficher). */
  prixIndicatif?: string;
  /** ID d'image héro (clé dans galerie.ts) ou URL absolue. */
  heroImage?: string;
  /** Slugs des services connexes à proposer en bas de page. */
  relatedSlugs: readonly string[];
  /** FAQ spécifique à la page (en plus de la FAQ générale). */
  faq: readonly ServiceFaq[];
};

const ZYROSITE = "https://assets.zyrosite.com/cdn-cgi/image/format=auto,fit=cover";

export const services: readonly Service[] = [
  // ─── 1. Traitement de toiture ────────────────────────────────
  {
    slug: "traitement-de-toiture",
    title: "Traitement de toiture",
    h1: "Démoussage et traitement de toiture par drone",
    shortTitle: "Traitement toiture",
    description:
      "Démoussage, anti-mousse curatif et préventif, hydrofuge longue durée. Toutes couvertures — intervention sécurisée par drone.",
    primaryKeyword: "démoussage toiture drone Pornic",
    metaTitle: "Démoussage & traitement de toiture par drone | Pornic (44)",
    metaDescription:
      "Démoussage, anti-mousse et hydrofuge pour toitures de Pornic et du Pays de Retz. Intervention par drone, sans échafaudage, devis gratuit en 48h.",
    icon: Sprout,
    group: "Toiture",
    intro:
      "Le climat atlantique du Pays de Retz favorise l'apparition de mousses, lichens et algues sur les toitures. Notre traitement complet par drone restaure l'aspect d'origine de la couverture, protège les matériaux et prolonge leur durée de vie — sans monter d'échafaudage ni intervenir directement sur les tuiles.",
    avantages: [
      "Pulvérisation homogène sans piétinement de la toiture",
      "Produit anti-mousse à action lente, longue rémanence",
      "Compatible toutes couvertures (tuiles, ardoises, fibro, bac acier, zinc)",
      "Hydrofuge optionnel pour imperméabiliser le support",
      "Inspection photo/vidéo HD remise au client",
    ],
    methode: [
      {
        titre: "Inspection préalable",
        texte:
          "Survol du toit en HD pour cartographier les zones encrassées, identifier les tuiles cassées, l'état des solins et des faîtages.",
      },
      {
        titre: "Application anti-mousse",
        texte:
          "Pulvérisation par drone d'un anti-mousse curatif et préventif, dosé selon le support. Action progressive sur plusieurs semaines.",
      },
      {
        titre: "Hydrofuge (option)",
        texte:
          "Après séchage, application d'un hydrofuge filmogène ou pénétrant pour protéger la toiture contre l'eau, le gel et la repousse.",
      },
      {
        titre: "Rapport client",
        texte:
          "Remise des photos/vidéos d'inspection et conseils d'entretien pour pérenniser le résultat.",
      },
    ],
    supports: [
      "Tuiles terre cuite",
      "Tuiles béton",
      "Ardoises naturelles",
      "Ardoises fibro-ciment",
      "Bac acier",
      "Zinc",
      "Shingle",
    ],
    duree: "1/2 à 1 journée selon surface",
    heroImage: `${ZYROSITE},w=1920/mp84wMEb64sEBBPm/capture-d-a-c-cran-2026-03-05-222401-GrxtPltUu42uJVQB.png`,
    relatedSlugs: ["tuiles", "ardoises-naturelles", "ardoises-fibro-ciment", "nettoyage-des-panneaux-solaires"],
    faq: [
      {
        question: "Combien de temps après le traitement la toiture est-elle propre ?",
        answer:
          "L'anti-mousse à action lente agit progressivement sur 4 à 12 semaines : les mousses se décollent puis sont éliminées par la pluie. Le résultat final est visible après une saison complète.",
      },
      {
        question: "Faut-il être présent pendant l'intervention ?",
        answer:
          "Non, votre présence n'est pas nécessaire. Nous intervenons depuis votre extérieur (jardin, allée) sans accès à l'intérieur du logement.",
      },
    ],
  },

  // ─── 2. Tuiles ────────────────────────────────────────────────
  {
    slug: "tuiles",
    title: "Nettoyage tuiles",
    h1: "Nettoyage de tuiles terre cuite et béton par drone",
    shortTitle: "Tuiles",
    description:
      "Démoussage et entretien spécifique pour tuiles terre cuite ou béton. Pulvérisation contrôlée, respect du matériau, longue rémanence.",
    primaryKeyword: "nettoyage tuiles drone Loire-Atlantique",
    metaTitle: "Nettoyage de tuiles terre cuite & béton par drone | Pays de Retz",
    metaDescription:
      "Démoussage de tuiles terre cuite et béton par drone à Pornic, La Plaine-sur-Mer et tout le Pays de Retz. Aucun piétinement, aucune casse — devis gratuit.",
    icon: Layers,
    group: "Toiture",
    intro:
      "Les tuiles, qu'elles soient en terre cuite ou en béton, accumulent mousses et lichens qui retiennent l'humidité et fragilisent la couverture. Notre traitement par drone préserve l'intégrité de chaque tuile : pas de marche sur le toit, donc aucun risque de fissure ou de décalage.",
    avantages: [
      "Aucun piétinement de la couverture",
      "Anti-mousse adapté à la porosité de la terre cuite ou du béton",
      "Conserve la patine naturelle des tuiles anciennes",
      "Inspection complète des faîtages, solins et noues",
    ],
    methode: [
      {
        titre: "Repérage et diagnostic",
        texte:
          "Survol drone pour repérer les tuiles cassées, déplacées, ou nécessitant un remplacement.",
      },
      {
        titre: "Traitement anti-mousse",
        texte:
          "Pulvérisation d'un produit dosé selon le type de tuile et le niveau d'encrassement.",
      },
      {
        titre: "Rapport et conseils",
        texte:
          "Photos HD remises, recommandations sur les tuiles à remplacer (intervention couvreur si besoin).",
      },
    ],
    supports: [
      "Tuiles terre cuite plates",
      "Tuiles canal",
      "Tuiles mécaniques (Romane, Méridionale, Galéane)",
      "Tuiles béton (Stelvio, Sigma)",
    ],
    duree: "1/2 journée à 1 journée",
    heroImage: `${ZYROSITE},w=1920/mp84wMEb64sEBBPm/capture-daa-c-cran-2026-01-28-174341-z34EuHSC98sSnwU3.png`,
    relatedSlugs: ["traitement-de-toiture", "ardoises-naturelles", "ardoises-fibro-ciment"],
    faq: [
      {
        question: "Les tuiles anciennes risquent-elles d'être abîmées ?",
        answer:
          "Non. Justement, l'absence de piétinement (impossible avec un drone) préserve les tuiles fragilisées, ce qui n'est pas le cas d'une intervention classique avec déplacement sur la toiture.",
      },
    ],
  },

  // ─── 3. Ardoises naturelles ───────────────────────────────────
  {
    slug: "ardoises-naturelles",
    title: "Ardoises naturelles",
    h1: "Nettoyage d'ardoises naturelles par drone",
    shortTitle: "Ardoises naturelles",
    description:
      "Démoussage doux pour ardoises naturelles : retrouve l'aspect satiné d'origine sans agresser le schiste.",
    primaryKeyword: "nettoyage ardoises naturelles drone",
    metaTitle: "Nettoyage d'ardoises naturelles par drone | Pornic, Pays de Retz",
    metaDescription:
      "Démoussage et traitement d'ardoises naturelles par drone à Pornic et Pays de Retz. Produit adapté au schiste, finition satinée préservée. Devis gratuit.",
    icon: Mountain,
    group: "Toiture",
    intro:
      "L'ardoise naturelle est un matériau noble, sensible aux produits trop agressifs. Notre traitement par drone utilise des solutions spécifiquement adaptées au schiste pour éliminer mousses et lichens sans altérer la finition satinée d'origine.",
    avantages: [
      "Produit spécifique adapté au schiste, pH contrôlé",
      "Préservation de la couleur et de la patine d'origine",
      "Pas de marche sur l'ardoise (matériau fragile)",
      "Inspection des crochets et zinguerie",
    ],
    methode: [
      {
        titre: "Diagnostic toiture",
        texte:
          "Inspection visuelle haute définition de chaque pan : crochets, faîtages, arêtiers, recherche d'ardoises cassées.",
      },
      {
        titre: "Traitement adapté",
        texte:
          "Application d'un anti-mousse compatible schiste, en pulvérisation fine pour pénétration homogène.",
      },
      {
        titre: "Recommandations",
        texte:
          "Photos remises et conseil sur l'opportunité d'un hydrofuge en complément (l'ardoise est naturellement peu poreuse mais bénéficie d'une protection sur sites exposés).",
      },
    ],
    supports: ["Ardoises naturelles d'Espagne", "Ardoises d'Angers", "Ardoises Eclypse / Cupa"],
    duree: "1/2 journée à 1 journée",
    relatedSlugs: ["ardoises-fibro-ciment", "traitement-de-toiture", "tuiles"],
    faq: [
      {
        question: "L'hydrofuge est-il utile sur de l'ardoise naturelle ?",
        answer:
          "L'ardoise est peu poreuse par nature. Un hydrofuge est utile sur les couvertures très exposées (vent, embruns marins) pour ralentir le retour des mousses, mais reste optionnel.",
      },
    ],
  },

  // ─── 4. Ardoises fibro-ciment ─────────────────────────────────
  {
    slug: "ardoises-fibro-ciment",
    title: "Ardoises fibro-ciment",
    h1: "Nettoyage d'ardoises fibro-ciment par drone",
    shortTitle: "Fibro-ciment",
    description:
      "Démoussage spécifique pour ardoises fibro-ciment poreuses : élimine mousses et noircissures, prolonge la durée de vie du support.",
    primaryKeyword: "nettoyage ardoises fibro-ciment drone",
    metaTitle: "Nettoyage d'ardoises fibro-ciment par drone | Pays de Retz",
    metaDescription:
      "Démoussage d'ardoises fibro-ciment par drone à Pornic et environs. Produit adapté à la porosité du fibro, hydrofuge en option. Devis gratuit.",
    icon: Layers,
    group: "Toiture",
    intro:
      "Plus poreuses que les ardoises naturelles, les ardoises fibro-ciment retiennent mousses et noircissures. Notre traitement par drone restaure leur teinte d'origine et peut être complété par un hydrofuge pour limiter le réencrassement.",
    avantages: [
      "Anti-mousse adapté à la porosité du fibro",
      "Hydrofuge possible pour étanchéiser le support",
      "Restauration de la teinte d'origine",
      "Inspection à distance — pas de risque de fissure",
    ],
    methode: [
      {
        titre: "Inspection drone",
        texte:
          "Repérage des plaques cassées, des fixations à reprendre et des zones de stagnation d'eau.",
      },
      {
        titre: "Traitement anti-mousse",
        texte:
          "Pulvérisation d'un produit pénétrant dans la porosité du matériau pour une action longue durée.",
      },
      {
        titre: "Hydrofuge (recommandé)",
        texte:
          "Pour limiter la repousse, application d'un hydrofuge filmogène qui sature la porosité.",
      },
    ],
    supports: ["Ardoises Eternit fibro-ciment", "Plaques ondulées fibro-ciment"],
    duree: "1/2 journée à 1 journée",
    relatedSlugs: ["ardoises-naturelles", "traitement-de-toiture", "tuiles"],
    faq: [
      {
        question: "Le fibro-ciment ancien (avant 1997) peut-il contenir de l'amiante ?",
        answer:
          "Oui, les fibro-ciments posés avant 1997 peuvent contenir de l'amiante. Le nettoyage par drone est précisément l'option la plus sûre dans ce cas : aucune abrasion mécanique, aucun contact, aucune émission de fibres. Pour tout doute, un diagnostic amiante préalable peut être demandé.",
      },
    ],
  },

  // ─── 5. Nettoyage façade & bardage (hub) ──────────────────────
  {
    slug: "nettoyage-facade-bardage",
    title: "Nettoyage façade & bardage",
    h1: "Nettoyage de façade et bardage par drone",
    shortTitle: "Façade & bardage",
    description:
      "Désencrassement complet de façades et bardages par drone : enduit, pierre, métal, PVC, bois. Produit choc, finition impeccable.",
    primaryKeyword: "nettoyage façade drone Pornic",
    metaTitle: "Nettoyage façade & bardage par drone | Pornic (44)",
    metaDescription:
      "Nettoyage de façades, bardages métal, PVC et enduits par drone à Pornic et Pays de Retz. Produit désinfectant choc, sans nacelle ni échafaudage.",
    icon: Building2,
    group: "Façade",
    intro:
      "Embruns marins, pollution et humidité ternissent rapidement les façades du Pays de Retz. Notre intervention par drone redonne à vos murs leur éclat d'origine sur tous les supports : enduits, pierre, bardages métalliques, PVC ou bois — sans installation de nacelle ni d'échafaudage.",
    avantages: [
      "Produit désinfectant à action rapide",
      "Tous supports : enduit, pierre, bardage métal/PVC/bois",
      "Aucun échafaudage à monter",
      "Accès facilité aux étages élevés et zones inaccessibles",
    ],
    methode: [
      {
        titre: "Inspection",
        texte:
          "Identification des zones encrassées, présence de mousses, état des joints et des éléments d'étanchéité.",
      },
      {
        titre: "Pulvérisation",
        texte:
          "Application par drone d'un détergent désinfectant adapté au support, dosage ajusté selon l'encrassement.",
      },
      {
        titre: "Contrôle final",
        texte:
          "Validation visuelle, photos avant/après et conseils pour limiter le réencrassement.",
      },
    ],
    supports: [
      "Façades enduit gratté ou taloché",
      "Bardages bois",
      "Bardages métalliques (acier, aluminium)",
      "Bardages PVC / fibrociment",
      "Pierre naturelle",
    ],
    duree: "1 à 2 jours selon surface",
    heroImage: `${ZYROSITE},w=1920/mp84wMEb64sEBBPm/capture-daa-c-cran-2026-01-28-175110-MWdwgwDYc4yvHDlc.png`,
    relatedSlugs: [
      "nettoyage-de-facade-en-enduit",
      "nettoyage-bardage-metallique",
      "nettoyage-bardage-pvc",
      "traitement-de-toiture",
    ],
    faq: [
      {
        question: "Avez-vous besoin d'un point d'eau sur place ?",
        answer:
          "Oui, un accès à un point d'eau extérieur facilite les rinçages éventuels et le remplissage du réservoir du drone. Si vous n'en disposez pas, prévenez-nous : nous arrivons avec une cuve si nécessaire.",
      },
    ],
  },

  // ─── 6. Façade en enduit ──────────────────────────────────────
  {
    slug: "nettoyage-de-facade-en-enduit",
    title: "Nettoyage façade en enduit",
    h1: "Nettoyage de façade en enduit par drone",
    shortTitle: "Façade enduit",
    description:
      "Décrassage et désinfection d'enduits monocouche ou taloché. Élimine pollutions, mousses et noircissures sans abîmer la finition.",
    primaryKeyword: "nettoyage façade enduit drone",
    metaTitle: "Nettoyage de façade enduit par drone | Pornic, Pays de Retz",
    metaDescription:
      "Nettoyage d'enduits monocouche ou taloché par drone à Pornic et environs. Produit désinfectant, pulvérisation contrôlée, sans dégradation du support.",
    icon: PaintBucket,
    group: "Façade",
    intro:
      "Les enduits modernes (monocouche, gratté, taloché) noircissent avec le temps sous l'effet des pluies, de la pollution et des micro-organismes. Notre pulvérisation par drone élimine ces salissures en profondeur sans agresser la couche de finition.",
    avantages: [
      "Adapté à tous types d'enduits modernes",
      "Action sur algues, mousses, lichens et noircissures",
      "Pas de risque de coulure ou de marquage",
      "Intervention rapide même sur grandes hauteurs",
    ],
    methode: [
      {
        titre: "État des lieux",
        texte:
          "Identification du type d'enduit, des zones très encrassées et des éléments à protéger (menuiseries, terrasses).",
      },
      {
        titre: "Application produit",
        texte:
          "Pulvérisation homogène par drone d'un détergent adapté à l'enduit.",
      },
      {
        titre: "Résultat",
        texte:
          "Façade décrassée, finition d'origine préservée, photos de résultat remises.",
      },
    ],
    supports: ["Enduit monocouche", "Enduit gratté", "Enduit taloché", "Enduit projeté"],
    duree: "1 à 2 jours",
    relatedSlugs: ["nettoyage-facade-bardage", "nettoyage-bardage-pvc", "nettoyage-bardage-metallique"],
    faq: [
      {
        question: "Peut-on intervenir sur une façade fraîchement enduite ?",
        answer:
          "Mieux vaut attendre la stabilisation complète d'un enduit récent (6 à 12 mois minimum) avant tout traitement de nettoyage.",
      },
    ],
  },

  // ─── 7. Bardage métallique ────────────────────────────────────
  {
    slug: "nettoyage-bardage-metallique",
    title: "Bardage métallique",
    h1: "Nettoyage de bardage métallique par drone",
    shortTitle: "Bardage métal",
    description:
      "Nettoyage de bardages acier, aluminium ou laqué pour bâtiments industriels, agricoles et tertiaires. Sans contact mécanique.",
    primaryKeyword: "nettoyage bardage métallique drone",
    metaTitle: "Nettoyage de bardage métallique par drone | Loire-Atlantique",
    metaDescription:
      "Nettoyage de bardage métallique (acier, aluminium, laqué) par drone pour bâtiments industriels et agricoles. Pays de Retz, devis gratuit.",
    icon: Boxes,
    group: "Façade",
    intro:
      "Les bardages métalliques de bâtiments industriels, agricoles ou tertiaires s'oxydent et s'encrassent avec le temps. Notre nettoyage par drone redonne leur aspect d'origine sans rayer le laquage et sans installation d'échafaudage périphérique — un gain de temps majeur sur les grandes surfaces.",
    avantages: [
      "Adapté aux grandes surfaces industrielles",
      "Pas d'arrêt d'activité du bâtiment",
      "Produit non corrosif compatible laquage",
      "Aucune rayure (pas de contact mécanique)",
    ],
    methode: [
      {
        titre: "Repérage",
        texte:
          "Survol du bâtiment pour quantifier les zones encrassées et identifier les fixations défectueuses.",
      },
      {
        titre: "Désincrustation",
        texte:
          "Pulvérisation d'un produit dégraissant et désinfectant compatible avec les laquages industriels.",
      },
      {
        titre: "Rapport client",
        texte:
          "Photos avant/après, conseils pour l'entretien périodique.",
      },
    ],
    supports: [
      "Bardage acier laqué (ArcelorMittal, Joris Ide)",
      "Bardage aluminium",
      "Bardage galvanisé",
      "Bac acier toiture-bardage",
    ],
    duree: "1 à 3 jours selon surface",
    relatedSlugs: ["nettoyage-bardage-pvc", "nettoyage-facade-bardage", "nettoyage-des-panneaux-solaires"],
    faq: [
      {
        question: "Intervenez-vous sur des hangars agricoles ?",
        answer:
          "Oui, les bâtiments agricoles font partie de notre cible cœur : grandes surfaces, accès souvent compliqués en échafaudage, intervention drone particulièrement adaptée.",
      },
    ],
  },

  // ─── 8. Bardage PVC ───────────────────────────────────────────
  {
    slug: "nettoyage-bardage-pvc",
    title: "Bardage PVC",
    h1: "Nettoyage de bardage PVC par drone",
    shortTitle: "Bardage PVC",
    description:
      "Décrassage de bardages PVC, fibro-ciment ou composite. Restaure la blancheur d'origine sans abîmer le matériau.",
    primaryKeyword: "nettoyage bardage PVC drone",
    metaTitle: "Nettoyage de bardage PVC par drone | Pays de Retz",
    metaDescription:
      "Nettoyage de bardage PVC et composite par drone à Pornic et environs. Restauration de la teinte, sans agression du support. Devis gratuit.",
    icon: PaintBucket,
    group: "Façade",
    intro:
      "Le PVC et les bardages composites jaunissent et se couvrent d'un voile noirâtre sous l'effet des UV et des dépôts atmosphériques. Notre pulvérisation par drone décrasse en profondeur et restaure la teinte d'origine sans rayer le support.",
    avantages: [
      "Produit doux compatible avec les plastiques",
      "Restauration de la blancheur ou teinte d'origine",
      "Aucune abrasion, aucune rayure",
      "Idéal extensions, bardages partiels, modénatures",
    ],
    methode: [
      {
        titre: "Diagnostic",
        texte:
          "Inspection drone : repérage du jaunissement, des verdissures et des fixations à reprendre.",
      },
      {
        titre: "Traitement",
        texte:
          "Pulvérisation d'un produit doux mais efficace, adapté aux composites.",
      },
      {
        titre: "Validation",
        texte:
          "Comparatif avant/après en photo, conseils d'entretien.",
      },
    ],
    supports: ["Bardage PVC", "Bardage composite (Trespa, Werzalit)", "Sous-toiture PVC"],
    duree: "1/2 journée à 1 journée",
    relatedSlugs: ["nettoyage-bardage-metallique", "nettoyage-de-facade-en-enduit", "nettoyage-facade-bardage"],
    faq: [
      {
        question: "Le PVC très jauni peut-il redevenir blanc ?",
        answer:
          "Le décrassage retire les dépôts en surface et restaure une grande partie de la blancheur. Un PVC profondément altéré par les UV ne reviendra pas à neuf — un produit raviveur peut compléter le traitement si nécessaire.",
      },
    ],
  },

  // ─── 9. Panneaux solaires ─────────────────────────────────────
  {
    slug: "nettoyage-des-panneaux-solaires",
    title: "Nettoyage panneaux solaires",
    h1: "Nettoyage de panneaux solaires par drone",
    shortTitle: "Panneaux solaires",
    description:
      "Détergent spécialisé qui dégraisse et anti-redéposition. Restitue jusqu'à 25 % de rendement perdu sur des panneaux encrassés.",
    primaryKeyword: "nettoyage panneaux solaires drone Pornic",
    metaTitle: "Nettoyage de panneaux solaires par drone | Pornic & Pays de Retz",
    metaDescription:
      "Nettoyage de panneaux solaires photovoltaïques par drone à Pornic et environs. Détergent dédié, anti-redéposition, restitution de rendement. Devis gratuit.",
    icon: PanelTop,
    group: "Solaire",
    intro:
      "Pollen, embruns, fientes d'oiseaux et poussière fine font perdre jusqu'à 25 % de rendement à une installation photovoltaïque encrassée. Notre nettoyage par drone applique un détergent spécialisé qui dégraisse et limite la redéposition, restituant la production d'origine — particuliers comme professionnels.",
    avantages: [
      "Détergent anti-redéposition longue durée",
      "Compatible toutes marques de panneaux",
      "Sans rayure (pulvérisation, pas de brossage abrasif)",
      "Intervention rapide même en installation au sol ou sur grande toiture",
      "Restitution mesurable du rendement",
    ],
    methode: [
      {
        titre: "Inspection thermique (option)",
        texte:
          "Survol drone pour repérer hot-spots, panneaux défaillants ou ombrages parasites.",
      },
      {
        titre: "Application détergent",
        texte:
          "Pulvérisation d'un détergent spécialisé qui dissout les graisses et les pollens.",
      },
      {
        titre: "Rinçage et séchage",
        texte:
          "Eau déminéralisée pour éviter les traces de calcaire. Séchage naturel.",
      },
    ],
    supports: ["Panneaux photovoltaïques résidentiels", "Centrales au sol", "Toitures industrielles", "Ombrières solaires"],
    duree: "1/2 journée à 1 journée",
    heroImage: `${ZYROSITE},w=1920/mp84wMEb64sEBBPm/capture-daa-c-cran-2026-05-02-151541-j1l8OuJa2bZ50D7T.png`,
    relatedSlugs: ["nettoyage-bardage-metallique", "traitement-de-toiture", "nettoyage-facade-bardage"],
    faq: [
      {
        question: "À quelle fréquence nettoyer ses panneaux solaires ?",
        answer:
          "Un nettoyage annuel est recommandé pour une installation résidentielle en zone côtière (embruns, pollens). Tous les 2 ans en zone moins exposée.",
      },
      {
        question: "Le nettoyage est-il rentable ?",
        answer:
          "Sur une installation de 6 kWc fortement encrassée, la restitution de production couvre généralement le coût du nettoyage en une à deux saisons.",
      },
    ],
  },
] as const;

/** Récupère un service par son slug, lève si introuvable (Server Component). */
export function getServiceBySlug(slug: string): Service {
  const s = services.find((x) => x.slug === slug);
  if (!s) throw new Error(`Service inconnu : ${slug}`);
  return s;
}

/** Slugs pour générateurs de routes statiques. */
export const serviceSlugs = services.map((s) => s.slug);

export const certificationsBlock = {
  icon: ShieldCheck,
  items: [
    "Télépilote certifié C.A.T.S (Certificat d'Aptitude Théorique aux Scénarios)",
    "Qualifications pulvérisation par drone conformes DGAC",
    "Assurance responsabilité civile professionnelle",
    "Matériel professionnel récent et entretenu",
  ] as readonly string[],
};

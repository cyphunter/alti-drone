/**
 * FAQ générale d'Alti' Drone & Services.
 * Utilisée sur la home (section FAQ) et exposée en JSON-LD FAQPage.
 *
 * Garder réponses courtes (1–3 phrases) pour qu'elles s'affichent
 * directement dans les rich snippets Google.
 */

export type FaqEntry = {
  question: string;
  answer: string;
};

export const faq: readonly FaqEntry[] = [
  {
    question: "Dans quelle zone géographique intervenez-vous ?",
    answer:
      "Nous intervenons sur l'ensemble de la Loire-Atlantique (44) avec un secteur cœur autour de Pornic et du Pays de Retz : La Plaine-sur-Mer, Préfailles, Saint-Brévin-les-Pins, La Bernerie-en-Retz, Saint-Michel-Chef-Chef, Sainte-Pazanne, Bouaye, ainsi que Saint-Nazaire, Pornichet, La Baule et Guérande sur demande.",
  },
  {
    question: "Proposez-vous des devis gratuits ?",
    answer:
      "Oui, tous nos devis sont gratuits et sans engagement. Une inspection de toiture par drone est systématiquement incluse pour vous fournir une estimation précise sur photos.",
  },
  {
    question: "À quelle fréquence faut-il nettoyer sa toiture ?",
    answer:
      "Pour une toiture exposée à l'air marin du Pays de Retz, un entretien tous les 2 à 5 ans est recommandé selon l'orientation, l'environnement (arbres, humidité) et le type de couverture. Un nettoyage régulier prolonge la durée de vie des matériaux.",
  },
  {
    question: "Le nettoyage par drone abîme-t-il les matériaux ?",
    answer:
      "Non. Les produits et les pressions de pulvérisation sont choisis en fonction du support (tuiles, ardoises, fibro, bardages, panneaux) pour nettoyer efficacement sans agresser la surface. Aucun contact mécanique avec la couverture.",
  },
  {
    question: "Avez-vous les certifications requises pour piloter ?",
    answer:
      "Oui. Allan Bouguendoura est titulaire du C.A.T.S (Certificat d'Aptitude Théorique aux Scénarios) et des qualifications nécessaires pour la pulvérisation par drone, conformément à la réglementation DGAC.",
  },
  {
    question: "Les drones peuvent-ils voler par tous les temps ?",
    answer:
      "Les interventions dépendent des conditions météo : vent fort, pluie ou orages sont incompatibles avec un travail sécurisé et de qualité. Dans ce cas, le rendez-vous est reporté à la première fenêtre favorable.",
  },
  {
    question: "Pourquoi choisir le drone plutôt qu'une méthode classique ?",
    answer:
      "Le drone évite les échafaudages et les travaux en hauteur : intervention plus rapide, plus sûre pour l'opérateur comme pour la toiture, accès facile aux zones difficiles, et coût souvent plus compétitif qu'une nacelle ou une équipe d'alpinistes.",
  },
  {
    question: "Les images d'inspection sont-elles fournies au client ?",
    answer:
      "Oui, sur demande. Photos et vidéos haute définition de l'inspection sont transmises pour appuyer un dossier d'assurance, un devis de couvreur, ou simplement votre archive personnelle.",
  },
] as const;

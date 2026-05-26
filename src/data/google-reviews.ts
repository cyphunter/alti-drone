/**
 * Avis Google — fichier statique alimenté manuellement.
 *
 * Pour ajouter / mettre à jour un avis :
 *   1. Aller sur la fiche Google de l'entreprise :
 *      https://www.google.com/search?q=Alti%27+Drone+%26+Services
 *   2. Copier nom, ville (si visible), note, date, et le texte de l'avis.
 *   3. Ajouter une entrée dans `googleReviews` ci-dessous en suivant le format.
 *   4. Mettre à jour `googleAggregate.rating` et `googleAggregate.count` si la
 *      note moyenne ou le nombre total a changé.
 *
 * Une fois renseigné, le toggle « Google » de la section Avis sur la home
 * affichera ces avis dans le même carrousel que les avis Bilik.
 */

import type { Temoignage } from "./temoignages";

export const googleReviews: readonly Temoignage[] = [
  {
    id: "boubou-2026-05",
    nom: "Boubou",
    ville: "",
    prestation: "Traitement toiture & façade",
    texte:
      "Nous avons fait appel aux services de Alti Drone pour un traitement de toiture et façade et je recommande le professionnalisme et la réactivité de Allan.",
    note: 5,
    date: "2026-05-12",
  },
  {
    id: "veronique-christophe-2026-04",
    nom: "Véronique Christophe",
    ville: "",
    prestation: "Démoussage de toiture",
    texte:
      "Je suis très satisfait de la prestation réalisée à mon domicile pour le nettoyage de plusieurs toitures par drone. Le travail a été effectué avec beaucoup de professionnalisme et de précision. La personne est très gentille, à l'écoute et particulièrement ponctuelle. Tout s'est déroulé dans les meilleures conditions, avec un résultat impeccable. Je recommande vivement.",
    note: 5,
    date: "2026-04-28",
  },
  {
    id: "louis-seize-2026-04",
    nom: "Louis Seize",
    ville: "",
    prestation: "Démoussage de toiture",
    texte:
      "Merci pour cette prestation de qualité, réalisée dans la sérénité et le respect des plantations alentours.",
    note: 5,
    date: "2026-04-26",
  },
];

export const googleAggregate = {
  /** Note moyenne sur 5 — laisser null tant qu'on n'a pas d'avis. */
  rating: 5 as number | null,
  /** Nombre total d'avis Google — null = badge masqué. */
  count: 3 as number | null,
  /** URL de la fiche Google — affichée comme source. */
  sourceUrl:
    "https://www.google.com/search?q=Alti%27+Drone+%26+Services",
};

/**
 * Forme normalisée pour le composant AvisSection.
 * Mirroir de `BilikData` de `src/lib/bilik-reviews.ts`.
 */
export const googleData = {
  reviews: googleReviews,
  aggregateRating: googleAggregate.rating,
  reviewCount: googleAggregate.count,
  sourceUrl: googleAggregate.sourceUrl,
};

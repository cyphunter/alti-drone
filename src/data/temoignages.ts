/**
 * Témoignages clients — à compléter avec Allan.
 *
 * Pour l'instant : section vide avec placeholder discret. Quand Allan
 * fournit des verbatims (nom, ville, prestation, texte court), les ajouter
 * ici — la home les affiche automatiquement en carousel si la liste n'est
 * pas vide.
 */

export type Temoignage = {
  id: string;
  nom: string;
  ville: string;
  prestation: string;
  texte: string;
  note?: 1 | 2 | 3 | 4 | 5;
  date?: string;
};

export const temoignages: readonly Temoignage[] = [
  // Exemple de format (à remplacer par de vrais témoignages) :
  // {
  //   id: "marc-pornic-2026-04",
  //   nom: "Marc D.",
  //   ville: "Pornic",
  //   prestation: "Démoussage toiture",
  //   texte: "Intervention rapide, propre, et plus économique qu'un échafaudage. Allan est sérieux et explique chaque étape.",
  //   note: 5,
  //   date: "2026-04-12",
  // },
] as const;

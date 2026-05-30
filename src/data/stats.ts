/**
 * Compteurs animés affichés sur la home et /services.
 * Chiffres à valider/ajuster avec Allan avant mise en ligne.
 */

export type Stat = {
  to: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description?: string;
};

export const stats: readonly Stat[] = [
  {
    to: 100,
    suffix: " %",
    label: "Devis gratuit",
    description: "Inspection toiture par drone incluse",
  },
  {
    to: 30,
    prefix: "+",
    label: "Interventions réalisées",
    description: "Toitures, façades et panneaux solaires dans le Pays de Retz",
  },
  {
    to: 48,
    suffix: " h",
    label: "Réponse devis",
    description: "Délai moyen d'envoi du chiffrage",
  },
] as const;

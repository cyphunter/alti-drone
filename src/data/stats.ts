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
    to: 0,
    suffix: "",
    prefix: "",
    label: "Échafaudage à monter",
    description: "Aucun matériel lourd, aucun risque en hauteur",
  },
  {
    to: 48,
    suffix: " h",
    label: "Réponse devis",
    description: "Délai moyen d'envoi du chiffrage",
  },
] as const;

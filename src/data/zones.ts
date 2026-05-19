/**
 * Zones d'intervention d'Alti' Drone & Services.
 * Utilisé pour le SEO local (LocalBusiness.areaServed) et la marquee
 * des villes en bas du hero d'accueil.
 *
 * Trier par proximité (Pornic au centre).
 */

export type Zone = {
  name: string;
  postalCode: string;
  /** Distance approx depuis La Plaine-sur-Mer (km). */
  distanceKm: number;
  /** Le cœur de l'activité — affiché en gras dans certains contextes. */
  isCore?: boolean;
};

export const zones: readonly Zone[] = [
  // ─── Pays de Retz (cœur) ─────────────────────────────────────
  { name: "La Plaine-sur-Mer", postalCode: "44770", distanceKm: 0, isCore: true },
  { name: "Préfailles", postalCode: "44770", distanceKm: 4, isCore: true },
  { name: "Pornic", postalCode: "44210", distanceKm: 6, isCore: true },
  { name: "Saint-Michel-Chef-Chef", postalCode: "44730", distanceKm: 8, isCore: true },
  { name: "La Bernerie-en-Retz", postalCode: "44760", distanceKm: 10, isCore: true },
  { name: "Le Clion-sur-Mer", postalCode: "44210", distanceKm: 9 },
  { name: "Les Moutiers-en-Retz", postalCode: "44760", distanceKm: 14 },
  { name: "Chauvé", postalCode: "44320", distanceKm: 12 },
  { name: "Saint-Père-en-Retz", postalCode: "44320", distanceKm: 13 },
  { name: "Chaumes-en-Retz", postalCode: "44320", distanceKm: 16 },
  { name: "Villeneuve-en-Retz", postalCode: "44580", distanceKm: 22 },
  { name: "Sainte-Pazanne", postalCode: "44680", distanceKm: 24 },
  { name: "Rouans", postalCode: "44640", distanceKm: 20 },
  { name: "Saint-Viaud", postalCode: "44320", distanceKm: 18 },

  // ─── Saint-Nazaire & côte ouest ──────────────────────────────
  { name: "Saint-Brévin-les-Pins", postalCode: "44250", distanceKm: 14 },
  { name: "Saint-Nazaire", postalCode: "44600", distanceKm: 25 },
  { name: "Donges", postalCode: "44480", distanceKm: 30 },
  { name: "Pornichet", postalCode: "44380", distanceKm: 35 },
  { name: "La Baule-Escoublac", postalCode: "44500", distanceKm: 38 },
  { name: "Guérande", postalCode: "44350", distanceKm: 42 },

  // ─── Sud-Nantes ─────────────────────────────────────────────
  { name: "Bouaye", postalCode: "44830", distanceKm: 32 },
  { name: "Saint-Jean-de-Boiseau", postalCode: "44640", distanceKm: 30 },
  { name: "Le Pellerin", postalCode: "44640", distanceKm: 28 },
] as const;

/** Liste compacte pour la marquee (séparateur · entre noms). */
export const zonesNames: readonly string[] = zones.map((z) => z.name);

/** Sous-ensemble cœur d'activité (utilisé dans le hero / cards "Où on intervient"). */
export const coreZones = zones.filter((z) => z.isCore);

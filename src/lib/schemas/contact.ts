import { z } from "zod";

export const TYPES_PRESTATION = [
  "Démoussage toiture",
  "Traitement hydrofuge",
  "Nettoyage façade",
  "Nettoyage bardage",
  "Nettoyage panneaux solaires",
  "Nettoyage gouttières",
  "Prise de vue aérienne",
  "Inspection technique",
  "Modélisation 3D",
  "Autre / je ne sais pas",
] as const;

export const TYPES_BATIMENT = [
  "Particulier",
  "Professionnel",
  "Syndic / copropriété",
  "Collectivité",
  "Agricole",
] as const;

export type TypePrestation = (typeof TYPES_PRESTATION)[number];
export type TypeBatiment = (typeof TYPES_BATIMENT)[number];

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Nom trop court (2 caractères min)").max(120, "Nom trop long"),
  email: z.string().trim().email("Email invalide").max(254),
  phone: z
    .string()
    .trim()
    .min(8, "Numéro trop court")
    .max(20, "Numéro trop long")
    .regex(/^[\d\s+().-]+$/, "Numéro invalide (chiffres, espaces, +, -, () acceptés)"),
  address: z
    .string()
    .trim()
    .min(5, "Adresse trop courte")
    .max(300, "Adresse trop longue"),
  typePrestation: z.enum(TYPES_PRESTATION, {
    errorMap: () => ({ message: "Sélectionnez une prestation" }),
  }),
  typeBatiment: z.enum(TYPES_BATIMENT, {
    errorMap: () => ({ message: "Sélectionnez un type de bâtiment" }),
  }),
  surface: z
    .union([
      z
        .number()
        .int("Surface en m² entiers")
        .nonnegative("Surface positive")
        .max(100000, "Surface trop grande"),
      z.literal(""),
      z.undefined(),
      z.null(),
    ])
    .optional()
    .transform((v) => (v === "" || v === null || v === undefined ? undefined : Number(v))),
  message: z.string().trim().min(20, "Message trop court (20 caractères min)").max(5000),
  // Honeypot anti-spam — doit rester vide
  website: z.string().max(0, "Spam detected").optional().or(z.literal("")),
  // Consentement RGPD — obligatoire, non pré-coché
  consent: z.literal(true, {
    errorMap: () => ({ message: "Vous devez accepter la politique de confidentialité" }),
  }),
  // Token Turnstile (vérifié côté serveur)
  turnstileToken: z.string().min(1, "Vérification anti-spam manquante"),
});

export type ContactInput = z.infer<typeof contactSchema>;

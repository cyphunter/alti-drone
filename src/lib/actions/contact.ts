"use server";

import { Resend } from "resend";
import { contactSchema, type ContactInput } from "@/lib/schemas/contact";
import { stripHtml } from "@/lib/sanitize";
import { siteConfig } from "@/lib/site-config";
import ContactNotification from "@/emails/contact-notification";

type ActionResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

async function verifyTurnstile(token: string, remoteIp?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error("[contact] TURNSTILE_SECRET_KEY manquante");
    return false;
  }
  try {
    const body = new URLSearchParams({ secret, response: token });
    if (remoteIp) body.append("remoteip", remoteIp);

    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body },
    );
    if (!res.ok) return false;
    const data = (await res.json()) as { success?: boolean };
    return Boolean(data.success);
  } catch (err) {
    console.error("[contact] verify Turnstile failed", err);
    return false;
  }
}

/**
 * Server Action — envoi du formulaire de contact via Resend.
 *
 * Pipeline :
 *  1. Parse Zod (input)
 *  2. Honeypot : si `website` rempli → 200 OK silencieux (bot)
 *  3. Vérification Turnstile (Cloudflare)
 *  4. Sanitize message + adresse (strip HTML)
 *  5. Envoi Resend avec replyTo = email visiteur
 */
export async function sendContactMessage(input: ContactInput): Promise<ActionResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join(".");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return {
      ok: false,
      error: "Quelques informations sont manquantes ou incorrectes.",
      fieldErrors,
    };
  }

  const data = parsed.data;

  // ─── Honeypot ────────────────────────────────────────────────
  if (data.website && data.website.trim().length > 0) {
    return { ok: true };
  }

  // ─── Turnstile ──────────────────────────────────────────────
  const turnstileOk = await verifyTurnstile(data.turnstileToken);
  if (!turnstileOk) {
    return {
      ok: false,
      error:
        "La vérification anti-spam a échoué. Merci de recharger la page et de réessayer.",
    };
  }

  // ─── Resend ─────────────────────────────────────────────────
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail =
    process.env.RESEND_FROM_EMAIL ?? "contact@altidroneservices.fr";
  const toEmail =
    process.env.CONTACT_RECIPIENT_EMAIL ?? siteConfig.contact.email;

  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY manquante");
    return {
      ok: false,
      error: `Le serveur de messagerie n'est pas configuré. Merci de nous écrire directement à ${siteConfig.contact.email}.`,
    };
  }

  const cleanMessage = stripHtml(data.message);
  const cleanAddress = stripHtml(data.address);
  const cleanName = stripHtml(data.name);

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from: `Alti' Drone & Services <${fromEmail}>`,
      to: [toEmail],
      replyTo: `${cleanName} <${data.email}>`,
      subject: `[Devis] ${data.typePrestation} — ${cleanName}`,
      react: ContactNotification({
        name: cleanName,
        email: data.email,
        phone: data.phone,
        address: cleanAddress,
        typePrestation: data.typePrestation,
        typeBatiment: data.typeBatiment,
        surface: data.surface,
        message: cleanMessage,
      }),
    });

    if (result.error) {
      console.error("[contact] Resend error", result.error);
      return {
        ok: false,
        error:
          "Un problème est survenu lors de l'envoi. Réessayez dans quelques instants ou écrivez-nous directement.",
      };
    }
    return { ok: true };
  } catch (err) {
    console.error("[contact] send failed", err);
    return {
      ok: false,
      error:
        "Un problème est survenu lors de l'envoi. Réessayez dans quelques instants ou écrivez-nous directement.",
    };
  }
}

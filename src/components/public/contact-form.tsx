"use client";

import { useEffect, useId, useRef, useState, useTransition } from "react";
import Script from "next/script";
import { Check, Loader2, Send } from "lucide-react";
import { sendContactMessage } from "@/lib/actions/contact";
import {
  TYPES_PRESTATION,
  TYPES_BATIMENT,
  type TypePrestation,
  type TypeBatiment,
} from "@/lib/schemas/contact";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        params: {
          sitekey: string;
          theme?: "light" | "dark" | "auto";
          callback?: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
        },
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string; fieldErrors?: Record<string, string> };

type Props = {
  defaultPrestation?: TypePrestation;
};

export function ContactForm({ defaultPrestation }: Props) {
  const formId = useId();
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  const sitekey =
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "1x00000000000000000000AA";

  useEffect(() => {
    function render() {
      if (!widgetRef.current || !window.turnstile || widgetIdRef.current) return;
      widgetIdRef.current = window.turnstile.render(widgetRef.current, {
        sitekey,
        theme: "light",
        callback: (token) => setTurnstileToken(token),
        "expired-callback": () => setTurnstileToken(""),
        "error-callback": () => setTurnstileToken(""),
      });
    }
    if (window.turnstile) render();
    const interval = setInterval(() => {
      if (window.turnstile && !widgetIdRef.current) render();
    }, 300);
    return () => clearInterval(interval);
  }, [sitekey]);

  function handleSubmit(formData: FormData) {
    const surfaceRaw = String(formData.get("surface") ?? "").trim();
    const surface = surfaceRaw === "" ? undefined : Number(surfaceRaw);

    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      address: String(formData.get("address") ?? ""),
      typePrestation: String(formData.get("typePrestation") ?? "") as TypePrestation,
      typeBatiment: String(formData.get("typeBatiment") ?? "") as TypeBatiment,
      surface,
      message: String(formData.get("message") ?? ""),
      consent: formData.get("consent") === "on",
      website: String(formData.get("website") ?? ""),
      turnstileToken,
    };
    setStatus({ kind: "submitting" });
    startTransition(async () => {
      // @ts-expect-error consent runtime "on"|"" mais le schema accepte bool
      const result = await sendContactMessage(payload);
      if (result.ok) {
        setStatus({ kind: "success" });
        window.turnstile?.reset(widgetIdRef.current ?? undefined);
        setTurnstileToken("");
      } else {
        setStatus({
          kind: "error",
          message: result.error,
          fieldErrors: result.fieldErrors,
        });
      }
    });
  }

  if (status.kind === "success") {
    return (
      <div className="rounded-2xl bg-ocean-900 p-10 text-paper ring-1 ring-accent-500/40">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent-500 text-ocean-900">
          <Check size={22} aria-hidden />
        </div>
        <h2 className="mt-6 font-display text-3xl text-paper">
          Message bien reçu, merci !
        </h2>
        <p className="mt-3 text-paper/85">
          Vous recevrez une réponse personnalisée sous 48 h ouvrées. Pour toute urgence,
          n'hésitez pas à composer le {siteConfig.contact.phoneDisplay}.
        </p>
        <button
          type="button"
          onClick={() => setStatus({ kind: "idle" })}
          className="mt-6 inline-flex items-center gap-2 text-sm text-accent-300 underline-offset-4 hover:underline"
        >
          Envoyer une autre demande
        </button>
      </div>
    );
  }

  const isSubmitting = status.kind === "submitting" || pending;
  const errors = status.kind === "error" ? status.fieldErrors ?? {} : {};

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async
        defer
      />
      <form
        action={handleSubmit}
        className="space-y-6"
        aria-describedby={status.kind === "error" ? `${formId}-status` : undefined}
        noValidate
      >
        {/* Honeypot — caché aux humains */}
        <div className="sr-only" aria-hidden>
          <label htmlFor={`${formId}-website`}>Site web (laisser vide)</label>
          <input
            id={`${formId}-website`}
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            id={`${formId}-name`}
            name="name"
            label="Nom et prénom"
            required
            autoComplete="name"
            error={errors.name}
          />
          <Field
            id={`${formId}-email`}
            name="email"
            type="email"
            label="Email"
            required
            autoComplete="email"
            error={errors.email}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            label="Téléphone"
            required
            autoComplete="tel"
            error={errors.phone}
          />
          <Field
            id={`${formId}-address`}
            name="address"
            label="Adresse du bâtiment"
            required
            autoComplete="street-address"
            error={errors.address}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor={`${formId}-typePrestation`}
              className="block text-sm font-medium text-ocean-900"
            >
              Type de prestation <span className="text-error">*</span>
            </label>
            <Select
              id={`${formId}-typePrestation`}
              name="typePrestation"
              required
              defaultValue={defaultPrestation ?? ""}
              invalid={Boolean(errors.typePrestation)}
              className="mt-1.5"
              aria-describedby={
                errors.typePrestation ? `${formId}-typePrestation-error` : undefined
              }
            >
              <option value="" disabled>
                Choisissez une prestation…
              </option>
              {TYPES_PRESTATION.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </Select>
            {errors.typePrestation ? (
              <p
                id={`${formId}-typePrestation-error`}
                className="mt-1.5 text-xs text-error"
              >
                {errors.typePrestation}
              </p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor={`${formId}-typeBatiment`}
              className="block text-sm font-medium text-ocean-900"
            >
              Type de bâtiment <span className="text-error">*</span>
            </label>
            <Select
              id={`${formId}-typeBatiment`}
              name="typeBatiment"
              required
              defaultValue=""
              invalid={Boolean(errors.typeBatiment)}
              className="mt-1.5"
              aria-describedby={
                errors.typeBatiment ? `${formId}-typeBatiment-error` : undefined
              }
            >
              <option value="" disabled>
                Choisissez un type…
              </option>
              {TYPES_BATIMENT.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </Select>
            {errors.typeBatiment ? (
              <p
                id={`${formId}-typeBatiment-error`}
                className="mt-1.5 text-xs text-error"
              >
                {errors.typeBatiment}
              </p>
            ) : null}
          </div>
        </div>

        <div>
          <label
            htmlFor={`${formId}-surface`}
            className="block text-sm font-medium text-ocean-900"
          >
            Surface estimée (en m², optionnel)
          </label>
          <Input
            id={`${formId}-surface`}
            name="surface"
            type="number"
            min={0}
            step={1}
            inputMode="numeric"
            placeholder="Ex : 120"
            className="mt-1.5"
            invalid={Boolean(errors.surface)}
            aria-describedby={errors.surface ? `${formId}-surface-error` : undefined}
          />
          {errors.surface ? (
            <p id={`${formId}-surface-error`} className="mt-1.5 text-xs text-error">
              {errors.surface}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor={`${formId}-message`}
            className="block text-sm font-medium text-ocean-900"
          >
            Votre message <span className="text-error">*</span>
          </label>
          <Textarea
            id={`${formId}-message`}
            name="message"
            rows={6}
            required
            minLength={20}
            maxLength={5000}
            className="mt-1.5"
            placeholder="Décrivez votre besoin : type de toiture, accès, urgence, contraintes…"
            invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? `${formId}-message-error` : undefined}
          />
          {errors.message ? (
            <p id={`${formId}-message-error`} className="mt-1.5 text-xs text-error">
              {errors.message}
            </p>
          ) : null}
        </div>

        <label className="flex items-start gap-3 text-sm text-slate-500">
          <input
            type="checkbox"
            name="consent"
            required
            className="mt-1 h-4 w-4 rounded border-ocean-900/30 text-accent-500 focus:ring-accent-500"
          />
          <span>
            J'autorise Alti' Drone & Services à utiliser mes données pour me recontacter au
            sujet de ma demande. Voir notre{" "}
            <a
              href="/confidentialite"
              className="font-medium text-accent-700 underline-offset-4 hover:underline"
            >
              politique de confidentialité
            </a>
            .
          </span>
        </label>
        {errors.consent ? (
          <p className="text-xs text-error">{errors.consent}</p>
        ) : null}

        <div ref={widgetRef} className="cf-turnstile" />

        {status.kind === "error" ? (
          <div
            id={`${formId}-status`}
            role="alert"
            className={cn(
              "rounded-md p-4 text-sm",
              "bg-error/10 text-error",
            )}
          >
            {status.message}
          </div>
        ) : null}

        <Button
          type="submit"
          size="lg"
          variant="primary"
          disabled={isSubmitting || !turnstileToken}
          className="w-full sm:w-auto"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} aria-hidden className="animate-spin" />
              Envoi en cours…
            </>
          ) : (
            <>
              <Send size={16} aria-hidden />
              Envoyer ma demande
            </>
          )}
        </Button>
      </form>
    </>
  );
}

function Field({
  id,
  name,
  label,
  type = "text",
  required = false,
  autoComplete,
  error,
}: {
  id: string;
  name: string;
  label: string;
  type?: "text" | "email" | "tel";
  required?: boolean;
  autoComplete?: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ocean-900">
        {label} {required ? <span className="text-error">*</span> : null}
      </label>
      <Input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="mt-1.5"
        invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

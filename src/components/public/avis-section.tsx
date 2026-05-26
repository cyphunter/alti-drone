"use client";

import { useState } from "react";
import { ExternalLink, Star } from "lucide-react";
import { AvisMarquee } from "@/components/public/avis-marquee";
import { SectionHeading } from "@/components/public/section-heading";
import type { Temoignage } from "@/data/temoignages";
import { cn } from "@/lib/utils";

export type AvisSource = {
  /** Identifiant interne — utilisé pour la clé du toggle. */
  key: "bilik" | "google";
  /** Libellé affiché sur le bouton du toggle. */
  label: string;
  /** Liste des avis à afficher dans le marquee. */
  reviews: readonly Temoignage[];
  /** Note moyenne agrégée (1 décimale). null = badge masqué. */
  aggregateRating: number | null;
  /** Nombre total d'avis comptabilisés par la plateforme. */
  reviewCount: number | null;
  /** URL publique de la fiche source — bouton « Voir sur X ↗ ». */
  sourceUrl: string;
  /** Phrase d'intro spécifique à la source. */
  intro: string;
};

/**
 * Section Avis de la home — affiche les avis de la source active dans un
 * carrousel défilant. Un toggle « Bilik / Google » en haut à droite permet
 * de basculer entre les sources sans recharger la page.
 *
 * Bilik est l'onglet par défaut.
 */
export function AvisSection({
  sources,
  defaultKey = "bilik",
}: {
  sources: readonly [AvisSource, AvisSource];
  defaultKey?: AvisSource["key"];
}) {
  const [activeKey, setActiveKey] = useState<AvisSource["key"]>(defaultKey);
  const active = sources.find((s) => s.key === activeKey) ?? sources[0];

  return (
    <div className="container-soft">
      <div className="mb-12 grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <SectionHeading
            eyebrow="Avis clients"
            title="Ce que disent nos clients."
            intro={active.intro}
          />
        </div>

        <div className="flex flex-col items-start gap-4 lg:col-span-5 lg:items-end">
          {/* Toggle Bilik / Google */}
          <div
            role="tablist"
            aria-label="Source des avis clients"
            className="inline-flex rounded-full bg-ivory p-1 ring-1 ring-ocean-900/10"
          >
            {sources.map((s) => {
              const isActive = s.key === activeKey;
              return (
                <button
                  key={s.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveKey(s.key)}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300",
                    isActive
                      ? "bg-ocean-900 text-paper shadow-soft"
                      : "text-ocean-900/60 hover:text-ocean-900",
                  )}
                >
                  {s.label}
                  {s.reviewCount ? (
                    <span
                      className={cn(
                        "ml-1.5 text-xs",
                        isActive ? "text-paper/70" : "text-ocean-900/40",
                      )}
                    >
                      · {s.reviewCount}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>

          {/* Badge agrégé — change selon la source active */}
          {active.aggregateRating && active.reviewCount ? (
            <div className="inline-flex flex-col items-start gap-2 rounded-2xl bg-ivory px-5 py-4 ring-1 ring-ocean-900/10 lg:items-end">
              <div className="flex items-center gap-3">
                <span className="font-display text-3xl text-ocean-900">
                  {active.aggregateRating.toFixed(1).replace(".", ",")}
                  <span className="text-sm font-normal text-slate-500">
                    {" "}
                    / 5
                  </span>
                </span>
                <div
                  className="flex items-center gap-0.5"
                  aria-label={`Note moyenne de ${active.aggregateRating} sur 5`}
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      aria-hidden
                      className={
                        i < Math.round(active.aggregateRating ?? 0)
                          ? "fill-accent-500 text-accent-500"
                          : "text-slate-300"
                      }
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs text-slate-500">
                {active.reviewCount} avis vérifiés ·{" "}
                <a
                  href={active.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-accent-700 hover:text-ocean-900"
                >
                  Voir sur {active.label}
                  <ExternalLink size={11} aria-hidden />
                </a>
              </p>
            </div>
          ) : null}
        </div>
      </div>

      {/* Carrousel défilant — re-rendu quand la source change pour
          réinitialiser l'animation CSS à zéro. */}
      <div role="tabpanel" aria-label={`Avis ${active.label}`}>
        {active.reviews.length > 0 ? (
          <AvisMarquee
            key={active.key}
            items={active.reviews}
            durationSeconds={80}
          />
        ) : (
          <div className="rounded-2xl bg-ivory p-8 text-center text-sm text-slate-500 ring-1 ring-ocean-900/10">
            <p>
              Aucun avis {active.label} disponible pour l&apos;instant.
              <br />
              Retrouvez-nous sur{" "}
              <a
                href={active.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent-700 hover:text-ocean-900"
              >
                {active.label}
              </a>{" "}
              pour laisser le premier avis.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

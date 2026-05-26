import { Quote, Star } from "lucide-react";
import type { Temoignage } from "@/data/temoignages";

/**
 * Carrousel défilant horizontal pour les avis clients.
 *
 * - Marquee CSS infini (deux copies de la liste, translateX en boucle).
 * - Pause au survol via `:hover { animation-play-state: paused }`.
 * - Respect `prefers-reduced-motion` : pas d'animation, scroll horizontal
 *   classique avec snap.
 * - Aria : la version dupliquée est marquée `aria-hidden` pour ne pas
 *   doubler le texte lu par les lecteurs d'écran.
 */
export function AvisMarquee({
  items,
  durationSeconds = 60,
}: {
  items: readonly Temoignage[];
  /** Durée d'un cycle complet de défilement. Plus élevé = plus lent. */
  durationSeconds?: number;
}) {
  if (items.length === 0) return null;

  // Double la liste pour donner l'illusion d'un défilement infini.
  const loop = [...items, ...items];

  return (
    <div className="avis-marquee group relative overflow-hidden">
      {/* Masque latéral en gradient (paper → transparent → paper) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-paper to-transparent sm:w-24"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-paper to-transparent sm:w-24"
      />

      <ul
        className="avis-marquee__track flex gap-5"
        style={
          {
            "--avis-duration": `${durationSeconds}s`,
          } as React.CSSProperties
        }
      >
        {loop.map((t, i) => (
          <li
            key={`${t.id}-${i}`}
            aria-hidden={i >= items.length}
            className="w-[280px] shrink-0 sm:w-[340px]"
          >
            <ReviewCard item={t} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function ReviewCard({ item }: { item: Temoignage }) {
  const note = item.note ?? 5;
  const date = item.date ? formatDate(item.date) : null;
  const subtitle = [item.ville, item.prestation].filter(Boolean).join(" · ");

  return (
    <article className="flex h-full min-h-[260px] flex-col gap-4 overflow-hidden rounded-2xl bg-ivory p-6 ring-1 ring-ocean-900/10 transition-shadow duration-300 hover:shadow-soft sm:p-7">
      <header className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <span
            aria-hidden
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-500/15 font-display text-sm font-medium text-accent-700"
          >
            {initials(item.nom)}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-base font-medium text-ocean-900">
              {item.nom}
            </p>
            {subtitle ? (
              <p className="truncate text-xs text-slate-500">{subtitle}</p>
            ) : null}
          </div>
        </div>
        <Quote
          size={22}
          aria-hidden
          className="shrink-0 text-accent-500/30"
        />
      </header>

      <div className="flex items-center gap-0.5" aria-label={`${note} sur 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={13}
            aria-hidden
            className={
              i < note
                ? "fill-accent-500 text-accent-500"
                : "text-slate-300"
            }
          />
        ))}
      </div>

      <p className="line-clamp-5 flex-1 text-sm leading-relaxed text-slate-700">
        {item.texte}
      </p>

      {date ? (
        <footer className="text-[11px] uppercase tracking-[0.12em] text-slate-400">
          {date}
        </footer>
      ) : null}
    </article>
  );
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

function formatDate(iso: string): string {
  // Accepte YYYY-MM-DD ou YYYY-MM-DDT...
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

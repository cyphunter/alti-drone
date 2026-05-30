import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/data/services";
import { cn } from "@/lib/utils";
import { TiltCard } from "@/components/motion/tilt-card";
import { SmartImage } from "@/components/ui/smart-image";

type ServiceCardProps = {
  service: Service;
  tone?: "light" | "dark";
  /** Numéro affiché en filigrane (ex: 01, 02…) */
  index?: number;
  className?: string;
};

export function ServiceCard({
  service,
  tone = "light",
  index,
  className,
}: ServiceCardProps) {
  const Icon = service.icon;
  const isDark = tone === "dark";
  const formattedIndex =
    typeof index === "number" ? String(index + 1).padStart(2, "0") : null;
  const hasImage = Boolean(service.heroImage);

  return (
    <TiltCard
      max={5}
      glow
      className={cn("group h-full rounded-2xl tilt-stage", className)}
    >
      <Link
        href={`/${service.slug}`}
        aria-label={`En savoir plus sur : ${service.title}`}
        className={cn(
          "gradient-ring relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-500",
          isDark
            ? "bg-ocean-800/60 ring-1 ring-paper/10 hover:bg-ocean-700/80 hover:ring-accent-500/40"
            : "bg-ivory ring-1 ring-ocean-900/10 hover:-translate-y-1 hover:shadow-elevated hover:ring-accent-500/30",
        )}
      >
        {/* Média : image de la prestation */}
        {hasImage ? (
          // Wrapper NON clippé : laisse le badge déborder sur le corps.
          <div className="relative">
            {/* Conteneur clippé : contient le zoom + les overlays */}
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <SmartImage
                src={service.heroImage as string}
                alt=""
                fill
                sizes="(min-width: 1024px) 32vw, (min-width: 640px) 46vw, 90vw"
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
              />
              {/* Dégradé bas : lisibilité du badge + ancrage visuel */}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ocean-900/70 via-ocean-900/10 to-transparent"
              />
              {/* Tag groupe flottant */}
              <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-ocean-900/55 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-paper ring-1 ring-paper/20 backdrop-blur-md">
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full bg-accent-400"
                />
                {service.group}
              </span>
              {/* Index éditorial en filigrane */}
              {formattedIndex ? (
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-4 top-3 select-none font-display text-5xl font-light leading-none text-paper/30"
                >
                  {formattedIndex}
                </span>
              ) : null}
            </div>

            {/* Badge icône en chevauchement bas-gauche — hors du conteneur
                clippé pour ne pas être coupé, au-dessus du corps via z-20. */}
            <span
              className={cn(
                "absolute -bottom-6 left-6 z-20 inline-flex h-12 w-12 items-center justify-center rounded-2xl shadow-soft transition-all duration-500",
                isDark
                  ? "bg-ocean-800 text-accent-400 ring-1 ring-paper/15 group-hover:bg-accent-500 group-hover:text-ocean-900 group-hover:shadow-accent-glow"
                  : "bg-paper text-ocean-700 ring-1 ring-ocean-900/10 group-hover:bg-ocean-900 group-hover:text-accent-500",
              )}
            >
              <Icon size={20} aria-hidden />
            </span>
          </div>
        ) : null}

        {/* Corps */}
        <div className={cn("relative flex flex-1 flex-col gap-3 p-7", hasImage && "pt-9")}>
          {/* En-tête de repli (cards sans image) : icône + groupe */}
          {!hasImage ? (
            <div className="mb-1 flex items-center gap-3">
              <span
                className={cn(
                  "inline-flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-500",
                  isDark
                    ? "bg-paper/10 text-accent-400 group-hover:bg-accent-500 group-hover:text-ocean-900"
                    : "bg-ocean-900/5 text-ocean-700 group-hover:bg-ocean-900 group-hover:text-accent-500",
                )}
              >
                <Icon size={22} aria-hidden />
              </span>
              <span
                className={cn(
                  "text-[10px] font-semibold uppercase tracking-[0.18em]",
                  isDark ? "text-accent-400" : "text-accent-700",
                )}
              >
                {service.group}
              </span>
            </div>
          ) : null}

          <h3
            className={cn(
              "fluid-h3 leading-tight transition-colors",
              isDark
                ? "text-paper group-hover:text-accent-300"
                : "text-ocean-900 group-hover:text-ocean-700",
            )}
          >
            {service.title}
          </h3>
          <p
            className={cn(
              "text-sm leading-relaxed",
              isDark ? "text-sky-100/75" : "text-slate-500",
            )}
          >
            {service.description}
          </p>

          {/* CTA inline */}
          <div
            className={cn(
              "mt-auto flex items-center gap-3 border-t pt-4 transition-colors duration-500",
              isDark
                ? "border-paper/10 group-hover:border-accent-400/40"
                : "border-ocean-900/10 group-hover:border-accent-500/40",
            )}
          >
            <span
              className={cn(
                "inline-flex w-fit shrink-0 items-center gap-1.5 text-sm font-medium transition-colors duration-500",
                isDark
                  ? "text-accent-400 group-hover:text-paper"
                  : "text-accent-700 group-hover:text-ocean-900",
              )}
            >
              Découvrir la prestation
              <ArrowUpRight
                size={14}
                aria-hidden
                className="shrink-0 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
            {service.duree ? (
              <span
                className={cn(
                  "ml-auto hidden text-right text-[10px] uppercase tracking-[0.15em] sm:inline-flex",
                  isDark ? "text-paper/40" : "text-slate-500/70",
                )}
              >
                {service.duree}
              </span>
            ) : null}
          </div>
        </div>
      </Link>
    </TiltCard>
  );
}

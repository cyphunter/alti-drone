import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/data/services";
import { cn } from "@/lib/utils";
import { TiltCard } from "@/components/motion/tilt-card";

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

  return (
    <TiltCard
      max={5}
      glow
      className={cn(
        "group h-full rounded-2xl tilt-stage",
        className,
      )}
    >
      <Link
        href={`/${service.slug}`}
        aria-label={`En savoir plus sur : ${service.title}`}
        className={cn(
          "gradient-ring relative flex h-full flex-col gap-5 overflow-hidden rounded-2xl p-7 transition-all duration-500",
          isDark
            ? "bg-ocean-800/60 ring-1 ring-paper/10 hover:bg-ocean-700/80 hover:ring-accent-500/40"
            : "bg-ivory ring-1 ring-ocean-900/10 hover:-translate-y-1 hover:shadow-elevated hover:ring-accent-500/30",
        )}
      >
        {/* Numéro éditorial en filigrane */}
        {formattedIndex ? (
          <span
            aria-hidden
            className={cn(
              "pointer-events-none absolute -right-2 -top-4 select-none font-display text-[7rem] font-light leading-none transition-opacity duration-500",
              isDark
                ? "text-paper/[0.05] group-hover:text-accent-400/15"
                : "text-ocean-900/[0.04] group-hover:text-accent-700/15",
            )}
          >
            {formattedIndex}
          </span>
        ) : null}

        {/* Header : icon framed + arrow */}
        <div className="relative flex items-start justify-between">
          <span
            className={cn(
              "relative inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-500",
              isDark
                ? "bg-paper/10 text-accent-400 group-hover:bg-accent-500 group-hover:text-ocean-900 group-hover:shadow-accent-glow"
                : "bg-ocean-900/5 text-ocean-700 group-hover:bg-ocean-900 group-hover:text-accent-500 group-hover:shadow-soft",
            )}
          >
            <Icon size={24} aria-hidden />
            {/* Ring orbital animé au hover */}
            <span
              aria-hidden
              className="absolute inset-[-6px] rounded-2xl border border-dashed border-accent-500/0 transition-all duration-500 group-hover:border-accent-500/40 group-hover:[transform:rotate(15deg)]"
            />
          </span>
          <span
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-full transition-all duration-500",
              isDark
                ? "bg-paper/5 text-paper/60 group-hover:bg-accent-500 group-hover:text-ocean-900"
                : "bg-ocean-900/5 text-slate-500 group-hover:bg-ocean-900 group-hover:text-accent-500",
            )}
          >
            <ArrowUpRight
              size={16}
              aria-hidden
              className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>

        {/* Tag groupe */}
        <p
          className={cn(
            "relative inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em]",
            isDark ? "text-accent-400" : "text-accent-700",
          )}
        >
          <span
            aria-hidden
            className={cn(
              "h-px w-6 transition-all duration-500 group-hover:w-10",
              isDark ? "bg-accent-400" : "bg-accent-700",
            )}
          />
          {service.group}
        </p>

        {/* Title + description */}
        <div className="relative flex flex-1 flex-col gap-3">
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
        </div>

        {/* CTA inline */}
        <div
          className={cn(
            "relative mt-1 flex items-center justify-between border-t pt-4 transition-colors duration-500",
            isDark ? "border-paper/10 group-hover:border-accent-400/40" : "border-ocean-900/10 group-hover:border-accent-500/40",
          )}
        >
          <span
            className={cn(
              "inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-500",
              isDark ? "text-accent-400 group-hover:text-paper" : "text-accent-700 group-hover:text-ocean-900",
            )}
          >
            Découvrir la prestation
            <ArrowUpRight
              size={14}
              aria-hidden
              className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
          {service.duree ? (
            <span
              className={cn(
                "hidden text-[10px] uppercase tracking-[0.15em] sm:inline-flex",
                isDark ? "text-paper/40" : "text-slate-500/70",
              )}
            >
              {service.duree}
            </span>
          ) : null}
        </div>
      </Link>
    </TiltCard>
  );
}

import { AnimatedCounter } from "@/components/motion/animated-counter";
import { StaggerReveal, StaggerItem } from "@/components/motion/stagger-reveal";
import { stats } from "@/data/stats";
import { cn } from "@/lib/utils";

type StatsEditorialProps = {
  /** dark : sur fond ocean ; light : sur fond paper/bone */
  tone?: "dark" | "light";
  className?: string;
};

/**
 * Présentation premium des stats : grille magazine avec gros chiffres
 * gradient or, label et description séparés par une hairline verticale.
 */
export function StatsEditorial({ tone = "dark", className }: StatsEditorialProps) {
  const isDark = tone === "dark";

  return (
    <StaggerReveal
      className={cn(
        "grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 lg:gap-x-0",
        className,
      )}
    >
      {stats.map((s, i) => (
        <StaggerItem
          key={s.label}
          className={cn(
            "relative py-2 sm:px-8 lg:px-12 sm:first:pl-0 sm:last:pr-0",
            // Séparateurs verticaux entre cellules
            i > 0 && "sm:border-l",
            isDark ? "sm:border-paper/10" : "sm:border-ocean-900/10",
          )}
        >
          <div className="flex items-baseline gap-1">
            <span
              className={cn(
                "editorial-num whitespace-nowrap [font-variant-numeric:tabular-nums]",
                isDark ? "" : "editorial-num--light",
              )}
            >
              {s.prefix ?? ""}
              <AnimatedCounter to={s.to} suffix={s.suffix ?? ""} />
            </span>
          </div>

          <div
            aria-hidden
            className={cn(
              "mt-3 h-px w-12 transition-all",
              isDark ? "bg-accent-400/60" : "bg-accent-500/60",
            )}
          />

          <p
            className={cn(
              "mt-3 text-sm font-medium",
              isDark ? "text-paper" : "text-ocean-900",
            )}
          >
            {s.label}
          </p>
          {s.description ? (
            <p
              className={cn(
                "mt-1 text-xs leading-relaxed",
                isDark ? "text-sky-100/65" : "text-slate-500",
              )}
            >
              {s.description}
            </p>
          ) : null}
        </StaggerItem>
      ))}
    </StaggerReveal>
  );
}

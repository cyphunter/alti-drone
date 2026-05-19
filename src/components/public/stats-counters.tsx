import { AnimatedCounter } from "@/components/motion/animated-counter";
import { StaggerReveal, StaggerItem } from "@/components/motion/stagger-reveal";
import { stats } from "@/data/stats";

export function StatsCounters({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const numColor = tone === "light" ? "text-accent-400" : "text-ocean-900";
  const labelColor = tone === "light" ? "text-paper" : "text-ocean-900";
  const descColor = tone === "light" ? "text-sky-100/70" : "text-slate-500";

  return (
    <StaggerReveal className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-10">
      {stats.map((s) => (
        <StaggerItem key={s.label} className="text-center md:text-left">
          <p
            className={`font-display text-5xl font-medium leading-none tracking-tight md:text-6xl ${numColor}`}
          >
            {s.prefix ?? ""}
            <AnimatedCounter to={s.to} suffix={s.suffix ?? ""} />
          </p>
          <p className={`mt-3 text-sm font-medium ${labelColor}`}>{s.label}</p>
          {s.description ? (
            <p className={`mt-1 text-xs ${descColor}`}>{s.description}</p>
          ) : null}
        </StaggerItem>
      ))}
    </StaggerReveal>
  );
}

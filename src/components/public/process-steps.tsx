"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Eye, Droplets, ShieldCheck, FileImage } from "lucide-react";
import { cn } from "@/lib/utils";

type Step = {
  num: string;
  title: string;
  text: string;
  icon: typeof Eye;
};

const STEPS: readonly Step[] = [
  {
    num: "01",
    title: "Inspection drone",
    text: "Survol HD du toit ou de la façade : cartographie des zones encrassées, repérage des tuiles cassées, état des solins et faîtages.",
    icon: Eye,
  },
  {
    num: "02",
    title: "Pulvérisation contrôlée",
    text: "Application par drone d'un produit anti-mousse dosé selon le support. Pulvérisation homogène, sans piétiner la couverture.",
    icon: Droplets,
  },
  {
    num: "03",
    title: "Hydrofuge en option",
    text: "Après séchage, application d'un hydrofuge filmogène ou pénétrant pour protéger durablement contre l'eau, le gel et la repousse.",
    icon: ShieldCheck,
  },
  {
    num: "04",
    title: "Rapport photo HD",
    text: "Remise des photos et vidéos d'inspection avant/après avec conseils d'entretien pour pérenniser le résultat.",
    icon: FileImage,
  },
];

type ProcessStepsProps = {
  tone?: "light" | "dark";
  className?: string;
};

export function ProcessSteps({ tone = "light", className }: ProcessStepsProps) {
  const reduce = useReducedMotion();
  const isDark = tone === "dark";

  return (
    <div className={cn("relative", className)}>
      {/* Ligne de connexion horizontale (desktop) */}
      <div
        aria-hidden
        className={cn(
          "absolute left-0 right-0 top-[5.5rem] hidden h-px bg-gradient-to-r lg:block",
          isDark
            ? "from-transparent via-accent-400/40 to-transparent"
            : "from-transparent via-accent-500/40 to-transparent",
        )}
      />

      <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-8">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.li
              key={s.num}
              initial={reduce ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.8,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative flex flex-col gap-4"
            >
              {/* Pastille numéro + icône */}
              <div className="relative flex items-center gap-4">
                <span
                  className={cn(
                    "relative inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-full ring-1",
                    isDark
                      ? "bg-ocean-800 ring-accent-400/40"
                      : "bg-paper ring-accent-500/50 shadow-soft",
                  )}
                >
                  <Icon
                    size={22}
                    aria-hidden
                    className={isDark ? "text-accent-400" : "text-accent-700"}
                  />
                  {/* Petit indicateur en haut à droite */}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -right-1 -top-1 h-3 w-3 rounded-full ring-2",
                      isDark
                        ? "bg-accent-400 ring-ocean-900"
                        : "bg-accent-500 ring-paper",
                    )}
                  />
                </span>
                <span
                  className={cn(
                    "font-display text-5xl font-light leading-none tracking-tight",
                    isDark
                      ? "text-paper/30"
                      : "text-ocean-900/15",
                  )}
                  aria-hidden
                >
                  {s.num}
                </span>
              </div>

              <h3
                className={cn(
                  "font-display text-xl font-medium leading-tight",
                  isDark ? "text-paper" : "text-ocean-900",
                )}
              >
                {s.title}
              </h3>
              <p
                className={cn(
                  "text-sm leading-relaxed",
                  isDark ? "text-sky-100/75" : "text-slate-500",
                )}
              >
                {s.text}
              </p>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}

"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Fragment, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type TextRevealProps = {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  /** Délai global avant le démarrage (s) */
  delay?: number;
  /** Pas entre chaque mot (s) */
  stagger?: number;
  /** Durée de l'animation par mot (s) */
  duration?: number;
  /** "word" = mot par mot (défaut), "line" = par ligne complète */
  mode?: "word" | "line";
};

const wordVariants: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: { y: "0%", opacity: 1 },
};

/**
 * Révèle un texte par mots (ou lignes) avec un slide-up cinematic.
 * Chaque mot est dans un overflow:hidden span pour effet "rideau".
 * Respecte prefers-reduced-motion : affiche le texte tel quel.
 */
export function TextReveal({
  children,
  className,
  as = "h1",
  delay = 0,
  stagger = 0.06,
  duration = 0.9,
  mode = "word",
}: TextRevealProps) {
  const reduce = useReducedMotion();
  const Tag = as;

  if (reduce) {
    return <Tag className={className}>{children}</Tag>;
  }

  const segments =
    mode === "line" ? children.split("\n") : children.split(/(\s+)/);

  return (
    <Tag className={cn(className)}>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ staggerChildren: stagger, delayChildren: delay }}
        style={{ display: "inline" }}
      >
        {segments.map((seg, i) => {
          // Whitespace segments : on les rend tels quels (espace ou newline)
          if (/^\s+$/.test(seg)) {
            return <Fragment key={i}>{seg}</Fragment>;
          }
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "baseline",
                lineHeight: "inherit",
                // Élargit le clip pour ne pas couper les descenders
                // (g, p, q, y, j) et le slant italique de Fraunces.
                // Compensé par margin négatif équivalent pour ne pas
                // décaler la baseline du flow.
                paddingTop: "0.12em",
                paddingBottom: "0.35em",
                paddingInline: "0.08em",
                marginTop: "-0.12em",
                marginBottom: "-0.35em",
                marginInline: "-0.08em",
              }}
            >
              <motion.span
                variants={wordVariants}
                transition={{ duration, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: "inline-block" }}
              >
                {seg}
              </motion.span>
            </span>
          );
        })}
      </motion.span>
    </Tag>
  );
}

type TextRevealWrapperProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/**
 * Variante de TextReveal qui prend des ReactNode (utile pour <span> imbriqués
 * avec italic-display, color, etc.). Plus simple : applique un fade-up sur l'ensemble.
 */
export function FadeUp({
  children,
  className,
  delay = 0,
}: TextRevealWrapperProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

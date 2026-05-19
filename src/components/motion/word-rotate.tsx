"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type WordRotateProps = {
  words: readonly string[];
  /** Durée d'affichage de chaque mot (ms) */
  interval?: number;
  className?: string;
};

/**
 * Rotation de mots avec morph blur + fade + micro-translate.
 *
 * On évite `overflow: hidden` exprès : un inline-block avec overflow ≠ visible
 * perd sa baseline naturelle (devient le bord-bas de la box) et clip aussi
 * les descenders ("g", "p", "y", "j") + le slant des italiques Fraunces.
 * Avec popLayout, le mot sortant est extrait du flow, donc pas de saut de
 * largeur — et sans clip, l'alignement vertical reste impeccable.
 */
export function WordRotate({ words, interval = 2400, className }: WordRotateProps) {
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setIdx((i) => (i + 1) % words.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [interval, words.length, reduce]);

  if (reduce) {
    return <span className={className}>{words[0]}</span>;
  }

  return (
    <span
      className={cn("relative inline-block align-baseline", className)}
      style={{ lineHeight: "inherit" }}
      aria-live="polite"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[idx]}
          initial={{ filter: "blur(10px)", opacity: 0, y: 6 }}
          animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          exit={{ filter: "blur(10px)", opacity: 0, y: -6 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block whitespace-nowrap"
          style={{ willChange: "filter, opacity, transform" }}
        >
          {words[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

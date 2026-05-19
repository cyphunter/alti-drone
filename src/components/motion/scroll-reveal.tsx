"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li" | "header" | "footer";
  y?: number;
};

const buildVariants = (y: number): Variants => ({
  hidden: { opacity: 0, y },
  visible: { opacity: 1, y: 0 },
});

/**
 * Fade-up au scroll, joué une seule fois. Respecte prefers-reduced-motion
 * via le MotionConfig racine (ReducedMotionProvider).
 */
export function ScrollReveal({
  children,
  delay = 0,
  className,
  as = "div",
  y = 24,
}: ScrollRevealProps) {
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      variants={buildVariants(y)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}

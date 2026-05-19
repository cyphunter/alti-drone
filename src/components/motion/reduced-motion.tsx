"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Wrapper Framer Motion qui respecte automatiquement `prefers-reduced-motion`.
 * À utiliser comme racine de tout layout ou composant qui anime.
 *
 * Pour GSAP/Lenis : tester `window.matchMedia("(prefers-reduced-motion: reduce)").matches`
 * au mount et désactiver / no-op si true.
 */
export function ReducedMotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

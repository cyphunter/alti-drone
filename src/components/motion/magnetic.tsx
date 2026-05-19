"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import {
  Children,
  isValidElement,
  useRef,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  /** Force du déplacement (0–1, défaut 0.25 — subtil) */
  strength?: number;
  /** Rayon d'activation en px (défaut 120) */
  radius?: number;
};

/**
 * Wrapper d'effet magnétique subtil : l'élément suit légèrement le curseur
 * quand celui-ci approche. Désactivé en touch / reduced-motion.
 */
export function Magnetic({
  children,
  className,
  strength = 0.25,
  radius = 120,
}: MagneticProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 180, damping: 18, mass: 0.6 });

  function onMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist > radius) {
      x.set(0);
      y.set(0);
      return;
    }
    x.set(dx * strength);
    y.set(dy * strength);
  }
  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ x: sx, y: sy }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Variante "inline" : attache l'effet magnetic à un enfant déjà existant
 * (ex: un Button asChild) sans wrapper supplémentaire visible.
 */
export function MagneticInline({ children }: { children: ReactElement }) {
  if (!isValidElement(children)) return <>{children}</>;
  return <Magnetic className="inline-flex">{Children.only(children)}</Magnetic>;
}

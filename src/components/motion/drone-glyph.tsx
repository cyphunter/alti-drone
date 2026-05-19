"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type DroneGlyphProps = {
  className?: string;
  size?: number;
  spin?: boolean;
  tone?: "light" | "dark";
};

/**
 * Glyphe drone SVG avec hélices animées. Utilisé pour accents visuels
 * (hero, sections about, logo enrichi).
 */
export function DroneGlyph({
  className,
  size = 120,
  spin = true,
  tone = "light",
}: DroneGlyphProps) {
  const reduce = useReducedMotion();
  const color = tone === "light" ? "var(--color-accent-400)" : "var(--color-ocean-900)";
  const stroke = tone === "light" ? "rgb(243 241 236 / 0.85)" : "rgb(6 26 46 / 0.7)";

  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={cn("select-none", className)}
      aria-hidden
    >
      {/* Bras croisés */}
      <line x1="40" y1="40" x2="160" y2="160" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
      <line x1="160" y1="40" x2="40" y2="160" stroke={stroke} strokeWidth="3" strokeLinecap="round" />

      {/* Corps central */}
      <rect x="80" y="80" width="40" height="40" rx="6" fill={color} opacity="0.18" />
      <rect x="86" y="86" width="28" height="28" rx="4" fill={color} opacity="0.85" />
      <circle cx="100" cy="100" r="4" fill="var(--color-ocean-900)" />

      {/* Hélices — groupes animés */}
      {(["40,40", "160,40", "40,160", "160,160"] as const).map((pt, i) => {
        const [cx, cy] = pt.split(",").map(Number);
        return (
          <motion.g
            key={i}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
            animate={
              reduce || !spin
                ? { rotate: 0 }
                : { rotate: 360 }
            }
            transition={{ duration: 0.18, ease: "linear", repeat: Infinity }}
          >
            <ellipse cx={cx} cy={cy} rx="22" ry="3" fill={stroke} opacity="0.5" />
            <ellipse cx={cx} cy={cy} rx="3" ry="22" fill={stroke} opacity="0.5" />
            <circle cx={cx} cy={cy} r="6" fill={color} />
            <circle cx={cx} cy={cy} r="2" fill="var(--color-ocean-900)" />
          </motion.g>
        );
      })}
    </svg>
  );
}

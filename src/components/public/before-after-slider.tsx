"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

type BeforeAfterSliderProps = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  aspectRatio?: string;
  className?: string;
  initial?: number;
};

/**
 * Slider avant/après — drag horizontal pour révéler la moitié.
 * Respecte prefers-reduced-motion (pas d'animation de l'initial).
 */
export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  aspectRatio = "4/3",
  className,
  initial = 50,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [position, setPosition] = useState(initial);
  const [dragging, setDragging] = useState(false);

  const setFromX = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(pct);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setDragging(true);
    setFromX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    setFromX(e.clientX);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    setDragging(false);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 5));
    if (e.key === "ArrowRight") setPosition((p) => Math.min(100, p + 5));
    if (e.key === "Home") setPosition(0);
    if (e.key === "End") setPosition(100);
  };

  return (
    <motion.div
      ref={containerRef}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative select-none overflow-hidden rounded-2xl ring-1 ring-ocean-900/10",
        className,
      )}
      style={{ aspectRatio }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* Image AFTER en fond (visible) */}
      <Image
        src={afterSrc}
        alt={afterAlt}
        fill
        sizes="(min-width: 1024px) 60vw, 90vw"
        className="object-cover"
      />
      {/* Image BEFORE clippée */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        aria-hidden
      >
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          fill
          sizes="(min-width: 1024px) 60vw, 90vw"
          className="object-cover"
        />
      </div>

      {/* Labels */}
      <span className="absolute left-4 top-4 rounded-full bg-ocean-900/85 px-3 py-1 text-xs font-medium uppercase tracking-wider text-paper">
        Avant
      </span>
      <span className="absolute right-4 top-4 rounded-full bg-accent-500 px-3 py-1 text-xs font-medium uppercase tracking-wider text-ocean-900">
        Après
      </span>

      {/* Curseur */}
      <div
        role="slider"
        tabIndex={0}
        aria-label="Glissez pour comparer avant et après"
        aria-valuenow={Math.round(position)}
        aria-valuemin={0}
        aria-valuemax={100}
        onKeyDown={onKey}
        className="absolute inset-y-0 flex w-1 cursor-ew-resize items-center justify-center bg-paper shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
        style={{ left: `calc(${position}% - 2px)` }}
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-paper shadow-elevated ring-1 ring-ocean-900/10">
          <GripVertical size={18} aria-hidden className="text-ocean-900" />
        </span>
      </div>
    </motion.div>
  );
}

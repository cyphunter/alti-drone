"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import type { Temoignage } from "@/data/temoignages";
import { cn } from "@/lib/utils";

type TestimonialsProps = {
  items: readonly Temoignage[];
  tone?: "dark" | "light";
  /** Durée d'affichage de chaque témoignage avant rotation (ms). Défaut 8000. */
  interval?: number;
};

const AUTO_ROTATE_INTERVAL = 8000;

export function Testimonials({
  items,
  tone = "dark",
  interval = AUTO_ROTATE_INTERVAL,
}: TestimonialsProps) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const pausedRef = useRef(false);
  const timerRef = useRef<number | null>(null);

  // Auto-rotation lente, désactivée si reduce-motion ou ≤ 1 témoignage,
  // mise en pause au hover.
  useEffect(() => {
    if (reduce) return;
    if (items.length <= 1) return;

    const tick = () => {
      if (!pausedRef.current) {
        setIndex((i) => (i + 1) % items.length);
      }
      timerRef.current = window.setTimeout(tick, interval);
    };
    timerRef.current = window.setTimeout(tick, interval);

    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, [items.length, interval, reduce]);

  // Reset du timer au clic manuel (les utilisateurs n'aiment pas un saut
  // 0.5 s après leur action).
  const resetTimer = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        if (!pausedRef.current) {
          setIndex((i) => (i + 1) % items.length);
        }
      }, interval);
    }
  };

  if (items.length === 0) {
    return (
      <div className="rounded-2xl bg-ivory p-8 text-center text-sm text-slate-500 ring-1 ring-ocean-900/10">
        <Quote size={28} aria-hidden className="mx-auto mb-3 text-accent-500" />
        <p>
          Les premiers témoignages de clients arrivent prochainement. <br />
          En attendant, n&apos;hésitez pas à consulter notre Instagram pour voir nos
          chantiers en cours.
        </p>
      </div>
    );
  }

  const current = items[index];
  const isDark = tone === "dark";

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
      onFocusCapture={() => {
        pausedRef.current = true;
      }}
      onBlurCapture={() => {
        pausedRef.current = false;
      }}
    >
      <Quote
        size={48}
        aria-hidden
        className={isDark ? "text-accent-500/30" : "text-accent-700/25"}
      />
      <AnimatePresence mode="wait">
        <motion.blockquote
          key={current.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4 }}
          className={`mt-4 fluid-h3 leading-snug ${
            isDark ? "text-paper" : "text-ocean-900"
          }`}
        >
          “{current.texte}”
        </motion.blockquote>
      </AnimatePresence>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p
            className={`font-display text-lg ${
              isDark ? "text-paper" : "text-ocean-900"
            }`}
          >
            {current.nom}
          </p>
          <p
            className={`text-sm ${
              isDark ? "text-sky-100/70" : "text-slate-500"
            }`}
          >
            {current.ville} · {current.prestation}
          </p>
          {current.note ? (
            <div className="mt-2 flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  aria-hidden
                  className={
                    i < current.note!
                      ? "fill-accent-500 text-accent-500"
                      : isDark
                        ? "text-paper/30"
                        : "text-slate-300"
                  }
                />
              ))}
            </div>
          ) : null}
        </div>

        {items.length > 1 ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setIndex((i) => (i - 1 + items.length) % items.length);
                resetTimer();
              }}
              aria-label="Témoignage précédent"
              className={cn(
                "group inline-flex h-10 w-10 items-center justify-center rounded-full ring-1 transition-all duration-300",
                isDark
                  ? "text-paper ring-paper/30 hover:bg-paper/10 hover:ring-accent-400/50"
                  : "text-ocean-900 ring-ocean-900/15 hover:bg-ocean-900/5 hover:ring-accent-500/50",
              )}
            >
              <ChevronLeft
                size={18}
                aria-hidden
                className="transition-transform duration-300 group-hover:-translate-x-0.5"
              />
            </button>
            <button
              type="button"
              onClick={() => {
                setIndex((i) => (i + 1) % items.length);
                resetTimer();
              }}
              aria-label="Témoignage suivant"
              className={cn(
                "group inline-flex h-10 w-10 items-center justify-center rounded-full ring-1 transition-all duration-300",
                isDark
                  ? "text-paper ring-paper/30 hover:bg-paper/10 hover:ring-accent-400/50"
                  : "text-ocean-900 ring-ocean-900/15 hover:bg-ocean-900/5 hover:ring-accent-500/50",
              )}
            >
              <ChevronRight
                size={18}
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </button>
          </div>
        ) : null}
      </div>

      {/* Dots indicateurs */}
      {items.length > 1 ? (
        <div
          className="mt-6 flex items-center gap-2"
          role="tablist"
          aria-label="Sélectionner un témoignage"
        >
          {items.map((it, i) => {
            const active = i === index;
            return (
              <button
                key={it.id}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={`Témoignage ${i + 1} sur ${items.length}`}
                onClick={() => {
                  setIndex(i);
                  resetTimer();
                }}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500 ease-out",
                  active
                    ? "w-8 bg-accent-500"
                    : isDark
                      ? "w-1.5 bg-paper/30 hover:bg-paper/50"
                      : "w-1.5 bg-ocean-900/20 hover:bg-ocean-900/40",
                )}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

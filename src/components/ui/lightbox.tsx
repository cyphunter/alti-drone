"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { SmartImage } from "@/components/ui/smart-image";

export type LightboxItem = {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  /** Slug de la prestation liée — affiche un lien « Voir la prestation ». */
  service?: string;
  width: number;
  height: number;
};

type LightboxProps = {
  items: readonly LightboxItem[];
  index: number | null;
  onClose: () => void;
  onChange: (next: number) => void;
};

/**
 * Visionneuse plein écran accessible : Escape ferme, flèches naviguent,
 * clic fond ferme, scroll body locké. Rendue dans un portal pour échapper
 * à d'éventuels conteneurs avec overflow ou stacking context contraint.
 */
export function Lightbox({ items, index, onClose, onChange }: LightboxProps) {
  const reduce = useReducedMotion();
  const triggerRef = useRef<Element | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const isOpen = index !== null && items.length > 0;
  const current = isOpen ? items[index] : null;
  const total = items.length;

  const goPrev = useCallback(() => {
    if (index === null) return;
    onChange((index - 1 + total) % total);
  }, [index, total, onChange]);

  const goNext = useCallback(() => {
    if (index === null) return;
    onChange((index + 1) % total);
  }, [index, total, onChange]);

  useEffect(() => {
    if (!isOpen) return;

    triggerRef.current = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };

    window.addEventListener("keydown", handleKey);

    const focusTimer = window.setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    return () => {
      window.removeEventListener("keydown", handleKey);
      window.clearTimeout(focusTimer);
      document.body.style.overflow = prevOverflow;
      if (triggerRef.current instanceof HTMLElement) {
        triggerRef.current.focus();
      }
    };
  }, [isOpen, onClose, goPrev, goNext]);

  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && current ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={current.caption ?? current.alt}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-ocean-950/95 backdrop-blur-md"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Fermer la visionneuse"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-paper/10 text-paper ring-1 ring-paper/30 backdrop-blur transition hover:bg-accent-500 hover:text-ocean-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 sm:right-6 sm:top-6"
          >
            <X size={20} aria-hidden />
          </button>

          {total > 1 ? (
            <>
              <button
                type="button"
                onClick={goPrev}
                aria-label="Image précédente"
                className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper/10 text-paper ring-1 ring-paper/30 backdrop-blur transition hover:bg-accent-500 hover:text-ocean-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 sm:left-6 sm:h-12 sm:w-12"
              >
                <ChevronLeft size={22} aria-hidden />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Image suivante"
                className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper/10 text-paper ring-1 ring-paper/30 backdrop-blur transition hover:bg-accent-500 hover:text-ocean-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 sm:right-6 sm:h-12 sm:w-12"
              >
                <ChevronRight size={22} aria-hidden />
              </button>
            </>
          ) : null}

          <motion.figure
            key={current.id}
            className="relative mx-auto flex max-h-[88vh] max-w-[92vw] flex-col items-center justify-center"
            initial={reduce ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[80vh] max-w-[92vw]">
              <SmartImage
                src={current.src}
                alt={current.alt}
                width={current.width}
                height={current.height}
                priority
                sizes="92vw"
                className="h-auto max-h-[80vh] w-auto max-w-[92vw] rounded-xl object-contain"
              />
            </div>
            {current.caption || current.service || total > 1 ? (
              <figcaption className="mt-4 flex max-w-2xl flex-col items-center gap-2 px-4 text-center">
                {current.caption ? (
                  <span className="font-display text-sm leading-snug text-paper/90 sm:text-base">
                    {current.caption}
                    {total > 1 ? (
                      <span className="ml-2 text-xs tracking-[0.18em] text-paper/50">
                        {(index ?? 0) + 1} / {total}
                      </span>
                    ) : null}
                  </span>
                ) : total > 1 ? (
                  <span className="text-xs tracking-[0.18em] text-paper/50">
                    {(index ?? 0) + 1} / {total}
                  </span>
                ) : null}
                {current.service ? (
                  <Link
                    href={`/${current.service}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-paper/10 px-3 py-1 text-xs font-medium text-accent-300 ring-1 ring-paper/20 backdrop-blur transition hover:bg-accent-500 hover:text-ocean-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400"
                  >
                    Voir la prestation
                    <ArrowRight size={13} aria-hidden />
                  </Link>
                ) : null}
              </figcaption>
            ) : null}
          </motion.figure>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

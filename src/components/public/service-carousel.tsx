"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type ServiceCarouselProps = {
  /** Slides déjà rendues côté serveur (chaque enfant = un <li>). */
  children: ReactNode;
  /** Intervalle entre deux avancées, en millisecondes. */
  intervalMs?: number;
  className?: string;
};

/**
 * Carrousel pas-à-pas pour les groupes > 3 prestations.
 *
 * - Avance d'UNE carte à la fois, en boucle, toutes les `intervalMs` (3 s par
 *   défaut). Pas de défilement continu : un glissement net puis une pause.
 * - Boucle sans couture grâce à une seconde copie des slides : on avance
 *   jusqu'à la première copie (visuellement identique au début) puis on
 *   réaligne instantanément sur le début.
 * - Pause au survol, au focus clavier et quand l'onglet est caché.
 * - `prefers-reduced-motion` : pas d'avance automatique ; le défilement
 *   horizontal manuel (tactile / trackpad) reste disponible.
 * - Scrollbar masquée (`.no-scrollbar`), le scroll natif reste fonctionnel
 *   pour le tactile.
 *
 * Reçoit uniquement des nœuds déjà rendus (`children`) — jamais les objets
 * `service` bruts (l'icône n'est pas sérialisable Server → Client).
 */
export function ServiceCarousel({
  children,
  intervalMs = 3000,
  className,
}: ServiceCarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const pausedRef = useRef(false);

  // Duplique les slides pour la boucle. Les copies sont retirées de l'arbre
  // d'accessibilité et du focus (aria-hidden + inert).
  const slides = Children.toArray(children);
  const loop: ReactNode[] = [
    ...slides,
    ...slides.map((slide, i) =>
      isValidElement(slide)
        ? cloneElement(
            slide as React.ReactElement<{
              inert?: boolean;
              "aria-hidden"?: boolean;
            }>,
            { key: `dup-${i}`, inert: true, "aria-hidden": true },
          )
        : slide,
    ),
  ];

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return; // avance manuelle uniquement

    let resetTimer: ReturnType<typeof setTimeout> | undefined;

    const lis = () =>
      Array.from(el.querySelectorAll<HTMLElement>(":scope > li"));

    const targetFor = (items: HTMLElement[], i: number) =>
      items[i].offsetLeft - items[0].offsetLeft;

    const step = () => {
      if (pausedRef.current) return;
      const items = lis();
      const n = items.length / 2; // nombre de slides logiques
      if (n < 1 || items.length < 2) return;
      const pitch = items[1].offsetLeft - items[0].offsetLeft;
      if (pitch <= 0) return;

      let curr = Math.round(el.scrollLeft / pitch);
      // Si on a dérivé dans les copies (scroll manuel), on réaligne d'abord.
      if (curr >= n) {
        el.scrollLeft = targetFor(items, curr - n);
        curr -= n;
      }

      const next = curr + 1;
      el.scrollTo({ left: targetFor(items, next), behavior: "smooth" });

      // Arrivé sur la première copie (== slide 0) : réalignement invisible.
      if (next >= n) {
        resetTimer = setTimeout(() => {
          el.scrollTo({ left: targetFor(items, next - n), behavior: "auto" });
        }, 700);
      }
    };

    const id = setInterval(step, intervalMs);

    const onVisibility = () => {
      pausedRef.current = document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      clearInterval(id);
      if (resetTimer) clearTimeout(resetTimer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [intervalMs]);

  return (
    <ul
      ref={trackRef}
      aria-label="Prestations"
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
      onFocusCapture={() => (pausedRef.current = true)}
      onBlurCapture={() => (pausedRef.current = false)}
      className={cn(
        "no-scrollbar -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-4 px-4 pb-8 pt-2",
        className,
      )}
    >
      {loop}
    </ul>
  );
}

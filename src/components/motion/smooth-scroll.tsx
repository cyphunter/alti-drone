"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Smooth scroll global via Lenis. Lenis n'est instancié QUE si l'utilisateur
 * n'a pas activé `prefers-reduced-motion` (cf. CLAUDE.md / kinball pattern).
 *
 * Important : Lenis intercepte la molette mais PAS le drag de la scrollbar.
 * Pendant un drag scrollbar, on suspend Lenis (lenis.stop()) sinon les deux
 * scrolls se battent et provoquent des sauts/artefacts visuels.
 */
export function SmoothScroll() {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    let lenis: Lenis | null = null;
    let rafId = 0;
    let scrollbarDragging = false;

    const isOnVerticalScrollbar = (e: MouseEvent) => {
      // La scrollbar verticale se trouve à droite du contenu, donc à
      // x >= clientWidth (qui exclut justement la scrollbar).
      return e.clientX >= document.documentElement.clientWidth;
    };

    const onMouseDown = (e: MouseEvent) => {
      if (!lenis) return;
      if (e.button !== 0) return; // clic gauche uniquement
      if (!isOnVerticalScrollbar(e)) return;
      scrollbarDragging = true;
      lenis.stop();
    };
    const onMouseUp = () => {
      if (!scrollbarDragging || !lenis) return;
      scrollbarDragging = false;
      lenis.start();
    };

    const start = () => {
      if (mq.matches) return;
      lenis = new Lenis({
        lerp: 0.08,
        duration: 1.15,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      });
      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);

      window.addEventListener("mousedown", onMouseDown, { passive: true });
      window.addEventListener("mouseup", onMouseUp, { passive: true });
    };

    const stop = () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      lenis?.destroy();
      lenis = null;
      scrollbarDragging = false;
    };

    start();

    const onChange = () => {
      stop();
      start();
    };
    mq.addEventListener("change", onChange);

    return () => {
      mq.removeEventListener("change", onChange);
      stop();
    };
  }, []);

  return null;
}

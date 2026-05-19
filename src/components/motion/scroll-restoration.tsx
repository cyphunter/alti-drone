"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * Force le retour en haut de page à chaque changement de route.
 *
 * Lenis intercepte le scroll natif : sur navigation Next.js, le scroll
 * par défaut peut être ignoré (la position reste celle de la page précédente).
 * On appelle donc `lenis.scrollTo(0, { immediate: true })` quand l'instance
 * existe, sinon on retombe sur `window.scrollTo` (prefers-reduced-motion).
 *
 * On ignore le hash (`#ancre`) — Next.js gère lui-même le scroll vers l'ancre.
 */
export function ScrollRestoration() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash) return;

    const lenis = window.__lenis;
    if (lenis && typeof lenis.scrollTo === "function") {
      lenis.scrollTo(0, { immediate: true, force: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname, searchParams]);

  return null;
}

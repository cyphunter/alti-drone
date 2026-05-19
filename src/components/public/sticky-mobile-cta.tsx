"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Phone, MessageSquare } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * Barre fixe bas d'écran (mobile uniquement) avec deux CTA : Appeler + Devis.
 *
 * Comportement intelligent :
 * - Cachée au-dessus de 200 px de scroll (zone hero).
 * - Cachée quand on scrolle vers le bas (l'utilisateur lit).
 * - Réapparaît au scroll vers le haut (l'utilisateur cherche à agir).
 */
export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  const lastScrollY = useRef(0);
  const rafPending = useRef(false);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const update = () => {
      const y = window.scrollY;
      const delta = y - lastScrollY.current;

      if (y < 200) {
        setVisible(false);
      } else if (delta > 4) {
        // Scroll vers le bas → on cache
        setVisible(false);
      } else if (delta < -4) {
        // Scroll vers le haut → on montre
        setVisible(true);
      }
      lastScrollY.current = y;
      rafPending.current = false;
    };

    const onScroll = () => {
      if (rafPending.current) return;
      rafPending.current = true;
      window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 transform border-t border-paper/10 bg-ocean-900/95 px-3 py-2 shadow-cinema backdrop-blur-md transition-all duration-300 ease-out md:hidden",
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
      )}
      role="region"
      aria-label="Contact rapide"
      aria-hidden={!visible}
    >
      <div className="flex items-center gap-2">
        <a
          href={`tel:${siteConfig.contact.phone}`}
          className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-paper/30 text-sm font-medium text-paper transition-colors hover:bg-paper/5"
          tabIndex={visible ? 0 : -1}
        >
          <Phone size={16} aria-hidden />
          Appeler
        </a>
        <Link
          href="/contactdrone"
          className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-accent-500 text-sm font-medium text-ocean-900 transition-colors hover:bg-accent-400"
          tabIndex={visible ? 0 : -1}
        >
          <MessageSquare size={16} aria-hidden />
          Devis gratuit
        </Link>
      </div>
    </div>
  );
}

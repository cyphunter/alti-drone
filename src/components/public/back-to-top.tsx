"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";

/**
 * Bouton flottant qui apparaît après ~600 px de scroll et ramène
 * en haut de page en smooth. Placé en bas-droit, décalé au-dessus
 * du sticky mobile CTA sur petits écrans.
 */
export function BackToTop() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return (
    <AnimatePresence>
      {show ? (
        <motion.button
          type="button"
          onClick={handleClick}
          aria-label="Retour en haut de la page"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="glass-dark group fixed bottom-24 right-4 z-30 inline-flex h-12 w-12 items-center justify-center rounded-full text-paper shadow-cinema ring-1 ring-paper/15 transition-colors duration-300 hover:bg-accent-500 hover:text-ocean-900 md:bottom-6 md:right-6"
        >
          <ArrowUp
            size={18}
            aria-hidden
            className="transition-transform duration-500 ease-out group-hover:-translate-y-0.5"
          />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}

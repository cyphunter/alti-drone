"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Maximize2 } from "lucide-react";
import { useState } from "react";
import type { GalleryItem } from "@/data/galerie";
import { cn } from "@/lib/utils";
import { SmartImage } from "@/components/ui/smart-image";
import { Lightbox } from "@/components/ui/lightbox";

type BentoGalleryProps = {
  items: readonly GalleryItem[];
  className?: string;
};

/**
 * Layout mosaic asymétrique premium (bento style).
 * Les 6 premières images sont arrangées avec des spans variables
 * pour produire une composition magazine. Reveal stagger au scroll.
 * Au clic, ouvre la visionneuse (Lightbox) avec navigation prev/next.
 */
export function BentoGallery({ items, className }: BentoGalleryProps) {
  const reduce = useReducedMotion();
  const list = items.slice(0, 6);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Pattern bento desktop (grid 4 colonnes, 3 rangées) :
  //   [ 1 . 1 . ][ 2 ][ 3 ]
  //   [ 1 . 1 . ][ 4 ][ 3 ]
  //   [ 5 . 5 . ][ 6 ][ . ]
  // Sur mobile (grid-cols-2) tous les items occupent une seule cellule,
  // l'aspect-ratio impose une hauteur uniforme.
  const slots = [
    { col: "lg:col-span-2", row: "lg:row-span-2" },
    { col: "lg:col-span-1", row: "lg:row-span-1" },
    { col: "lg:col-span-1", row: "lg:row-span-2" },
    { col: "lg:col-span-1", row: "lg:row-span-1" },
    { col: "lg:col-span-2", row: "lg:row-span-1" },
    { col: "lg:col-span-1", row: "lg:row-span-1" },
  ];

  return (
    <>
      <ul
        className={cn(
          "grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:auto-rows-[220px] lg:grid-flow-dense",
          className,
        )}
      >
        {list.map((g, i) => {
          const slot = slots[i] ?? slots[0];
          return (
            <motion.li
              key={g.id}
              initial={reduce ? false : { opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.8,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={cn(
                "group relative overflow-hidden rounded-2xl ring-1 ring-ocean-900/10",
                // Aspect uniforme sur mobile/tablette ; libre sur desktop
                // (la hauteur est pilotée par auto-rows + row-span).
                "aspect-[4/3] lg:aspect-auto",
                slot.col,
                slot.row,
              )}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(i)}
                aria-label={`Agrandir : ${g.caption ?? g.alt}`}
                className="absolute inset-0 block h-full w-full cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-bone"
              >
                <SmartImage
                  src={g.src}
                  alt={g.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 45vw, 50vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                />

                {/* Overlay marine + caption */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ocean-950/85 via-ocean-900/30 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100"
                />

                {/* Caption + icon */}
                <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
                  <span className="min-w-0 translate-y-1 transition-transform duration-500 group-hover:translate-y-0">
                    {g.service ? (
                      <span className="block text-[10px] uppercase tracking-[0.18em] text-accent-400">
                        {g.service.replace(/-/g, " ")}
                      </span>
                    ) : null}
                    {g.caption ? (
                      <span className="mt-1 line-clamp-2 block font-display text-sm leading-snug text-paper sm:text-base">
                        {g.caption}
                      </span>
                    ) : null}
                  </span>
                  <span
                    aria-hidden
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-paper/10 text-paper ring-1 ring-paper/30 backdrop-blur-md transition-all duration-500 group-hover:bg-accent-500 group-hover:text-ocean-900"
                  >
                    <Maximize2 size={14} />
                  </span>
                </span>

                {/* Hairline doré inférieur on hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-4 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-accent-400 via-accent-500 to-transparent transition-transform duration-700 group-hover:scale-x-100"
                />
              </button>
            </motion.li>
          );
        })}
      </ul>

      <Lightbox
        items={list}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onChange={setOpenIndex}
      />
    </>
  );
}

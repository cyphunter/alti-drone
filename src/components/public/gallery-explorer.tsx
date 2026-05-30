"use client";

import { useMemo, useState } from "react";
import { Maximize2, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import {
  GALLERY_CATEGORIES,
  type GalleryCategory,
  type GalleryItem,
} from "@/data/galerie";
import { SmartImage } from "@/components/ui/smart-image";
import { Lightbox, type LightboxItem } from "@/components/ui/lightbox";
import { cn } from "@/lib/utils";

type GalleryExplorerProps = {
  items: readonly GalleryItem[];
};

type Filter = "Tout" | GalleryCategory;

/**
 * Galerie filtrable : onglets par catégorie + mosaïque (masonry CSS) + visionneuse.
 * La grille charge la variante légère (`src`), la visionneuse la variante HD (`full`).
 * Filtre et visionneuse respectent prefers-reduced-motion.
 */
export function GalleryExplorer({ items }: GalleryExplorerProps) {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<Filter>("Tout");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Catégories réellement présentes, dans l'ordre canonique, avec compteur.
  const tabs = useMemo<{ key: Filter; count: number }[]>(() => {
    const present = GALLERY_CATEGORIES.filter((c) =>
      items.some((g) => g.category === c),
    ).map((c) => ({ key: c as Filter, count: items.filter((g) => g.category === c).length }));
    return [{ key: "Tout" as Filter, count: items.length }, ...present];
  }, [items]);

  const filtered = useMemo(
    () => (filter === "Tout" ? items : items.filter((g) => g.category === filter)),
    [items, filter],
  );

  // La visionneuse ouvre la version HD (full) tout en conservant légende + lien.
  const lightboxItems = useMemo<LightboxItem[]>(
    () =>
      filtered.map((g) => ({
        id: g.id,
        src: g.full,
        alt: g.alt,
        caption: g.caption,
        service: g.service,
        width: g.width,
        height: g.height,
      })),
    [filtered],
  );

  const changeFilter = (next: Filter) => {
    setOpenIndex(null);
    setFilter(next);
  };

  return (
    <>
      {/* Onglets de filtre */}
      <div
        role="tablist"
        aria-label="Filtrer la galerie par type de chantier"
        className="mb-10 flex flex-wrap justify-center gap-2 sm:gap-3"
      >
        {tabs.map((t) => {
          const active = filter === t.key;
          return (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => changeFilter(t.key)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-bone",
                active
                  ? "bg-ocean-900 text-paper shadow-soft"
                  : "bg-paper text-ocean-900 ring-1 ring-ocean-900/10 hover:bg-ivory hover:ring-ocean-900/20",
              )}
            >
              {t.key}
              <span
                className={cn(
                  "text-xs tabular-nums",
                  active ? "text-accent-300" : "text-slate-400",
                )}
              >
                {t.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Mosaïque masonry */}
      <motion.ul
        key={filter}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="columns-2 gap-3 [column-fill:_balance] sm:gap-4 md:columns-3 lg:columns-4"
      >
        {filtered.map((g, i) => (
          <li key={g.id} className="mb-3 break-inside-avoid sm:mb-4">
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label={`Agrandir : ${g.caption}`}
              className="group relative block w-full overflow-hidden rounded-xl bg-ivory ring-1 ring-ocean-900/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-bone"
            >
              <SmartImage
                src={g.src}
                alt={g.alt}
                width={g.width}
                height={g.height}
                sizes="(min-width: 1024px) 24vw, (min-width: 768px) 32vw, 48vw"
                className="h-auto w-full cursor-zoom-in object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
              />

              {/* Voile + légende au survol */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ocean-950/80 via-ocean-900/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:p-4">
                <span className="min-w-0">
                  <span className="block text-[10px] uppercase tracking-[0.16em] text-accent-300">
                    {g.category}
                  </span>
                  <span className="mt-0.5 line-clamp-2 block font-display text-sm leading-snug text-paper">
                    {g.caption}
                  </span>
                  {g.location ? (
                    <span className="mt-1 inline-flex items-center gap-1 text-[11px] text-paper/70">
                      <MapPin size={11} aria-hidden />
                      {g.location}
                    </span>
                  ) : null}
                </span>
                <span
                  aria-hidden
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-paper/15 text-paper ring-1 ring-paper/30 backdrop-blur-md transition group-hover:bg-accent-500 group-hover:text-ocean-900"
                >
                  <Maximize2 size={13} />
                </span>
              </span>
            </button>
          </li>
        ))}
      </motion.ul>

      <Lightbox
        items={lightboxItems}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onChange={setOpenIndex}
      />
    </>
  );
}

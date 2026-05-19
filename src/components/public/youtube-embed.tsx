"use client";

import { useState } from "react";
import { Play } from "lucide-react";

type YouTubeEmbedProps = {
  id: string;
  title: string;
  className?: string;
};

/**
 * Lite YouTube embed — affiche d'abord la miniature, charge l'iframe au clic.
 * Pas de tracking tant que l'utilisateur n'a pas cliqué.
 */
export function YouTubeEmbed({ id, title, className }: YouTubeEmbedProps) {
  const [active, setActive] = useState(false);

  return (
    <div className={`relative aspect-video overflow-hidden rounded-2xl ring-1 ring-ocean-900/10 ${className ?? ""}`}>
      {active ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          aria-label={`Lire la vidéo : ${title}`}
          className="group absolute inset-0 block w-full"
        >
          <img
            src={`https://i.ytimg.com/vi_webp/${id}/maxresdefault.webp`}
            srcSet={`https://i.ytimg.com/vi/${id}/hqdefault.jpg 480w, https://i.ytimg.com/vi/${id}/maxresdefault.jpg 1280w`}
            sizes="(min-width: 1024px) 60vw, 100vw"
            alt={title}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-ocean-900/30 transition group-hover:bg-ocean-900/40">
            <span className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-accent-500 text-ocean-900 transition-transform group-hover:scale-110">
              <Play size={32} aria-hidden className="ml-1 fill-current" />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}

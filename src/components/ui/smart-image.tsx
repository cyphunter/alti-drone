"use client";

import Image, { type ImageProps } from "next/image";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type SmartImageProps = ImageProps;

/**
 * Wrapper autour de `next/image` qui pose un overlay shimmer animé pendant
 * le chargement et le fade out quand l'image est prête.
 *
 * Astuce : on ne touche pas à l'opacity de l'image elle-même (pour ne pas
 * entrer en conflit avec un éventuel `transition-transform` ou similaire
 * passé en `className`). C'est le shimmer en surimpression qui disparaît.
 *
 * À utiliser dans un parent en `position: relative` (cas `fill`) ou tout
 * autre container relatif — c'est lui qui contient le span shimmer.
 *
 * Si `priority` est vrai (image LCP), pas de shimmer.
 */
export function SmartImage({
  className,
  priority,
  onLoad,
  ...props
}: SmartImageProps) {
  const [loaded, setLoaded] = useState<boolean>(Boolean(priority));
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Si l'image est déjà en cache, onLoad ne se déclenche pas — on vérifie
  // `complete` au mount.
  useEffect(() => {
    if (priority) return;
    if (imgRef.current?.complete) {
      setLoaded(true);
    }
  }, [priority]);

  return (
    <>
      <Image
        {...props}
        ref={imgRef}
        priority={priority}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        className={className}
      />
      {!priority ? (
        <span
          aria-hidden
          className={cn(
            "skeleton-shimmer rounded-[inherit] transition-opacity duration-500 ease-out",
            loaded ? "pointer-events-none opacity-0" : "opacity-100",
          )}
        />
      ) : null}
    </>
  );
}

"use client";

import { useRef, type CSSProperties } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

type ParallaxImageProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  amount?: number;
  sizes?: string;
  priority?: boolean;
  aspectRatio?: string;
  style?: CSSProperties;
  width?: number;
  height?: number;
};

export function ParallaxImage({
  src,
  alt,
  className,
  imageClassName,
  amount = 80,
  sizes = "100vw",
  priority = false,
  aspectRatio = "3/4",
  style,
  width,
  height,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [amount, -amount]);

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      style={{ aspectRatio, ...style }}
    >
      <motion.div className="absolute inset-x-0 -top-[10%] -bottom-[10%]" style={{ y }}>
        <Image
          src={src}
          alt={alt}
          fill={!width && !height}
          width={width}
          height={height}
          sizes={sizes}
          priority={priority}
          className={cn("h-full w-full object-cover", imageClassName)}
        />
      </motion.div>
    </div>
  );
}

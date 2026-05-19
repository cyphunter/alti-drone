import { cn } from "@/lib/utils";

type MarqueeProps = {
  items: readonly string[];
  separator?: string;
  className?: string;
  itemClassName?: string;
  separatorClassName?: string;
};

/**
 * Marquee défilement infini horizontal (CSS pur, safe SSR).
 * Animation désactivée via prefers-reduced-motion dans globals.css.
 */
export function Marquee({
  items,
  separator = "·",
  className,
  itemClassName,
  separatorClassName,
}: MarqueeProps) {
  const doubled = [...items, ...items];

  return (
    <div className={cn("marquee select-none py-5", className)} aria-hidden>
      <div className="marquee__track">
        {doubled.map((it, i) => (
          <span
            key={`${it}-${i}`}
            className={cn(
              "inline-flex items-center gap-10 whitespace-nowrap font-display italic-display text-2xl md:text-3xl",
              itemClassName,
            )}
          >
            <span>{it}</span>
            <span className={cn("not-italic text-(--color-accent-500)", separatorClassName)}>
              {separator}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

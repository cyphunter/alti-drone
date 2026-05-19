import { Marquee } from "@/components/motion/marquee";
import { zonesNames } from "@/data/zones";

export function ZonesMarquee({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const className = tone === "light" ? "text-paper/80" : "text-ocean-900/90";
  return (
    <Marquee
      items={zonesNames}
      separator="·"
      itemClassName={className}
      separatorClassName={tone === "light" ? "text-accent-400" : "text-accent-700"}
    />
  );
}

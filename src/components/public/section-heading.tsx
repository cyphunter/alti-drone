import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
  tone?: "dark" | "light";
};

/**
 * Titre de section cohérent : eyebrow accent + h2 display + intro lead.
 * Variants : dark (sur fond clair) vs light (sur fond ocean profond).
 */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
  titleClassName,
  tone = "dark",
}: SectionHeadingProps) {
  const titleColor = tone === "light" ? "text-sky-100" : "text-ocean-900";
  const introColor = tone === "light" ? "text-sky-100/75" : "text-slate-500";
  const eyebrowClass = tone === "light" ? "eyebrow eyebrow--light" : "eyebrow";

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        align === "left" && "max-w-2xl",
        className,
      )}
    >
      {eyebrow ? <p className={eyebrowClass}>{eyebrow}</p> : null}
      <h2 className={cn("fluid-h2", titleColor, titleClassName)}>{title}</h2>
      {intro ? <p className={cn("fluid-lead", introColor)}>{intro}</p> : null}
    </div>
  );
}

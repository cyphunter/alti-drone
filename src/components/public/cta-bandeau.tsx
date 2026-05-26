import Link from "next/link";
import { ArrowRight, Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { Magnetic } from "@/components/motion/magnetic";
import { FadeUp } from "@/components/motion/text-reveal";

type CtaBandeauProps = {
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function CtaBandeau({
  title = "Un projet à chiffrer ?",
  description = "Devis gratuit en 48 h ouvrées — inspection toiture par drone offerte, sans engagement.",
  ctaLabel = "Demander un devis",
  ctaHref = "/contactdrone",
}: CtaBandeauProps) {
  return (
    <section className="section-ocean grain grain-strong relative overflow-hidden py-20 lg:py-28">
      <div className="tech-grid pointer-events-none absolute inset-0" aria-hidden />

      {/* Glow accent radial */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 20% 30%, rgb(244 180 0 / 0.18), transparent 60%), radial-gradient(ellipse 60% 50% at 80% 70%, rgb(25 82 126 / 0.45), transparent 60%)",
        }}
      />

      <div className="container-soft relative">
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
          <FadeUp className="max-w-2xl">
            <p className="eyebrow eyebrow--light">
              <Sparkles size={14} aria-hidden /> Prêt à transformer vos extérieurs
            </p>
            <h2 className="fluid-h2 mt-4 text-paper">
              {title.replace(/\?$/, "")}
              <span className="italic-display text-accent-400">?</span>
            </h2>
            <p className="fluid-lead mt-5 text-sky-100/80">{description}</p>
          </FadeUp>

          <FadeUp
            delay={0.15}
            className="flex flex-col items-start gap-5 lg:items-end"
          >
            <Magnetic strength={0.15} radius={150}>
              <Button
                asChild
                size="lg"
                variant="accent"
                className="pulse-ring shadow-accent-deep"
              >
                <Link href={ctaHref}>
                  {ctaLabel}
                  <ArrowRight size={16} aria-hidden />
                </Link>
              </Button>
            </Magnetic>
            <a
              href={`tel:${siteConfig.contact.phone}`}
              className="group inline-flex items-center gap-2 text-sm font-medium text-paper/80 hover:text-accent-300"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-paper/10 ring-1 ring-paper/20 transition group-hover:bg-accent-500/20 group-hover:ring-accent-400/50">
                <Phone size={14} aria-hidden />
              </span>
              ou par téléphone {siteConfig.contact.phoneDisplay}
            </a>
          </FadeUp>
        </div>

        {/* Hairline */}
        <div className="hairline mt-14 opacity-60" aria-hidden />

        {/* Mini KPI ligne en bas */}
        <FadeUp delay={0.3} className="mt-8 grid gap-6 sm:grid-cols-3">
          {[
            { v: "100 %", l: "Devis gratuit" },
            { v: "0", l: "Échafaudage" },
            { v: "48 h", l: "Délai de réponse" },
          ].map((m) => (
            <div key={m.l} className="flex items-baseline gap-3">
              <span className="font-display text-3xl text-accent-400">{m.v}</span>
              <span className="text-xs uppercase tracking-[0.15em] text-paper/60">
                {m.l}
              </span>
            </div>
          ))}
        </FadeUp>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Phone, ArrowRight, ShieldCheck, MapPin } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { galerie } from "@/data/galerie";
import { TextReveal, FadeUp } from "@/components/motion/text-reveal";
import { WordRotate } from "@/components/motion/word-rotate";
import { Magnetic } from "@/components/motion/magnetic";

const HERO_IMAGE = galerie.find((g) => g.id === "hero-action") ?? galerie[0];
const SECONDARY_IMAGE =
  galerie.find((g) => g.id === "drone-vol") ??
  galerie.find((g) => g.id === "toit-demoussage-2") ??
  galerie[1];

const ROTATING_TARGETS = [
  "toitures",
  "façades",
  "bardages",
  "tuiles",
  "ardoises",
] as const;

export function HeroHome() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Effet parallax doux sur le background et un fade vers le bas
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.2]);

  return (
    <section
      ref={ref}
      className="hero-cinema relative isolate overflow-hidden"
      aria-label="Présentation Alti' Drone & Services"
    >
      {/* Background image full-bleed + parallax */}
      <motion.div
        style={reduce ? undefined : { y: yBg }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <Image
          src={HERO_IMAGE.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_30%]"
        />
        {/* Voile marine cinematic */}
        <div className="hero-cinema__overlay" aria-hidden />
        {/* Grille technique très subtile */}
        <div className="tech-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      </motion.div>

      <motion.div
        style={{
          ...(reduce ? {} : { y: yContent, opacity }),
          minHeight: "calc(100svh - var(--header-h, 5rem))",
        }}
        className="container-soft relative flex flex-col justify-between gap-10 pb-10 pt-10 lg:gap-12 lg:pb-14 lg:pt-14"
      >
        {/* Bandeau localisation + signal */}
        <FadeUp delay={0.1}>
          <div className="inline-flex items-center gap-3 rounded-full bg-paper/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-paper backdrop-blur-md ring-1 ring-paper/20">
            <span
              className="relative flex h-2 w-2"
              aria-hidden
            >
              <span className="absolute inset-0 animate-ping rounded-full bg-accent-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-400" />
            </span>
            <MapPin size={12} aria-hidden className="text-accent-400" />
            {siteConfig.contact.primaryServiceArea} · Loire-Atlantique
          </div>
        </FadeUp>

        {/* Headline principal cinematic */}
        <div
          className="max-w-5xl"
          style={{ textShadow: "0 2px 30px rgb(3 16 29 / 0.55)" }}
        >
          <TextReveal
            as="h1"
            className="fluid-display font-display text-paper"
            stagger={0.08}
            duration={1}
          >
            Nettoyage par drone
          </TextReveal>

          {/* Ligne 2 : variable rotative + texte */}
          <FadeUp delay={0.55} className="mt-2 lg:mt-3">
            <p className="fluid-display font-display text-paper/85">
              de vos{" "}
              <span className="italic-display text-accent-400">
                <WordRotate words={ROTATING_TARGETS} />
              </span>
              .
            </p>
          </FadeUp>

          <FadeUp delay={0.75} className="mt-8 max-w-2xl">
            <p className="fluid-lead text-paper/95">
              Spécialiste local du démoussage, traitement hydrofuge et entretien des
              extérieurs par drone professionnel. Sans échafaudage, sans monter sur la
              couverture — pour particuliers, syndics, collectivités et professionnels du
              Pays de Retz.
            </p>
          </FadeUp>

          {/* CTAs */}
          <FadeUp delay={0.95} className="mt-10 flex flex-wrap items-center gap-5">
            <Magnetic strength={0.18} radius={140}>
              <Button asChild size="lg" variant="accent" className="pulse-ring shadow-accent-deep">
                <Link href="/contactdrone">
                  Demander un devis gratuit
                  <ArrowRight size={16} aria-hidden />
                </Link>
              </Button>
            </Magnetic>
            <Magnetic strength={0.12} radius={120}>
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="group inline-flex items-center gap-3 rounded-full px-4 py-2 text-sm font-medium text-paper transition hover:text-accent-300"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-paper/10 ring-1 ring-paper/25 transition group-hover:bg-accent-500 group-hover:text-ocean-900">
                  <Phone size={16} aria-hidden />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-paper/60">
                    Appeler maintenant
                  </span>
                  <span className="text-base font-display">
                    {siteConfig.contact.phoneDisplay}
                  </span>
                </span>
              </a>
            </Magnetic>
          </FadeUp>
        </div>

        {/* Bas du hero : glass certification card + scroll cue */}
        <div className="flex justify-end">
          {/* Glass certification card */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
            className="glass-dark relative w-full max-w-md overflow-hidden rounded-2xl p-5"
          >
            <div className="flex items-start gap-4">
              <span className="relative inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-500/15 text-accent-300 ring-1 ring-accent-500/30">
                <ShieldCheck size={22} aria-hidden />
              </span>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent-400">
                  Télépilote certifié
                </p>
                <p className="mt-1 font-display text-lg leading-tight text-paper">
                  Allan Bouguendoura
                </p>
                <p className="mt-1 text-xs leading-relaxed text-paper/70">
                  C.A.T.S · qualifications pulvérisation drone DGAC · assurance RC pro.
                </p>
              </div>
            </div>
            {/* Petite vignette secondaire */}
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-6 -right-6 hidden h-28 w-28 overflow-hidden rounded-2xl ring-1 ring-paper/15 sm:block"
            >
              <Image
                src={SECONDARY_IMAGE.src}
                alt=""
                fill
                sizes="120px"
                className="object-cover opacity-90"
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-paper/60 lg:flex"
          aria-hidden
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Découvrir</span>
          <span className="scroll-cue" />
        </motion.div>
      </motion.div>
    </section>
  );
}

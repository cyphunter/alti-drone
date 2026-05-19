import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/public/header";
import { Footer } from "@/components/public/footer";

export const metadata: Metadata = buildMetadata({
  title: "Page introuvable (404)",
  description: "Cette page n'existe pas ou a été déplacée.",
  path: "/404",
  noindex: true,
});

export default function NotFound() {
  return (
    <>
      <Header />
      <main
        id="main-content"
        className="hero-gradient flex min-h-[70vh] items-center"
      >
        <div className="container-soft text-center">
          <p className="font-display text-8xl tracking-tight text-ocean-900/15 md:text-9xl">
            404
          </p>
          <h1 className="fluid-h2 -mt-6 text-ocean-900 md:-mt-10">
            Cette page n'existe pas
          </h1>
          <p className="mt-6 text-base text-slate-500 md:text-lg">
            La page recherchée a peut-être été déplacée ou n'existe plus.
            Pas de panique — voici quelques pistes pour repartir.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" variant="primary">
              <Link href="/">Retour à l'accueil</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/services">Voir nos services</Link>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <Link href="/contactdrone">Nous contacter</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

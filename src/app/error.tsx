"use client";

import { useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      id="main-content"
      className="hero-gradient flex min-h-screen items-center"
    >
      <div className="container-soft text-center">
        <p className="font-display text-8xl tracking-tight text-ocean-900/15 md:text-9xl">
          500
        </p>
        <h1 className="fluid-h2 -mt-6 text-ocean-900 md:-mt-10">
          Une erreur est survenue
        </h1>
        <p className="mt-6 text-base text-slate-500 md:text-lg">
          Désolé, quelque chose s'est mal passé de notre côté. Vous pouvez réessayer
          ou nous écrire si le problème persiste.
        </p>
        {error.digest ? (
          <p className="mt-3 text-xs text-slate-300">Référence : {error.digest}</p>
        ) : null}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button onClick={reset} size="lg" variant="primary">
            <RefreshCw size={16} aria-hidden />
            Réessayer
          </Button>
          <Button asChild size="lg" variant="secondary">
            <a href="/contactdrone">Nous contacter</a>
          </Button>
        </div>
      </div>
    </main>
  );
}

import { renderOgImage } from "@/lib/og-template";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Nos services drone — Alti' Drone & Services";

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "PRESTATIONS · TOITURE · FAÇADE · SOLAIRE",
    title: "9 prestations dédiées par drone, une seule équipe.",
    footerRight: "Toiture · Façade · Solaire",
  });
}

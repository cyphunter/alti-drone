import { renderOgImage } from "@/lib/og-template";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Galerie de nos chantiers récents — Alti' Drone & Services";

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "GALERIE · CHANTIERS RÉCENTS · PAYS DE RETZ",
    title: "Quelques-uns de nos chantiers récents par drone.",
    footerRight: "Galerie",
  });
}

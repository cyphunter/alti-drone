import { renderOgImage } from "@/lib/og-template";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Devis gratuit en 48 h — Alti' Drone & Services";

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "CONTACT · DEVIS GRATUIT EN 48 H",
    title: "Discutons de votre projet — inspection drone offerte.",
    footerRight: "Contact & devis",
  });
}

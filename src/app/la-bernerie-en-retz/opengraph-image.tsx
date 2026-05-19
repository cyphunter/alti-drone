import { renderOgImage } from "@/lib/og-template";
import { getLocalPage } from "@/data/local-pages";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const data = getLocalPage("la-bernerie-en-retz");

export const alt = `Nettoyage par drone à ${data.city} — Alti' Drone & Services`;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: `${data.city.toUpperCase()} · ${data.postalCode} · LOIRE-ATLANTIQUE`,
    title: data.h1,
    footerRight: `${data.city} · ${data.postalCode}`,
  });
}

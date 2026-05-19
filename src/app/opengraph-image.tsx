import { renderOgImage } from "@/lib/og-template";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Alti' Drone & Services — Nettoyage par drone à Pornic, Pays de Retz, Loire-Atlantique";

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Pornic · Pays de Retz · Loire-Atlantique",
    title: "Nettoyage par drone de toiture, façade & panneaux solaires.",
  });
}

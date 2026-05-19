import { renderOgImage } from "@/lib/og-template";
import { getServiceBySlug } from "@/data/services";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const service = getServiceBySlug("ardoises-naturelles");

export const alt = `${service.h1} — Alti' Drone & Services`;

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: `${service.group.toUpperCase()} · DRONE · PAYS DE RETZ`,
    title: service.h1,
    footerRight: service.shortTitle,
  });
}

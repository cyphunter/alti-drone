import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png" as const;

type RenderOgOpts = {
  /** Eyebrow uppercase letter-spacing — ex: "PORNIC · PAYS DE RETZ · LOIRE-ATLANTIQUE". */
  eyebrow: string;
  /** Titre serif principal — ex: "Nettoyage par drone de toiture, façade & panneaux solaires.". */
  title: string;
  /** Footer gauche — ex: téléphone. Défaut: siteConfig.contact.phoneDisplay. */
  footerLeft?: string;
  /** Footer droite — ex: nom court du service. Défaut: domaine. */
  footerRight?: string;
};

export function renderOgImage({
  eyebrow,
  title,
  footerLeft,
  footerRight,
}: RenderOgOpts): ImageResponse {
  const leftText = footerLeft ?? siteConfig.contact.phoneDisplay;
  const rightText = footerRight ?? "altidroneservices.fr";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, #061a2e 0%, #103a5c 60%, #2a6da4 100%)",
          padding: 72,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          color: "#f3f1ec",
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -240,
            right: -240,
            width: 720,
            height: 720,
            background:
              "radial-gradient(circle, rgba(244, 180, 0, 0.28), transparent 62%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(243, 241, 236, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(243, 241, 236, 0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            position: "relative",
          }}
        >
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: 38,
              background: "#061a2e",
              border: "2px solid rgba(244, 180, 0, 0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="44"
              height="44"
              viewBox="0 0 32 32"
              fill="#f4b400"
              stroke="#f4b400"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="10" cy="10" r="2.8" />
              <circle cx="22" cy="10" r="2.8" />
              <circle cx="10" cy="22" r="2.8" />
              <circle cx="22" cy="22" r="2.8" />
              <path d="M12.2 12.2 L19.8 19.8 M19.8 12.2 L12.2 19.8" fill="none" />
              <rect x="13.5" y="13.5" width="5" height="5" rx="0.7" />
            </svg>
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 500,
              letterSpacing: -0.5,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            {siteConfig.name}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 22,
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 18,
              letterSpacing: 4,
              color: "#f4b400",
              textTransform: "uppercase",
              fontWeight: 700,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              fontSize: 74,
              lineHeight: 1.05,
              letterSpacing: -2,
              fontWeight: 500,
              maxWidth: 1020,
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 24,
            color: "#cfe3f5",
            fontFamily: "system-ui, sans-serif",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: 3,
                background: "#f4b400",
              }}
            />
            {leftText}
          </div>
          <div>{rightText}</div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}

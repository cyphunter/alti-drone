import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const runtime = "edge";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, #061a2e 0%, #103a5c 60%, #2a6da4 100%)",
          padding: "72px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          color: "#f3f1ec",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              background: "#f4b400",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#061a2e",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            A
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 500,
              letterSpacing: -0.5,
            }}
          >
            {siteConfig.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 16,
              letterSpacing: 4,
              color: "#f4b400",
              textTransform: "uppercase",
              fontWeight: 700,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Pornic · Pays de Retz · Loire-Atlantique
          </div>
          <div
            style={{
              fontSize: 78,
              lineHeight: 1.05,
              letterSpacing: -2,
              fontWeight: 500,
              maxWidth: 980,
            }}
          >
            Nettoyage par drone de toiture, façade & panneaux solaires.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 22,
            color: "#cfe3f5",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <div>{siteConfig.contact.phoneDisplay}</div>
          <div>altidroneservices.fr</div>
        </div>
      </div>
    ),
    size,
  );
}

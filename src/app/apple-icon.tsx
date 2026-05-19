import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#061a2e",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="130"
          height="130"
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
    ),
    { ...size },
  );
}

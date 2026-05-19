import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#061a2e",
          borderRadius: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="28"
          height="28"
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

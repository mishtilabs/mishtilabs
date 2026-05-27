import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #04060f 0%, #0a0f24 100%)",
          borderRadius: 14,
          position: "relative",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        }}
      >
        {/* Soft halo */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(60% 60% at 50% 55%, rgba(255,209,102,0.55) 0%, rgba(255,185,56,0.18) 45%, transparent 75%)",
          }}
        />
        {/* MM lockup */}
        <div
          style={{
            display: "flex",
            fontSize: 56,
            fontWeight: 800,
            letterSpacing: -3,
            lineHeight: 1,
            background:
              "linear-gradient(135deg, #fff7d6 0%, #ffd166 35%, #ffb938 65%, #ff8c42 100%)",
            backgroundClip: "text",
            color: "transparent",
            position: "relative",
            zIndex: 1,
          }}
        >
          M
        </div>
      </div>
    ),
    { ...size },
  );
}

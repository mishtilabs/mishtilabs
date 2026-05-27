import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          position: "relative",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        }}
      >
        {/* Outer warm halo */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(60% 60% at 50% 50%, rgba(255,209,102,0.55) 0%, rgba(255,185,56,0.20) 45%, transparent 75%)",
          }}
        />
        {/* Inner accent ring */}
        <div
          style={{
            position: "absolute",
            top: 28,
            left: 28,
            right: 28,
            bottom: 28,
            display: "flex",
            borderRadius: 999,
            border: "1px solid rgba(245,184,64,0.25)",
          }}
        />
        {/* MM lockup */}
        <div
          style={{
            display: "flex",
            fontSize: 150,
            fontWeight: 800,
            letterSpacing: -6,
            lineHeight: 1,
            background:
              "linear-gradient(135deg, #fff7d6 0%, #ffd166 30%, #ffb938 55%, #ff8c42 85%, #ff5c8a 100%)",
            backgroundClip: "text",
            color: "transparent",
            filter: "drop-shadow(0 6px 24px rgba(245,184,64,0.4))",
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

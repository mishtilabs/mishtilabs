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
          background: "linear-gradient(135deg, #060812 0%, #0d1226 100%)",
          borderRadius: 14,
          position: "relative",
        }}
      >
        {/* Halo */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(60% 60% at 50% 55%, rgba(124,58,237,0.55) 0%, rgba(37,99,235,0.20) 50%, transparent 75%)",
          }}
        />

        {/* M ribbon — left half (cool) */}
        <svg width="64" height="64" viewBox="0 0 256 256">
          <defs>
            <linearGradient id="b" x1="32" y1="40" x2="120" y2="220" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#1e40af" />
              <stop offset="0.55" stopColor="#2563eb" />
              <stop offset="1" stopColor="#60a5fa" />
            </linearGradient>
            <linearGradient id="w" x1="240" y1="40" x2="140" y2="220" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#fb923c" />
              <stop offset="0.45" stopColor="#ea580c" />
              <stop offset="1" stopColor="#9d174d" />
            </linearGradient>
            <linearGradient id="s" x1="128" y1="40" x2="128" y2="220" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#312e81" />
              <stop offset="1" stopColor="#7e22ce" />
            </linearGradient>
          </defs>
          <path d="M40 220 V44 L70 44 L128 156 L186 44 L216 44 L142 188 L128 188 Z" fill="url(#b)" />
          <path d="M128 156 L186 44 L216 44 L216 220 L186 220 L186 102 L142 188 Z" fill="url(#w)" />
          <path d="M128 156 L142 188 L186 102 L186 84 Z" fill="url(#s)" opacity="0.85" />
          {/* Pixel sparks */}
          <rect x="22" y="46" width="10" height="10" rx="2" fill="#3b82f6" />
          <rect x="6" y="62" width="14" height="14" rx="2" fill="#1d4ed8" />
          <rect x="222" y="44" width="10" height="10" rx="2" fill="#fb923c" />
          <rect x="232" y="60" width="14" height="14" rx="2" fill="#dc2626" />
        </svg>
      </div>
    ),
    { ...size },
  );
}

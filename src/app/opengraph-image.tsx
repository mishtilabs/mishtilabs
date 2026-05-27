import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

export const alt = `${SITE.name} — Engineering the future`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "72px 80px",
          color: "#eef2ff",
          background:
            "radial-gradient(60% 80% at 18% 20%, rgba(96,165,250,0.32) 0px, rgba(6,8,18,0) 55%), radial-gradient(60% 80% at 90% 95%, rgba(244,63,94,0.28) 0px, rgba(6,8,18,0) 55%), radial-gradient(60% 80% at 90% 10%, rgba(167,139,250,0.26) 0px, rgba(6,8,18,0) 55%), radial-gradient(60% 80% at 10% 95%, rgba(251,146,60,0.22) 0px, rgba(6,8,18,0) 55%), linear-gradient(135deg, #060812 0%, #0d1226 60%, #1e1b4b 100%)",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          position: "relative",
        }}
      >
        {/* Top row: monogram + brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 22,
            fontSize: 32,
            letterSpacing: -0.3,
          }}
        >
          {/* Monogram — the new pixel-forge M */}
          <svg width="80" height="80" viewBox="0 0 256 256">
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
            <rect x="6" y="62" width="14" height="14" rx="2" fill="#1d4ed8" />
            <rect x="22" y="46" width="10" height="10" rx="2" fill="#2563eb" />
            <rect x="232" y="60" width="14" height="14" rx="2" fill="#dc2626" />
            <rect x="222" y="44" width="10" height="10" rx="2" fill="#ea580c" />
          </svg>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontWeight: 700 }}>Mishti</span>
            <span
              style={{
                fontWeight: 700,
                background:
                  "linear-gradient(95deg, #60a5fa 0%, #a78bfa 50%, #fb923c 100%)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              labs
            </span>
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 2,
                background: "#fb923c",
                marginLeft: 6,
                marginBottom: 4,
              }}
            />
          </div>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 22,
            maxWidth: 1040,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "#fb923c",
                boxShadow: "0 0 16px #fb923c",
              }}
            />
            <span
              style={{
                fontSize: 22,
                letterSpacing: 6,
                textTransform: "uppercase",
                color: "#cdd5f0",
                fontWeight: 500,
              }}
            >
              Engineering the future · India · Est. 2018
            </span>
          </div>

          <div
            style={{
              fontSize: 96,
              lineHeight: 1.02,
              fontWeight: 700,
              letterSpacing: -3,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <span>A software studio with&nbsp;</span>
            <span
              style={{
                fontStyle: "italic",
                background:
                  "linear-gradient(95deg, #60a5fa 0%, #a78bfa 40%, #fb923c 80%, #f43f5e 100%)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              sweet
            </span>
            <span>&nbsp;precision.</span>
          </div>

          <div
            style={{
              fontSize: 30,
              color: "#cdd5f0",
              maxWidth: 980,
              lineHeight: 1.35,
            }}
          >
            30+ software offerings — Pravah CRM, GrowRight, WeddingVerse,
            Vidya AI, Annapurna and more. Built with the warmth of mishti
            and the rigor of a research lab.
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 56,
            fontSize: 24,
            color: "#cdd5f0",
            borderTop: "1px solid rgba(96,165,250,0.30)",
            paddingTop: 28,
          }}
        >
          <span>mishtilabs.com</span>
          <span style={{ display: "flex", gap: 26 }}>
            <span>Develop</span>
            <span style={{ opacity: 0.5 }}>·</span>
            <span>Cloud</span>
            <span style={{ opacity: 0.5 }}>·</span>
            <span>Analyze</span>
            <span style={{ opacity: 0.5 }}>·</span>
            <span>Secure</span>
            <span style={{ opacity: 0.5 }}>·</span>
            <span>Mobile</span>
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}

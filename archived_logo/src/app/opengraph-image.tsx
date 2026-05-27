import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

export const alt = `${SITE.name} — A software studio with sweet precision`;
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
          color: "#f5e8c8",
          background:
            "radial-gradient(60% 80% at 18% 20%, rgba(245,184,64,0.35) 0px, rgba(4,6,15,0) 55%), radial-gradient(60% 80% at 90% 95%, rgba(255,92,138,0.30) 0px, rgba(4,6,15,0) 55%), radial-gradient(60% 80% at 90% 10%, rgba(34,211,238,0.22) 0px, rgba(4,6,15,0) 55%), linear-gradient(135deg, #04060f 0%, #0a0f24 100%)",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          position: "relative",
        }}
      >
        {/* Top row: monogram + brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 30,
            letterSpacing: -0.3,
          }}
        >
          {/* Monogram */}
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background:
                "linear-gradient(135deg, #f5b840 0%, #ff8c42 50%, #ff5c8a 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 700,
              color: "#0b1020",
              boxShadow: "0 18px 48px rgba(245,184,64,0.35)",
            }}
          >
            M
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
            <span style={{ fontWeight: 600 }}>mishti</span>
            <span
              style={{
                fontWeight: 600,
                background:
                  "linear-gradient(120deg, #f5b840 0%, #ff8c42 60%, #ff5c8a 100%)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              labs
            </span>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: "#f5b840",
                marginLeft: 4,
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
            maxWidth: 980,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: "#f5b840",
                boxShadow: "0 0 16px #f5b840",
              }}
            />
            <span
              style={{
                fontSize: 22,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "#d8cfb4",
              }}
            >
              Software studio · India · Est. 2018
            </span>
          </div>

          <div
            style={{
              fontSize: 92,
              lineHeight: 1.02,
              fontWeight: 700,
              letterSpacing: -2,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <span>A software studio with&nbsp;</span>
            <span
              style={{
                fontStyle: "italic",
                background:
                  "linear-gradient(100deg, #ffe1a8 0%, #f5b840 30%, #ff8c42 60%, #f5b840 100%)",
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
              fontSize: 32,
              color: "#d8cfb4",
              maxWidth: 940,
              lineHeight: 1.3,
            }}
          >
            27+ products in production — Pravah CRM, GrowRight, WeddingVerse,
            Vidya AI, Annapurna and more. Built with the warmth of mishti and
            the rigor of a research lab.
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 56,
            fontSize: 26,
            color: "#d8cfb4",
            borderTop: "1px solid rgba(245,184,64,0.25)",
            paddingTop: 28,
          }}
        >
          <span>mishtilabs.com</span>
          <span style={{ display: "flex", gap: 26 }}>
            <span>Bengaluru</span>
            <span style={{ opacity: 0.5 }}>·</span>
            <span>Kolkata</span>
            <span style={{ opacity: 0.5 }}>·</span>
            <span>Remote</span>
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}

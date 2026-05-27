"use client";

import { motion, useReducedMotion } from "motion/react";
import { useId } from "react";
import { cn } from "@/lib/utils";

type LogoProps = {
  size?: number;
  withWordmark?: boolean;
  withTagline?: boolean;
  /** Force a single colour for monochrome contexts (footer print, dark surfaces). */
  monochrome?: "warm" | "cool" | null;
  className?: string;
};

/**
 * MishtiLabs logo — "Pixel Forge" identity (2026).
 *
 *  - A folded ribbon "M" that splits along its centre into a cool half
 *    (royal blue, our engineering rigour) and a warm half (saffron→magenta,
 *    our mishti warmth).
 *  - An indigo seam where the two halves overlap reads as a 3D fold.
 *  - Pixel clouds disperse outward on either side — code becoming reality
 *    on the warm side, reality compiling into code on the cool side.
 *  - Hover: pixels eject outward, the seam shimmers, a sheen sweeps the M.
 */
export function Logo({
  size = 44,
  withWordmark = false,
  withTagline = false,
  monochrome = null,
  className,
}: LogoProps) {
  const reduced = useReducedMotion();
  // Use a stable per-instance id so multiple Logos on the same page do not
  // collide on gradient/clipPath ids.
  const uid = useId().replace(/:/g, "");

  const id = (k: string) => `${k}-${uid}`;

  // Pixels left of the M (cool/blue dispersion).
  const PX_LEFT = [
    { x: 6, y: 62, s: 14, d: 0.0 },
    { x: 2, y: 92, s: 10, d: 0.4 },
    { x: 22, y: 46, s: 10, d: 0.2 },
    { x: 14, y: 120, s: 8, d: 0.6 },
    { x: 26, y: 78, s: 6, d: 0.8 },
    { x: 40, y: 22, s: 9, d: 0.1 },
    { x: 58, y: 14, s: 7, d: 0.3 },
    { x: 80, y: 22, s: 6, d: 0.5 },
    { x: 36, y: 148, s: 5, d: 0.9 },
    { x: 20, y: 170, s: 4, d: 1.1 },
  ];

  // Pixels right of the M (warm/saffron dispersion).
  const PX_RIGHT = [
    { x: 232, y: 60, s: 14, d: 0.05 },
    { x: 244, y: 90, s: 10, d: 0.45 },
    { x: 222, y: 44, s: 10, d: 0.25 },
    { x: 236, y: 120, s: 8, d: 0.65 },
    { x: 226, y: 78, s: 6, d: 0.85 },
    { x: 210, y: 20, s: 9, d: 0.15 },
    { x: 190, y: 12, s: 7, d: 0.35 },
    { x: 170, y: 22, s: 6, d: 0.55 },
    { x: 220, y: 148, s: 5, d: 0.95 },
    { x: 238, y: 170, s: 4, d: 1.15 },
  ];

  return (
    <div
      className={cn("inline-flex select-none items-center gap-3", className)}
    >
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 256 256"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial="rest"
        whileHover="hover"
        animate="rest"
        role="img"
        aria-label="MishtiLabs"
        shapeRendering="geometricPrecision"
        className="block drop-shadow-[0_8px_28px_rgba(37,99,235,0.28)] dark:drop-shadow-[0_8px_28px_rgba(96,165,250,0.35)]"
      >
        <defs>
          {/* Cool ribbon */}
          <linearGradient
            id={id("blue")}
            x1="32"
            y1="40"
            x2="120"
            y2="220"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#1e40af" />
            <stop offset="0.55" stopColor="#2563eb" />
            <stop offset="1" stopColor="#60a5fa" />
          </linearGradient>

          {/* Warm ribbon */}
          <linearGradient
            id={id("warm")}
            x1="240"
            y1="40"
            x2="140"
            y2="220"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#fb923c" />
            <stop offset="0.45" stopColor="#ea580c" />
            <stop offset="1" stopColor="#9d174d" />
          </linearGradient>

          {/* Indigo seam */}
          <linearGradient
            id={id("seam")}
            x1="128"
            y1="40"
            x2="128"
            y2="220"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#312e81" />
            <stop offset="1" stopColor="#7e22ce" />
          </linearGradient>

          {/* Pixel gradients */}
          <linearGradient id={id("px-blue")} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3b82f6" />
            <stop offset="1" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id={id("px-warm")} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fb923c" />
            <stop offset="1" stopColor="#dc2626" />
          </linearGradient>

          {/* Animated sheen — sweeps left → right across the M on hover */}
          <linearGradient
            id={id("sheen")}
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="0.45" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="0.55" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Soft halo behind the M */}
          <radialGradient id={id("halo")} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#7c3aed" stopOpacity="0.35" />
            <stop offset="0.55" stopColor="#2563eb" stopOpacity="0.18" />
            <stop offset="1" stopColor="#2563eb" stopOpacity="0" />
          </radialGradient>

          {/* Mask the sheen to the M shape */}
          <clipPath id={id("clip-m")}>
            <path d="M40 220 V44 L70 44 L128 156 L186 44 L216 44 V220 L186 220 L186 102 L142 188 L128 188 L114 188 L70 102 L70 220 Z" />
          </clipPath>
        </defs>

        {/* Soft purple→blue halo */}
        <motion.circle
          cx="128"
          cy="128"
          r="118"
          fill={`url(#${id("halo")})`}
          variants={{
            rest: { scale: 1, opacity: 0.7 },
            hover: { scale: 1.08, opacity: 1 },
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "128px 128px" }}
        />

        {/* The folded "M" ribbon */}
        <motion.g
          variants={{
            rest: { scale: 1, rotate: 0 },
            hover: reduced ? {} : { scale: 1.04, rotate: -1.2 },
          }}
          transition={{ type: "spring", stiffness: 220, damping: 16 }}
          style={{ transformOrigin: "128px 128px" }}
        >
          {/* Left half (cool) */}
          <motion.path
            d="M40 220 V44 L70 44 L128 156 L186 44 L216 44 L142 188 L128 188 Z"
            fill={
              monochrome === "warm"
                ? `url(#${id("warm")})`
                : `url(#${id("blue")})`
            }
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Right half overlay (warm) */}
          {monochrome !== "cool" && (
            <motion.path
              d="M128 156 L186 44 L216 44 L216 220 L186 220 L186 102 L142 188 Z"
              fill={
                monochrome === "warm"
                  ? `url(#${id("warm")})`
                  : `url(#${id("warm")})`
              }
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            />
          )}

          {/* Indigo seam */}
          {monochrome === null && (
            <motion.path
              d="M128 156 L142 188 L186 102 L186 84 Z"
              fill={`url(#${id("seam")})`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              variants={{
                rest: { opacity: 0.85 },
                hover: { opacity: 1 },
              }}
            />
          )}

          {/* Animated sheen — sweeps across the M, only on hover */}
          <g clipPath={`url(#${id("clip-m")})`}>
            <motion.rect
              x="-128"
              y="32"
              width="160"
              height="200"
              fill={`url(#${id("sheen")})`}
              variants={{
                rest: { x: -200, opacity: 0 },
                hover: reduced
                  ? { opacity: 0 }
                  : { x: 256, opacity: 1 },
              }}
              transition={{ duration: 0.95, ease: "easeInOut" }}
            />
          </g>
        </motion.g>

        {/* LEFT pixel cloud — cool */}
        <motion.g
          variants={{
            rest: { opacity: 1 },
            hover: { opacity: 1 },
          }}
        >
          {PX_LEFT.map((p, i) => (
            <motion.rect
              key={`L${i}`}
              x={p.x}
              y={p.y}
              width={p.s}
              height={p.s}
              rx={Math.max(1, p.s / 6)}
              fill={
                monochrome === "warm"
                  ? `url(#${id("px-warm")})`
                  : `url(#${id("px-blue")})`
              }
              initial={{ opacity: 0, x: 30 }}
              animate={
                reduced
                  ? { opacity: 0.9, x: 0 }
                  : {
                      opacity: [0.55, 1, 0.55],
                      x: [0, -2, 0, 2, 0],
                      y: [0, -3, 0, 3, 0],
                    }
              }
              transition={{
                opacity: { duration: 5 + (i % 3), repeat: Infinity, delay: p.d },
                x: { duration: 6 + (i % 3), repeat: Infinity, ease: "easeInOut" },
                y: { duration: 7 + (i % 3), repeat: Infinity, ease: "easeInOut" },
              }}
              variants={{
                rest: { scale: 1 },
                hover: reduced
                  ? {}
                  : {
                      x: -(8 + i * 1.4),
                      y: -(2 + i * 0.6),
                      scale: 1.15,
                      opacity: 1,
                    },
              }}
              style={{ transformOrigin: `${p.x + p.s / 2}px ${p.y + p.s / 2}px` }}
            />
          ))}
        </motion.g>

        {/* RIGHT pixel cloud — warm */}
        <motion.g
          variants={{
            rest: { opacity: 1 },
            hover: { opacity: 1 },
          }}
        >
          {PX_RIGHT.map((p, i) => (
            <motion.rect
              key={`R${i}`}
              x={p.x}
              y={p.y}
              width={p.s}
              height={p.s}
              rx={Math.max(1, p.s / 6)}
              fill={
                monochrome === "cool"
                  ? `url(#${id("px-blue")})`
                  : `url(#${id("px-warm")})`
              }
              initial={{ opacity: 0, x: -30 }}
              animate={
                reduced
                  ? { opacity: 0.9, x: 0 }
                  : {
                      opacity: [0.6, 1, 0.6],
                      x: [0, 2, 0, -2, 0],
                      y: [0, 3, 0, -3, 0],
                    }
              }
              transition={{
                opacity: { duration: 5 + (i % 3), repeat: Infinity, delay: p.d },
                x: { duration: 6 + (i % 3), repeat: Infinity, ease: "easeInOut" },
                y: { duration: 7 + (i % 3), repeat: Infinity, ease: "easeInOut" },
              }}
              variants={{
                rest: { scale: 1 },
                hover: reduced
                  ? {}
                  : {
                      x: 8 + i * 1.4,
                      y: -(2 + i * 0.6),
                      scale: 1.15,
                      opacity: 1,
                    },
              }}
              style={{ transformOrigin: `${p.x + p.s / 2}px ${p.y + p.s / 2}px` }}
            />
          ))}
        </motion.g>
      </motion.svg>

      {withWordmark && (
        <div
          className="flex flex-col"
          style={{ fontSize: `${Math.max(14, Math.round(size * 0.55))}px` }}
        >
          <div className="flex items-baseline gap-[0.12em] pb-[0.05em]">
            <span
              className="font-display font-semibold leading-[1] text-foreground"
              style={{ letterSpacing: "-0.028em" }}
            >
              Mishti
            </span>
            <span
              className="font-serif-italic leading-[1]"
              style={{
                fontSize: "1.08em",
                letterSpacing: "-0.005em",
                fontWeight: 400,
                backgroundImage:
                  "linear-gradient(96deg, var(--accent) 0%, var(--highlight) 48%, var(--accent-2) 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                paddingRight: "0.04em",
              }}
            >
              labs
            </span>
            <span
              aria-hidden
              className="ml-[0.15em] inline-block h-[0.4em] w-[0.4em] translate-y-[-0.1em] rounded-[2px] bg-[var(--accent-2)] [box-shadow:0_0_10px_rgba(var(--glow-warm),0.85)]"
            />
          </div>
          {withTagline && (
            <span
              className="mt-[0.4em] font-mono uppercase text-[var(--muted)] leading-[1]"
              style={{
                fontSize: "0.42em",
                letterSpacing: "0.34em",
              }}
            >
              Engineering the future
            </span>
          )}
        </div>
      )}
    </div>
  );
}

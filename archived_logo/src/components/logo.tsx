"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type LogoProps = {
  size?: number;
  withWordmark?: boolean;
  className?: string;
};

/**
 * MishtiLabs logo:
 *  - A folded "M" stroke that traces itself in (a fluid "drop" of code).
 *  - An orbital ring representing software systems in motion.
 *  - A "mishti" droplet at the heart — the warm signature.
 */
export function Logo({ size = 44, withWordmark = false, className }: LogoProps) {
  return (
    <div
      className={cn("inline-flex items-center gap-3 select-none", className)}
    >
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial="rest"
        whileHover="hover"
        animate="rest"
        aria-label="MishtiLabs"
        className="drop-shadow-[0_0_18px_rgba(245,184,64,0.45)]"
      >
        <defs>
          <linearGradient id="ml-grad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="var(--accent)" />
            <stop offset="0.5" stopColor="var(--accent-2)" />
            <stop offset="1" stopColor="var(--accent-3)" />
          </linearGradient>
          <linearGradient id="ml-grad-2" x1="64" y1="0" x2="0" y2="64" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="var(--highlight)" />
            <stop offset="1" stopColor="var(--accent-3)" />
          </linearGradient>
          <radialGradient id="ml-droplet" cx="0.5" cy="0.4" r="0.6">
            <stop offset="0" stopColor="#fff7e0" stopOpacity="0.95" />
            <stop offset="0.5" stopColor="var(--accent)" stopOpacity="1" />
            <stop offset="1" stopColor="var(--accent-3)" stopOpacity="1" />
          </radialGradient>
          <filter id="ml-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer orbital ring — slowly rotating */}
        <motion.g
          style={{ transformOrigin: "32px 32px" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 22, ease: "linear", repeat: Infinity }}
        >
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="url(#ml-grad-2)"
            strokeWidth="1"
            strokeDasharray="2 6"
            opacity="0.55"
          />
        </motion.g>

        {/* Mid orbital ring — counter rotating */}
        <motion.g
          style={{ transformOrigin: "32px 32px" }}
          animate={{ rotate: -360 }}
          transition={{ duration: 16, ease: "linear", repeat: Infinity }}
        >
          <ellipse
            cx="32"
            cy="32"
            rx="22"
            ry="9"
            stroke="url(#ml-grad)"
            strokeWidth="0.8"
            opacity="0.7"
            transform="rotate(-25 32 32)"
          />
          <circle cx="54" cy="32" r="1.6" fill="var(--accent)" />
        </motion.g>

        {/* The "M" — folded continuous stroke that draws itself */}
        <motion.path
          d="M14 46 V20 L24 36 L32 22 L40 36 L50 20 V46"
          stroke="url(#ml-grad)"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter="url(#ml-glow)"
          variants={{
            rest: { pathLength: 1, opacity: 1 },
            hover: { pathLength: [1, 0.2, 1], opacity: [1, 0.8, 1] },
          }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
        />

        {/* The mishti droplet — the warm signature */}
        <motion.g
          variants={{
            rest: { y: 0, scale: 1 },
            hover: { y: -2, scale: 1.12 },
          }}
          transition={{ type: "spring", stiffness: 220, damping: 12 }}
        >
          <path
            d="M32 30 C 34.5 33, 36 35, 36 37.4 C 36 39.7, 34.2 41.4, 32 41.4 C 29.8 41.4, 28 39.7, 28 37.4 C 28 35, 29.5 33, 32 30 Z"
            fill="url(#ml-droplet)"
          />
          <circle cx="30.6" cy="36" r="0.9" fill="#fff" opacity="0.85" />
        </motion.g>

        {/* Inner pulsing core */}
        <motion.circle
          cx="32"
          cy="32"
          r="1.4"
          fill="var(--accent)"
          animate={{ opacity: [0.35, 1, 0.35], scale: [1, 1.4, 1] }}
          transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity }}
          style={{ transformOrigin: "32px 32px" }}
        />
      </motion.svg>

      {withWordmark && (
        <div className="flex items-baseline gap-1.5">
          <span className="font-display text-[1.35rem] font-semibold tracking-tight text-foreground leading-none">
            mishti
          </span>
          <span className="font-display text-[1.35rem] font-semibold tracking-tight text-gradient leading-none">
            labs
          </span>
          <span
            aria-hidden
            className="ml-0.5 h-1.5 w-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_12px_rgba(245,184,64,0.9)]"
          />
        </div>
      )}
    </div>
  );
}

"use client";

import { motion } from "motion/react";

/**
 * "sweet" word treatment — a hand-drawn honey marker that draws itself in
 * behind the italic serif word. The marker's roughness comes from a
 * fractal-noise feTurbulence + feDisplacementMap, giving it the irregular
 * edge of a real highlighter on paper.
 */
export function SweetMark() {
  return (
    <span className="sweet-mark">
      <svg
        className="sweet-mark__paint"
        viewBox="0 0 240 80"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient
            id="sweet-mark-grad"
            x1="0"
            y1="0"
            x2="240"
            y2="80"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#fdba74" />
            <stop offset="0.55" stopColor="#fb923c" />
            <stop offset="1" stopColor="#f97316" />
          </linearGradient>
          <filter
            id="sweet-mark-rough"
            x="-5%"
            y="-15%"
            width="110%"
            height="130%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="2"
              seed="7"
              result="t"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="t"
              scale="3"
            />
          </filter>
        </defs>

        {/* Wide soft underlay — the "ink bleed" of the marker */}
        <motion.path
          d="M 4 36 C 70 22, 170 22, 236 32 C 232 56, 170 60, 110 56 C 60 54, 14 56, 4 50 Z"
          fill="url(#sweet-mark-grad)"
          filter="url(#sweet-mark-rough)"
          opacity="0.55"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 1,
            delay: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ transformOrigin: "0% 50%" }}
        />

        {/* Crisper top stroke — the "ink line" */}
        <motion.path
          d="M 8 40 C 70 30, 170 28, 232 36 C 226 52, 170 54, 110 51 C 60 49, 18 50, 8 46 Z"
          fill="url(#sweet-mark-grad)"
          filter="url(#sweet-mark-rough)"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 0.9,
            delay: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ transformOrigin: "0% 50%" }}
        />
      </svg>
      <span className="sweet-mark__text">sweet</span>
    </span>
  );
}

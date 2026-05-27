"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect } from "react";
import { useClientFlag } from "@/lib/use-client-flag";

export function CursorGlow() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 90, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 90, damping: 18, mass: 0.4 });

  // Read the "should this glow render?" flag via useSyncExternalStore so we
  // don't violate react-hooks/set-state-in-effect.
  const enabled = useClientFlag(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const conn = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    const slow =
      conn?.saveData === true ||
      conn?.effectiveType === "slow-2g" ||
      conn?.effectiveType === "2g";
    const deviceMemory = (
      navigator as Navigator & { deviceMemory?: number }
    ).deviceMemory;
    const lowMem = typeof deviceMemory === "number" && deviceMemory < 4;
    return fine && !reduced && !slow && !lowMem;
  });

  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className={[
        "pointer-events-none fixed left-0 top-0 z-[60]",
        "-ml-[180px] -mt-[180px] h-[360px] w-[360px] rounded-full blur-2xl",
        // Light mode: multiply so the cream takes on the orb's brand tint;
        // saturated full-strength colours so the tint reads clearly.
        "opacity-70 mix-blend-multiply",
        "[background:radial-gradient(circle,rgba(37,99,235,0.55)_0%,rgba(124,58,237,0.32)_38%,rgba(234,88,12,0.20)_60%,transparent_75%)]",
        // Dark mode: screen so the orb glows like moonlight; lighter alphas
        // because the dark canvas already provides contrast.
        "dark:opacity-60 dark:mix-blend-screen",
        "dark:[background:radial-gradient(circle,rgba(96,165,250,0.45)_0%,rgba(167,139,250,0.22)_38%,rgba(251,146,60,0.16)_60%,transparent_75%)]",
      ].join(" ")}
    />
  );
}

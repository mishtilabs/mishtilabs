"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

// One-time, browser-only console filter for known-noisy upstream warnings
// that we can't fix from app code (yet).
//   - "THREE.Clock: This module has been deprecated. Please use THREE.Timer instead."
//     Triggered by @react-three/fiber and @react-three/drei using THREE.Clock
//     internally. Will go away once both libraries migrate to THREE.Timer.
if (typeof window !== "undefined" && !(window as unknown as { __mlConsolePatched?: boolean }).__mlConsolePatched) {
  (window as unknown as { __mlConsolePatched?: boolean }).__mlConsolePatched = true;
  const SILENCED = [
    "THREE.Clock: This module has been deprecated",
  ];
  const origWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    const msg = typeof args[0] === "string" ? args[0] : "";
    if (SILENCED.some((s) => msg.includes(s))) return;
    origWarn.apply(console, args as []);
  };
}

export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}

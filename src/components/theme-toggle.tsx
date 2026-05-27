"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useClientFlag } from "@/lib/use-client-flag";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // Hydration-safe read: false on the server / first render, true after the
  // client mounts. Uses useSyncExternalStore under the hood (no setState
  // in effect — satisfies react-hooks/set-state-in-effect).
  const mounted = useClientFlag(() => true);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative grid h-9 w-9 place-items-center rounded-full border border-[var(--border-strong)] bg-[color-mix(in_oklab,var(--surface)_60%,transparent)] backdrop-blur transition active:scale-95 hover:border-[var(--accent)] hover:text-[var(--accent)] lg:h-10 lg:w-10"
    >
      <AnimatePresence mode="wait" initial={false}>
        {mounted && isDark ? (
          <motion.span
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0.4 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.4 }}
            transition={{ duration: 0.25 }}
            className="grid place-items-center"
          >
            <Sun className="h-4 w-4" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate: 90, opacity: 0, scale: 0.4 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.4 }}
            transition={{ duration: 0.25 }}
            className="grid place-items-center"
          >
            <Moon className="h-4 w-4" />
          </motion.span>
        )}
      </AnimatePresence>
      <span className="pointer-events-none absolute inset-0 -z-10 rounded-full opacity-0 transition group-hover:opacity-100 [box-shadow:0_0_24px_rgba(var(--glow),0.45)]" />
    </button>
  );
}

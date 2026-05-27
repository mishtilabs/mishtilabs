"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PRODUCTS, type Product } from "@/lib/products";
import { useClientFlag } from "@/lib/use-client-flag";

/**
 * Mobile-only sticky dock — a glassmorphic horizontal rail that surfaces every
 * MishtiLabs offering. Hidden on lg+ so PC stays untouched. Auto-hides on
 * scroll-down, reveals on scroll-up — like the Apple App Store / Spotify dock.
 */
export function BottomDock() {
  const [visible, setVisible] = useState(true);
  // Hydration-safe mount flag (no setState in effect).
  const mounted = useClientFlag(() => true);

  useEffect(() => {
    if (!mounted) return;
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const dy = y - lastY;
      // Hide when scrolling down briskly past the hero, reveal on scroll-up.
      if (Math.abs(dy) > 6) {
        if (dy > 0 && y > 320) setVisible(false);
        else setVisible(true);
        lastY = y;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mounted]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          aria-label="MishtiLabs products"
          initial={{ y: 140, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 140, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 320,
            damping: 30,
            mass: 0.6,
          }}
          className="fixed inset-x-0 bottom-0 z-40 lg:hidden"
          style={{
            paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 0.6rem)",
          }}
        >
          <div className="mx-3 overflow-hidden rounded-[1.6rem] border border-[var(--border-strong)] bg-[color-mix(in_oklab,var(--surface)_55%,transparent)] backdrop-blur-2xl backdrop-saturate-150 [box-shadow:0_-18px_50px_-18px_rgba(0,0,0,0.45),0_2px_0_0_color-mix(in_oklab,var(--accent)_18%,transparent)_inset]">
            {/* Top accent hairline */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-70"
            />

            {/* Tiny rail label */}
            <div className="flex items-center justify-between px-4 pt-2 pb-1">
              <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-muted">
                Mishti dock · {PRODUCTS.length} offerings
              </span>
              <span
                aria-hidden
                className="h-1.5 w-8 rounded-full bg-[color-mix(in_oklab,var(--accent)_30%,transparent)]"
              />
            </div>

            <div className="relative">
              {/* Scrollable rail */}
              <ul
                role="list"
                className="flex snap-x snap-mandatory items-stretch gap-1.5 overflow-x-auto px-4 pb-3 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              >
                {PRODUCTS.map((p, i) => (
                  <DockItem key={p.id} product={p} index={i} />
                ))}
                <li aria-hidden className="shrink-0 pr-3" />
              </ul>

              {/* Edge fade right (cue for more content) */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[color-mix(in_oklab,var(--surface)_85%,transparent)] to-transparent"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-[color-mix(in_oklab,var(--surface)_85%,transparent)] to-transparent"
              />
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

function DockItem({ product, index }: { product: Product; index: number }) {
  // Use first 1–2 chars: most product names are mono-cap (Pravah → "P").
  // For products that share a first letter we show two letters where it
  // would otherwise be ambiguous (Vimaan vs Vidya), but we keep it tight.
  const monogram = product.name.replace(/\s/g, "").slice(0, 1);
  const isExternal = Boolean(product.url);

  return (
    <li className="shrink-0 snap-start">
      <Link
        href={product.url ?? `#${product.id}`}
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className="group/dock flex w-[64px] flex-col items-center gap-1 rounded-2xl px-1 py-1.5 transition active:scale-95"
        aria-label={
          isExternal
            ? `${product.name} — open ${product.tagline} (opens in a new tab)`
            : `${product.name} — ${product.tagline}`
        }
        title={product.name}
      >
        <span
          className="dock-icon relative grid h-11 w-11 place-items-center rounded-2xl border border-white/15 text-white shadow-[0_8px_22px_-8px_var(--di-glow)] transition-transform duration-300 group-hover/dock:-translate-y-0.5"
          style={
            {
              background: `radial-gradient(120% 120% at 30% 20%, color-mix(in oklab, ${product.accent} 88%, white) 0%, ${product.accent} 50%, color-mix(in oklab, ${product.accent} 60%, #0b0303) 100%)`,
              ["--di-glow" as never]: product.accent,
            } as React.CSSProperties
          }
        >
          {/* Inner gloss highlight */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{
              background:
                "radial-gradient(70% 50% at 30% 18%, rgba(255,255,255,0.55) 0%, transparent 60%)",
            }}
          />
          {/* Faint orbital ring (matches the in-page logo language) */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-1.5 rounded-full border border-white/20"
            style={{ transform: "rotate(-25deg) scaleY(0.42)" }}
          />
          <span
            className="font-serif-italic relative z-[1] text-[1.05rem] italic font-medium leading-none [text-shadow:0_1px_0_rgba(0,0,0,0.18)]"
            style={{ animationDelay: `${index * 30}ms` }}
          >
            {monogram}
          </span>
        </span>
        <span className="font-serif-italic line-clamp-1 max-w-full text-[11px] italic leading-[1.2] text-foreground-soft transition-colors group-hover/dock:text-foreground">
          {product.name}
        </span>
      </Link>
    </li>
  );
}

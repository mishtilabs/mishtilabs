"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { useBookIntro } from "./book-intro/provider";

const NAV_ITEMS = [
  { label: "Studio", href: "#studio" },
  { label: "Products", href: "#products" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Process", href: "#process" },
  { label: "Voices", href: "#voices" },
  { label: "FAQ", href: "#faq" },
];

export function Nav() {
  const { scrollY } = useScroll();
  const blur = useTransform(scrollY, [0, 200], [0, 18]);
  const bg = useTransform(
    scrollY,
    [0, 200],
    ["color-mix(in oklab, var(--background) 0%, transparent)", "color-mix(in oklab, var(--background) 70%, transparent)"],
  );
  const borderOpacity = useTransform(scrollY, [0, 200], [0, 1]);

  const [open, setOpen] = useState(false);
  const bookIntro = useBookIntro();

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        style={{
          backdropFilter: useTransform(blur, (b) => `blur(${b}px) saturate(160%)`),
          background: bg,
        }}
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[var(--border-strong)]"
          style={{ opacity: borderOpacity }}
        />
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
          <Link
            href="#"
            aria-label="MishtiLabs — Engineering the future"
            className="flex items-center gap-3"
          >
            <Logo size={40} withWordmark withTagline />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative rounded-full px-4 py-2 text-sm text-foreground-soft transition hover:text-foreground"
              >
                <span className="relative z-10">{item.label}</span>
                <span className="absolute inset-0 -z-0 rounded-full opacity-0 transition group-hover:opacity-100 [background:color-mix(in_oklab,var(--surface)_70%,transparent)] [box-shadow:0_0_0_1px_var(--border)_inset]" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* Tablet / narrow window (sm to lg): compact marquee pill — thinner
                header, self-scrolling text. Phones stay button-less to keep
                their already-tight header. The button keeps a full a11y label. */}
            <button
              type="button"
              aria-label="Book an intro call"
              onClick={bookIntro.open}
              className="btn-marquee hidden sm:inline-flex lg:hidden"
            >
              <span className="btn-marquee__viewport">
                <span className="btn-marquee__track">
                  <span className="btn-marquee__chunk">
                    <span>Book intro</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                    <span aria-hidden className="opacity-55">
                      ·
                    </span>
                  </span>
                  <span aria-hidden className="btn-marquee__chunk">
                    <span>Book intro</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                    <span aria-hidden className="opacity-55">
                      ·
                    </span>
                  </span>
                </span>
              </span>
            </button>

            {/* Desktop (lg+): Book intro button — opens the modal form. */}
            <button
              type="button"
              onClick={bookIntro.open}
              className="hidden btn-primary text-sm lg:inline-flex"
            >
              Book intro <ArrowUpRight className="h-4 w-4" />
            </button>

            <button
              type="button"
              aria-label="Open menu"
              className="grid h-9 w-9 place-items-center rounded-full border border-[var(--border-strong)] active:scale-95 lg:hidden"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-x-0 top-[64px] z-40 overflow-hidden border-b border-[var(--border)] bg-[color-mix(in_oklab,var(--background)_92%,transparent)] backdrop-blur lg:hidden"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex min-h-[48px] items-center justify-between rounded-2xl border border-transparent px-4 py-3.5 text-base text-foreground-soft transition active:scale-[0.99] hover:border-[var(--border)] hover:bg-[var(--surface)] hover:text-foreground"
            >
              {item.label}
              <ArrowUpRight className="h-4 w-4 opacity-60" />
            </Link>
          ))}
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              bookIntro.open();
            }}
            className="btn-primary mt-2 justify-center"
          >
            Book intro <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </>
  );
}

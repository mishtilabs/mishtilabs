"use client";

import Link from "next/link";
import { Logo } from "./logo";

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path
      fillRule="evenodd"
      d="M12 .5C5.73.5.66 5.57.66 11.84c0 5.02 3.25 9.27 7.76 10.77.57.1.78-.25.78-.55v-1.93c-3.16.69-3.83-1.52-3.83-1.52-.51-1.31-1.26-1.66-1.26-1.66-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.74 2.66 1.24 3.31.95.1-.74.4-1.24.72-1.53-2.52-.29-5.18-1.26-5.18-5.6 0-1.24.44-2.25 1.17-3.05-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.17.91-.25 1.88-.38 2.85-.38s1.94.13 2.85.38c2.18-1.48 3.14-1.17 3.14-1.17.62 1.57.23 2.73.11 3.02.73.8 1.17 1.81 1.17 3.05 0 4.36-2.66 5.31-5.19 5.59.41.35.78 1.05.78 2.12v3.14c0 .3.21.66.79.55 4.5-1.5 7.75-5.75 7.75-10.77C23.34 5.57 18.27.5 12 .5z"
      clipRule="evenodd"
    />
  </svg>
);
const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.86 3.37-1.86 3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43A2.07 2.07 0 1 1 5.33 3.3a2.07 2.07 0 0 1 .01 4.13zM7.12 20.45H3.56V9h3.56zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
  </svg>
);
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

const COLS = [
  {
    title: "Studio",
    links: ["About", "Manifesto", "Press", "Careers", "Open Source"],
  },
  {
    title: "Products",
    links: ["Pravah CRM", "FlowLife", "GrowRight", "WeddingVerse", "All 30+ →"],
  },
  {
    title: "Build with us",
    links: ["Custom software", "Mobile apps", "AI engineering", "Design systems", "DevOps"],
  },
  {
    title: "Contact",
    links: ["hello@mishtilabs.com", "Bengaluru, India", "Kolkata, India", "Remote, Earth"],
  },
];

export function Footer() {
  return (
    <footer className="relative isolate mt-24 overflow-hidden bg-[var(--background-2)]">
      {/* Soft warm fade at the top — replaces the old hard border + accent
          hairline so the footer melts into the page above it. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-px h-32 bg-gradient-to-b from-[color-mix(in_oklab,var(--background)_92%,transparent)] via-[color-mix(in_oklab,var(--background-2)_60%,transparent)] to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-12 top-2 h-px bg-gradient-to-r from-transparent via-[color-mix(in_oklab,var(--accent)_40%,transparent)] to-transparent opacity-60"
      />
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo size={48} withWordmark withTagline />
            <p className="mt-5 max-w-sm text-sm text-foreground-soft">
              A product studio engineering the future, with the warmth of{" "}
              <em className="font-serif-italic not-italic italic text-[var(--accent-2)]">
                mishti
              </em>{" "}
              and the rigor of a research lab.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-2 text-[10.5px] uppercase tracking-[0.18em] text-muted">
              {[
                { k: "30+", v: "Software offerings" },
                { k: "</>", v: "Develop" },
                { k: "☁", v: "Cloud" },
                { k: "📈", v: "Analyze" },
                { k: "🛡", v: "Secure" },
                { k: "📱", v: "Mobile" },
              ].map((c) => (
                <span
                  key={c.v}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[color-mix(in_oklab,var(--surface)_60%,transparent)] px-2 py-1"
                >
                  <span className="font-mono text-[var(--accent)]">{c.k}</span>
                  <span>{c.v}</span>
                </span>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-2">
              {[
                { icon: TwitterIcon, href: "#", label: "Twitter" },
                { icon: GithubIcon, href: "#", label: "GitHub" },
                { icon: LinkedinIcon, href: "#", label: "LinkedIn" },
                { icon: InstagramIcon, href: "#", label: "Instagram" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-[var(--border)] text-foreground-soft transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {COLS.map((col) => (
              <div key={col.title}>
                <h4 className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                  {col.title}
                </h4>
                <ul className="mt-4 space-y-3 text-sm">
                  {col.links.map((l) => (
                    <li key={l}>
                      <Link
                        href="#"
                        className="text-foreground-soft transition hover:text-[var(--accent)]"
                      >
                        {l}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Big wordmark — Mishti (cool, foreground tone) + labs (full brand
            sweep). Glow halo sits behind it, animated only in dark mode.
            No `overflow-hidden` so the blur can fade organically into the
            footer body. The footer itself clips the outermost edges. */}
        <div className="relative mt-14 select-none">
          {/* Animated brand glow — extends well beyond the wordmark text so
              the radial blooms fade to nothing inside the visible area
              instead of being chopped at a box edge. Dark-mode only. */}
          <div
            aria-hidden
            className="footer-wordmark-glow pointer-events-none absolute -inset-x-[8%] -inset-y-[55%] hidden dark:block"
          />
          <p className="relative text-center font-display leading-[1.05] tracking-[-0.045em] text-[clamp(4rem,17.5vw,38rem)]">
            <span className="metallic-silver">Mishti</span>
            <span
              className="metallic-brand font-serif-italic"
              style={{ fontWeight: 400, paddingRight: "0.04em" }}
            >
              labs
            </span>
          </p>
          <p className="relative mt-3 text-balance text-center font-serif-italic text-base italic leading-snug text-foreground-soft md:text-lg">
            Engineering the future,{" "}
            <span className="text-[var(--accent-2)]">with sweet precision.</span>
          </p>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-[var(--border)] pt-6 text-xs text-muted md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} MishtiLabs. Crafted with care in India.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="#" className="hover:text-foreground">Privacy</Link>
            <Link href="#" className="hover:text-foreground">Terms</Link>
            <Link href="#" className="hover:text-foreground">Cookies</Link>
            <Link href="#" className="hover:text-foreground">Trust</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

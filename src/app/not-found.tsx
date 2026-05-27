import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { ArrowUpRight, Home } from "lucide-react";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "Sorry — the page you were looking for at MishtiLabs doesn't exist. Head home and explore the rest of our products and capabilities.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="aurora absolute inset-0 -z-10 opacity-90" />
      <div className="grid-bg absolute inset-0 -z-10 opacity-40" />

      <Logo size={56} />

      <p className="mt-8 chip chip-dot">
        <span className="font-mono">Status · 404 · stranded in space</span>
      </p>

      <h1 className="mt-5 font-display text-balance text-4xl leading-[1.04] tracking-tight md:text-6xl">
        We can&rsquo;t find that{" "}
        <span className="font-serif-italic italic text-[var(--accent-2)]">page</span>.
      </h1>

      <p className="mx-auto mt-5 max-w-xl text-base text-foreground-soft md:text-lg">
        It may have been moved, renamed, or never existed in the first place.
        The good news: there are 30+ other things to explore on the home page.
      </p>

      <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
        <Link href="/" className="btn-primary">
          <Home className="h-4 w-4" /> Back home
        </Link>
        <Link href="/#products" className="btn-ghost">
          See our products <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </main>
  );
}

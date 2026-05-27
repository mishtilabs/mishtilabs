import dynamic from "next/dynamic";

import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { Studio } from "@/components/studio";
import { Stats } from "@/components/stats";
import { ProductsGrid } from "@/components/products-grid";
import { Capabilities } from "@/components/capabilities";
import { Process } from "@/components/process";
import { CursorGlow } from "@/components/cursor-glow";
import { BottomDock } from "@/components/bottom-dock";
import {
  JsonLd,
  ProductsItemListLd,
  FaqLd,
  BreadcrumbsLd,
} from "@/components/json-ld";

// Below-the-fold sections — split into separate JS chunks so the hero / nav /
// marquee / studio / stats / products critical path ships first. They are still
// rendered into the static HTML at build time, so SEO is unaffected.
const Testimonials = dynamic(() =>
  import("@/components/testimonials").then((m) => m.Testimonials),
);
const FAQ = dynamic(() => import("@/components/faq").then((m) => m.FAQ));
const CTA = dynamic(() => import("@/components/cta").then((m) => m.CTA));
const Footer = dynamic(() =>
  import("@/components/footer").then((m) => m.Footer),
);

export default function Home() {
  return (
    <>
      <JsonLd data={ProductsItemListLd} />
      <JsonLd data={FaqLd} />
      <JsonLd data={BreadcrumbsLd} />
      <main id="main" className="relative pb-[5.5rem] lg:pb-0">
        <CursorGlow />
        <BottomDock />
        <Nav />
        <Hero />
        <Marquee />
        <Studio />
        <Stats />
        <ProductsGrid />
        <Marquee reverse />
        <Capabilities />
        <Process />
        <Testimonials />
        <FAQ />
        <CTA />
        <Footer />
      </main>
    </>
  );
}

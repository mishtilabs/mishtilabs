import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { PRODUCTS } from "@/lib/products";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const sectionAnchors = [
    "studio",
    "products",
    "capabilities",
    "process",
    "voices",
    "contact",
  ];

  return [
    {
      url: `${SITE.url}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...sectionAnchors.map((id) => ({
      url: `${SITE.url}/#${id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...PRODUCTS.map((p) => ({
      url: `${SITE.url}/#${p.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}

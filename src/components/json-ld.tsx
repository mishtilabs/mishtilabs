import { SITE, FAQ_ITEMS } from "@/lib/site";
import { PRODUCTS } from "@/lib/products";

type JsonLdProps = { data: Record<string, unknown> | Array<Record<string, unknown>> };

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // Stable JSON; safe to inject as a string. Minimised here.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const orgId = `${SITE.url}#organization`;
const webId = `${SITE.url}#website`;

export const OrganizationLd: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": orgId,
  name: SITE.name,
  legalName: SITE.legalName,
  alternateName: ["Mishti Labs", "Mishti"],
  url: SITE.url,
  logo: `${SITE.url}/icon`,
  image: `${SITE.url}/opengraph-image`,
  email: SITE.email,
  telephone: SITE.telephone,
  description: SITE.longDescription,
  foundingDate: SITE.founded,
  founders: SITE.founders.map((name) => ({ "@type": "Person", name })),
  address: {
    "@type": "PostalAddress",
    addressLocality: SITE.addressLocality,
    addressRegion: SITE.addressRegion,
    addressCountry: SITE.addressCountry,
  },
  sameAs: [
    SITE.social.twitterUrl,
    SITE.social.github,
    SITE.social.linkedin,
    SITE.social.instagram,
  ],
  knowsAbout: [
    "Custom software development",
    "Product engineering",
    "Mobile app development",
    "Artificial intelligence",
    "Design systems",
    "Cloud platform engineering",
    "SaaS",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: SITE.email,
      availableLanguage: ["English", "Hindi", "Bengali"],
      areaServed: ["IN", "US", "GB", "EU"],
    },
  ],
};

export const WebsiteLd: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": webId,
  name: SITE.name,
  url: SITE.url,
  inLanguage: SITE.language,
  publisher: { "@id": orgId },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE.url}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export const ProductsItemListLd: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `${SITE.name} — Products`,
  numberOfItems: PRODUCTS.length,
  itemListElement: PRODUCTS.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "SoftwareApplication",
      name: p.name,
      alternateName: `${p.name} by ${SITE.name}`,
      description: `${p.tagline}. ${p.description}`,
      applicationCategory: applicationCategoryFor(p.category),
      operatingSystem: "Web, iOS, Android",
      url: `${SITE.url}/#${p.id}`,
      image: p.image,
      brand: { "@id": orgId },
      offers: {
        "@type": "Offer",
        availability:
          p.status === "Coming Soon"
            ? "https://schema.org/PreOrder"
            : "https://schema.org/InStock",
        priceCurrency: "USD",
        price: "0",
      },
    },
  })),
};

export const FaqLd: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export const BreadcrumbsLd: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE.url,
    },
  ],
};

function applicationCategoryFor(category: string) {
  const map: Record<string, string> = {
    Business: "BusinessApplication",
    Family: "LifestyleApplication",
    Lifestyle: "LifestyleApplication",
    Education: "EducationalApplication",
    Health: "HealthApplication",
    Travel: "TravelApplication",
    Finance: "FinanceApplication",
    Productivity: "BusinessApplication",
    Media: "MultimediaApplication",
    Creative: "DesignApplication",
    AI: "DeveloperApplication",
    Commerce: "BusinessApplication",
    DevTools: "DeveloperApplication",
    Security: "SecurityApplication",
    HR: "BusinessApplication",
    Agritech: "BusinessApplication",
    Logistics: "BusinessApplication",
    Events: "LifestyleApplication",
    IoT: "UtilitiesApplication",
  };
  return map[category] ?? "WebApplication";
}

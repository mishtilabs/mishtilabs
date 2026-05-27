import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  Outfit,
  Instrument_Serif,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { BookIntroProvider } from "@/components/book-intro/provider";
import { SITE } from "@/lib/site";
import {
  JsonLd,
  OrganizationLd,
  WebsiteLd,
} from "@/components/json-ld";

const display = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const body = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const serif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["italic", "normal"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Engineering the future, with sweet precision`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.shortDescription,
  applicationName: SITE.name,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: [...SITE.keywords],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "technology",
  classification: "Software Development Studio",

  alternates: {
    canonical: "/",
    languages: {
      "en-IN": "/",
      "x-default": "/",
    },
  },

  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — Engineering the future, with sweet precision`,
    description: SITE.longDescription,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${SITE.name} — Engineering the future · 30+ software offerings`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Engineering the future, with sweet precision`,
    description: SITE.shortDescription,
    site: SITE.social.twitter,
    creator: SITE.social.twitter,
    images: ["/twitter-image"],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon", type: "image/png", sizes: "64x64" },
    ],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
    shortcut: ["/icon"],
  },

  manifest: "/manifest.webmanifest",

  // Reserved slots for verification — fill via env or hPanel TXT records as you set them up.
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    other: {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION ?? "",
    },
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  other: {
    "google-site-verification": process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: SITE.themeColor.light },
    { media: "(prefers-color-scheme: dark)", color: SITE.themeColor.dark },
  ],
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang={SITE.language}
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${serif.variable} h-full antialiased`}
    >
      <head>
        {/* Org + WebSite JSON-LD on every page */}
        <JsonLd data={OrganizationLd} />
        <JsonLd data={WebsiteLd} />
      </head>
      <body className="min-h-full font-sans">
        {/* Skip-to-content link for keyboard users — hidden until focused. */}
        <a
          href="#main"
          className="sr-only fixed left-3 top-3 z-[100] focus:not-sr-only focus:rounded-full focus:border focus:border-[var(--accent)] focus:bg-[var(--surface)] focus:px-4 focus:py-2 focus:text-sm focus:text-foreground focus:shadow-lg"
        >
          Skip to content
        </a>
        <ThemeProvider>
          <BookIntroProvider>{children}</BookIntroProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

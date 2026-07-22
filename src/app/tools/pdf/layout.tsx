import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Online PDF Tools - Merge, Split, Compress, Rotate | ToolsMani",
  description:
    "All-in-one PDF toolkit. Merge, split, compress, rotate, add watermarks, page numbers, and manage pages. No file size limits, 100% free and browser-based.",
  alternates: {
    canonical: "/tools/pdf/",
    languages: {
      en: "/tools/pdf/",
      tr: "/tr/tools/pdf/",
      es: "/es/tools/pdf/",
      de: "/de/tools/pdf/",
      pt: "/pt/tools/pdf/",
      fr: "/fr/tools/pdf/",
      "x-default": "/tools/pdf/",
    },
  },
  openGraph: {
    title: "Free Online PDF Tools | ToolsMani",
    description: "Complete PDF toolkit — merge, split, compress, rotate and more. No limits.",
    images: ["/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Free Online PDF Tools - Merge, Split, Compress, Rotate",
    url: "https://toolsmani.com/tools/pdf/",
    description:
      "All-in-one PDF toolkit. Merge, split, compress, rotate, add watermarks, page numbers, and manage pages. No file size limits, 100% free and browser-based.",
    applicationCategory: "UtilityApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}

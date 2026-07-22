import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UUID Generator & Text Hash (SHA-256) - Free Online | ToolsMani",
  description:
    "Generate random UUID v4 identifiers in bulk and compute SHA-256, SHA-512 or SHA-1 hashes of any text. Free, instant, and fully client-side.",
  alternates: {
    canonical: "/tools/uuid-generator/",
    languages: {
      en: "/tools/uuid-generator/",
      tr: "/tr/tools/uuid-generator/",
      "x-default": "/tools/uuid-generator/",
    },
  },
  openGraph: {
    title: "UUID Generator & Text Hash (SHA-256) - Free Online | ToolsMani",
    description:
      "Generate random UUID v4 identifiers in bulk and compute SHA-256 hashes of any text. Free and fully client-side.",
    images: ["/og-image.png"],
  },
};

export default function UuidGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "UUID Generator & Text Hash",
    url: "https://toolsmani.com/tools/uuid-generator/",
    description:
      "Generate random UUID v4 identifiers in bulk and compute SHA-256, SHA-512 or SHA-1 hashes of any text.",
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

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text Compare - Online Text Difference Checker | ToolsMani",
  description:
    "Compare two texts online and see the differences line by line. Free diff checker with added/removed highlighting \u2014 runs entirely in your browser, nothing is uploaded.",
  alternates: {
    canonical: "/tools/text-diff/",
    languages: {
      en: "/tools/text-diff/",
      tr: "/tr/tools/text-diff/",
      es: "/es/tools/text-diff/",
      de: "/de/tools/text-diff/",
      pt: "/pt/tools/text-diff/",
      fr: "/fr/tools/text-diff/",
      "x-default": "/tools/text-diff/",
    },
  },
  openGraph: {
    title: "Text Compare - Online Text Difference Checker | ToolsMani",
    description:
      "Compare two texts online and see the differences line by line. Free diff checker with added/removed highlighting \u2014 runs entirely in your browser, nothing is uploaded.",
    images: ["/og-image.png"],
  },
};

export default function TextDiffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Text Compare - Online Text Difference Checker | ToolsMani",
    url: "https://toolsmani.com/tools/text-diff/",
    description:
      "Compare two texts online and see the differences line by line. Free diff checker with added/removed highlighting \u2014 runs entirely in your browser, nothing is uploaded.",
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

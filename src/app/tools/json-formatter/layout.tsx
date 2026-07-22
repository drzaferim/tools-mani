import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JSON Formatter & Validator - Beautify JSON Online | ToolsMani",
  description:
    "Format, validate, and beautify JSON data online for free. Minify or pretty-print JSON with syntax highlighting and error detection. Fast and easy to use.",
  alternates: {
    canonical: "/tools/json-formatter/",
    languages: {
      en: "/tools/json-formatter/",
      tr: "/tr/tools/json-formatter/",
      es: "/es/tools/json-formatter/",
      de: "/de/tools/json-formatter/",
      pt: "/pt/tools/json-formatter/",
      fr: "/fr/tools/json-formatter/",
      "x-default": "/tools/json-formatter/",
    },
  },
  openGraph: {
    title: "JSON Formatter & Validator - Beautify JSON Online | ToolsMani",
    description:
      "Format, validate and beautify JSON online with syntax highlighting and error detection.",
    images: ["/og-image.png"],
  },
};

export default function JsonFormatterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "JSON Formatter & Validator - Beautify JSON Online",
    url: "https://toolsmani.com/tools/json-formatter/",
    description:
      "Format, validate, and beautify JSON data online for free. Minify or pretty-print JSON with syntax highlighting and error detection. Fast and easy to use.",
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

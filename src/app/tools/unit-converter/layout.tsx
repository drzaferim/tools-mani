import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unit Converter - Length, Weight, Temperature | ToolsMani",
  description:
    "Convert units of length, weight, temperature, volume, and more. Free online unit converter with instant results. Supports metric, imperial, and scientific units.",
  alternates: {
    canonical: "/tools/unit-converter/",
    languages: {
      en: "/tools/unit-converter/",
      tr: "/tr/tools/unit-converter/",
      "x-default": "/tools/unit-converter/",
    },
  },
  openGraph: {
    title: "Unit Converter - Length, Weight, Temperature | ToolsMani",
    description:
      "Convert units of length, weight, temperature and more. Free online converter with instant results.",
  },
};

export default function UnitConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Unit Converter - Length, Weight, Temperature",
    url: "https://toolsmani.com/tools/unit-converter/",
    description:
      "Convert units of length, weight, temperature, volume, and more. Free online unit converter with instant results. Supports metric, imperial, and scientific units.",
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

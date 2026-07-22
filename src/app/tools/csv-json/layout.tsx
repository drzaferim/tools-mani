import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CSV to JSON Converter (and JSON to CSV) | ToolsMani",
  description:
    "Convert CSV data to JSON and JSON arrays back to CSV. Handles quoted fields and custom delimiters. Free and fully client-side.",
  alternates: {
    canonical: "/tools/csv-json/",
    languages: {
      en: "/tools/csv-json/",
      tr: "/tr/tools/csv-json/",
      "x-default": "/tools/csv-json/",
    },
  },
  openGraph: {
    title: "CSV to JSON Converter (and JSON to CSV) | ToolsMani",
    description:
      "Convert CSV data to JSON and JSON arrays back to CSV. Handles quoted fields and custom delimiters. Free and fully client-side.",
    images: ["/og-image.png"],
  },
};

export default function CsvJsonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CSV to JSON Converter (and JSON to CSV) | ToolsMani",
    url: "https://toolsmani.com/tools/csv-json/",
    description:
      "Convert CSV data to JSON and JSON arrays back to CSV. Handles quoted fields and custom delimiters. Free and fully client-side.",
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

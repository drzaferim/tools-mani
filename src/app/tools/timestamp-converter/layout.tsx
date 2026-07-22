import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unix Timestamp Converter - Epoch to Date | ToolsMani",
  description:
    "Convert Unix timestamps to human-readable dates and back, in local time and UTC. Live current epoch clock. Free developer tool.",
  alternates: {
    canonical: "/tools/timestamp-converter/",
    languages: {
      en: "/tools/timestamp-converter/",
      tr: "/tr/tools/timestamp-converter/",
      "x-default": "/tools/timestamp-converter/",
    },
  },
  openGraph: {
    title: "Unix Timestamp Converter - Epoch to Date | ToolsMani",
    description:
      "Convert Unix timestamps to human-readable dates and back, in local time and UTC. Live current epoch clock. Free developer tool.",
    images: ["/og-image.png"],
  },
};

export default function TimestampConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Unix Timestamp Converter - Epoch to Date | ToolsMani",
    url: "https://toolsmani.com/tools/timestamp-converter/",
    description:
      "Convert Unix timestamps to human-readable dates and back, in local time and UTC. Live current epoch clock. Free developer tool.",
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

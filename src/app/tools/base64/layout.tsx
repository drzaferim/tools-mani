import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Base64 Encoder & Decoder - Encode Decode Online | ToolsMani",
  description:
    "Encode and decode Base64 strings online for free. Convert text, files, and images to Base64 and back instantly. Supports UTF-8 and binary data encoding.",
  alternates: {
    canonical: "/tools/base64/",
    languages: {
      en: "/tools/base64/",
      tr: "/tr/tools/base64/",
      es: "/es/tools/base64/",
      de: "/de/tools/base64/",
      pt: "/pt/tools/base64/",
      fr: "/fr/tools/base64/",
      "x-default": "/tools/base64/",
    },
  },
  openGraph: {
    title: "Base64 Encoder & Decoder - Encode Decode Online | ToolsMani",
    description:
      "Encode and decode Base64 strings online. Convert text, files and images to Base64 instantly.",
    images: ["/og-image.png"],
  },
};

export default function Base64Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Base64 Encoder & Decoder - Encode Decode Online",
    url: "https://toolsmani.com/tools/base64/",
    description:
      "Encode and decode Base64 strings online for free. Convert text, files, and images to Base64 and back instantly. Supports UTF-8 and binary data encoding.",
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

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lorem Ipsum Generator - Placeholder Text | ToolsMani",
  description:
    "Generate Lorem Ipsum placeholder text for your designs and layouts. Create paragraphs, sentences, or words of dummy text. Free online Lorem Ipsum generator.",
  alternates: {
    canonical: "/tools/lorem-ipsum/",
    languages: {
      en: "/tools/lorem-ipsum/",
      tr: "/tr/tools/lorem-ipsum/",
      es: "/es/tools/lorem-ipsum/",
      de: "/de/tools/lorem-ipsum/",
      pt: "/pt/tools/lorem-ipsum/",
      fr: "/fr/tools/lorem-ipsum/",
      "x-default": "/tools/lorem-ipsum/",
    },
  },
  openGraph: {
    title: "Lorem Ipsum Generator - Placeholder Text | ToolsMani",
    description:
      "Generate Lorem Ipsum placeholder text for designs and layouts. Create paragraphs, sentences or words.",
    images: ["/og-image.png"],
  },
};

export default function LoremIpsumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Lorem Ipsum Generator - Placeholder Text",
    url: "https://toolsmani.com/tools/lorem-ipsum/",
    description:
      "Generate Lorem Ipsum placeholder text for your designs and layouts. Create paragraphs, sentences, or words of dummy text. Free online Lorem Ipsum generator.",
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

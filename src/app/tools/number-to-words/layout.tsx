import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Number to Words - Spell Out Numbers (TR & EN) | ToolsMani",
  description:
    "Spell out any number in Turkish and English \u2014 for invoices, cheques and official forms. Decimals supported. Free.",
  alternates: {
    canonical: "/tools/number-to-words/",
    languages: {
      en: "/tools/number-to-words/",
      tr: "/tr/tools/number-to-words/",
      es: "/es/tools/number-to-words/",
      de: "/de/tools/number-to-words/",
      pt: "/pt/tools/number-to-words/",
      fr: "/fr/tools/number-to-words/",
      "x-default": "/tools/number-to-words/",
    },
  },
  openGraph: {
    title: "Number to Words - Spell Out Numbers (TR & EN) | ToolsMani",
    description:
      "Spell out any number in Turkish and English \u2014 for invoices, cheques and official forms. Decimals supported. Free.",
    images: ["/og-image.png"],
  },
};

export default function NumberToWordsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Number to Words - Spell Out Numbers (TR & EN) | ToolsMani",
    url: "https://toolsmani.com/tools/number-to-words/",
    description:
      "Spell out any number in Turkish and English \u2014 for invoices, cheques and official forms. Decimals supported. Free.",
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

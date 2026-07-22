import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Percentage Calculator - 3 Common Calculations | ToolsMani",
  description:
    "What is X% of Y, X is what percent of Y, and percentage change \u2014 answered instantly. Free online percentage calculator.",
  alternates: {
    canonical: "/tools/percentage-calculator/",
    languages: {
      en: "/tools/percentage-calculator/",
      tr: "/tr/tools/percentage-calculator/",
      es: "/es/tools/percentage-calculator/",
      de: "/de/tools/percentage-calculator/",
      pt: "/pt/tools/percentage-calculator/",
      fr: "/fr/tools/percentage-calculator/",
      "x-default": "/tools/percentage-calculator/",
    },
  },
  openGraph: {
    title: "Percentage Calculator - 3 Common Calculations | ToolsMani",
    description:
      "What is X% of Y, X is what percent of Y, and percentage change \u2014 answered instantly. Free online percentage calculator.",
    images: ["/og-image.png"],
  },
};

export default function PercentageCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Percentage Calculator - 3 Common Calculations | ToolsMani",
    url: "https://toolsmani.com/tools/percentage-calculator/",
    description:
      "What is X% of Y, X is what percent of Y, and percentage change \u2014 answered instantly. Free online percentage calculator.",
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

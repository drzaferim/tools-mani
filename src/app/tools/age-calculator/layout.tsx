import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Age Calculator - Exact Age in Years, Months, Days | ToolsMani",
  description:
    "Calculate your exact age in years, months and days, total days lived, and time until your next birthday. Free, instant, no sign-up.",
  alternates: {
    canonical: "/tools/age-calculator/",
    languages: {
      en: "/tools/age-calculator/",
      tr: "/tr/tools/age-calculator/",
      es: "/es/tools/age-calculator/",
      de: "/de/tools/age-calculator/",
      pt: "/pt/tools/age-calculator/",
      fr: "/fr/tools/age-calculator/",
      "x-default": "/tools/age-calculator/",
    },
  },
  openGraph: {
    title: "Age Calculator - Exact Age in Years, Months, Days | ToolsMani",
    description:
      "Calculate your exact age in years, months and days, total days lived, and time until your next birthday. Free, instant, no sign-up.",
    images: ["/og-image.png"],
  },
};

export default function AgeCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Age Calculator - Exact Age in Years, Months, Days | ToolsMani",
    url: "https://toolsmani.com/tools/age-calculator/",
    description:
      "Calculate your exact age in years, months and days, total days lived, and time until your next birthday. Free, instant, no sign-up.",
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

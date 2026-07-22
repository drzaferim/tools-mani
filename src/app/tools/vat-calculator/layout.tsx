import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VAT Calculator - Add or Extract VAT | ToolsMani",
  description:
    "Add VAT to net prices or extract VAT from gross prices. T\u00fcrkiye presets (1%, 10%, 20%) and custom rates. Free.",
  alternates: {
    canonical: "/tools/vat-calculator/",
    languages: {
      en: "/tools/vat-calculator/",
      tr: "/tr/tools/vat-calculator/",
      "x-default": "/tools/vat-calculator/",
    },
  },
  openGraph: {
    title: "VAT Calculator - Add or Extract VAT | ToolsMani",
    description:
      "Add VAT to net prices or extract VAT from gross prices. T\u00fcrkiye presets (1%, 10%, 20%) and custom rates. Free.",
    images: ["/og-image.png"],
  },
};

export default function VatCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "VAT Calculator - Add or Extract VAT | ToolsMani",
    url: "https://toolsmani.com/tools/vat-calculator/",
    description:
      "Add VAT to net prices or extract VAT from gross prices. T\u00fcrkiye presets (1%, 10%, 20%) and custom rates. Free.",
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

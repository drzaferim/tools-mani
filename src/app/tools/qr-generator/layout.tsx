import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QR Code Generator - Create QR Codes Free | ToolsMani",
  description:
    "Generate QR codes for URLs, text, Wi-Fi, and more. Free online QR code generator with customizable size and download options. No signup required.",
  alternates: {
    canonical: "/tools/qr-generator/",
    languages: {
      en: "/tools/qr-generator/",
      tr: "/tr/tools/qr-generator/",
      "x-default": "/tools/qr-generator/",
    },
  },
  openGraph: {
    title: "QR Code Generator - Create QR Codes Free | ToolsMani",
    description:
      "Generate free QR codes for URLs, text, Wi-Fi and more with customizable options.",
  },
};

export default function QrGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "QR Code Generator - Create QR Codes Free",
    url: "https://toolsmani.com/tools/qr-generator/",
    description:
      "Generate QR codes for URLs, text, Wi-Fi, and more. Free online QR code generator with customizable size and download options. No signup required.",
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

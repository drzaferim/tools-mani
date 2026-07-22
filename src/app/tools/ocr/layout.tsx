import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image to Text - Free OCR in Your Browser | ToolsMani",
  description:
    "Extract text from photos, screenshots and scans with OCR that runs entirely in your browser. Turkish and English support. Images are never uploaded.",
  alternates: {
    canonical: "/tools/ocr/",
    languages: {
      en: "/tools/ocr/",
      tr: "/tr/tools/ocr/",
      es: "/es/tools/ocr/",
      de: "/de/tools/ocr/",
      pt: "/pt/tools/ocr/",
      fr: "/fr/tools/ocr/",
      "x-default": "/tools/ocr/",
    },
  },
  openGraph: {
    title: "Image to Text - Free OCR in Your Browser | ToolsMani",
    description:
      "Extract text from photos, screenshots and scans with OCR that runs entirely in your browser. Turkish and English support. Images are never uploaded.",
    images: ["/og-image.png"],
  },
};

export default function OcrLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Image to Text - Free OCR in Your Browser | ToolsMani",
    url: "https://toolsmani.com/tools/ocr/",
    description:
      "Extract text from photos, screenshots and scans with OCR that runs entirely in your browser. Turkish and English support. Images are never uploaded.",
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

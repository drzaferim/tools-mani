import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF Compress - Reduce PDF File Size Online Free | ToolsMani",
  description:
    "Compress PDF files online for free. Reduce file size by stripping metadata and optimizing structure. No upload limits, 100% browser-based.",
  alternates: {
    canonical: "/tools/pdf-compress/",
    languages: {
      en: "/tools/pdf-compress/",
      tr: "/tr/tools/pdf-compress/",
      es: "/es/tools/pdf-compress/",
      de: "/de/tools/pdf-compress/",
      pt: "/pt/tools/pdf-compress/",
      fr: "/fr/tools/pdf-compress/",
      "x-default": "/tools/pdf-compress/",
    },
  },
  openGraph: {
    title: "PDF Compress - Reduce PDF File Size Free",
    description: "Compress PDFs instantly in your browser. No file size limits.",
    images: ["/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "PDF Compress - Reduce PDF File Size Online Free",
    url: "https://toolsmani.com/tools/pdf-compress/",
    description:
      "Compress PDF files online for free. Reduce file size by stripping metadata and optimizing structure. No upload limits, 100% browser-based.",
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

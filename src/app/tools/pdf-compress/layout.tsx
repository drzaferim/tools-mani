import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF Compress - Reduce PDF File Size Online Free | ToolsMani",
  description:
    "Compress PDF files online for free. Choose lossless optimization or stronger image compression. Private, 100% browser-based processing.",
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
    description: "Choose lossless, balanced or smallest-file PDF compression. Everything stays in your browser.",
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
      "Compress PDF files online for free with lossless, balanced and smallest-file modes. Processing stays entirely in your browser.",
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

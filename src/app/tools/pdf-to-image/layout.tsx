import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF to JPG/PNG - Convert PDF Pages to Images Online | ToolsMani",
  description:
    "Convert PDF pages to JPG or PNG images online for free. Extract every page as a high-quality image. No file size limit, processed entirely in your browser.",
  alternates: {
    canonical: "/tools/pdf-to-image/",
    languages: {
      en: "/tools/pdf-to-image/",
      tr: "/tr/tools/pdf-to-image/",
      es: "/es/tools/pdf-to-image/",
      de: "/de/tools/pdf-to-image/",
      pt: "/pt/tools/pdf-to-image/",
      fr: "/fr/tools/pdf-to-image/",
      "x-default": "/tools/pdf-to-image/",
    },
  },
  openGraph: {
    title: "PDF to JPG/PNG - Convert PDF Pages to Images Online | ToolsMani",
    description:
      "Convert PDF pages to high-quality JPG or PNG images. Free, fast, and 100% in your browser.",
    images: ["/og-image.png"],
  },
};

export default function PdfToImageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "PDF to JPG/PNG Converter",
    url: "https://toolsmani.com/tools/pdf-to-image/",
    description:
      "Convert PDF pages to JPG or PNG images online for free. No file size limit, processed entirely in your browser.",
    applicationCategory: "UtilityApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };


  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
          "@type": "Question",
          "name": "Is my PDF uploaded to a server when converting?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. The entire conversion happens locally in your browser using PDF.js. Your file never leaves your device."
          }
        },        {
          "@type": "Question",
          "name": "Should I choose JPG or PNG?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "JPG produces smaller files and is ideal for photos. PNG is lossless and better for text-heavy pages or when you need transparency."
          }
        },        {
          "@type": "Question",
          "name": "Can I convert multi-page PDFs?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Each page is converted to a separate image. Use the Download All as ZIP button to get all pages at once."
          }
        },        {
          "@type": "Question",
          "name": "What does the quality setting do?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Higher quality renders at 3x scale for sharper images but uses more memory and takes longer. Medium is recommended for most PDFs."
          }
        }
    ]
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}

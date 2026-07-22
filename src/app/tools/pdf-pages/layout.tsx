import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF Page Manager - Extract & Delete PDF Pages | ToolsMani",
  description:
    "Extract or delete specific pages from PDF files online for free. Select pages visually and download. Privacy-first — no data uploaded.",
  alternates: {
    canonical: "/tools/pdf-pages/",
    languages: {
      en: "/tools/pdf-pages/",
      tr: "/tr/tools/pdf-pages/",
      es: "/es/tools/pdf-pages/",
      de: "/de/tools/pdf-pages/",
      pt: "/pt/tools/pdf-pages/",
      fr: "/fr/tools/pdf-pages/",
      "x-default": "/tools/pdf-pages/",
    },
  },
  openGraph: {
    title: "PDF Page Manager - Extract & Delete PDF Pages | ToolsMani",
    description:
      "Extract or delete specific pages from PDF files online for free. Privacy-first — no data uploaded.",
    images: ["/og-image.png"],
  },
};

export default function PdfPagesLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "PDF Page Manager - Extract & Delete PDF Pages",
    url: "https://toolsmani.com/tools/pdf-pages/",
    description:
      "Extract or delete specific pages from PDF files online for free. Select pages visually and download. Privacy-first — no data uploaded.",
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
          "name": "Can I extract multiple non-consecutive pages?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Click on any combination of pages to select them, then click Extract. The resulting PDF will contain only the selected pages."
          }
        },        {
          "@type": "Question",
          "name": "What is the difference between Extract and Delete?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Extract creates a new PDF with only the selected pages. Delete creates a new PDF with the selected pages removed."
          }
        },        {
          "@type": "Question",
          "name": "Is there a limit on the number of pages I can extract?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. You can extract any number of pages from PDFs of any size. Everything runs in your browser."
          }
        },        {
          "@type": "Question",
          "name": "Does page extraction affect PDF quality?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Pages are copied with their original content intact including images, text, and formatting."
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

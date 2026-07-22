import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF Merger - Combine PDF Files Online | ToolsMani",
  description:
    "Merge multiple PDF files into one document online for free. Drag and drop PDFs to combine them in any order. No upload limits, processed in your browser.",
  alternates: {
    canonical: "/tools/pdf-merge/",
    languages: {
      en: "/tools/pdf-merge/",
      tr: "/tr/tools/pdf-merge/",
      es: "/es/tools/pdf-merge/",
      de: "/de/tools/pdf-merge/",
      pt: "/pt/tools/pdf-merge/",
      fr: "/fr/tools/pdf-merge/",
      "x-default": "/tools/pdf-merge/",
    },
  },
  openGraph: {
    title: "PDF Merger - Combine PDF Files Online | ToolsMani",
    description:
      "Combine multiple PDF files into one document online. Free, fast, and processed in your browser.",
    images: ["/og-image.png"],
  },
};

export default function PdfMergeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "PDF Merger - Combine PDF Files Online",
    url: "https://toolsmani.com/tools/pdf-merge/",
    description:
      "Merge multiple PDF files into one document online for free. Drag and drop PDFs to combine them in any order. No upload limits, processed in your browser.",
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
          "name": "Is there a file size limit for merging PDFs?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. ToolsMani processes everything in your browser with no server-side file size limit."
          }
        },        {
          "@type": "Question",
          "name": "Are my PDF files uploaded to a server?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Never. Your files stay 100% on your device. All merging happens locally in your browser."
          }
        },        {
          "@type": "Question",
          "name": "How many PDF files can I merge at once?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "There is no hard limit. You can add as many PDFs as you need."
          }
        },        {
          "@type": "Question",
          "name": "Can I reorder the PDF files before merging?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Use the arrow buttons next to each file to move it up or down in the list."
          }
        },        {
          "@type": "Question",
          "name": "Does PDF merging work on mobile?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. The tool works on any modern browser including mobile browsers on iOS and Android."
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

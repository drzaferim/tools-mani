import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF Splitter - Split PDF Files Online Free | ToolsMani",
  description:
    "Split PDF files into multiple documents online for free. Extract pages, split by range, or split every N pages. No upload needed — works in your browser.",
  alternates: {
    canonical: "/tools/pdf-split/",
    languages: {
      en: "/tools/pdf-split/",
      tr: "/tr/tools/pdf-split/",
      "x-default": "/tools/pdf-split/",
    },
  },
  openGraph: {
    title: "PDF Splitter - Split PDF Files Online Free | ToolsMani",
    description:
      "Split PDF files into multiple documents online for free. No upload needed — works in your browser.",
  },
};

export default function PdfSplitLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "PDF Splitter - Split PDF Files Online Free",
    url: "https://toolsmani.com/tools/pdf-split/",
    description:
      "Split PDF files into multiple documents online for free. Extract pages, split by range, or split every N pages. No upload needed — works in your browser.",
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
          "name": "Is there a limit on how many pages I can split?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. You can split PDFs with any number of pages. Processing happens entirely in your browser."
          }
        },        {
          "@type": "Question",
          "name": "How do I split a PDF into specific page ranges?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Select Custom ranges mode and type ranges like 1-3, 4-6, 8 separated by commas. Each range becomes a separate PDF file."
          }
        },        {
          "@type": "Question",
          "name": "Can I extract just one page from a PDF?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Use Extract all pages mode to get each page as its own file, or use Custom ranges and type a single page number."
          }
        },        {
          "@type": "Question",
          "name": "What does Split every N pages do?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "It divides the PDF into equal chunks. For example, splitting a 12-page PDF every 4 pages gives you three 4-page PDFs."
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

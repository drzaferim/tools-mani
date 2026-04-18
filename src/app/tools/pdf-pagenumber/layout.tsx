import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Page Numbers to PDF Online Free | ToolsMani",
  description:
    "Add page numbers to your PDF files online for free. Customize position, format, and starting number. No upload limits, 100% browser-based.",
  alternates: {
    canonical: "/tools/pdf-pagenumber/",
  },
  openGraph: {
    title: "Add Page Numbers to PDF Free",
    description: "Add page numbers to PDFs instantly in your browser. No file size limits.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Add Page Numbers to PDF Online Free",
    url: "https://toolsmani.com/tools/pdf-pagenumber/",
    description:
      "Add page numbers to your PDF files online for free. Customize position, format, and starting number. No upload limits, 100% browser-based.",
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
          "name": "Can I choose where the page numbers appear?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. You can place page numbers in six positions: top-left, top-center, top-right, bottom-left, bottom-center, or bottom-right."
          }
        },        {
          "@type": "Question",
          "name": "What page number formats are available?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Three formats are available: numeric (1, 2, 3), page-of-total (Page 1 of 10), and roman numerals (i, ii, iii)."
          }
        },        {
          "@type": "Question",
          "name": "Can I start numbering from a number other than 1?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Use the Starting number field to begin numbering from any number you choose."
          }
        },        {
          "@type": "Question",
          "name": "Is my PDF uploaded to a server?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Page numbering happens entirely in your browser using pdf-lib. Your file never leaves your device."
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

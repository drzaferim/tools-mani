import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF Watermark - Add Watermark to PDF Online Free | ToolsMani",
  description:
    "Add text watermarks to PDF files for free. Customize text, size, color, and opacity. No upload — 100% browser-based processing.",
  alternates: {
    canonical: "/tools/pdf-watermark/",
    languages: {
      en: "/tools/pdf-watermark/",
      tr: "/tr/tools/pdf-watermark/",
      "x-default": "/tools/pdf-watermark/",
    },
  },
  openGraph: {
    title: "PDF Watermark - Add Watermark to PDF Online Free | ToolsMani",
    description:
      "Add text watermarks to PDF files for free. No upload — 100% browser-based processing.",
  },
};

export default function PdfWatermarkLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "PDF Watermark - Add Watermark to PDF Online Free",
    url: "https://toolsmani.com/tools/pdf-watermark/",
    description:
      "Add text watermarks to PDF files for free. Customize text, size, color, and opacity. No upload — 100% browser-based processing.",
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
          "name": "Can I add a watermark to every page?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. The watermark is applied to all pages in the PDF automatically."
          }
        },        {
          "@type": "Question",
          "name": "Can I customize the watermark color and opacity?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. You can choose any color using the color picker and adjust transparency using the opacity slider."
          }
        },        {
          "@type": "Question",
          "name": "Is my PDF uploaded to a server when adding a watermark?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. All processing happens locally in your browser. Your file never leaves your device."
          }
        },        {
          "@type": "Question",
          "name": "Can I remove a watermark that was added with this tool?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Watermarks added by this tool are embedded as text on each page. Removing them requires a separate PDF editing tool."
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

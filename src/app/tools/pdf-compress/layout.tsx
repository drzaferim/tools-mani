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
      "x-default": "/tools/pdf-compress/",
    },
  },
  openGraph: {
    title: "PDF Compress - Reduce PDF File Size Free",
    description: "Compress PDFs instantly in your browser. No file size limits.",
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


  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
          "@type": "Question",
          "name": "How much can PDF Compress reduce my file size?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "It depends on the PDF content. Typical reduction is 10-40%. PDFs already optimized may see little reduction."
          }
        },        {
          "@type": "Question",
          "name": "Does compression reduce image quality?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our compression focuses on PDF structure optimization rather than image downsampling, so image quality is preserved."
          }
        },        {
          "@type": "Question",
          "name": "Is my PDF uploaded anywhere?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. The compression happens entirely in your browser. Your file never leaves your device."
          }
        },        {
          "@type": "Question",
          "name": "What if compression does not reduce the file size?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Some PDFs are already well-optimized. In that case, the tool will show 0% reduction and will not make the file larger."
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

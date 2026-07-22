import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF Rotate - Rotate PDF Pages Online Free | ToolsMani",
  description:
    "Rotate PDF pages individually or all at once for free. Fix scanned documents easily. No upload — all processing in your browser.",
  alternates: {
    canonical: "/tools/pdf-rotate/",
    languages: {
      en: "/tools/pdf-rotate/",
      tr: "/tr/tools/pdf-rotate/",
      "x-default": "/tools/pdf-rotate/",
    },
  },
  openGraph: {
    title: "PDF Rotate - Rotate PDF Pages Online Free | ToolsMani",
    description:
      "Rotate PDF pages individually or all at once for free. No upload — all processing in your browser.",
    images: ["/og-image.png"],
  },
};

export default function PdfRotateLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "PDF Rotate - Rotate PDF Pages Online Free",
    url: "https://toolsmani.com/tools/pdf-rotate/",
    description:
      "Rotate PDF pages individually or all at once for free. Fix scanned documents easily. No upload — all processing in your browser.",
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
          "name": "Can I rotate only specific pages?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Click the rotation arrows on individual page thumbnails to rotate them independently, or use bulk rotation buttons for all pages."
          }
        },        {
          "@type": "Question",
          "name": "Will rotating pages affect the PDF quality?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Rotation is a structural change to the PDF metadata and does not re-encode content, so quality is preserved."
          }
        },        {
          "@type": "Question",
          "name": "Are my files uploaded to a server?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. All rotation happens locally in your browser using pdf-lib. Your files never leave your device."
          }
        },        {
          "@type": "Question",
          "name": "Can I rotate a scanned PDF?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Scanned PDFs contain images, and rotation works on them exactly the same way as regular PDFs."
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

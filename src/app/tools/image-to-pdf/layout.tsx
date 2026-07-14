import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image to PDF - Convert JPG/PNG to PDF Online | ToolsMani",
  description:
    "Convert JPG, PNG, WebP, and BMP images to PDF online for free. Combine multiple images into one PDF document. No file size limit, processed in your browser.",
  alternates: {
    canonical: "/tools/image-to-pdf/",
    languages: {
      en: "/tools/image-to-pdf/",
      tr: "/tr/tools/image-to-pdf/",
      "x-default": "/tools/image-to-pdf/",
    },
  },
  openGraph: {
    title: "Image to PDF - Convert JPG/PNG to PDF Online | ToolsMani",
    description:
      "Convert images to PDF online. Combine multiple JPG/PNG files into a single PDF. Free, instant, and 100% in your browser.",
  },
};

export default function ImageToPdfLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Image to PDF Converter",
    url: "https://toolsmani.com/tools/image-to-pdf/",
    description:
      "Convert JPG, PNG, WebP, and BMP images to PDF online for free. No file size limit, processed entirely in your browser.",
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
          "name": "Which image formats are supported?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "JPG, PNG, WebP, and BMP formats are supported. Works in all modern browsers."
          }
        },        {
          "@type": "Question",
          "name": "Are my images uploaded to a server?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Everything happens locally in your browser. Your images never leave your device."
          }
        },        {
          "@type": "Question",
          "name": "Can I combine multiple images into one PDF?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Upload multiple images, reorder them with the arrows, and convert. Each image becomes a separate page."
          }
        },        {
          "@type": "Question",
          "name": "What page size options are available?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A4 (210x297mm), Letter (216x279mm), or Fit to image. For A4 and Letter you can choose portrait or landscape orientation."
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

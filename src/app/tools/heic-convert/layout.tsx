import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HEIC to JPG/PNG Converter - Convert iPhone Photos Online | ToolsMani",
  description:
    "Convert HEIC photos from iPhone to JPG, PNG or WebP online for free. Batch convert multiple HEIC files instantly. No upload, processed in your browser.",
  alternates: { canonical: "/tools/heic-convert/" },
  openGraph: {
    title: "HEIC to JPG/PNG Converter - Convert iPhone Photos Online | ToolsMani",
    description:
      "Convert HEIC photos from iPhone to JPG, PNG or WebP for free. Batch convert, no upload needed.",
  },
};

export default function HeicConvertLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "HEIC to JPG/PNG Converter",
    url: "https://toolsmani.com/tools/heic-convert/",
    description: "Convert HEIC photos from iPhone to JPG, PNG or WebP online for free. No upload needed.",
    applicationCategory: "UtilityApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a HEIC file?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "HEIC (High Efficiency Image Container) is the default photo format used by iPhones (iOS 11+) and some Android devices. It offers better compression than JPEG but is not widely supported on Windows or web platforms.",
        },
      },
      {
        "@type": "Question",
        name: "Are my HEIC photos uploaded to a server?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. All conversion happens locally in your browser. Your photos never leave your device.",
        },
      },
      {
        "@type": "Question",
        name: "Which output format should I choose?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "JPG is best for photos and sharing — smaller file size. PNG is lossless and best when you need transparency. WebP is modern and offers the best compression.",
        },
      },
      {
        "@type": "Question",
        name: "Can I convert multiple HEIC files at once?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Select multiple HEIC files at once and they will all be converted. You can download them individually or all at once as a ZIP.",
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      {children}
    </>
  );
}

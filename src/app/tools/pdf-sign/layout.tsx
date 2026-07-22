import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign PDF Online - Draw & Place Your Signature Free | ToolsMani",
  description:
    "Draw your signature and place it on any PDF page. 100% private — the document and your signature never leave your browser. Free, no sign-up.",
  alternates: {
    canonical: "/tools/pdf-sign/",
    languages: {
      en: "/tools/pdf-sign/",
      tr: "/tr/tools/pdf-sign/",
      "x-default": "/tools/pdf-sign/",
    },
  },
  openGraph: {
    title: "Sign PDF Online - Draw & Place Your Signature Free | ToolsMani",
    description:
      "Draw your signature and place it on any PDF page. 100% private — the document never leaves your browser.",
    images: ["/og-image.png"],
  },
};

export default function PdfSignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Sign PDF Online",
    url: "https://toolsmani.com/tools/pdf-sign/",
    description:
      "Draw your signature and place it on any PDF page. The document and signature are processed locally in the browser.",
    applicationCategory: "UtilityApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}

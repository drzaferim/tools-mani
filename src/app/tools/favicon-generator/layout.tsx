import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Favicon Generator - ICO & PNG From Any Image | ToolsMani",
  description:
    "Generate a complete favicon set from any image: favicon.ico, all PNG sizes and ready-to-paste HTML tags. Runs entirely in your browser.",
  alternates: {
    canonical: "/tools/favicon-generator/",
    languages: {
      en: "/tools/favicon-generator/",
      tr: "/tr/tools/favicon-generator/",
      "x-default": "/tools/favicon-generator/",
    },
  },
  openGraph: {
    title: "Favicon Generator - ICO & PNG From Any Image | ToolsMani",
    description:
      "Generate a complete favicon set from any image: favicon.ico, all PNG sizes and ready-to-paste HTML tags. Runs entirely in your browser.",
    images: ["/og-image.png"],
  },
};

export default function FaviconGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Favicon Generator - ICO & PNG From Any Image | ToolsMani",
    url: "https://toolsmani.com/tools/favicon-generator/",
    description:
      "Generate a complete favicon set from any image: favicon.ico, all PNG sizes and ready-to-paste HTML tags. Runs entirely in your browser.",
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

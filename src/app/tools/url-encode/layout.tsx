import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "URL Encoder / Decoder - Percent Encoding Online | ToolsMani",
  description:
    "Encode text for safe use in URLs or decode percent-encoded URLs back to readable text. Free, instant, fully client-side.",
  alternates: {
    canonical: "/tools/url-encode/",
    languages: {
      en: "/tools/url-encode/",
      tr: "/tr/tools/url-encode/",
      "x-default": "/tools/url-encode/",
    },
  },
  openGraph: {
    title: "URL Encoder / Decoder - Percent Encoding Online | ToolsMani",
    description:
      "Encode text for safe use in URLs or decode percent-encoded URLs back to readable text. Free, instant, fully client-side.",
    images: ["/og-image.png"],
  },
};

export default function UrlEncodeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "URL Encoder / Decoder - Percent Encoding Online | ToolsMani",
    url: "https://toolsmani.com/tools/url-encode/",
    description:
      "Encode text for safe use in URLs or decode percent-encoded URLs back to readable text. Free, instant, fully client-side.",
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

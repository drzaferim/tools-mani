import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "JWT Decoder - Inspect JSON Web Tokens Online | ToolsMani",
  description:
    "Decode JWT header and payload locally in your browser. Expiry check included; the token is never sent anywhere. Free developer tool.",
  alternates: {
    canonical: "/tools/jwt-decoder/",
    languages: {
      en: "/tools/jwt-decoder/",
      tr: "/tr/tools/jwt-decoder/",
      "x-default": "/tools/jwt-decoder/",
    },
  },
  openGraph: {
    title: "JWT Decoder - Inspect JSON Web Tokens Online | ToolsMani",
    description:
      "Decode JWT header and payload locally in your browser. Expiry check included; the token is never sent anywhere. Free developer tool.",
    images: ["/og-image.png"],
  },
};

export default function JwtDecoderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "JWT Decoder - Inspect JSON Web Tokens Online | ToolsMani",
    url: "https://toolsmani.com/tools/jwt-decoder/",
    description:
      "Decode JWT header and payload locally in your browser. Expiry check included; the token is never sent anywhere. Free developer tool.",
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

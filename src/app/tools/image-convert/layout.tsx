import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Converter - PNG to JPG, WebP, BMP Free Online | ToolsMani",
  description:
    "Convert images between PNG, JPG, WebP, and BMP formats online for free. Batch convert multiple files. No upload limits, 100% browser-based.",
  alternates: {
    canonical: "/tools/image-convert/",
  },
  openGraph: {
    title: "Free Image Converter - PNG JPG WebP BMP",
    description: "Convert images between formats instantly in your browser. No limits.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Image Converter - PNG to JPG, WebP, BMP Free Online",
    url: "https://toolsmani.com/tools/image-convert/",
    description:
      "Convert images between PNG, JPG, WebP, and BMP formats online for free. Batch convert multiple files. No upload limits, 100% browser-based.",
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

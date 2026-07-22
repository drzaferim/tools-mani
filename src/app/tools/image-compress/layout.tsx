import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Compressor - Compress JPEG, PNG & WebP | ToolsMani",
  description:
    "Compress JPEG, PNG, and WebP images online without losing quality. Reduce file size up to 80% for faster websites. Free browser-based image compression tool.",
  alternates: {
    canonical: "/tools/image-compress/",
    languages: {
      en: "/tools/image-compress/",
      tr: "/tr/tools/image-compress/",
      "x-default": "/tools/image-compress/",
    },
  },
  openGraph: {
    title: "Image Compressor - Compress JPEG, PNG & WebP | ToolsMani",
    description:
      "Compress JPEG, PNG and WebP images online without losing quality. Reduce file size up to 80%.",
    images: ["/og-image.png"],
  },
};

export default function ImageCompressLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Image Compressor - Compress JPEG, PNG & WebP",
    url: "https://toolsmani.com/tools/image-compress/",
    description:
      "Compress JPEG, PNG, and WebP images online without losing quality. Reduce file size up to 80% for faster websites. Free browser-based image compression tool.",
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

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Resizer - Resize Photos Online Free | ToolsMani",
  description:
    "Resize JPG, PNG and WebP images by pixel width or percentage. Batch support, aspect ratio preserved. Free and private — images never leave your browser.",
  alternates: {
    canonical: "/tools/image-resize/",
    languages: {
      en: "/tools/image-resize/",
      tr: "/tr/tools/image-resize/",
      es: "/es/tools/image-resize/",
      de: "/de/tools/image-resize/",
      pt: "/pt/tools/image-resize/",
      fr: "/fr/tools/image-resize/",
      "x-default": "/tools/image-resize/",
    },
  },
  openGraph: {
    title: "Image Resizer - Resize Photos Online Free | ToolsMani",
    description:
      "Resize JPG, PNG and WebP images by pixel width or percentage. Free and private — images never leave your browser.",
    images: ["/og-image.png"],
  },
};

export default function ImageResizeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Image Resizer",
    url: "https://toolsmani.com/tools/image-resize/",
    description:
      "Resize JPG, PNG and WebP images by pixel width or percentage. Batch support, aspect ratio preserved.",
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

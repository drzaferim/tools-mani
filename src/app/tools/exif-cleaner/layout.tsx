import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EXIF Remover - Delete Photo Metadata (GPS, Camera) | ToolsMani",
  description:
    "Remove EXIF metadata from photos: GPS location, camera model, date and serial numbers. Free and private — images are cleaned in your browser, never uploaded.",
  alternates: {
    canonical: "/tools/exif-cleaner/",
    languages: {
      en: "/tools/exif-cleaner/",
      tr: "/tr/tools/exif-cleaner/",
      es: "/es/tools/exif-cleaner/",
      de: "/de/tools/exif-cleaner/",
      pt: "/pt/tools/exif-cleaner/",
      fr: "/fr/tools/exif-cleaner/",
      "x-default": "/tools/exif-cleaner/",
    },
  },
  openGraph: {
    title: "EXIF Remover - Delete Photo Metadata (GPS, Camera) | ToolsMani",
    description:
      "Remove EXIF metadata from photos: GPS location, camera model, date and serial numbers. Cleaned in your browser, never uploaded.",
    images: ["/og-image.png"],
  },
};

export default function ExifCleanerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "EXIF Remover - Photo Metadata Cleaner",
    url: "https://toolsmani.com/tools/exif-cleaner/",
    description:
      "Remove EXIF metadata from photos: GPS location, camera model, date and serial numbers. Cleaned locally in the browser.",
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

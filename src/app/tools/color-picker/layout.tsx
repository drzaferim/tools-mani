import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Picker & Converter - HEX RGB HSL | ToolsMani",
  description:
    "Pick colors and convert between HEX, RGB, and HSL formats instantly. Free online color picker with palette generator and color code converter for designers.",
  alternates: {
    canonical: "/tools/color-picker/",
    languages: {
      en: "/tools/color-picker/",
      tr: "/tr/tools/color-picker/",
      es: "/es/tools/color-picker/",
      de: "/de/tools/color-picker/",
      pt: "/pt/tools/color-picker/",
      fr: "/fr/tools/color-picker/",
      "x-default": "/tools/color-picker/",
    },
  },
  openGraph: {
    title: "Color Picker & Converter - HEX RGB HSL | ToolsMani",
    description:
      "Pick colors and convert between HEX, RGB and HSL formats. Free color picker for designers.",
    images: ["/og-image.png"],
  },
};

export default function ColorPickerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Color Picker & Converter - HEX RGB HSL",
    url: "https://toolsmani.com/tools/color-picker/",
    description:
      "Pick colors and convert between HEX, RGB, and HSL formats instantly. Free online color picker with palette generator and color code converter for designers.",
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

import type { Metadata } from "next";

export { default } from "@/app/tools/image-to-pdf/page";

export const metadata: Metadata = {
  title: "Bild in PDF - Kostenlos Online | ToolsMani",
  description:
    "JPG-, PNG- oder WebP-Bilder in ein PDF umwandeln. Mehrere Bilder in einem Dokument.",
  alternates: {
    canonical: "/de/tools/image-to-pdf/",
    languages: {
      en: "/tools/image-to-pdf/",
      tr: "/tr/tools/image-to-pdf/",
      es: "/es/tools/image-to-pdf/",
      de: "/de/tools/image-to-pdf/",
      pt: "/pt/tools/image-to-pdf/",
      fr: "/fr/tools/image-to-pdf/",
      "x-default": "/tools/image-to-pdf/",
    },
  },
};

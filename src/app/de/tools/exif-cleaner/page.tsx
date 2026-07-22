import type { Metadata } from "next";

export { default } from "@/app/tools/exif-cleaner/page";

export const metadata: Metadata = {
  title: "EXIF entfernen - Kostenlos Online | ToolsMani",
  description:
    "Versteckte Metadaten aus Fotos löschen: GPS-Standort, Kamera, Datum und mehr.",
  alternates: {
    canonical: "/de/tools/exif-cleaner/",
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
};

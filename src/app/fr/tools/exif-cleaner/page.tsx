import type { Metadata } from "next";

export { default } from "@/app/tools/exif-cleaner/page";

export const metadata: Metadata = {
  title: "Supprimer les EXIF - Gratuit en Ligne | ToolsMani",
  description:
    "Effacez les métadonnées cachées des photos : position GPS, appareil, date et plus.",
  alternates: {
    canonical: "/fr/tools/exif-cleaner/",
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

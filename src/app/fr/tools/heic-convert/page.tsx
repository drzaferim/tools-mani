import type { Metadata } from "next";

export { default } from "@/app/tools/heic-convert/page";

export const metadata: Metadata = {
  title: "HEIC en JPG / PNG - Gratuit en Ligne | ToolsMani",
  description:
    "Convertissez les photos HEIC d'iPhone en JPG, PNG ou WebP. Par lots, sans envoi.",
  alternates: {
    canonical: "/fr/tools/heic-convert/",
    languages: {
      en: "/tools/heic-convert/",
      tr: "/tr/tools/heic-convert/",
      es: "/es/tools/heic-convert/",
      de: "/de/tools/heic-convert/",
      pt: "/pt/tools/heic-convert/",
      fr: "/fr/tools/heic-convert/",
      "x-default": "/tools/heic-convert/",
    },
  },
};

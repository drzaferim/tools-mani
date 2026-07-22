import type { Metadata } from "next";

export { default } from "@/app/tools/timestamp-converter/page";

export const metadata: Metadata = {
  title: "Convertisseur timestamp Unix - Gratuit en Ligne | ToolsMani",
  description:
    "Convertissez les timestamps Unix en dates lisibles et inversement, en heure locale et UTC.",
  alternates: {
    canonical: "/fr/tools/timestamp-converter/",
    languages: {
      en: "/tools/timestamp-converter/",
      tr: "/tr/tools/timestamp-converter/",
      es: "/es/tools/timestamp-converter/",
      de: "/de/tools/timestamp-converter/",
      pt: "/pt/tools/timestamp-converter/",
      fr: "/fr/tools/timestamp-converter/",
      "x-default": "/tools/timestamp-converter/",
    },
  },
};

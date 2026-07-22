import type { Metadata } from "next";

export { default } from "@/app/tools/csv-json/page";

export const metadata: Metadata = {
  title: "Convertisseur CSV ↔ JSON - Gratuit en Ligne | ToolsMani",
  description:
    "Convertissez CSV en JSON et tableaux JSON en CSV. Champs entre guillemets et délimiteurs.",
  alternates: {
    canonical: "/fr/tools/csv-json/",
    languages: {
      en: "/tools/csv-json/",
      tr: "/tr/tools/csv-json/",
      es: "/es/tools/csv-json/",
      de: "/de/tools/csv-json/",
      pt: "/pt/tools/csv-json/",
      fr: "/fr/tools/csv-json/",
      "x-default": "/tools/csv-json/",
    },
  },
};

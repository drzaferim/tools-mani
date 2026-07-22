import type { Metadata } from "next";

export { default } from "@/app/tools/csv-json/page";

export const metadata: Metadata = {
  title: "CSV ↔ JSON Konverter - Kostenlos Online | ToolsMani",
  description:
    "CSV in JSON und JSON-Arrays zurück in CSV umwandeln. Anführungszeichen und Trennzeichen.",
  alternates: {
    canonical: "/de/tools/csv-json/",
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

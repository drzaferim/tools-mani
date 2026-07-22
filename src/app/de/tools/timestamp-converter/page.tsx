import type { Metadata } from "next";

export { default } from "@/app/tools/timestamp-converter/page";

export const metadata: Metadata = {
  title: "Unix-Timestamp-Konverter - Kostenlos Online | ToolsMani",
  description:
    "Unix-Timestamps in lesbare Daten umwandeln und zurück, in Ortszeit und UTC.",
  alternates: {
    canonical: "/de/tools/timestamp-converter/",
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

import type { Metadata } from "next";

export { default } from "@/app/tools/timestamp-converter/page";

export const metadata: Metadata = {
  title: "Conversor Timestamp Unix - Gratis Online | ToolsMani",
  description:
    "Convierte timestamps Unix a fechas legibles y viceversa, en hora local y UTC.",
  alternates: {
    canonical: "/es/tools/timestamp-converter/",
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

import type { Metadata } from "next";

export { default } from "@/app/about/page";

export const metadata: Metadata = {
  title: "Über uns | ToolsMani",
  description:
    "Die Geschichte von ToolsMani: kostenlose Online-Tools mit Datenschutz an erster Stelle. Ihre Dateien verlassen Ihren Browser nie.",
  alternates: {
    canonical: "/de/about/",
    languages: {
      en: "/about/",
      tr: "/tr/about/",
      es: "/es/about/",
      de: "/de/about/",
      pt: "/pt/about/",
      fr: "/fr/about/",
      "x-default": "/about/",
    },
  },
};

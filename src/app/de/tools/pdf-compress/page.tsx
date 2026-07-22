import type { Metadata } from "next";

export { default } from "@/app/tools/pdf-compress/page";

export const metadata: Metadata = {
  title: "PDF komprimieren - Kostenlos Online | ToolsMani",
  description:
    "Dateigröße durch Strukturoptimierung und Entfernen ungenutzter Daten reduzieren.",
  alternates: {
    canonical: "/de/tools/pdf-compress/",
    languages: {
      en: "/tools/pdf-compress/",
      tr: "/tr/tools/pdf-compress/",
      es: "/es/tools/pdf-compress/",
      de: "/de/tools/pdf-compress/",
      pt: "/pt/tools/pdf-compress/",
      fr: "/fr/tools/pdf-compress/",
      "x-default": "/tools/pdf-compress/",
    },
  },
};

import type { Metadata } from "next";

export { default } from "@/app/tools/pdf-pagenumber/page";

export const metadata: Metadata = {
  title: "PDF-Seitenzahlen - Kostenlos Online | ToolsMani",
  description:
    "Seitenzahlen mit eigener Position, Format und Startnummer hinzufügen.",
  alternates: {
    canonical: "/de/tools/pdf-pagenumber/",
    languages: {
      en: "/tools/pdf-pagenumber/",
      tr: "/tr/tools/pdf-pagenumber/",
      es: "/es/tools/pdf-pagenumber/",
      de: "/de/tools/pdf-pagenumber/",
      pt: "/pt/tools/pdf-pagenumber/",
      fr: "/fr/tools/pdf-pagenumber/",
      "x-default": "/tools/pdf-pagenumber/",
    },
  },
};

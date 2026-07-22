import type { Metadata } from "next";

export { default } from "@/app/tools/favicon-generator/page";

export const metadata: Metadata = {
  title: "Favicon-Generator - Kostenlos Online | ToolsMani",
  description:
    "Beliebiges Bild in ein komplettes Favicon-Set umwandeln: ICO, PNG-Größen und HTML-Tags.",
  alternates: {
    canonical: "/de/tools/favicon-generator/",
    languages: {
      en: "/tools/favicon-generator/",
      tr: "/tr/tools/favicon-generator/",
      es: "/es/tools/favicon-generator/",
      de: "/de/tools/favicon-generator/",
      pt: "/pt/tools/favicon-generator/",
      fr: "/fr/tools/favicon-generator/",
      "x-default": "/tools/favicon-generator/",
    },
  },
};

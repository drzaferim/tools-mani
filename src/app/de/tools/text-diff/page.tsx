import type { Metadata } from "next";

export { default } from "@/app/tools/text-diff/page";

export const metadata: Metadata = {
  title: "Textvergleich (Diff) - Kostenlos Online | ToolsMani",
  description:
    "Zwei Texte vergleichen und Unterschiede Zeile für Zeile sehen. Nichts wird hochgeladen.",
  alternates: {
    canonical: "/de/tools/text-diff/",
    languages: {
      en: "/tools/text-diff/",
      tr: "/tr/tools/text-diff/",
      es: "/es/tools/text-diff/",
      de: "/de/tools/text-diff/",
      pt: "/pt/tools/text-diff/",
      fr: "/fr/tools/text-diff/",
      "x-default": "/tools/text-diff/",
    },
  },
};

import type { Metadata } from "next";

export { default } from "@/app/tools/number-to-words/page";

export const metadata: Metadata = {
  title: "Zahl in Worten - Kostenlos Online | ToolsMani",
  description:
    "Beliebige Zahlen ausschreiben – für Rechnungen, Schecks und amtliche Formulare.",
  alternates: {
    canonical: "/de/tools/number-to-words/",
    languages: {
      en: "/tools/number-to-words/",
      tr: "/tr/tools/number-to-words/",
      es: "/es/tools/number-to-words/",
      de: "/de/tools/number-to-words/",
      pt: "/pt/tools/number-to-words/",
      fr: "/fr/tools/number-to-words/",
      "x-default": "/tools/number-to-words/",
    },
  },
};

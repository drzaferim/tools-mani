import type { Metadata } from "next";

export { default } from "@/app/tools/text-counter/page";

export const metadata: Metadata = {
  title: "Wortzähler - Kostenlos Online | ToolsMani",
  description:
    "Wörter, Zeichen, Sätze und Absätze sofort zählen. Ideal für Aufsätze und Social Media.",
  alternates: {
    canonical: "/de/tools/text-counter/",
    languages: {
      en: "/tools/text-counter/",
      tr: "/tr/tools/text-counter/",
      es: "/es/tools/text-counter/",
      de: "/de/tools/text-counter/",
      pt: "/pt/tools/text-counter/",
      fr: "/fr/tools/text-counter/",
      "x-default": "/tools/text-counter/",
    },
  },
};

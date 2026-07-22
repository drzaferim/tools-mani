import type { Metadata } from "next";

export { default } from "@/app/tools/case-converter/page";

export const metadata: Metadata = {
  title: "Groß-/Kleinschreibung - Kostenlos Online | ToolsMani",
  description:
    "Text zwischen GROSSBUCHSTABEN, kleinbuchstaben, camelCase, snake_case u. a. umwandeln.",
  alternates: {
    canonical: "/de/tools/case-converter/",
    languages: {
      en: "/tools/case-converter/",
      tr: "/tr/tools/case-converter/",
      es: "/es/tools/case-converter/",
      de: "/de/tools/case-converter/",
      pt: "/pt/tools/case-converter/",
      fr: "/fr/tools/case-converter/",
      "x-default": "/tools/case-converter/",
    },
  },
};

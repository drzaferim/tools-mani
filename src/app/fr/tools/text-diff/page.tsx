import type { Metadata } from "next";

export { default } from "@/app/tools/text-diff/page";

export const metadata: Metadata = {
  title: "Comparateur de textes (Diff) - Gratuit en Ligne | ToolsMani",
  description:
    "Comparez deux textes et voyez les différences ligne par ligne. Rien n'est envoyé.",
  alternates: {
    canonical: "/fr/tools/text-diff/",
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

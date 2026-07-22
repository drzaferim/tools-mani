import type { Metadata } from "next";

export { default } from "@/app/tools/number-to-words/page";

export const metadata: Metadata = {
  title: "Nombre en lettres - Gratuit en Ligne | ToolsMani",
  description:
    "Écrivez tout nombre en toutes lettres — pour factures, chèques et formulaires officiels.",
  alternates: {
    canonical: "/fr/tools/number-to-words/",
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

import type { Metadata } from "next";

export { default } from "@/app/tools/case-converter/page";

export const metadata: Metadata = {
  title: "Convertisseur de casse - Gratuit en Ligne | ToolsMani",
  description:
    "Convertissez le texte en MAJUSCULES, minuscules, camelCase, snake_case et plus.",
  alternates: {
    canonical: "/fr/tools/case-converter/",
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

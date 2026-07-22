import type { Metadata } from "next";

export { default } from "@/app/tools/pdf-pagenumber/page";

export const metadata: Metadata = {
  title: "Numéros de page PDF - Gratuit en Ligne | ToolsMani",
  description:
    "Ajoutez des numéros de page avec position, format et numéro de départ personnalisés.",
  alternates: {
    canonical: "/fr/tools/pdf-pagenumber/",
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

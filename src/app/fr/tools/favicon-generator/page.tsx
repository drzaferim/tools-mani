import type { Metadata } from "next";

export { default } from "@/app/tools/favicon-generator/page";

export const metadata: Metadata = {
  title: "Générateur de favicon - Gratuit en Ligne | ToolsMani",
  description:
    "Transformez toute image en un jeu complet de favicons : ICO, tailles PNG et balises HTML.",
  alternates: {
    canonical: "/fr/tools/favicon-generator/",
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

import type { Metadata } from "next";

export { default } from "@/app/tools/pdf/page";

export const metadata: Metadata = {
  title: "Outils PDF en Ligne Gratuits - Fusionner, Diviser | ToolsMani",
  description:
    "Plus de 10 outils PDF gratuits : fusionner, diviser, compresser, pivoter, signer, filigrane et plus. Sans limite de taille, sans envoi.",
  alternates: {
    canonical: "/fr/tools/pdf/",
    languages: {
      en: "/tools/pdf/",
      tr: "/tr/tools/pdf/",
      es: "/es/tools/pdf/",
      de: "/de/tools/pdf/",
      pt: "/pt/tools/pdf/",
      fr: "/fr/tools/pdf/",
      "x-default": "/tools/pdf/",
    },
  },
};

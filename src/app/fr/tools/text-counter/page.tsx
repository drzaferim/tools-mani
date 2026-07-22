import type { Metadata } from "next";

export { default } from "@/app/tools/text-counter/page";

export const metadata: Metadata = {
  title: "Compteur de mots - Gratuit en Ligne | ToolsMani",
  description:
    "Comptez mots, caractères, phrases et paragraphes instantanément. Idéal pour rédactions et réseaux sociaux.",
  alternates: {
    canonical: "/fr/tools/text-counter/",
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

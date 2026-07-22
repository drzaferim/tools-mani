import type { Metadata } from "next";

export { default } from "@/app/tools/lorem-ipsum/page";

export const metadata: Metadata = {
  title: "Générateur Lorem Ipsum - Gratuit en Ligne | ToolsMani",
  description:
    "Générez du texte de remplissage en paragraphes, phrases ou mots. Parfait pour les maquettes.",
  alternates: {
    canonical: "/fr/tools/lorem-ipsum/",
    languages: {
      en: "/tools/lorem-ipsum/",
      tr: "/tr/tools/lorem-ipsum/",
      es: "/es/tools/lorem-ipsum/",
      de: "/de/tools/lorem-ipsum/",
      pt: "/pt/tools/lorem-ipsum/",
      fr: "/fr/tools/lorem-ipsum/",
      "x-default": "/tools/lorem-ipsum/",
    },
  },
};

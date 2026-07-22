import type { Metadata } from "next";

export { default } from "@/app/tools/unit-converter/page";

export const metadata: Metadata = {
  title: "Convertisseur d'unités - Gratuit en Ligne | ToolsMani",
  description:
    "Convertissez longueur, poids, température, volume et plus. Rapide et précis.",
  alternates: {
    canonical: "/fr/tools/unit-converter/",
    languages: {
      en: "/tools/unit-converter/",
      tr: "/tr/tools/unit-converter/",
      es: "/es/tools/unit-converter/",
      de: "/de/tools/unit-converter/",
      pt: "/pt/tools/unit-converter/",
      fr: "/fr/tools/unit-converter/",
      "x-default": "/tools/unit-converter/",
    },
  },
};

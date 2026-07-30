import type { Metadata } from "next";

export { default } from "@/app/terms/page";

export const metadata: Metadata = {
  title: "Conditions d'utilisation | ToolsMani",
  description:
    "Conditions d'utilisation de ToolsMani : usage des outils, étendue de la garantie et limites de responsabilité.",
  alternates: {
    canonical: "/fr/terms/",
    languages: {
      en: "/terms/",
      tr: "/tr/terms/",
      es: "/es/terms/",
      de: "/de/terms/",
      pt: "/pt/terms/",
      fr: "/fr/terms/",
      "x-default": "/terms/",
    },
  },
};

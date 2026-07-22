import type { Metadata } from "next";

export { default } from "@/app/tools/percentage-calculator/page";

export const metadata: Metadata = {
  title: "Calculateur de pourcentage - Gratuit en Ligne | ToolsMani",
  description:
    "Combien font X % de Y, quel pourcentage X est de Y et variation en pourcentage — instantanément.",
  alternates: {
    canonical: "/fr/tools/percentage-calculator/",
    languages: {
      en: "/tools/percentage-calculator/",
      tr: "/tr/tools/percentage-calculator/",
      es: "/es/tools/percentage-calculator/",
      de: "/de/tools/percentage-calculator/",
      pt: "/pt/tools/percentage-calculator/",
      fr: "/fr/tools/percentage-calculator/",
      "x-default": "/tools/percentage-calculator/",
    },
  },
};

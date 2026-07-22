import type { Metadata } from "next";

export { default } from "@/app/tools/age-calculator/page";

export const metadata: Metadata = {
  title: "Calculateur d'âge - Gratuit en Ligne | ToolsMani",
  description:
    "Calculez votre âge exact en années, mois et jours, plus le total de jours vécus.",
  alternates: {
    canonical: "/fr/tools/age-calculator/",
    languages: {
      en: "/tools/age-calculator/",
      tr: "/tr/tools/age-calculator/",
      es: "/es/tools/age-calculator/",
      de: "/de/tools/age-calculator/",
      pt: "/pt/tools/age-calculator/",
      fr: "/fr/tools/age-calculator/",
      "x-default": "/tools/age-calculator/",
    },
  },
};

import type { Metadata } from "next";

export { default } from "@/app/tools/age-calculator/page";

export const metadata: Metadata = {
  title: "Calculadora de Edad - Gratis Online | ToolsMani",
  description:
    "Calcula tu edad exacta en años, meses y días, más el total de días vividos.",
  alternates: {
    canonical: "/es/tools/age-calculator/",
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

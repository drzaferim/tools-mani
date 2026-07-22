import type { Metadata } from "next";

export { default } from "@/app/tools/percentage-calculator/page";

export const metadata: Metadata = {
  title: "Calculadora de Porcentajes - Gratis Online | ToolsMani",
  description:
    "Cuánto es el X% de Y, qué porcentaje es X de Y y cambio porcentual, al instante.",
  alternates: {
    canonical: "/es/tools/percentage-calculator/",
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

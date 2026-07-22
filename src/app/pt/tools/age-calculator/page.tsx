import type { Metadata } from "next";

export { default } from "@/app/tools/age-calculator/page";

export const metadata: Metadata = {
  title: "Calculadora de Idade - Grátis Online | ToolsMani",
  description:
    "Calcule sua idade exata em anos, meses e dias, mais o total de dias vividos.",
  alternates: {
    canonical: "/pt/tools/age-calculator/",
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

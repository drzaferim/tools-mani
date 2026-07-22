import type { Metadata } from "next";

export { default } from "@/app/tools/percentage-calculator/page";

export const metadata: Metadata = {
  title: "Calculadora de Porcentagem - Grátis Online | ToolsMani",
  description:
    "Quanto é X% de Y, que porcentagem X é de Y e variação percentual, na hora.",
  alternates: {
    canonical: "/pt/tools/percentage-calculator/",
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

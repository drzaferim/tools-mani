import type { Metadata } from "next";

export { default } from "@/app/tools/vat-calculator/page";

export const metadata: Metadata = {
  title: "Calculadora de IVA - Grátis Online | ToolsMani",
  description:
    "Adicione IVA a preços líquidos ou extraia de preços com IVA. Taxas predefinidas e personalizadas.",
  alternates: {
    canonical: "/pt/tools/vat-calculator/",
    languages: {
      en: "/tools/vat-calculator/",
      tr: "/tr/tools/vat-calculator/",
      es: "/es/tools/vat-calculator/",
      de: "/de/tools/vat-calculator/",
      pt: "/pt/tools/vat-calculator/",
      fr: "/fr/tools/vat-calculator/",
      "x-default": "/tools/vat-calculator/",
    },
  },
};

import type { Metadata } from "next";

export { default } from "@/app/tools/vat-calculator/page";

export const metadata: Metadata = {
  title: "Calculadora de IVA - Gratis Online | ToolsMani",
  description:
    "Añade IVA a precios netos o extráelo de precios con IVA. Tasas predefinidas y personalizadas.",
  alternates: {
    canonical: "/es/tools/vat-calculator/",
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

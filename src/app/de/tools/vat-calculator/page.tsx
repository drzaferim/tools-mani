import type { Metadata } from "next";

export { default } from "@/app/tools/vat-calculator/page";

export const metadata: Metadata = {
  title: "Mehrwertsteuer-Rechner - Kostenlos Online | ToolsMani",
  description:
    "MwSt. zu Nettopreisen addieren oder aus Bruttopreisen herausrechnen. Voreingestellte und eigene Sätze.",
  alternates: {
    canonical: "/de/tools/vat-calculator/",
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

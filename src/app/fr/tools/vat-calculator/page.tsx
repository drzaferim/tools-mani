import type { Metadata } from "next";

export { default } from "@/app/tools/vat-calculator/page";

export const metadata: Metadata = {
  title: "Calculateur de TVA - Gratuit en Ligne | ToolsMani",
  description:
    "Ajoutez la TVA aux prix HT ou extrayez-la des prix TTC. Taux prédéfinis et personnalisés.",
  alternates: {
    canonical: "/fr/tools/vat-calculator/",
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

import type { Metadata } from "next";

export { default } from "@/app/tools/age-calculator/page";

export const metadata: Metadata = {
  title: "Altersrechner - Kostenlos Online | ToolsMani",
  description:
    "Exaktes Alter in Jahren, Monaten und Tagen berechnen, plus gelebte Tage insgesamt.",
  alternates: {
    canonical: "/de/tools/age-calculator/",
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

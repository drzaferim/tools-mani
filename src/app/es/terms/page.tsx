import type { Metadata } from "next";

export { default } from "@/app/terms/page";

export const metadata: Metadata = {
  title: "Términos de uso | ToolsMani",
  description:
    "Términos de uso de ToolsMani: cómo usar las herramientas, alcance de la garantía y límites de responsabilidad.",
  alternates: {
    canonical: "/es/terms/",
    languages: {
      en: "/terms/",
      tr: "/tr/terms/",
      es: "/es/terms/",
      de: "/de/terms/",
      pt: "/pt/terms/",
      fr: "/fr/terms/",
      "x-default": "/terms/",
    },
  },
};

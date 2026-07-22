import type { Metadata } from "next";

export { default } from "@/app/tools/unit-converter/page";

export const metadata: Metadata = {
  title: "Conversor de Unidades - Grátis Online | ToolsMani",
  description:
    "Converta comprimento, peso, temperatura, volume e mais. Rápido e preciso.",
  alternates: {
    canonical: "/pt/tools/unit-converter/",
    languages: {
      en: "/tools/unit-converter/",
      tr: "/tr/tools/unit-converter/",
      es: "/es/tools/unit-converter/",
      de: "/de/tools/unit-converter/",
      pt: "/pt/tools/unit-converter/",
      fr: "/fr/tools/unit-converter/",
      "x-default": "/tools/unit-converter/",
    },
  },
};

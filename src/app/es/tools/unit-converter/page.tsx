import type { Metadata } from "next";

export { default } from "@/app/tools/unit-converter/page";

export const metadata: Metadata = {
  title: "Conversor de Unidades - Gratis Online | ToolsMani",
  description:
    "Convierte longitud, peso, temperatura, volumen y más. Rápido y preciso.",
  alternates: {
    canonical: "/es/tools/unit-converter/",
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

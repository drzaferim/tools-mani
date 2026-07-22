import type { Metadata } from "next";

export { default } from "@/app/tools/unit-converter/page";

export const metadata: Metadata = {
  title: "Einheitenumrechner - Kostenlos Online | ToolsMani",
  description:
    "Länge, Gewicht, Temperatur, Volumen und mehr umrechnen. Schnell und genau.",
  alternates: {
    canonical: "/de/tools/unit-converter/",
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

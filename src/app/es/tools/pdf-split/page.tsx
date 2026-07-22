import type { Metadata } from "next";

export { default } from "@/app/tools/pdf-split/page";

export const metadata: Metadata = {
  title: "Dividir PDF - Gratis Online | ToolsMani",
  description:
    "Divide un PDF en varios archivos por rangos de páginas o extrae todas las páginas.",
  alternates: {
    canonical: "/es/tools/pdf-split/",
    languages: {
      en: "/tools/pdf-split/",
      tr: "/tr/tools/pdf-split/",
      es: "/es/tools/pdf-split/",
      de: "/de/tools/pdf-split/",
      pt: "/pt/tools/pdf-split/",
      fr: "/fr/tools/pdf-split/",
      "x-default": "/tools/pdf-split/",
    },
  },
};

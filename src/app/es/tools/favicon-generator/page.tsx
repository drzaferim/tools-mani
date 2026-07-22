import type { Metadata } from "next";

export { default } from "@/app/tools/favicon-generator/page";

export const metadata: Metadata = {
  title: "Generador de Favicon - Gratis Online | ToolsMani",
  description:
    "Convierte cualquier imagen en un set completo de favicons: ICO, PNG y etiquetas HTML.",
  alternates: {
    canonical: "/es/tools/favicon-generator/",
    languages: {
      en: "/tools/favicon-generator/",
      tr: "/tr/tools/favicon-generator/",
      es: "/es/tools/favicon-generator/",
      de: "/de/tools/favicon-generator/",
      pt: "/pt/tools/favicon-generator/",
      fr: "/fr/tools/favicon-generator/",
      "x-default": "/tools/favicon-generator/",
    },
  },
};

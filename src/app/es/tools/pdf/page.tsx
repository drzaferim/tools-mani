import type { Metadata } from "next";

export { default } from "@/app/tools/pdf/page";

export const metadata: Metadata = {
  title: "Herramientas PDF Online Gratis - Unir, Dividir, Comprimir | ToolsMani",
  description:
    "Más de 10 herramientas PDF gratis: unir, dividir, comprimir, rotar, firmar, marca de agua y más. Sin límite de tamaño, sin subir archivos.",
  alternates: {
    canonical: "/es/tools/pdf/",
    languages: {
      en: "/tools/pdf/",
      tr: "/tr/tools/pdf/",
      es: "/es/tools/pdf/",
      de: "/de/tools/pdf/",
      pt: "/pt/tools/pdf/",
      fr: "/fr/tools/pdf/",
      "x-default": "/tools/pdf/",
    },
  },
};

import type { Metadata } from "next";

export { default } from "@/app/tools/pdf-pages/page";

export const metadata: Metadata = {
  title: "Gestor de Páginas PDF - Gratis Online | ToolsMani",
  description:
    "Extrae o elimina páginas concretas. Selecciona impares, pares o personalizadas.",
  alternates: {
    canonical: "/es/tools/pdf-pages/",
    languages: {
      en: "/tools/pdf-pages/",
      tr: "/tr/tools/pdf-pages/",
      es: "/es/tools/pdf-pages/",
      de: "/de/tools/pdf-pages/",
      pt: "/pt/tools/pdf-pages/",
      fr: "/fr/tools/pdf-pages/",
      "x-default": "/tools/pdf-pages/",
    },
  },
};

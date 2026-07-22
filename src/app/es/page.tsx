import type { Metadata } from "next";

export { default } from "@/app/page";

export const metadata: Metadata = {
  title: "ToolsMani - Herramientas Online Gratuitas y Privadas",
  description:
    "Herramientas online gratis: unir, dividir y comprimir PDF, comprimir imágenes, generar QR y más. Todo en tu navegador, sin subir archivos.",
  alternates: {
    canonical: "/es/",
    languages: {
      en: "/",
      tr: "/tr/",
      es: "/es/",
      de: "/de/",
      pt: "/pt/",
      fr: "/fr/",
      "x-default": "/",
    },
  },
};

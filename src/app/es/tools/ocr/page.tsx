import type { Metadata } from "next";

export { default } from "@/app/tools/ocr/page";

export const metadata: Metadata = {
  title: "Imagen a Texto (OCR) - Gratis Online | ToolsMani",
  description:
    "Extrae texto de fotos, capturas y escaneos. El OCR corre en tu navegador, sin subir imágenes.",
  alternates: {
    canonical: "/es/tools/ocr/",
    languages: {
      en: "/tools/ocr/",
      tr: "/tr/tools/ocr/",
      es: "/es/tools/ocr/",
      de: "/de/tools/ocr/",
      pt: "/pt/tools/ocr/",
      fr: "/fr/tools/ocr/",
      "x-default": "/tools/ocr/",
    },
  },
};

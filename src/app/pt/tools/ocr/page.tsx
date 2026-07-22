import type { Metadata } from "next";

export { default } from "@/app/tools/ocr/page";

export const metadata: Metadata = {
  title: "Imagem para Texto (OCR) - Grátis Online | ToolsMani",
  description:
    "Extraia texto de fotos, capturas e digitalizações. OCR roda no navegador, sem upload.",
  alternates: {
    canonical: "/pt/tools/ocr/",
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

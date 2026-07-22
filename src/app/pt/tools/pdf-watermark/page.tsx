import type { Metadata } from "next";

export { default } from "@/app/tools/pdf-watermark/page";

export const metadata: Metadata = {
  title: "Marca d'Água PDF - Grátis Online | ToolsMani",
  description:
    "Adicione marcas d'água de texto. Controle tamanho, cor, opacidade e rotação.",
  alternates: {
    canonical: "/pt/tools/pdf-watermark/",
    languages: {
      en: "/tools/pdf-watermark/",
      tr: "/tr/tools/pdf-watermark/",
      es: "/es/tools/pdf-watermark/",
      de: "/de/tools/pdf-watermark/",
      pt: "/pt/tools/pdf-watermark/",
      fr: "/fr/tools/pdf-watermark/",
      "x-default": "/tools/pdf-watermark/",
    },
  },
};

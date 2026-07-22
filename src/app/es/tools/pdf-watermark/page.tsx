import type { Metadata } from "next";

export { default } from "@/app/tools/pdf-watermark/page";

export const metadata: Metadata = {
  title: "Marca de Agua PDF - Gratis Online | ToolsMani",
  description:
    "Añade marcas de agua de texto. Controla tamaño, color, opacidad y rotación.",
  alternates: {
    canonical: "/es/tools/pdf-watermark/",
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

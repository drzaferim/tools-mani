import type { Metadata } from "next";

export { default } from "@/app/tools/image-to-pdf/page";

export const metadata: Metadata = {
  title: "Imagen a PDF - Gratis Online | ToolsMani",
  description:
    "Convierte imágenes JPG, PNG o WebP en un PDF. Combina varias en un solo documento.",
  alternates: {
    canonical: "/es/tools/image-to-pdf/",
    languages: {
      en: "/tools/image-to-pdf/",
      tr: "/tr/tools/image-to-pdf/",
      es: "/es/tools/image-to-pdf/",
      de: "/de/tools/image-to-pdf/",
      pt: "/pt/tools/image-to-pdf/",
      fr: "/fr/tools/image-to-pdf/",
      "x-default": "/tools/image-to-pdf/",
    },
  },
};

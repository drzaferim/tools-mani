import type { Metadata } from "next";

export { default } from "@/app/tools/image-convert/page";

export const metadata: Metadata = {
  title: "Conversor de Imágenes - Gratis Online | ToolsMani",
  description:
    "Convierte imágenes entre PNG, JPEG, WebP y BMP. Conversión por lotes.",
  alternates: {
    canonical: "/es/tools/image-convert/",
    languages: {
      en: "/tools/image-convert/",
      tr: "/tr/tools/image-convert/",
      es: "/es/tools/image-convert/",
      de: "/de/tools/image-convert/",
      pt: "/pt/tools/image-convert/",
      fr: "/fr/tools/image-convert/",
      "x-default": "/tools/image-convert/",
    },
  },
};

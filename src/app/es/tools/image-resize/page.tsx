import type { Metadata } from "next";

export { default } from "@/app/tools/image-resize/page";

export const metadata: Metadata = {
  title: "Redimensionar Imágenes - Gratis Online | ToolsMani",
  description:
    "Redimensiona JPG, PNG y WebP por ancho o porcentaje. Mantiene la proporción.",
  alternates: {
    canonical: "/es/tools/image-resize/",
    languages: {
      en: "/tools/image-resize/",
      tr: "/tr/tools/image-resize/",
      es: "/es/tools/image-resize/",
      de: "/de/tools/image-resize/",
      pt: "/pt/tools/image-resize/",
      fr: "/fr/tools/image-resize/",
      "x-default": "/tools/image-resize/",
    },
  },
};

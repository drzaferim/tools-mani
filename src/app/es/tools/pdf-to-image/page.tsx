import type { Metadata } from "next";

export { default } from "@/app/tools/pdf-to-image/page";

export const metadata: Metadata = {
  title: "PDF a Imagen - Gratis Online | ToolsMani",
  description:
    "Convierte páginas PDF en imágenes JPG o PNG de alta calidad. Sin límite de tamaño.",
  alternates: {
    canonical: "/es/tools/pdf-to-image/",
    languages: {
      en: "/tools/pdf-to-image/",
      tr: "/tr/tools/pdf-to-image/",
      es: "/es/tools/pdf-to-image/",
      de: "/de/tools/pdf-to-image/",
      pt: "/pt/tools/pdf-to-image/",
      fr: "/fr/tools/pdf-to-image/",
      "x-default": "/tools/pdf-to-image/",
    },
  },
};

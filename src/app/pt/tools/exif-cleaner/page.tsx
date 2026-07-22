import type { Metadata } from "next";

export { default } from "@/app/tools/exif-cleaner/page";

export const metadata: Metadata = {
  title: "Remover EXIF - Grátis Online | ToolsMani",
  description:
    "Apague metadados ocultos das fotos: localização GPS, câmera, data e mais.",
  alternates: {
    canonical: "/pt/tools/exif-cleaner/",
    languages: {
      en: "/tools/exif-cleaner/",
      tr: "/tr/tools/exif-cleaner/",
      es: "/es/tools/exif-cleaner/",
      de: "/de/tools/exif-cleaner/",
      pt: "/pt/tools/exif-cleaner/",
      fr: "/fr/tools/exif-cleaner/",
      "x-default": "/tools/exif-cleaner/",
    },
  },
};

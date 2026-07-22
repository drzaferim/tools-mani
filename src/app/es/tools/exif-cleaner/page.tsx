import type { Metadata } from "next";

export { default } from "@/app/tools/exif-cleaner/page";

export const metadata: Metadata = {
  title: "Eliminar EXIF - Gratis Online | ToolsMani",
  description:
    "Borra metadatos ocultos de tus fotos: ubicación GPS, cámara, fecha y más.",
  alternates: {
    canonical: "/es/tools/exif-cleaner/",
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

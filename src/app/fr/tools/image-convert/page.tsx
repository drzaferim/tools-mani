import type { Metadata } from "next";

export { default } from "@/app/tools/image-convert/page";

export const metadata: Metadata = {
  title: "Convertisseur d'images - Gratuit en Ligne | ToolsMani",
  description:
    "Convertissez des images entre PNG, JPEG, WebP et BMP. Conversion par lots.",
  alternates: {
    canonical: "/fr/tools/image-convert/",
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

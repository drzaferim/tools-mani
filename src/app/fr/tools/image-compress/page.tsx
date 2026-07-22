import type { Metadata } from "next";

export { default } from "@/app/tools/image-compress/page";

export const metadata: Metadata = {
  title: "Compresseur d'images - Gratuit en Ligne | ToolsMani",
  description:
    "Compressez des images sans perte de qualité. Compatible JPEG, PNG et WebP.",
  alternates: {
    canonical: "/fr/tools/image-compress/",
    languages: {
      en: "/tools/image-compress/",
      tr: "/tr/tools/image-compress/",
      es: "/es/tools/image-compress/",
      de: "/de/tools/image-compress/",
      pt: "/pt/tools/image-compress/",
      fr: "/fr/tools/image-compress/",
      "x-default": "/tools/image-compress/",
    },
  },
};

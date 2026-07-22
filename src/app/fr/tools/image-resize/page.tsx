import type { Metadata } from "next";

export { default } from "@/app/tools/image-resize/page";

export const metadata: Metadata = {
  title: "Redimensionner des images - Gratuit en Ligne | ToolsMani",
  description:
    "Redimensionnez JPG, PNG et WebP par largeur ou pourcentage. Proportions conservées.",
  alternates: {
    canonical: "/fr/tools/image-resize/",
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

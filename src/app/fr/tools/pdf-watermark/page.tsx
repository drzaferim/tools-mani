import type { Metadata } from "next";

export { default } from "@/app/tools/pdf-watermark/page";

export const metadata: Metadata = {
  title: "Filigrane PDF - Gratuit en Ligne | ToolsMani",
  description:
    "Ajoutez des filigranes de texte. Contrôlez taille, couleur, opacité et rotation.",
  alternates: {
    canonical: "/fr/tools/pdf-watermark/",
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

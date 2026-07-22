import type { Metadata } from "next";

export { default } from "@/app/tools/pdf-to-image/page";

export const metadata: Metadata = {
  title: "PDF en image - Gratuit en Ligne | ToolsMani",
  description:
    "Convertissez les pages PDF en images JPG ou PNG de haute qualité. Sans limite de taille.",
  alternates: {
    canonical: "/fr/tools/pdf-to-image/",
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

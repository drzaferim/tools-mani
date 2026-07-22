import type { Metadata } from "next";

export { default } from "@/app/tools/pdf-compress/page";

export const metadata: Metadata = {
  title: "Compresser PDF - Gratuit en Ligne | ToolsMani",
  description:
    "Réduisez la taille du fichier en optimisant la structure et en supprimant les données inutiles.",
  alternates: {
    canonical: "/fr/tools/pdf-compress/",
    languages: {
      en: "/tools/pdf-compress/",
      tr: "/tr/tools/pdf-compress/",
      es: "/es/tools/pdf-compress/",
      de: "/de/tools/pdf-compress/",
      pt: "/pt/tools/pdf-compress/",
      fr: "/fr/tools/pdf-compress/",
      "x-default": "/tools/pdf-compress/",
    },
  },
};

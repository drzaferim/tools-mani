import type { Metadata } from "next";

export { default } from "@/app/tools/markdown-preview/page";

export const metadata: Metadata = {
  title: "Aperçu Markdown - Gratuit en Ligne | ToolsMani",
  description:
    "Écrivez du Markdown et voyez l'aperçu en direct. Titres, listes, code et plus.",
  alternates: {
    canonical: "/fr/tools/markdown-preview/",
    languages: {
      en: "/tools/markdown-preview/",
      tr: "/tr/tools/markdown-preview/",
      es: "/es/tools/markdown-preview/",
      de: "/de/tools/markdown-preview/",
      pt: "/pt/tools/markdown-preview/",
      fr: "/fr/tools/markdown-preview/",
      "x-default": "/tools/markdown-preview/",
    },
  },
};

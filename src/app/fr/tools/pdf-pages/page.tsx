import type { Metadata } from "next";

export { default } from "@/app/tools/pdf-pages/page";

export const metadata: Metadata = {
  title: "Gestionnaire de pages PDF - Gratuit en Ligne | ToolsMani",
  description:
    "Extrayez ou supprimez des pages précises. Sélection impaire, paire ou personnalisée.",
  alternates: {
    canonical: "/fr/tools/pdf-pages/",
    languages: {
      en: "/tools/pdf-pages/",
      tr: "/tr/tools/pdf-pages/",
      es: "/es/tools/pdf-pages/",
      de: "/de/tools/pdf-pages/",
      pt: "/pt/tools/pdf-pages/",
      fr: "/fr/tools/pdf-pages/",
      "x-default": "/tools/pdf-pages/",
    },
  },
};

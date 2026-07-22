import type { Metadata } from "next";

export { default } from "@/app/tools/pdf-pages/page";

export const metadata: Metadata = {
  title: "PDF-Seitenmanager - Kostenlos Online | ToolsMani",
  description:
    "Bestimmte Seiten extrahieren oder löschen. Ungerade, gerade oder eigene Auswahl.",
  alternates: {
    canonical: "/de/tools/pdf-pages/",
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

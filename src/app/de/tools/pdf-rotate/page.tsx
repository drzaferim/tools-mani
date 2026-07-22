import type { Metadata } from "next";

export { default } from "@/app/tools/pdf-rotate/page";

export const metadata: Metadata = {
  title: "PDF drehen - Kostenlos Online | ToolsMani",
  description:
    "Seiten einzeln oder alle auf einmal drehen. Gescannte Dokumente korrigieren.",
  alternates: {
    canonical: "/de/tools/pdf-rotate/",
    languages: {
      en: "/tools/pdf-rotate/",
      tr: "/tr/tools/pdf-rotate/",
      es: "/es/tools/pdf-rotate/",
      de: "/de/tools/pdf-rotate/",
      pt: "/pt/tools/pdf-rotate/",
      fr: "/fr/tools/pdf-rotate/",
      "x-default": "/tools/pdf-rotate/",
    },
  },
};

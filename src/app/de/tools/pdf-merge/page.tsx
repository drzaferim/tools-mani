import type { Metadata } from "next";

export { default } from "@/app/tools/pdf-merge/page";

export const metadata: Metadata = {
  title: "PDF zusammenfügen - Kostenlos Online | ToolsMani",
  description:
    "Mehrere PDFs zu einer Datei zusammenfügen. Seiten per Drag & Drop sortieren.",
  alternates: {
    canonical: "/de/tools/pdf-merge/",
    languages: {
      en: "/tools/pdf-merge/",
      tr: "/tr/tools/pdf-merge/",
      es: "/es/tools/pdf-merge/",
      de: "/de/tools/pdf-merge/",
      pt: "/pt/tools/pdf-merge/",
      fr: "/fr/tools/pdf-merge/",
      "x-default": "/tools/pdf-merge/",
    },
  },
};

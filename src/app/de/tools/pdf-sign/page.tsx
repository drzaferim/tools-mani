import type { Metadata } from "next";

export { default } from "@/app/tools/pdf-sign/page";

export const metadata: Metadata = {
  title: "PDF unterschreiben - Kostenlos Online | ToolsMani",
  description:
    "Unterschrift zeichnen und auf jeder PDF-Seite platzieren. Das Dokument verlässt Ihren Browser nicht.",
  alternates: {
    canonical: "/de/tools/pdf-sign/",
    languages: {
      en: "/tools/pdf-sign/",
      tr: "/tr/tools/pdf-sign/",
      es: "/es/tools/pdf-sign/",
      de: "/de/tools/pdf-sign/",
      pt: "/pt/tools/pdf-sign/",
      fr: "/fr/tools/pdf-sign/",
      "x-default": "/tools/pdf-sign/",
    },
  },
};

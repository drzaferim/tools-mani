import type { Metadata } from "next";

export { default } from "@/app/tools/pdf-watermark/page";

export const metadata: Metadata = {
  title: "PDF-Wasserzeichen - Kostenlos Online | ToolsMani",
  description:
    "Text-Wasserzeichen hinzufügen. Größe, Farbe, Deckkraft und Drehung steuern.",
  alternates: {
    canonical: "/de/tools/pdf-watermark/",
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

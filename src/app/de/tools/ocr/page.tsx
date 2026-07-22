import type { Metadata } from "next";

export { default } from "@/app/tools/ocr/page";

export const metadata: Metadata = {
  title: "Bild in Text (OCR) - Kostenlos Online | ToolsMani",
  description:
    "Text aus Fotos, Screenshots und Scans extrahieren. OCR läuft im Browser, ohne Upload.",
  alternates: {
    canonical: "/de/tools/ocr/",
    languages: {
      en: "/tools/ocr/",
      tr: "/tr/tools/ocr/",
      es: "/es/tools/ocr/",
      de: "/de/tools/ocr/",
      pt: "/pt/tools/ocr/",
      fr: "/fr/tools/ocr/",
      "x-default": "/tools/ocr/",
    },
  },
};

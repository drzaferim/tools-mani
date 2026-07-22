import type { Metadata } from "next";

export { default } from "@/app/tools/ocr/page";

export const metadata: Metadata = {
  title: "Image en texte (OCR) - Gratuit en Ligne | ToolsMani",
  description:
    "Extrayez le texte de photos, captures et scans. L'OCR s'exécute dans votre navigateur, sans envoi.",
  alternates: {
    canonical: "/fr/tools/ocr/",
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

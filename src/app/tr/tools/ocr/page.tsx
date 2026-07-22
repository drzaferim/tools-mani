import type { Metadata } from "next";

export { default } from "@/app/tools/ocr/page";

export const metadata: Metadata = {
  title: "Resimden Metin Çıkarma (OCR) - Ücretsiz | ToolsMani",
  description:
    "Fotoğraf, ekran görüntüsü ve taramalardaki yazıyı metne çevirin. Türkçe destekli OCR tamamen tarayıcınızda çalışır — görsel hiçbir yere yüklenmez.",
  alternates: {
    canonical: "/tr/tools/ocr/",
    languages: {
      en: "/tools/ocr/",
      tr: "/tr/tools/ocr/",
      "x-default": "/tools/ocr/",
    },
  },
};

import type { Metadata } from "next";

export { default } from "@/app/tools/pdf-watermark/page";

export const metadata: Metadata = {
  title: "PDF Filigran Ekleme | ToolsMani",
  description:
    "PDF'e metin filigranı ekleyin: konum, boyut ve saydamlık ayarlanabilir. Ücretsiz, tarayıcıda çalışır, dosyanız cihazınızda kalır.",
  alternates: {
    canonical: "/tr/tools/pdf-watermark/",
    languages: {
      en: "/tools/pdf-watermark/",
      tr: "/tr/tools/pdf-watermark/",
      "x-default": "/tools/pdf-watermark/",
    },
  },
};

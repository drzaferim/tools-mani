import type { Metadata } from "next";

export { default } from "@/app/tools/pdf-compress/page";

export const metadata: Metadata = {
  title: "PDF Sıkıştırma - PDF Boyutu Küçültme | ToolsMani",
  description:
    "PDF dosya boyutunu ücretsiz küçültün. Yapıyı optimize eder, kullanılmayan veriyi temizler. Dosya limiti yok, tamamen tarayıcıda çalışır.",
  alternates: {
    canonical: "/tr/tools/pdf-compress/",
    languages: {
      en: "/tools/pdf-compress/",
      tr: "/tr/tools/pdf-compress/",
      "x-default": "/tools/pdf-compress/",
    },
  },
};

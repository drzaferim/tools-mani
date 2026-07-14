import type { Metadata } from "next";

export { default } from "@/app/tools/pdf-rotate/page";

export const metadata: Metadata = {
  title: "PDF Döndürme - Sayfaları Çevirme | ToolsMani",
  description:
    "PDF sayfalarını tek tek veya toplu döndürün. Taranmış belgeleri kolayca düzeltin. Ücretsiz, tarayıcı tabanlı, sunucuya yükleme yok.",
  alternates: {
    canonical: "/tr/tools/pdf-rotate/",
    languages: {
      en: "/tools/pdf-rotate/",
      tr: "/tr/tools/pdf-rotate/",
      "x-default": "/tools/pdf-rotate/",
    },
  },
};

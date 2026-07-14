import type { Metadata } from "next";

export { default } from "@/app/tools/pdf/page";

export const metadata: Metadata = {
  title: "Ücretsiz PDF Araçları - Birleştir, Böl, Sıkıştır | ToolsMani",
  description:
    "7+ ücretsiz PDF aracı: birleştirme, bölme, sıkıştırma, döndürme, filigran, sayfa numarası ve daha fazlası. Dosya limiti yok, sunucuya yükleme yok.",
  alternates: {
    canonical: "/tr/tools/pdf/",
    languages: {
      en: "/tools/pdf/",
      tr: "/tr/tools/pdf/",
      "x-default": "/tools/pdf/",
    },
  },
};

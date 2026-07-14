import type { Metadata } from "next";

export { default } from "@/app/tools/pdf-merge/page";

export const metadata: Metadata = {
  title: "PDF Birleştirme - Ücretsiz Online PDF Birleştirici | ToolsMani",
  description:
    "PDF dosyalarını ücretsiz ve hızlı birleştirin. Dosyalar tarayıcınızda işlenir, sunucuya yüklenmez. Kayıt yok, limit yok, filigran yok.",
  alternates: {
    canonical: "/tr/tools/pdf-merge/",
    languages: {
      en: "/tools/pdf-merge/",
      tr: "/tr/tools/pdf-merge/",
      "x-default": "/tools/pdf-merge/",
    },
  },
};

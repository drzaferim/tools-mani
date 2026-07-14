import type { Metadata } from "next";

export { default } from "@/app/tools/pdf-pagenumber/page";

export const metadata: Metadata = {
  title: "PDF Sayfa Numarası Ekleme | ToolsMani",
  description:
    "PDF'e otomatik sayfa numarası ekleyin. Konum ve biçim seçenekleri. Ücretsiz, kayıt gerektirmez, tamamen tarayıcıda çalışır.",
  alternates: {
    canonical: "/tr/tools/pdf-pagenumber/",
    languages: {
      en: "/tools/pdf-pagenumber/",
      tr: "/tr/tools/pdf-pagenumber/",
      "x-default": "/tools/pdf-pagenumber/",
    },
  },
};

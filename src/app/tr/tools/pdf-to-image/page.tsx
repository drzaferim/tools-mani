import type { Metadata } from "next";

export { default } from "@/app/tools/pdf-to-image/page";

export const metadata: Metadata = {
  title: "PDF'i Resme Çevirme (PDF - JPG/PNG) | ToolsMani",
  description:
    "PDF sayfalarını JPG veya PNG resimlere dönüştürün. Yüksek çözünürlük desteği. Ücretsiz ve tarayıcı tabanlı — dosya yüklenmez.",
  alternates: {
    canonical: "/tr/tools/pdf-to-image/",
    languages: {
      en: "/tools/pdf-to-image/",
      tr: "/tr/tools/pdf-to-image/",
      "x-default": "/tools/pdf-to-image/",
    },
  },
};

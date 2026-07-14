import type { Metadata } from "next";

export { default } from "@/app/tools/heic-convert/page";

export const metadata: Metadata = {
  title: "HEIC'i JPG'ye Çevirme | ToolsMani",
  description:
    "iPhone HEIC fotoğraflarını JPG veya PNG'ye dönüştürün. Toplu dönüştürme desteği. Ücretsiz, tarayıcıda çalışır, fotoğraflar yüklenmez.",
  alternates: {
    canonical: "/tr/tools/heic-convert/",
    languages: {
      en: "/tools/heic-convert/",
      tr: "/tr/tools/heic-convert/",
      "x-default": "/tools/heic-convert/",
    },
  },
};

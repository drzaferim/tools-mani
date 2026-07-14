import type { Metadata } from "next";

export { default } from "@/app/tools/exif-cleaner/page";

export const metadata: Metadata = {
  title: "EXIF Silme - Fotoğraf Meta Verisi Temizleme | ToolsMani",
  description:
    "Fotoğraflardan GPS konumu, kamera modeli, tarih gibi gizli meta verileri silin. Ücretsiz ve gizli — fotoğraf tarayıcıda temizlenir, yüklenmez.",
  alternates: {
    canonical: "/tr/tools/exif-cleaner/",
    languages: {
      en: "/tools/exif-cleaner/",
      tr: "/tr/tools/exif-cleaner/",
      "x-default": "/tools/exif-cleaner/",
    },
  },
};

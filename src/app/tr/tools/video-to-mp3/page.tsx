import type { Metadata } from "next";

export { default } from "@/app/tools/video-to-mp3/page";

export const metadata: Metadata = {
  title: "Video MP3 Dönüştürücü - MP4'ten Ses Çıkarma | ToolsMani",
  description:
    "MP4, MOV ve WebM videolardan sesi MP3 veya WAV olarak çıkarın. Ücretsiz ve tamamen tarayıcıda — videonuz hiçbir sunucuya yüklenmez.",
  alternates: {
    canonical: "/tr/tools/video-to-mp3/",
    languages: {
      en: "/tools/video-to-mp3/",
      tr: "/tr/tools/video-to-mp3/",
      "x-default": "/tools/video-to-mp3/",
    },
  },
};

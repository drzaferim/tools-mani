import type { Metadata } from "next";

export { default } from "@/app/tools/video-to-mp3/page";

export const metadata: Metadata = {
  title: "Vídeo para MP3 - Grátis Online | ToolsMani",
  description:
    "Extraia o áudio de vídeos MP4, MOV e WebM como MP3 ou WAV. Roda no navegador, sem upload.",
  alternates: {
    canonical: "/pt/tools/video-to-mp3/",
    languages: {
      en: "/tools/video-to-mp3/",
      tr: "/tr/tools/video-to-mp3/",
      es: "/es/tools/video-to-mp3/",
      de: "/de/tools/video-to-mp3/",
      pt: "/pt/tools/video-to-mp3/",
      fr: "/fr/tools/video-to-mp3/",
      "x-default": "/tools/video-to-mp3/",
    },
  },
};

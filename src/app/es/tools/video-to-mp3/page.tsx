import type { Metadata } from "next";

export { default } from "@/app/tools/video-to-mp3/page";

export const metadata: Metadata = {
  title: "Video a MP3 - Gratis Online | ToolsMani",
  description:
    "Extrae el audio de videos MP4, MOV y WebM como MP3 o WAV. Corre en tu navegador, sin subir nada.",
  alternates: {
    canonical: "/es/tools/video-to-mp3/",
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

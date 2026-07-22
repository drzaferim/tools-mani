import type { Metadata } from "next";

export { default } from "@/app/tools/video-to-mp3/page";

export const metadata: Metadata = {
  title: "Vidéo en MP3 - Gratuit en Ligne | ToolsMani",
  description:
    "Extrayez l'audio des vidéos MP4, MOV et WebM en MP3 ou WAV. S'exécute dans votre navigateur, sans envoi.",
  alternates: {
    canonical: "/fr/tools/video-to-mp3/",
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

import type { Metadata } from "next";

export { default } from "@/app/tools/video-to-mp3/page";

export const metadata: Metadata = {
  title: "Video in MP3 - Kostenlos Online | ToolsMani",
  description:
    "Audio aus MP4-, MOV- und WebM-Videos als MP3 oder WAV extrahieren. Läuft im Browser, ohne Upload.",
  alternates: {
    canonical: "/de/tools/video-to-mp3/",
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

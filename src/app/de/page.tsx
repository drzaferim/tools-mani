import type { Metadata } from "next";

export { default } from "@/app/page";

export const metadata: Metadata = {
  title: "ToolsMani - Kostenlose Online-Tools mit Datenschutz",
  description:
    "Kostenlose Online-Tools: PDF zusammenfügen, teilen, komprimieren, Bilder komprimieren, QR-Codes und mehr. Alles im Browser, ohne Datei-Upload.",
  alternates: {
    canonical: "/de/",
    languages: {
      en: "/",
      tr: "/tr/",
      es: "/es/",
      de: "/de/",
      pt: "/pt/",
      fr: "/fr/",
      "x-default": "/",
    },
  },
};

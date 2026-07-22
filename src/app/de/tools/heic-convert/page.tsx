import type { Metadata } from "next";

export { default } from "@/app/tools/heic-convert/page";

export const metadata: Metadata = {
  title: "HEIC in JPG / PNG - Kostenlos Online | ToolsMani",
  description:
    "iPhone-HEIC-Fotos in JPG, PNG oder WebP umwandeln. Stapelweise, ohne Upload.",
  alternates: {
    canonical: "/de/tools/heic-convert/",
    languages: {
      en: "/tools/heic-convert/",
      tr: "/tr/tools/heic-convert/",
      es: "/es/tools/heic-convert/",
      de: "/de/tools/heic-convert/",
      pt: "/pt/tools/heic-convert/",
      fr: "/fr/tools/heic-convert/",
      "x-default": "/tools/heic-convert/",
    },
  },
};

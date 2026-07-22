import type { Metadata } from "next";

export { default } from "@/app/tools/heic-convert/page";

export const metadata: Metadata = {
  title: "HEIC a JPG / PNG - Gratis Online | ToolsMani",
  description:
    "Convierte fotos HEIC de iPhone a JPG, PNG o WebP. Por lotes, sin subir nada.",
  alternates: {
    canonical: "/es/tools/heic-convert/",
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

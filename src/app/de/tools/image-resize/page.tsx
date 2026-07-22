import type { Metadata } from "next";

export { default } from "@/app/tools/image-resize/page";

export const metadata: Metadata = {
  title: "Bilder skalieren - Kostenlos Online | ToolsMani",
  description:
    "JPG, PNG und WebP nach Breite oder Prozent skalieren. Seitenverhältnis bleibt erhalten.",
  alternates: {
    canonical: "/de/tools/image-resize/",
    languages: {
      en: "/tools/image-resize/",
      tr: "/tr/tools/image-resize/",
      es: "/es/tools/image-resize/",
      de: "/de/tools/image-resize/",
      pt: "/pt/tools/image-resize/",
      fr: "/fr/tools/image-resize/",
      "x-default": "/tools/image-resize/",
    },
  },
};

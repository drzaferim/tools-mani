import type { Metadata } from "next";

export { default } from "@/app/tools/image-compress/page";

export const metadata: Metadata = {
  title: "Bildkompressor - Kostenlos Online | ToolsMani",
  description:
    "Bilder ohne Qualitätsverlust komprimieren. Unterstützt JPEG, PNG und WebP.",
  alternates: {
    canonical: "/de/tools/image-compress/",
    languages: {
      en: "/tools/image-compress/",
      tr: "/tr/tools/image-compress/",
      es: "/es/tools/image-compress/",
      de: "/de/tools/image-compress/",
      pt: "/pt/tools/image-compress/",
      fr: "/fr/tools/image-compress/",
      "x-default": "/tools/image-compress/",
    },
  },
};

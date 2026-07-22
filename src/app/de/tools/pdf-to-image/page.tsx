import type { Metadata } from "next";

export { default } from "@/app/tools/pdf-to-image/page";

export const metadata: Metadata = {
  title: "PDF in Bild - Kostenlos Online | ToolsMani",
  description:
    "PDF-Seiten in hochwertige JPG- oder PNG-Bilder umwandeln. Ohne Größenlimit.",
  alternates: {
    canonical: "/de/tools/pdf-to-image/",
    languages: {
      en: "/tools/pdf-to-image/",
      tr: "/tr/tools/pdf-to-image/",
      es: "/es/tools/pdf-to-image/",
      de: "/de/tools/pdf-to-image/",
      pt: "/pt/tools/pdf-to-image/",
      fr: "/fr/tools/pdf-to-image/",
      "x-default": "/tools/pdf-to-image/",
    },
  },
};

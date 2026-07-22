import type { Metadata } from "next";

export { default } from "@/app/tools/image-to-pdf/page";

export const metadata: Metadata = {
  title: "Image en PDF - Gratuit en Ligne | ToolsMani",
  description:
    "Convertissez des images JPG, PNG ou WebP en PDF. Combinez-en plusieurs dans un document.",
  alternates: {
    canonical: "/fr/tools/image-to-pdf/",
    languages: {
      en: "/tools/image-to-pdf/",
      tr: "/tr/tools/image-to-pdf/",
      es: "/es/tools/image-to-pdf/",
      de: "/de/tools/image-to-pdf/",
      pt: "/pt/tools/image-to-pdf/",
      fr: "/fr/tools/image-to-pdf/",
      "x-default": "/tools/image-to-pdf/",
    },
  },
};

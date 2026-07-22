import type { Metadata } from "next";

export { default } from "@/app/tools/image-compress/page";

export const metadata: Metadata = {
  title: "Compresor de Imágenes - Gratis Online | ToolsMani",
  description:
    "Comprime imágenes sin perder calidad. Compatible con JPEG, PNG y WebP.",
  alternates: {
    canonical: "/es/tools/image-compress/",
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

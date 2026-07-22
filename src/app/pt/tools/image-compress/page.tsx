import type { Metadata } from "next";

export { default } from "@/app/tools/image-compress/page";

export const metadata: Metadata = {
  title: "Compressor de Imagens - Grátis Online | ToolsMani",
  description:
    "Comprima imagens sem perder qualidade. Suporta JPEG, PNG e WebP.",
  alternates: {
    canonical: "/pt/tools/image-compress/",
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

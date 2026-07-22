import type { Metadata } from "next";

export { default } from "@/app/tools/pdf-to-image/page";

export const metadata: Metadata = {
  title: "PDF para Imagem - Grátis Online | ToolsMani",
  description:
    "Converta páginas PDF em imagens JPG ou PNG de alta qualidade. Sem limite de tamanho.",
  alternates: {
    canonical: "/pt/tools/pdf-to-image/",
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

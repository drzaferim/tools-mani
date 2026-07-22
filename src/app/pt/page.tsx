import type { Metadata } from "next";

export { default } from "@/app/page";

export const metadata: Metadata = {
  title: "ToolsMani - Ferramentas Online Grátis e Privadas",
  description:
    "Ferramentas online grátis: juntar, dividir e comprimir PDF, comprimir imagens, gerar QR e mais. Tudo no navegador, sem enviar arquivos.",
  alternates: {
    canonical: "/pt/",
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

import type { Metadata } from "next";

export { default } from "@/app/tools/pdf/page";

export const metadata: Metadata = {
  title: "Ferramentas PDF Online Grátis - Juntar, Dividir | ToolsMani",
  description:
    "Mais de 10 ferramentas PDF grátis: juntar, dividir, comprimir, girar, assinar, marca d'água e mais. Sem limite de tamanho, sem upload.",
  alternates: {
    canonical: "/pt/tools/pdf/",
    languages: {
      en: "/tools/pdf/",
      tr: "/tr/tools/pdf/",
      es: "/es/tools/pdf/",
      de: "/de/tools/pdf/",
      pt: "/pt/tools/pdf/",
      fr: "/fr/tools/pdf/",
      "x-default": "/tools/pdf/",
    },
  },
};

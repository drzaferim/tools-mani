import type { Metadata } from "next";

export { default } from "@/app/tools/pdf-compress/page";

export const metadata: Metadata = {
  title: "Comprimir PDF - Grátis Online | ToolsMani",
  description:
    "Reduza o tamanho do arquivo otimizando a estrutura e removendo dados não usados.",
  alternates: {
    canonical: "/pt/tools/pdf-compress/",
    languages: {
      en: "/tools/pdf-compress/",
      tr: "/tr/tools/pdf-compress/",
      es: "/es/tools/pdf-compress/",
      de: "/de/tools/pdf-compress/",
      pt: "/pt/tools/pdf-compress/",
      fr: "/fr/tools/pdf-compress/",
      "x-default": "/tools/pdf-compress/",
    },
  },
};

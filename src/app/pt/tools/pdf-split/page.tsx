import type { Metadata } from "next";

export { default } from "@/app/tools/pdf-split/page";

export const metadata: Metadata = {
  title: "Dividir PDF - Grátis Online | ToolsMani",
  description:
    "Divida um PDF em vários arquivos por intervalos de páginas ou extraia todas as páginas.",
  alternates: {
    canonical: "/pt/tools/pdf-split/",
    languages: {
      en: "/tools/pdf-split/",
      tr: "/tr/tools/pdf-split/",
      es: "/es/tools/pdf-split/",
      de: "/de/tools/pdf-split/",
      pt: "/pt/tools/pdf-split/",
      fr: "/fr/tools/pdf-split/",
      "x-default": "/tools/pdf-split/",
    },
  },
};

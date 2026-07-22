import type { Metadata } from "next";

export { default } from "@/app/tools/favicon-generator/page";

export const metadata: Metadata = {
  title: "Gerador de Favicon - Grátis Online | ToolsMani",
  description:
    "Transforme qualquer imagem em um conjunto completo de favicons: ICO, PNGs e tags HTML.",
  alternates: {
    canonical: "/pt/tools/favicon-generator/",
    languages: {
      en: "/tools/favicon-generator/",
      tr: "/tr/tools/favicon-generator/",
      es: "/es/tools/favicon-generator/",
      de: "/de/tools/favicon-generator/",
      pt: "/pt/tools/favicon-generator/",
      fr: "/fr/tools/favicon-generator/",
      "x-default": "/tools/favicon-generator/",
    },
  },
};

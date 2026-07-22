import type { Metadata } from "next";

export { default } from "@/app/tools/text-diff/page";

export const metadata: Metadata = {
  title: "Comparar Textos (Diff) - Grátis Online | ToolsMani",
  description:
    "Compare dois textos e veja as diferenças linha a linha. Nada é enviado.",
  alternates: {
    canonical: "/pt/tools/text-diff/",
    languages: {
      en: "/tools/text-diff/",
      tr: "/tr/tools/text-diff/",
      es: "/es/tools/text-diff/",
      de: "/de/tools/text-diff/",
      pt: "/pt/tools/text-diff/",
      fr: "/fr/tools/text-diff/",
      "x-default": "/tools/text-diff/",
    },
  },
};

import type { Metadata } from "next";

export { default } from "@/app/tools/case-converter/page";

export const metadata: Metadata = {
  title: "Conversor Maiúsculas/Minúsculas - Grátis Online | ToolsMani",
  description:
    "Converta texto entre MAIÚSCULAS, minúsculas, Título, camelCase, snake_case e mais.",
  alternates: {
    canonical: "/pt/tools/case-converter/",
    languages: {
      en: "/tools/case-converter/",
      tr: "/tr/tools/case-converter/",
      es: "/es/tools/case-converter/",
      de: "/de/tools/case-converter/",
      pt: "/pt/tools/case-converter/",
      fr: "/fr/tools/case-converter/",
      "x-default": "/tools/case-converter/",
    },
  },
};

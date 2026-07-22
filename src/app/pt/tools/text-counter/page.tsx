import type { Metadata } from "next";

export { default } from "@/app/tools/text-counter/page";

export const metadata: Metadata = {
  title: "Contador de Palavras - Grátis Online | ToolsMani",
  description:
    "Conte palavras, caracteres, frases e parágrafos na hora. Ideal para textos e redes sociais.",
  alternates: {
    canonical: "/pt/tools/text-counter/",
    languages: {
      en: "/tools/text-counter/",
      tr: "/tr/tools/text-counter/",
      es: "/es/tools/text-counter/",
      de: "/de/tools/text-counter/",
      pt: "/pt/tools/text-counter/",
      fr: "/fr/tools/text-counter/",
      "x-default": "/tools/text-counter/",
    },
  },
};

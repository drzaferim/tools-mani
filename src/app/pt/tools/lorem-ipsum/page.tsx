import type { Metadata } from "next";

export { default } from "@/app/tools/lorem-ipsum/page";

export const metadata: Metadata = {
  title: "Gerador Lorem Ipsum - Grátis Online | ToolsMani",
  description:
    "Gere texto de preenchimento em parágrafos, frases ou palavras. Perfeito para mockups.",
  alternates: {
    canonical: "/pt/tools/lorem-ipsum/",
    languages: {
      en: "/tools/lorem-ipsum/",
      tr: "/tr/tools/lorem-ipsum/",
      es: "/es/tools/lorem-ipsum/",
      de: "/de/tools/lorem-ipsum/",
      pt: "/pt/tools/lorem-ipsum/",
      fr: "/fr/tools/lorem-ipsum/",
      "x-default": "/tools/lorem-ipsum/",
    },
  },
};

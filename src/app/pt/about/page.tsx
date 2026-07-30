import type { Metadata } from "next";

export { default } from "@/app/about/page";

export const metadata: Metadata = {
  title: "Sobre | ToolsMani",
  description:
    "A história do ToolsMani: ferramentas online gratuitas com privacidade em primeiro lugar. Seus arquivos nunca saem do navegador.",
  alternates: {
    canonical: "/pt/about/",
    languages: {
      en: "/about/",
      tr: "/tr/about/",
      es: "/es/about/",
      de: "/de/about/",
      pt: "/pt/about/",
      fr: "/fr/about/",
      "x-default": "/about/",
    },
  },
};

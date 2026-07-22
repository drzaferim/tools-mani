import type { Metadata } from "next";

export { default } from "@/app/tools/pdf-sign/page";

export const metadata: Metadata = {
  title: "Assinar PDF - Grátis Online | ToolsMani",
  description:
    "Desenhe sua assinatura e coloque em qualquer página do PDF. O documento não sai do navegador.",
  alternates: {
    canonical: "/pt/tools/pdf-sign/",
    languages: {
      en: "/tools/pdf-sign/",
      tr: "/tr/tools/pdf-sign/",
      es: "/es/tools/pdf-sign/",
      de: "/de/tools/pdf-sign/",
      pt: "/pt/tools/pdf-sign/",
      fr: "/fr/tools/pdf-sign/",
      "x-default": "/tools/pdf-sign/",
    },
  },
};

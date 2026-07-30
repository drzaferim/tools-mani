import type { Metadata } from "next";

export { default } from "@/app/privacy/page";

export const metadata: Metadata = {
  title: "Política de privacidade | ToolsMani",
  description:
    "Política de privacidade do ToolsMani: seus arquivos não saem do seu dispositivo nem são enviados a servidores. Explicamos com clareza quais dados coletamos.",
  alternates: {
    canonical: "/pt/privacy/",
    languages: {
      en: "/privacy/",
      tr: "/tr/privacy/",
      es: "/es/privacy/",
      de: "/de/privacy/",
      pt: "/pt/privacy/",
      fr: "/fr/privacy/",
      "x-default": "/privacy/",
    },
  },
};

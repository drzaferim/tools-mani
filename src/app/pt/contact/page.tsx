import type { Metadata } from "next";

export { default } from "@/app/contact/page";

export const metadata: Metadata = {
  title: "Contato | ToolsMani",
  description:
    "Fale com o ToolsMani: relate um erro, sugira uma ferramenta ou envie seu feedback. Lemos todas as mensagens.",
  alternates: {
    canonical: "/pt/contact/",
    languages: {
      en: "/contact/",
      tr: "/tr/contact/",
      es: "/es/contact/",
      de: "/de/contact/",
      pt: "/pt/contact/",
      fr: "/fr/contact/",
      "x-default": "/contact/",
    },
  },
};

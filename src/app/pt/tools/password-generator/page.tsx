import type { Metadata } from "next";

export { default } from "@/app/tools/password-generator/page";

export const metadata: Metadata = {
  title: "Gerador de Senhas - Grátis Online | ToolsMani",
  description:
    "Crie senhas fortes e seguras com comprimento e caracteres personalizáveis.",
  alternates: {
    canonical: "/pt/tools/password-generator/",
    languages: {
      en: "/tools/password-generator/",
      tr: "/tr/tools/password-generator/",
      es: "/es/tools/password-generator/",
      de: "/de/tools/password-generator/",
      pt: "/pt/tools/password-generator/",
      fr: "/fr/tools/password-generator/",
      "x-default": "/tools/password-generator/",
    },
  },
};

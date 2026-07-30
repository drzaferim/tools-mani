import type { Metadata } from "next";

export { default } from "@/app/terms/page";

export const metadata: Metadata = {
  title: "Termos de uso | ToolsMani",
  description:
    "Termos de uso do ToolsMani: como usar as ferramentas, abrangência da garantia e limites de responsabilidade.",
  alternates: {
    canonical: "/pt/terms/",
    languages: {
      en: "/terms/",
      tr: "/tr/terms/",
      es: "/es/terms/",
      de: "/de/terms/",
      pt: "/pt/terms/",
      fr: "/fr/terms/",
      "x-default": "/terms/",
    },
  },
};

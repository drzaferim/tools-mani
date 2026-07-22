import type { Metadata } from "next";

export { default } from "@/app/tools/pdf-pages/page";

export const metadata: Metadata = {
  title: "Gerenciador de Páginas - Grátis Online | ToolsMani",
  description:
    "Extraia ou exclua páginas específicas. Selecione ímpares, pares ou personalizadas.",
  alternates: {
    canonical: "/pt/tools/pdf-pages/",
    languages: {
      en: "/tools/pdf-pages/",
      tr: "/tr/tools/pdf-pages/",
      es: "/es/tools/pdf-pages/",
      de: "/de/tools/pdf-pages/",
      pt: "/pt/tools/pdf-pages/",
      fr: "/fr/tools/pdf-pages/",
      "x-default": "/tools/pdf-pages/",
    },
  },
};

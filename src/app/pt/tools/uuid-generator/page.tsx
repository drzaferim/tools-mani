import type { Metadata } from "next";

export { default } from "@/app/tools/uuid-generator/page";

export const metadata: Metadata = {
  title: "Gerador UUID e Hash - Grátis Online | ToolsMani",
  description:
    "Gere UUID v4 aleatórios em massa e calcule hashes SHA-256 de qualquer texto.",
  alternates: {
    canonical: "/pt/tools/uuid-generator/",
    languages: {
      en: "/tools/uuid-generator/",
      tr: "/tr/tools/uuid-generator/",
      es: "/es/tools/uuid-generator/",
      de: "/de/tools/uuid-generator/",
      pt: "/pt/tools/uuid-generator/",
      fr: "/fr/tools/uuid-generator/",
      "x-default": "/tools/uuid-generator/",
    },
  },
};

import type { Metadata } from "next";

export { default } from "@/app/tools/uuid-generator/page";

export const metadata: Metadata = {
  title: "Generador UUID y Hash - Gratis Online | ToolsMani",
  description:
    "Genera UUID v4 aleatorios en masa y calcula hashes SHA-256 de cualquier texto.",
  alternates: {
    canonical: "/es/tools/uuid-generator/",
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

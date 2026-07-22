import type { Metadata } from "next";

export { default } from "@/app/tools/lorem-ipsum/page";

export const metadata: Metadata = {
  title: "Generador Lorem Ipsum - Gratis Online | ToolsMani",
  description:
    "Genera texto de relleno en párrafos, frases o palabras. Perfecto para maquetas.",
  alternates: {
    canonical: "/es/tools/lorem-ipsum/",
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

import type { Metadata } from "next";

export { default } from "@/app/tools/text-counter/page";

export const metadata: Metadata = {
  title: "Contador de Palabras - Gratis Online | ToolsMani",
  description:
    "Cuenta palabras, caracteres, frases y párrafos al instante. Ideal para ensayos y redes sociales.",
  alternates: {
    canonical: "/es/tools/text-counter/",
    languages: {
      en: "/tools/text-counter/",
      tr: "/tr/tools/text-counter/",
      es: "/es/tools/text-counter/",
      de: "/de/tools/text-counter/",
      pt: "/pt/tools/text-counter/",
      fr: "/fr/tools/text-counter/",
      "x-default": "/tools/text-counter/",
    },
  },
};

import type { Metadata } from "next";

export { default } from "@/app/tools/json-formatter/page";

export const metadata: Metadata = {
  title: "Formatador JSON - Grátis Online | ToolsMani",
  description:
    "Formate, valide, embeleze e minifique JSON diretamente no navegador.",
  alternates: {
    canonical: "/pt/tools/json-formatter/",
    languages: {
      en: "/tools/json-formatter/",
      tr: "/tr/tools/json-formatter/",
      es: "/es/tools/json-formatter/",
      de: "/de/tools/json-formatter/",
      pt: "/pt/tools/json-formatter/",
      fr: "/fr/tools/json-formatter/",
      "x-default": "/tools/json-formatter/",
    },
  },
};

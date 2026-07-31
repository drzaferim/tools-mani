import type { Metadata } from "next";

export { default } from "@/app/tools/json-formatter/page";

export const metadata: Metadata = {
  title: "Formateur JSON - Gratuit en Ligne | ToolsMani",
  description:
    "Formatez, validez, embellissez et minifiez du JSON directement dans votre navigateur.",
  alternates: {
    canonical: "/fr/tools/json-formatter/",
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

import type { Metadata } from "next";

export { default } from "@/app/tools/json-formatter/page";

export const metadata: Metadata = {
  title: "Formateador JSON - Gratis Online | ToolsMani",
  description:
    "Formatea, valida, embellece y minifica JSON directamente en tu navegador.",
  alternates: {
    canonical: "/es/tools/json-formatter/",
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

import type { Metadata } from "next";

export { default } from "@/app/tools/csv-json/page";

export const metadata: Metadata = {
  title: "Conversor CSV ↔ JSON - Grátis Online | ToolsMani",
  description:
    "Converta CSV em JSON e arrays JSON em CSV. Campos com aspas e delimitadores.",
  alternates: {
    canonical: "/pt/tools/csv-json/",
    languages: {
      en: "/tools/csv-json/",
      tr: "/tr/tools/csv-json/",
      es: "/es/tools/csv-json/",
      de: "/de/tools/csv-json/",
      pt: "/pt/tools/csv-json/",
      fr: "/fr/tools/csv-json/",
      "x-default": "/tools/csv-json/",
    },
  },
};

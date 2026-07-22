import type { Metadata } from "next";

export { default } from "@/app/tools/csv-json/page";

export const metadata: Metadata = {
  title: "Conversor CSV ↔ JSON - Gratis Online | ToolsMani",
  description:
    "Convierte CSV a JSON y arrays JSON a CSV. Campos entrecomillados y delimitadores.",
  alternates: {
    canonical: "/es/tools/csv-json/",
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

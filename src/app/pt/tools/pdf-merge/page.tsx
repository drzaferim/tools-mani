import type { Metadata } from "next";

export { default } from "@/app/tools/pdf-merge/page";

export const metadata: Metadata = {
  title: "Juntar PDF - Grátis Online | ToolsMani",
  description:
    "Junte vários PDFs em um único arquivo. Arraste para reordenar as páginas.",
  alternates: {
    canonical: "/pt/tools/pdf-merge/",
    languages: {
      en: "/tools/pdf-merge/",
      tr: "/tr/tools/pdf-merge/",
      es: "/es/tools/pdf-merge/",
      de: "/de/tools/pdf-merge/",
      pt: "/pt/tools/pdf-merge/",
      fr: "/fr/tools/pdf-merge/",
      "x-default": "/tools/pdf-merge/",
    },
  },
};

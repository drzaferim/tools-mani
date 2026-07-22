import type { Metadata } from "next";

export { default } from "@/app/tools/pdf-merge/page";

export const metadata: Metadata = {
  title: "Unir PDF - Gratis Online | ToolsMani",
  description:
    "Une varios PDF en un solo archivo. Arrastra para reordenar las páginas.",
  alternates: {
    canonical: "/es/tools/pdf-merge/",
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

import type { Metadata } from "next";

export { default } from "@/app/tools/timestamp-converter/page";

export const metadata: Metadata = {
  title: "Conversor Timestamp Unix - Grátis Online | ToolsMani",
  description:
    "Converta timestamps Unix em datas legíveis e vice-versa, em hora local e UTC.",
  alternates: {
    canonical: "/pt/tools/timestamp-converter/",
    languages: {
      en: "/tools/timestamp-converter/",
      tr: "/tr/tools/timestamp-converter/",
      es: "/es/tools/timestamp-converter/",
      de: "/de/tools/timestamp-converter/",
      pt: "/pt/tools/timestamp-converter/",
      fr: "/fr/tools/timestamp-converter/",
      "x-default": "/tools/timestamp-converter/",
    },
  },
};

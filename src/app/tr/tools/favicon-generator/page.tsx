import type { Metadata } from "next";

export { default } from "@/app/tools/favicon-generator/page";

export const metadata: Metadata = {
  title: "Favicon Üretici - ICO ve PNG Oluşturma | ToolsMani",
  description:
    "Bir görselden eksiksiz favicon seti üretin: favicon.ico, tüm PNG boyutları ve hazır HTML etiketleri. Tamamen tarayıcıda çalışır.",
  alternates: {
    canonical: "/tr/tools/favicon-generator/",
    languages: {
      en: "/tools/favicon-generator/",
      tr: "/tr/tools/favicon-generator/",
      "x-default": "/tools/favicon-generator/",
    },
  },
};

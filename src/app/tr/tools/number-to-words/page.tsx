import type { Metadata } from "next";

export { default } from "@/app/tools/number-to-words/page";

export const metadata: Metadata = {
  title: "Sayıyı Yazıya Çevirme - Yazıyla Sayı | ToolsMani",
  description:
    "Sayıların Türkçe ve İngilizce okunuşunu yazıya çevirin — fatura, çek ve resmi formlar için. Ondalık desteği. Ücretsiz.",
  alternates: {
    canonical: "/tr/tools/number-to-words/",
    languages: {
      en: "/tools/number-to-words/",
      tr: "/tr/tools/number-to-words/",
      "x-default": "/tools/number-to-words/",
    },
  },
};

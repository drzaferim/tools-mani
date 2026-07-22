import type { Metadata } from "next";

export { default } from "@/app/tools/timestamp-converter/page";

export const metadata: Metadata = {
  title: "Unix Timestamp Çevirici - Epoch Tarih Dönüştürme | ToolsMani",
  description:
    "Unix zaman damgasını tarihe, tarihi timestamp'e çevirin. Yerel saat ve UTC gösterimi, canlı epoch saati. Ücretsiz.",
  alternates: {
    canonical: "/tr/tools/timestamp-converter/",
    languages: {
      en: "/tools/timestamp-converter/",
      tr: "/tr/tools/timestamp-converter/",
      "x-default": "/tools/timestamp-converter/",
    },
  },
};

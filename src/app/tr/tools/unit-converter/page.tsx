import type { Metadata } from "next";

export { default } from "@/app/tools/unit-converter/page";

export const metadata: Metadata = {
  title: "Birim Çevirici | ToolsMani",
  description:
    "Uzunluk, ağırlık, sıcaklık, alan ve hacim birimlerini anında çevirin. Ücretsiz online birim dönüştürücü, tarayıcıda çalışır.",
  alternates: {
    canonical: "/tr/tools/unit-converter/",
    languages: {
      en: "/tools/unit-converter/",
      tr: "/tr/tools/unit-converter/",
      "x-default": "/tools/unit-converter/",
    },
  },
};

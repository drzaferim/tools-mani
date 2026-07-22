import type { Metadata } from "next";

export { default } from "@/app/tools/case-converter/page";

export const metadata: Metadata = {
  title: "Büyük Küçük Harf Dönüştürücü | ToolsMani",
  description:
    "Metni büyük harfe, küçük harfe, kelime başı büyüğe, camelCase ve snake_case biçimine çevirin. Türkçe karakter (İ/ı) desteği. Ücretsiz.",
  alternates: {
    canonical: "/tr/tools/case-converter/",
    languages: {
      en: "/tools/case-converter/",
      tr: "/tr/tools/case-converter/",
      "x-default": "/tools/case-converter/",
    },
  },
};

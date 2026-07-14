import type { Metadata } from "next";

export { default } from "@/app/page";

export const metadata: Metadata = {
  title: "ToolsMani - Ücretsiz Online Araçlar",
  description:
    "Ücretsiz online araçlar: PDF birleştirme, bölme, sıkıştırma, resim sıkıştırma, kelime sayacı, JSON biçimlendirici, QR kod ve daha fazlası. Hızlı, gizli ve kolay.",
  alternates: {
    canonical: "/tr/",
    languages: {
      en: "/",
      tr: "/tr/",
      "x-default": "/",
    },
  },
};

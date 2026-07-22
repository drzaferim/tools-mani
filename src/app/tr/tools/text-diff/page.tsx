import type { Metadata } from "next";

export { default } from "@/app/tools/text-diff/page";

export const metadata: Metadata = {
  title: "Metin Karşılaştırma - Fark Bulucu | ToolsMani",
  description:
    "İki metin arasındaki farkları satır satır görün. Ücretsiz online metin karşılaştırma aracı; hiçbir şey sunucuya yüklenmez.",
  alternates: {
    canonical: "/tr/tools/text-diff/",
    languages: {
      en: "/tools/text-diff/",
      tr: "/tr/tools/text-diff/",
      "x-default": "/tools/text-diff/",
    },
  },
};

import type { Metadata } from "next";

export { default } from "@/app/tools/markdown-preview/page";

export const metadata: Metadata = {
  title: "Markdown Önizleme | ToolsMani",
  description:
    "Markdown yazın, anında HTML önizlemesini görün. GFM (tablo, liste) desteği. Ücretsiz online markdown editörü.",
  alternates: {
    canonical: "/tr/tools/markdown-preview/",
    languages: {
      en: "/tools/markdown-preview/",
      tr: "/tr/tools/markdown-preview/",
      "x-default": "/tools/markdown-preview/",
    },
  },
};

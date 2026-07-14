import type { Metadata } from "next";

export { default } from "@/app/tools/image-compress/page";

export const metadata: Metadata = {
  title: "Resim Sıkıştırma - Fotoğraf Boyutu Küçültme | ToolsMani",
  description:
    "JPG, PNG ve WebP resimleri kalite kaybını en aza indirerek sıkıştırın. Ücretsiz, limitsiz ve gizlilik dostu — tamamen tarayıcıda çalışır.",
  alternates: {
    canonical: "/tr/tools/image-compress/",
    languages: {
      en: "/tools/image-compress/",
      tr: "/tr/tools/image-compress/",
      "x-default": "/tools/image-compress/",
    },
  },
};

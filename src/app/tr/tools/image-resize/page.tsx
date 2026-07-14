import type { Metadata } from "next";

export { default } from "@/app/tools/image-resize/page";

export const metadata: Metadata = {
  title: "Resim Boyutlandırma - Fotoğraf Boyutu Değiştirme | ToolsMani",
  description:
    "JPG, PNG ve WebP resimleri piksel genişliğine veya yüzdeye göre boyutlandırın. Toplu işlem, en-boy oranı korunur. Ücretsiz, tarayıcıda çalışır.",
  alternates: {
    canonical: "/tr/tools/image-resize/",
    languages: {
      en: "/tools/image-resize/",
      tr: "/tr/tools/image-resize/",
      "x-default": "/tools/image-resize/",
    },
  },
};

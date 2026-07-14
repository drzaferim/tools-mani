import type { Metadata } from "next";

export { default } from "@/app/tools/image-convert/page";

export const metadata: Metadata = {
  title: "Resim Format Dönüştürücü (PNG, JPG, WebP) | ToolsMani",
  description:
    "Resimleri PNG, JPG ve WebP formatları arasında dönüştürün. Kalite ayarı ve toplu dönüştürme. Ücretsiz ve tarayıcı tabanlı.",
  alternates: {
    canonical: "/tr/tools/image-convert/",
    languages: {
      en: "/tools/image-convert/",
      tr: "/tr/tools/image-convert/",
      "x-default": "/tools/image-convert/",
    },
  },
};

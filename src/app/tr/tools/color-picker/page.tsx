import type { Metadata } from "next";

export { default } from "@/app/tools/color-picker/page";

export const metadata: Metadata = {
  title: "Renk Seçici - HEX, RGB, HSL Çevirici | ToolsMani",
  description:
    "Renk seçin; HEX, RGB ve HSL kodlarını anında alın. Formatlar arası dönüştürme. Tasarımcılar için ücretsiz araç.",
  alternates: {
    canonical: "/tr/tools/color-picker/",
    languages: {
      en: "/tools/color-picker/",
      tr: "/tr/tools/color-picker/",
      "x-default": "/tools/color-picker/",
    },
  },
};

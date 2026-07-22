import type { Metadata } from "next";

export { default } from "@/app/tools/age-calculator/page";

export const metadata: Metadata = {
  title: "Yaş Hesaplama - Doğum Tarihine Göre Yaş Bulma | ToolsMani",
  description:
    "Doğum tarihinize göre yaşınızı yıl, ay ve gün olarak hesaplayın. Toplam gün, hafta, saat ve sonraki doğum gününüze kalan süre. Ücretsiz.",
  alternates: {
    canonical: "/tr/tools/age-calculator/",
    languages: {
      en: "/tools/age-calculator/",
      tr: "/tr/tools/age-calculator/",
      "x-default": "/tools/age-calculator/",
    },
  },
};

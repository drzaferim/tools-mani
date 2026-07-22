import type { Metadata } from "next";

export { default } from "@/app/tools/vat-calculator/page";

export const metadata: Metadata = {
  title: "KDV Hesaplama - KDV Dahil / Hariç Hesaplayıcı | ToolsMani",
  description:
    "Net fiyata KDV ekleyin veya KDV dahil fiyattan ayırın. %1, %10, %20 hazır oranlar ve özel oran. Ücretsiz KDV hesaplama.",
  alternates: {
    canonical: "/tr/tools/vat-calculator/",
    languages: {
      en: "/tools/vat-calculator/",
      tr: "/tr/tools/vat-calculator/",
      "x-default": "/tools/vat-calculator/",
    },
  },
};

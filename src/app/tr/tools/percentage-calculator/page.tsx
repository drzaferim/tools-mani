import type { Metadata } from "next";

export { default } from "@/app/tools/percentage-calculator/page";

export const metadata: Metadata = {
  title: "Yüzde Hesaplama - Pratik Yüzde Hesaplayıcı | ToolsMani",
  description:
    "Bir sayının yüzdesi, bir sayının başka sayıya oranı ve yüzde değişim — anında sonuç. Ücretsiz yüzde hesaplama aracı.",
  alternates: {
    canonical: "/tr/tools/percentage-calculator/",
    languages: {
      en: "/tools/percentage-calculator/",
      tr: "/tr/tools/percentage-calculator/",
      "x-default": "/tools/percentage-calculator/",
    },
  },
};

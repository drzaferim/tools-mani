import type { Metadata } from "next";

export { default } from "@/app/about/page";

export const metadata: Metadata = {
  title: "Hakkımızda | ToolsMani",
  description:
    "ToolsMani'nin hikayesi: gizlilik öncelikli, tamamen ücretsiz online araçlar. Dosyalarınız tarayıcınızdan asla çıkmaz.",
  alternates: {
    canonical: "/tr/about/",
    languages: {
      en: "/about/",
      tr: "/tr/about/",
      "x-default": "/about/",
    },
  },
};

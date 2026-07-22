import type { Metadata } from "next";

export { default } from "@/app/tools/csv-json/page";

export const metadata: Metadata = {
  title: "CSV JSON Dönüştürücü | ToolsMani",
  description:
    "CSV'yi JSON'a, JSON'u CSV'ye çevirin. Tırnaklı alanlar ve noktalı virgül/sekme ayırıcı desteği. Ücretsiz geliştirici aracı.",
  alternates: {
    canonical: "/tr/tools/csv-json/",
    languages: {
      en: "/tools/csv-json/",
      tr: "/tr/tools/csv-json/",
      "x-default": "/tools/csv-json/",
    },
  },
};

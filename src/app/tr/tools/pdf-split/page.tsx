import type { Metadata } from "next";

export { default } from "@/app/tools/pdf-split/page";

export const metadata: Metadata = {
  title: "PDF Bölme - PDF'i Sayfalara Ayırma | ToolsMani",
  description:
    "PDF dosyasını ücretsiz bölün: sayfa aralığı seçin, sayfaları tek tek ayırın veya her N sayfada bölün. Tamamen tarayıcıda çalışır, dosyanız yüklenmez.",
  alternates: {
    canonical: "/tr/tools/pdf-split/",
    languages: {
      en: "/tools/pdf-split/",
      tr: "/tr/tools/pdf-split/",
      "x-default": "/tools/pdf-split/",
    },
  },
};

import type { Metadata } from "next";

export { default } from "@/app/tools/pdf-pages/page";

export const metadata: Metadata = {
  title: "PDF Sayfa Silme ve Ayıklama | ToolsMani",
  description:
    "PDF'ten istediğiniz sayfaları silin veya ayıklayın. Sayfaları görsel olarak seçin, indirin. Ücretsiz ve gizlilik dostu — dosya sunucuya gitmez.",
  alternates: {
    canonical: "/tr/tools/pdf-pages/",
    languages: {
      en: "/tools/pdf-pages/",
      tr: "/tr/tools/pdf-pages/",
      "x-default": "/tools/pdf-pages/",
    },
  },
};

import type { Metadata } from "next";

export { default } from "@/app/tools/image-to-pdf/page";

export const metadata: Metadata = {
  title: "Resimden PDF Yapma (JPG - PDF) | ToolsMani",
  description:
    "JPG, PNG ve diğer resimleri tek PDF'te birleştirin. Sıralama ve sayfa boyutu seçenekleri. Ücretsiz, tarayıcıda çalışır.",
  alternates: {
    canonical: "/tr/tools/image-to-pdf/",
    languages: {
      en: "/tools/image-to-pdf/",
      tr: "/tr/tools/image-to-pdf/",
      "x-default": "/tools/image-to-pdf/",
    },
  },
};

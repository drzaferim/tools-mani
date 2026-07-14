import type { Metadata } from "next";

export { default } from "@/app/tools/pdf-sign/page";

export const metadata: Metadata = {
  title: "PDF İmzalama - Online İmza Ekleme (Ücretsiz) | ToolsMani",
  description:
    "İmzanızı çizin ve PDF'in istediğiniz sayfasına yerleştirin. %100 gizli — belge ve imzanız tarayıcınızdan çıkmaz. Ücretsiz, kayıtsız.",
  alternates: {
    canonical: "/tr/tools/pdf-sign/",
    languages: {
      en: "/tools/pdf-sign/",
      tr: "/tr/tools/pdf-sign/",
      "x-default": "/tools/pdf-sign/",
    },
  },
};

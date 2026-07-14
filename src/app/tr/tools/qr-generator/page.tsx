import type { Metadata } from "next";

export { default } from "@/app/tools/qr-generator/page";

export const metadata: Metadata = {
  title: "QR Kod Oluşturucu | ToolsMani",
  description:
    "Metin veya bağlantı için ücretsiz QR kod oluşturun. Boyut seçenekleri, PNG indirme. Kayıt gerektirmez, anında hazır.",
  alternates: {
    canonical: "/tr/tools/qr-generator/",
    languages: {
      en: "/tools/qr-generator/",
      tr: "/tr/tools/qr-generator/",
      "x-default": "/tools/qr-generator/",
    },
  },
};

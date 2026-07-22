import type { Metadata } from "next";

export { default } from "@/app/tools/jwt-decoder/page";

export const metadata: Metadata = {
  title: "JWT Çözücü - Token İçeriğini Görüntüleme | ToolsMani",
  description:
    "JWT başlık ve içeriğini tarayıcınızda çözün. Son geçerlilik kontrolü dahil; token hiçbir yere gönderilmez. Ücretsiz.",
  alternates: {
    canonical: "/tr/tools/jwt-decoder/",
    languages: {
      en: "/tools/jwt-decoder/",
      tr: "/tr/tools/jwt-decoder/",
      "x-default": "/tools/jwt-decoder/",
    },
  },
};

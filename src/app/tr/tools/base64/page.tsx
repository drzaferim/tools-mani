import type { Metadata } from "next";

export { default } from "@/app/tools/base64/page";

export const metadata: Metadata = {
  title: "Base64 Çevirici - Kodlama ve Çözme | ToolsMani",
  description:
    "Metni Base64'e kodlayın veya Base64'ü metne çevirin. UTF-8 desteği. Ücretsiz geliştirici aracı, tamamen tarayıcıda çalışır.",
  alternates: {
    canonical: "/tr/tools/base64/",
    languages: {
      en: "/tools/base64/",
      tr: "/tr/tools/base64/",
      "x-default": "/tools/base64/",
    },
  },
};

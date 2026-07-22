import type { Metadata } from "next";

export { default } from "@/app/tools/url-encode/page";

export const metadata: Metadata = {
  title: "URL Kodlayıcı / Çözücü (Encode - Decode) | ToolsMani",
  description:
    "Metni URL için yüzde-kodlayın veya kodlanmış URL'yi çözün. Bileşen ve tam URL modları. Ücretsiz, tamamen tarayıcıda.",
  alternates: {
    canonical: "/tr/tools/url-encode/",
    languages: {
      en: "/tools/url-encode/",
      tr: "/tr/tools/url-encode/",
      "x-default": "/tools/url-encode/",
    },
  },
};

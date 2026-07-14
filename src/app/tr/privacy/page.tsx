import type { Metadata } from "next";

export { default } from "@/app/privacy/page";

export const metadata: Metadata = {
  title: "Gizlilik Politikası | ToolsMani",
  description:
    "ToolsMani gizlilik politikası. Dosyalarınız tamamen tarayıcınızda işlenir, asla yüklenmez. Hangi sınırlı veriyi neden topladığımızı öğrenin.",
  alternates: {
    canonical: "/tr/privacy/",
    languages: {
      en: "/privacy/",
      tr: "/tr/privacy/",
      "x-default": "/privacy/",
    },
  },
};

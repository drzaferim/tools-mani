import type { Metadata } from "next";

export { default } from "@/app/contact/page";

export const metadata: Metadata = {
  title: "İletişim | ToolsMani",
  description:
    "ToolsMani ile iletişime geçin: hata bildirin, yeni araç önerin veya geri bildirim gönderin. Her mesajı okuyoruz.",
  alternates: {
    canonical: "/tr/contact/",
    languages: {
      en: "/contact/",
      tr: "/tr/contact/",
      "x-default": "/contact/",
    },
  },
};

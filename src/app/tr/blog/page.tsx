import type { Metadata } from "next";

export { default } from "@/app/blog/page";

export const metadata: Metadata = {
  title: "Rehberler ve Blog | ToolsMani",
  description:
    "PDF, görsel ve dijital dosyalarınızı gizli ve hızlı biçimde yönetmek için uygulamalı Türkçe rehberler.",
  alternates: {
    canonical: "/tr/blog/",
    languages: {
      en: "/blog/",
      tr: "/tr/blog/",
      "x-default": "/blog/",
    },
  },
};

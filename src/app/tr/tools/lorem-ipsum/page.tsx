import type { Metadata } from "next";

export { default } from "@/app/tools/lorem-ipsum/page";

export const metadata: Metadata = {
  title: "Lorem Ipsum Üretici | ToolsMani",
  description:
    "Tasarım ve şablonlar için lorem ipsum yer tutucu metni üretin. Paragraf, cümle ve kelime sayısı seçenekleri. Ücretsiz.",
  alternates: {
    canonical: "/tr/tools/lorem-ipsum/",
    languages: {
      en: "/tools/lorem-ipsum/",
      tr: "/tr/tools/lorem-ipsum/",
      "x-default": "/tools/lorem-ipsum/",
    },
  },
};

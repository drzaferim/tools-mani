import type { Metadata } from "next";

export { default } from "@/app/terms/page";

export const metadata: Metadata = {
  title: "Kullanım Şartları | ToolsMani",
  description:
    "ToolsMani kullanım şartları: araçların kullanımı, garanti kapsamı ve sorumluluk sınırları.",
  alternates: {
    canonical: "/tr/terms/",
    languages: {
      en: "/terms/",
      tr: "/tr/terms/",
      es: "/es/terms/",
      de: "/de/terms/",
      pt: "/pt/terms/",
      fr: "/fr/terms/",
      "x-default": "/terms/",
    },
  },
};

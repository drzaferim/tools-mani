import type { Metadata } from "next";

export { default } from "@/app/terms/page";

export const metadata: Metadata = {
  title: "Kullanım Şartları | ToolsMani",
  description:
    "ToolsMani ücretsiz online araçlarının sade dille yazılmış kullanım şartları.",
  alternates: {
    canonical: "/tr/terms/",
    languages: {
      en: "/terms/",
      tr: "/tr/terms/",
      "x-default": "/terms/",
    },
  },
};

import type { Metadata } from "next";

export { default } from "@/app/tools/url-encode/page";

export const metadata: Metadata = {
  title: "Encodeur d'URL - Gratuit en Ligne | ToolsMani",
  description:
    "Encodez du texte pour les URL ou décodez les URL encodées en texte lisible.",
  alternates: {
    canonical: "/fr/tools/url-encode/",
    languages: {
      en: "/tools/url-encode/",
      tr: "/tr/tools/url-encode/",
      es: "/es/tools/url-encode/",
      de: "/de/tools/url-encode/",
      pt: "/pt/tools/url-encode/",
      fr: "/fr/tools/url-encode/",
      "x-default": "/tools/url-encode/",
    },
  },
};

import type { Metadata } from "next";

export { default } from "@/app/tools/url-encode/page";

export const metadata: Metadata = {
  title: "Codificador de URL - Grátis Online | ToolsMani",
  description:
    "Codifique texto para URLs ou decodifique URLs codificadas em texto legível.",
  alternates: {
    canonical: "/pt/tools/url-encode/",
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

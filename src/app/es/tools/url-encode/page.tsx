import type { Metadata } from "next";

export { default } from "@/app/tools/url-encode/page";

export const metadata: Metadata = {
  title: "Codificador de URL - Gratis Online | ToolsMani",
  description:
    "Codifica texto para URLs o decodifica URLs codificadas a texto legible.",
  alternates: {
    canonical: "/es/tools/url-encode/",
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

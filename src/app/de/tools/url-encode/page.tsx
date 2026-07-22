import type { Metadata } from "next";

export { default } from "@/app/tools/url-encode/page";

export const metadata: Metadata = {
  title: "URL-Encoder/Decoder - Kostenlos Online | ToolsMani",
  description:
    "Text für URLs kodieren oder prozentkodierte URLs in lesbaren Text dekodieren.",
  alternates: {
    canonical: "/de/tools/url-encode/",
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

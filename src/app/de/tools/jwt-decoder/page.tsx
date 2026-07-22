import type { Metadata } from "next";

export { default } from "@/app/tools/jwt-decoder/page";

export const metadata: Metadata = {
  title: "JWT-Decoder - Kostenlos Online | ToolsMani",
  description:
    "JWT-Header und -Payload lokal dekodieren. Der Token verlässt Ihren Browser nicht.",
  alternates: {
    canonical: "/de/tools/jwt-decoder/",
    languages: {
      en: "/tools/jwt-decoder/",
      tr: "/tr/tools/jwt-decoder/",
      es: "/es/tools/jwt-decoder/",
      de: "/de/tools/jwt-decoder/",
      pt: "/pt/tools/jwt-decoder/",
      fr: "/fr/tools/jwt-decoder/",
      "x-default": "/tools/jwt-decoder/",
    },
  },
};

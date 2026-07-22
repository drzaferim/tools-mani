import type { Metadata } from "next";

export { default } from "@/app/tools/base64/page";

export const metadata: Metadata = {
  title: "Encodeur Base64 - Gratuit en Ligne | ToolsMani",
  description:
    "Encodez du texte en Base64 ou décodez-le. Compatible UTF-8.",
  alternates: {
    canonical: "/fr/tools/base64/",
    languages: {
      en: "/tools/base64/",
      tr: "/tr/tools/base64/",
      es: "/es/tools/base64/",
      de: "/de/tools/base64/",
      pt: "/pt/tools/base64/",
      fr: "/fr/tools/base64/",
      "x-default": "/tools/base64/",
    },
  },
};

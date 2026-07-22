import type { Metadata } from "next";

export { default } from "@/app/tools/qr-generator/page";

export const metadata: Metadata = {
  title: "Gerador de QR Code - Grátis Online | ToolsMani",
  description:
    "Gere códigos QR para URLs, texto, Wi-Fi e mais. Baixe em PNG ou SVG.",
  alternates: {
    canonical: "/pt/tools/qr-generator/",
    languages: {
      en: "/tools/qr-generator/",
      tr: "/tr/tools/qr-generator/",
      es: "/es/tools/qr-generator/",
      de: "/de/tools/qr-generator/",
      pt: "/pt/tools/qr-generator/",
      fr: "/fr/tools/qr-generator/",
      "x-default": "/tools/qr-generator/",
    },
  },
};

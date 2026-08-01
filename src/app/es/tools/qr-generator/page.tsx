import type { Metadata } from "next";

export { default } from "@/app/tools/qr-generator/page";

export const metadata: Metadata = {
  title: "Generador de Códigos QR - Gratis Online | ToolsMani",
  description:
    "Genera códigos QR para URLs, texto, Wi-Fi y más. Descarga en PNG.",
  alternates: {
    canonical: "/es/tools/qr-generator/",
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

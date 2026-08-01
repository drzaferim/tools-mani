import type { Metadata } from "next";

export { default } from "@/app/tools/qr-generator/page";

export const metadata: Metadata = {
  title: "QR-Code-Generator - Kostenlos Online | ToolsMani",
  description:
    "QR-Codes für URLs, Text, WLAN und mehr erstellen. Als PNG herunterladen.",
  alternates: {
    canonical: "/de/tools/qr-generator/",
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

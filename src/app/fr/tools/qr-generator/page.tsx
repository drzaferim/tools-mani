import type { Metadata } from "next";

export { default } from "@/app/tools/qr-generator/page";

export const metadata: Metadata = {
  title: "Générateur de QR code - Gratuit en Ligne | ToolsMani",
  description:
    "Générez des QR codes pour URL, texte, Wi-Fi et plus. Téléchargez-les en PNG.",
  alternates: {
    canonical: "/fr/tools/qr-generator/",
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

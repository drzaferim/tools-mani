import type { Metadata } from "next";

export { default } from "@/app/page";

export const metadata: Metadata = {
  title: "ToolsMani - Outils en Ligne Gratuits et Privés",
  description:
    "Outils en ligne gratuits : fusionner, diviser et compresser des PDF, compresser des images, générer des QR codes et plus. Tout dans votre navigateur, sans envoi de fichiers.",
  alternates: {
    canonical: "/fr/",
    languages: {
      en: "/",
      tr: "/tr/",
      es: "/es/",
      de: "/de/",
      pt: "/pt/",
      fr: "/fr/",
      "x-default": "/",
    },
  },
};

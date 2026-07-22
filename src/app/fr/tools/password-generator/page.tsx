import type { Metadata } from "next";

export { default } from "@/app/tools/password-generator/page";

export const metadata: Metadata = {
  title: "Générateur de mots de passe - Gratuit en Ligne | ToolsMani",
  description:
    "Créez des mots de passe forts et sûrs, longueur et caractères personnalisables.",
  alternates: {
    canonical: "/fr/tools/password-generator/",
    languages: {
      en: "/tools/password-generator/",
      tr: "/tr/tools/password-generator/",
      es: "/es/tools/password-generator/",
      de: "/de/tools/password-generator/",
      pt: "/pt/tools/password-generator/",
      fr: "/fr/tools/password-generator/",
      "x-default": "/tools/password-generator/",
    },
  },
};

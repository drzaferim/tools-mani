import type { Metadata } from "next";

export { default } from "@/app/tools/jwt-decoder/page";

export const metadata: Metadata = {
  title: "Décodeur JWT - Gratuit en Ligne | ToolsMani",
  description:
    "Décodez l'en-tête et la charge utile d'un JWT localement. Le jeton ne quitte pas votre navigateur.",
  alternates: {
    canonical: "/fr/tools/jwt-decoder/",
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

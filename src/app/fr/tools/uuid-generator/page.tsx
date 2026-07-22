import type { Metadata } from "next";

export { default } from "@/app/tools/uuid-generator/page";

export const metadata: Metadata = {
  title: "Générateur UUID & Hash - Gratuit en Ligne | ToolsMani",
  description:
    "Générez des UUID v4 aléatoires en série et calculez des hachages SHA-256.",
  alternates: {
    canonical: "/fr/tools/uuid-generator/",
    languages: {
      en: "/tools/uuid-generator/",
      tr: "/tr/tools/uuid-generator/",
      es: "/es/tools/uuid-generator/",
      de: "/de/tools/uuid-generator/",
      pt: "/pt/tools/uuid-generator/",
      fr: "/fr/tools/uuid-generator/",
      "x-default": "/tools/uuid-generator/",
    },
  },
};

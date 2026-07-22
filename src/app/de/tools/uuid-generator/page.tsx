import type { Metadata } from "next";

export { default } from "@/app/tools/uuid-generator/page";

export const metadata: Metadata = {
  title: "UUID-Generator & Hash - Kostenlos Online | ToolsMani",
  description:
    "Zufällige UUID v4 in Serie erzeugen und SHA-256-Hashes von Text berechnen.",
  alternates: {
    canonical: "/de/tools/uuid-generator/",
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

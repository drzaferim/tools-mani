import type { Metadata } from "next";

export { default } from "@/app/about/page";

export const metadata: Metadata = {
  title: "À propos | ToolsMani",
  description:
    "L'histoire de ToolsMani : des outils en ligne gratuits, la confidentialité d'abord. Vos fichiers ne quittent jamais votre navigateur.",
  alternates: {
    canonical: "/fr/about/",
    languages: {
      en: "/about/",
      tr: "/tr/about/",
      es: "/es/about/",
      de: "/de/about/",
      pt: "/pt/about/",
      fr: "/fr/about/",
      "x-default": "/about/",
    },
  },
};

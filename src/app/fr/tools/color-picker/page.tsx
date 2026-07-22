import type { Metadata } from "next";

export { default } from "@/app/tools/color-picker/page";

export const metadata: Metadata = {
  title: "Sélecteur de couleurs - Gratuit en Ligne | ToolsMani",
  description:
    "Choisissez des couleurs et convertissez entre HEX, RGB et HSL. Copiez les valeurs instantanément.",
  alternates: {
    canonical: "/fr/tools/color-picker/",
    languages: {
      en: "/tools/color-picker/",
      tr: "/tr/tools/color-picker/",
      es: "/es/tools/color-picker/",
      de: "/de/tools/color-picker/",
      pt: "/pt/tools/color-picker/",
      fr: "/fr/tools/color-picker/",
      "x-default": "/tools/color-picker/",
    },
  },
};

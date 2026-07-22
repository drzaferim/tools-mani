import type { Metadata } from "next";

export { default } from "@/app/tools/color-picker/page";

export const metadata: Metadata = {
  title: "Seletor de Cores - Grátis Online | ToolsMani",
  description:
    "Escolha cores e converta entre HEX, RGB e HSL. Copie os valores na hora.",
  alternates: {
    canonical: "/pt/tools/color-picker/",
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

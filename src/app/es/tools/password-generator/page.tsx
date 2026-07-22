import type { Metadata } from "next";

export { default } from "@/app/tools/password-generator/page";

export const metadata: Metadata = {
  title: "Generador de Contraseñas - Gratis Online | ToolsMani",
  description:
    "Crea contraseñas fuertes y seguras con longitud y caracteres personalizables.",
  alternates: {
    canonical: "/es/tools/password-generator/",
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

import type { Metadata } from "next";

export { default } from "@/app/privacy/page";

export const metadata: Metadata = {
  title: "Política de privacidad | ToolsMani",
  description:
    "Política de privacidad de ToolsMani: tus archivos no salen de tu dispositivo ni se suben a ningún servidor. Explicamos con claridad qué datos recopilamos.",
  alternates: {
    canonical: "/es/privacy/",
    languages: {
      en: "/privacy/",
      tr: "/tr/privacy/",
      es: "/es/privacy/",
      de: "/de/privacy/",
      pt: "/pt/privacy/",
      fr: "/fr/privacy/",
      "x-default": "/privacy/",
    },
  },
};

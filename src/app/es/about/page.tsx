import type { Metadata } from "next";

export { default } from "@/app/about/page";

export const metadata: Metadata = {
  title: "Sobre nosotros | ToolsMani",
  description:
    "La historia de ToolsMani: herramientas online gratuitas con la privacidad por delante. Tus archivos nunca salen de tu navegador.",
  alternates: {
    canonical: "/es/about/",
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

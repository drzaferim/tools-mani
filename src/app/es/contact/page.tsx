import type { Metadata } from "next";

export { default } from "@/app/contact/page";

export const metadata: Metadata = {
  title: "Contacto | ToolsMani",
  description:
    "Ponte en contacto con ToolsMani: informa de un error, sugiere una herramienta o envía tus comentarios. Leemos todos los mensajes.",
  alternates: {
    canonical: "/es/contact/",
    languages: {
      en: "/contact/",
      tr: "/tr/contact/",
      es: "/es/contact/",
      de: "/de/contact/",
      pt: "/pt/contact/",
      fr: "/fr/contact/",
      "x-default": "/contact/",
    },
  },
};

import type { Metadata } from "next";

export { default } from "@/app/privacy/page";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | ToolsMani",
  description:
    "Datenschutzerklärung von ToolsMani: Ihre Dateien verlassen Ihr Gerät nicht und werden nicht hochgeladen. Wir erklären klar, welche Daten wir erheben.",
  alternates: {
    canonical: "/de/privacy/",
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

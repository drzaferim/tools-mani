import type { Metadata } from "next";

export { default } from "@/app/contact/page";

export const metadata: Metadata = {
  title: "Kontakt | ToolsMani",
  description:
    "Kontaktieren Sie ToolsMani: Fehler melden, ein Tool vorschlagen oder Feedback senden. Wir lesen jede Nachricht.",
  alternates: {
    canonical: "/de/contact/",
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

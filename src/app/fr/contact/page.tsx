import type { Metadata } from "next";

export { default } from "@/app/contact/page";

export const metadata: Metadata = {
  title: "Contact | ToolsMani",
  description:
    "Contactez ToolsMani : signalez un bug, proposez un outil ou envoyez vos retours. Nous lisons chaque message.",
  alternates: {
    canonical: "/fr/contact/",
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

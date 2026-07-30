import type { Metadata } from "next";

export { default } from "@/app/terms/page";

export const metadata: Metadata = {
  title: "Nutzungsbedingungen | ToolsMani",
  description:
    "Nutzungsbedingungen von ToolsMani: Nutzung der Tools, Umfang der Gewährleistung und Haftungsgrenzen.",
  alternates: {
    canonical: "/de/terms/",
    languages: {
      en: "/terms/",
      tr: "/tr/terms/",
      es: "/es/terms/",
      de: "/de/terms/",
      pt: "/pt/terms/",
      fr: "/fr/terms/",
      "x-default": "/terms/",
    },
  },
};

import type { Metadata } from "next";

export { default } from "@/app/tools/pdf/page";

export const metadata: Metadata = {
  title: "Kostenlose Online-PDF-Tools - Zusammenfügen, Teilen | ToolsMani",
  description:
    "Über 10 kostenlose PDF-Tools: zusammenfügen, teilen, komprimieren, drehen, unterschreiben, Wasserzeichen und mehr. Ohne Größenlimit, ohne Upload.",
  alternates: {
    canonical: "/de/tools/pdf/",
    languages: {
      en: "/tools/pdf/",
      tr: "/tr/tools/pdf/",
      es: "/es/tools/pdf/",
      de: "/de/tools/pdf/",
      pt: "/pt/tools/pdf/",
      fr: "/fr/tools/pdf/",
      "x-default": "/tools/pdf/",
    },
  },
};

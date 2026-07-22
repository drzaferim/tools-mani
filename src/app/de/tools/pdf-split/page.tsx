import type { Metadata } from "next";

export { default } from "@/app/tools/pdf-split/page";

export const metadata: Metadata = {
  title: "PDF teilen - Kostenlos Online | ToolsMani",
  description:
    "Ein PDF nach Seitenbereichen in mehrere Dateien teilen oder alle Seiten extrahieren.",
  alternates: {
    canonical: "/de/tools/pdf-split/",
    languages: {
      en: "/tools/pdf-split/",
      tr: "/tr/tools/pdf-split/",
      es: "/es/tools/pdf-split/",
      de: "/de/tools/pdf-split/",
      pt: "/pt/tools/pdf-split/",
      fr: "/fr/tools/pdf-split/",
      "x-default": "/tools/pdf-split/",
    },
  },
};

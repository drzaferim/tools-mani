import type { Metadata } from "next";

export { default } from "@/app/tools/markdown-preview/page";

export const metadata: Metadata = {
  title: "Markdown-Vorschau - Kostenlos Online | ToolsMani",
  description:
    "Markdown schreiben und live in der Vorschau sehen. Überschriften, Listen, Code und mehr.",
  alternates: {
    canonical: "/de/tools/markdown-preview/",
    languages: {
      en: "/tools/markdown-preview/",
      tr: "/tr/tools/markdown-preview/",
      es: "/es/tools/markdown-preview/",
      de: "/de/tools/markdown-preview/",
      pt: "/pt/tools/markdown-preview/",
      fr: "/fr/tools/markdown-preview/",
      "x-default": "/tools/markdown-preview/",
    },
  },
};

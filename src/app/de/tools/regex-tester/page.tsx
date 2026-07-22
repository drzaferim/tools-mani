import type { Metadata } from "next";

export { default } from "@/app/tools/regex-tester/page";

export const metadata: Metadata = {
  title: "Regex-Tester - Kostenlos Online | ToolsMani",
  description:
    "Reguläre Ausdrücke live testen, mit hervorgehobenen Treffern und Capture-Gruppen.",
  alternates: {
    canonical: "/de/tools/regex-tester/",
    languages: {
      en: "/tools/regex-tester/",
      tr: "/tr/tools/regex-tester/",
      es: "/es/tools/regex-tester/",
      de: "/de/tools/regex-tester/",
      pt: "/pt/tools/regex-tester/",
      fr: "/fr/tools/regex-tester/",
      "x-default": "/tools/regex-tester/",
    },
  },
};

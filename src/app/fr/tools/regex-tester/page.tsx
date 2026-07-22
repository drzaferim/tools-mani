import type { Metadata } from "next";

export { default } from "@/app/tools/regex-tester/page";

export const metadata: Metadata = {
  title: "Testeur de regex - Gratuit en Ligne | ToolsMani",
  description:
    "Testez des expressions régulières en direct avec correspondances surlignées et groupes de capture.",
  alternates: {
    canonical: "/fr/tools/regex-tester/",
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

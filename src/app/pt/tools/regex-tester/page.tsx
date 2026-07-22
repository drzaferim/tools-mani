import type { Metadata } from "next";

export { default } from "@/app/tools/regex-tester/page";

export const metadata: Metadata = {
  title: "Testador de Regex - Grátis Online | ToolsMani",
  description:
    "Teste expressões regulares ao vivo com correspondências destacadas e grupos de captura.",
  alternates: {
    canonical: "/pt/tools/regex-tester/",
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

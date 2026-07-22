import type { Metadata } from "next";

export { default } from "@/app/tools/regex-tester/page";

export const metadata: Metadata = {
  title: "Probador de Regex - Gratis Online | ToolsMani",
  description:
    "Prueba expresiones regulares en vivo con coincidencias resaltadas y grupos de captura.",
  alternates: {
    canonical: "/es/tools/regex-tester/",
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

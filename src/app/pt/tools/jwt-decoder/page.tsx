import type { Metadata } from "next";

export { default } from "@/app/tools/jwt-decoder/page";

export const metadata: Metadata = {
  title: "Decodificador JWT - Grátis Online | ToolsMani",
  description:
    "Decodifique cabeçalho e payload de um JWT localmente. O token não sai do navegador.",
  alternates: {
    canonical: "/pt/tools/jwt-decoder/",
    languages: {
      en: "/tools/jwt-decoder/",
      tr: "/tr/tools/jwt-decoder/",
      es: "/es/tools/jwt-decoder/",
      de: "/de/tools/jwt-decoder/",
      pt: "/pt/tools/jwt-decoder/",
      fr: "/fr/tools/jwt-decoder/",
      "x-default": "/tools/jwt-decoder/",
    },
  },
};

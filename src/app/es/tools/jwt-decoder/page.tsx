import type { Metadata } from "next";

export { default } from "@/app/tools/jwt-decoder/page";

export const metadata: Metadata = {
  title: "Decodificador JWT - Gratis Online | ToolsMani",
  description:
    "Decodifica encabezado y payload de un JWT localmente. El token no sale de tu navegador.",
  alternates: {
    canonical: "/es/tools/jwt-decoder/",
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

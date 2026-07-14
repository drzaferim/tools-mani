import type { Metadata } from "next";

export { default } from "@/app/tools/uuid-generator/page";

export const metadata: Metadata = {
  title: "UUID Üretici ve Metin Hash (SHA-256) | ToolsMani",
  description:
    "Toplu rastgele UUID v4 kimlikleri üretin; SHA-256, SHA-512 veya SHA-1 hash hesaplayın. Ücretsiz geliştirici aracı, tamamen tarayıcıda.",
  alternates: {
    canonical: "/tr/tools/uuid-generator/",
    languages: {
      en: "/tools/uuid-generator/",
      tr: "/tr/tools/uuid-generator/",
      "x-default": "/tools/uuid-generator/",
    },
  },
};

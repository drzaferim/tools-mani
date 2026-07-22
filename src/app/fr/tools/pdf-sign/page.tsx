import type { Metadata } from "next";

export { default } from "@/app/tools/pdf-sign/page";

export const metadata: Metadata = {
  title: "Signer un PDF - Gratuit en Ligne | ToolsMani",
  description:
    "Dessinez votre signature et placez-la sur n'importe quelle page. Le document ne quitte pas votre navigateur.",
  alternates: {
    canonical: "/fr/tools/pdf-sign/",
    languages: {
      en: "/tools/pdf-sign/",
      tr: "/tr/tools/pdf-sign/",
      es: "/es/tools/pdf-sign/",
      de: "/de/tools/pdf-sign/",
      pt: "/pt/tools/pdf-sign/",
      fr: "/fr/tools/pdf-sign/",
      "x-default": "/tools/pdf-sign/",
    },
  },
};

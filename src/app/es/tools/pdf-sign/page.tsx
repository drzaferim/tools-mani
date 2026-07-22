import type { Metadata } from "next";

export { default } from "@/app/tools/pdf-sign/page";

export const metadata: Metadata = {
  title: "Firmar PDF - Gratis Online | ToolsMani",
  description:
    "Dibuja tu firma y colócala en cualquier página del PDF. El documento no sale de tu navegador.",
  alternates: {
    canonical: "/es/tools/pdf-sign/",
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

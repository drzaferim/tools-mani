import type { Metadata } from "next";

export { default } from "@/app/privacy/page";

export const metadata: Metadata = {
  title: "Politique de confidentialité | ToolsMani",
  description:
    "Politique de confidentialité de ToolsMani : vos fichiers ne quittent pas votre appareil et ne sont pas envoyés à un serveur. Nous expliquons clairement les données collectées.",
  alternates: {
    canonical: "/fr/privacy/",
    languages: {
      en: "/privacy/",
      tr: "/tr/privacy/",
      es: "/es/privacy/",
      de: "/de/privacy/",
      pt: "/pt/privacy/",
      fr: "/fr/privacy/",
      "x-default": "/privacy/",
    },
  },
};

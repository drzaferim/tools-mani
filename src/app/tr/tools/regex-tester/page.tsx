import type { Metadata } from "next";

export { default } from "@/app/tools/regex-tester/page";

export const metadata: Metadata = {
  title: "Regex Test Aracı - Düzenli İfade Deneme | ToolsMani",
  description:
    "Düzenli ifadeleri canlı test edin: vurgulu eşleşmeler, yakalama grupları ve bayraklar. Ücretsiz, tamamen tarayıcıda.",
  alternates: {
    canonical: "/tr/tools/regex-tester/",
    languages: {
      en: "/tools/regex-tester/",
      tr: "/tr/tools/regex-tester/",
      "x-default": "/tools/regex-tester/",
    },
  },
};

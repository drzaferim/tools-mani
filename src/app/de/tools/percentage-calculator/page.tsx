import type { Metadata } from "next";

export { default } from "@/app/tools/percentage-calculator/page";

export const metadata: Metadata = {
  title: "Prozentrechner - Kostenlos Online | ToolsMani",
  description:
    "Was sind X % von Y, wie viel Prozent ist X von Y und prozentuale Änderung – sofort.",
  alternates: {
    canonical: "/de/tools/percentage-calculator/",
    languages: {
      en: "/tools/percentage-calculator/",
      tr: "/tr/tools/percentage-calculator/",
      es: "/es/tools/percentage-calculator/",
      de: "/de/tools/percentage-calculator/",
      pt: "/pt/tools/percentage-calculator/",
      fr: "/fr/tools/percentage-calculator/",
      "x-default": "/tools/percentage-calculator/",
    },
  },
};

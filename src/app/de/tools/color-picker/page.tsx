import type { Metadata } from "next";

export { default } from "@/app/tools/color-picker/page";

export const metadata: Metadata = {
  title: "Farbwähler & Konverter - Kostenlos Online | ToolsMani",
  description:
    "Farben wählen und zwischen HEX, RGB und HSL konvertieren. Werte sofort kopieren.",
  alternates: {
    canonical: "/de/tools/color-picker/",
    languages: {
      en: "/tools/color-picker/",
      tr: "/tr/tools/color-picker/",
      es: "/es/tools/color-picker/",
      de: "/de/tools/color-picker/",
      pt: "/pt/tools/color-picker/",
      fr: "/fr/tools/color-picker/",
      "x-default": "/tools/color-picker/",
    },
  },
};

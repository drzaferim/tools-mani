import type { Metadata } from "next";

export { default } from "@/app/tools/image-convert/page";

export const metadata: Metadata = {
  title: "Bildkonverter - Kostenlos Online | ToolsMani",
  description:
    "Bilder zwischen PNG, JPEG, WebP und BMP konvertieren. Stapelverarbeitung möglich.",
  alternates: {
    canonical: "/de/tools/image-convert/",
    languages: {
      en: "/tools/image-convert/",
      tr: "/tr/tools/image-convert/",
      es: "/es/tools/image-convert/",
      de: "/de/tools/image-convert/",
      pt: "/pt/tools/image-convert/",
      fr: "/fr/tools/image-convert/",
      "x-default": "/tools/image-convert/",
    },
  },
};

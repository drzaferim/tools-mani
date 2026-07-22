import type { Metadata } from "next";

export { default } from "@/app/tools/color-picker/page";

export const metadata: Metadata = {
  title: "Selector de Color - Gratis Online | ToolsMani",
  description:
    "Elige colores y convierte entre HEX, RGB y HSL. Copia los valores al instante.",
  alternates: {
    canonical: "/es/tools/color-picker/",
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

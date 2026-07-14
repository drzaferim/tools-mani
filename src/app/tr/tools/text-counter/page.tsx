import type { Metadata } from "next";

export { default } from "@/app/tools/text-counter/page";

export const metadata: Metadata = {
  title: "Kelime ve Karakter Sayacı | ToolsMani",
  description:
    "Metindeki kelime, karakter, cümle ve paragrafları anında sayın. Ücretsiz online kelime sayacı, tamamen tarayıcıda çalışır.",
  alternates: {
    canonical: "/tr/tools/text-counter/",
    languages: {
      en: "/tools/text-counter/",
      tr: "/tr/tools/text-counter/",
      "x-default": "/tools/text-counter/",
    },
  },
};

import type { Metadata } from "next";

export { default } from "@/app/tools/password-generator/page";

export const metadata: Metadata = {
  title: "Güçlü Şifre Oluşturucu | ToolsMani",
  description:
    "Kriptografik olarak güvenli, güçlü şifreler üretin. Uzunluk ve karakter seçenekleri. Şifreniz asla cihazınızdan çıkmaz.",
  alternates: {
    canonical: "/tr/tools/password-generator/",
    languages: {
      en: "/tools/password-generator/",
      tr: "/tr/tools/password-generator/",
      "x-default": "/tools/password-generator/",
    },
  },
};

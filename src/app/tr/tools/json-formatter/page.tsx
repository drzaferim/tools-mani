import type { Metadata } from "next";

export { default } from "@/app/tools/json-formatter/page";

export const metadata: Metadata = {
  title: "JSON Biçimlendirici ve Doğrulayıcı | ToolsMani",
  description:
    "JSON'u biçimlendirin, küçültün ve doğrulayın. Hatalı satırı gösterir. Ücretsiz geliştirici aracı, veriniz tarayıcıdan çıkmaz.",
  alternates: {
    canonical: "/tr/tools/json-formatter/",
    languages: {
      en: "/tools/json-formatter/",
      tr: "/tr/tools/json-formatter/",
      "x-default": "/tools/json-formatter/",
    },
  },
};

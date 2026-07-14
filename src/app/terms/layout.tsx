import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use - ToolsMani",
  description:
    "Terms of use for ToolsMani's free online tools. Plain-language rules for using the site.",
  alternates: {
    canonical: "/terms/",
    languages: {
      en: "/terms/",
      tr: "/tr/terms/",
      "x-default": "/terms/",
    },
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

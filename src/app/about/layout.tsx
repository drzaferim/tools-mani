import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - ToolsMani",
  description:
    "ToolsMani offers free, privacy-first online tools. All processing happens in your browser — your files never leave your device. Learn about our mission.",
  alternates: {
    canonical: "/about/",
    languages: {
      en: "/about/",
      tr: "/tr/about/",
      "x-default": "/about/",
    },
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

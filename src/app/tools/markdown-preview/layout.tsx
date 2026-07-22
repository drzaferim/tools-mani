import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Markdown Preview - Live Editor & Renderer | ToolsMani",
  description:
    "Write and preview Markdown in real time with this free online editor. Supports GitHub Flavored Markdown with live rendering, syntax highlighting, and export options.",
  alternates: {
    canonical: "/tools/markdown-preview/",
    languages: {
      en: "/tools/markdown-preview/",
      tr: "/tr/tools/markdown-preview/",
      "x-default": "/tools/markdown-preview/",
    },
  },
  openGraph: {
    title: "Markdown Preview - Live Editor & Renderer | ToolsMani",
    description:
      "Write and preview Markdown in real time. Free live editor with GitHub Flavored Markdown support.",
    images: ["/og-image.png"],
  },
};

export default function MarkdownPreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Markdown Preview - Live Editor & Renderer",
    url: "https://toolsmani.com/tools/markdown-preview/",
    description:
      "Write and preview Markdown in real time with this free online editor. Supports GitHub Flavored Markdown with live rendering, syntax highlighting, and export options.",
    applicationCategory: "UtilityApplication",
    operatingSystem: "All",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Converter - UPPERCASE, lowercase, Title Case | ToolsMani",
  description:
    "Convert text between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case and kebab-case. Free, instant, works in your browser.",
  alternates: {
    canonical: "/tools/case-converter/",
    languages: {
      en: "/tools/case-converter/",
      tr: "/tr/tools/case-converter/",
      "x-default": "/tools/case-converter/",
    },
  },
  openGraph: {
    title: "Case Converter - UPPERCASE, lowercase, Title Case | ToolsMani",
    description:
      "Convert text between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case and kebab-case. Free, instant, works in your browser.",
    images: ["/og-image.png"],
  },
};

export default function CaseConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Case Converter - UPPERCASE, lowercase, Title Case | ToolsMani",
    url: "https://toolsmani.com/tools/case-converter/",
    description:
      "Convert text between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case and kebab-case. Free, instant, works in your browser.",
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

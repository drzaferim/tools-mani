import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text Counter - Count Words, Characters & Sentences | ToolsMani",
  description:
    "Free online text counter tool. Instantly count words, characters, sentences, and paragraphs in your text. Perfect for writers, students, and SEO professionals.",
  alternates: {
    canonical: "/tools/text-counter/",
    languages: {
      en: "/tools/text-counter/",
      tr: "/tr/tools/text-counter/",
      "x-default": "/tools/text-counter/",
    },
  },
  openGraph: {
    title: "Text Counter - Count Words, Characters & Sentences | ToolsMani",
    description:
      "Count words, characters, sentences and paragraphs instantly with this free online text counter.",
  },
};

export default function TextCounterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Text Counter - Count Words, Characters & Sentences",
    url: "https://toolsmani.com/tools/text-counter/",
    description:
      "Free online text counter tool. Instantly count words, characters, sentences, and paragraphs in your text. Perfect for writers, students, and SEO professionals.",
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

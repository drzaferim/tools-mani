import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regex Tester - Test Regular Expressions Online | ToolsMani",
  description:
    "Test regular expressions live: highlighted matches, capture groups and flags. Free and fully client-side.",
  alternates: {
    canonical: "/tools/regex-tester/",
    languages: {
      en: "/tools/regex-tester/",
      tr: "/tr/tools/regex-tester/",
      "x-default": "/tools/regex-tester/",
    },
  },
  openGraph: {
    title: "Regex Tester - Test Regular Expressions Online | ToolsMani",
    description:
      "Test regular expressions live: highlighted matches, capture groups and flags. Free and fully client-side.",
    images: ["/og-image.png"],
  },
};

export default function RegexTesterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Regex Tester - Test Regular Expressions Online | ToolsMani",
    url: "https://toolsmani.com/tools/regex-tester/",
    description:
      "Test regular expressions live: highlighted matches, capture groups and flags. Free and fully client-side.",
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

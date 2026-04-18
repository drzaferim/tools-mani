import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Password Generator - Create Strong Secure Passwords | ToolsMani",
  description:
    "Generate strong, secure, and random passwords instantly. Customize length, include symbols, numbers, and uppercase letters. Free online password generator tool.",
  alternates: {
    canonical: "/tools/password-generator/",
  },
  openGraph: {
    title: "Password Generator - Create Strong Secure Passwords | ToolsMani",
    description:
      "Create strong, random passwords with customizable length and character options.",
  },
};

export default function PasswordGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Password Generator - Create Strong Secure Passwords",
    url: "https://toolsmani.com/tools/password-generator/",
    description:
      "Generate strong, secure, and random passwords instantly. Customize length, include symbols, numbers, and uppercase letters. Free online password generator tool.",
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

import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FeedbackWidget } from "@/components/FeedbackWidget";
import { LanguageProvider } from "@/lib/language-context";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

export const metadata: Metadata = {
  title: "ToolsMani - Free Online Tools for Everyone",
  description:
    "Free online tools: PDF merger, splitter, compressor, image compressor, text counter, JSON formatter, QR generator and more. Fast, private, and easy to use.",
  keywords: [
    "online tools",
    "pdf merge",
    "pdf split",
    "pdf compress",
    "image compress",
    "text counter",
    "json formatter",
    "qr code generator",
    "free tools",
    "pdf tools online free",
    "image converter",
    "png to jpg",
  ],
  openGraph: {
    title: "ToolsMani - Free Online Tools for Everyone",
    description:
      "Free online tools: PDF merger, splitter, compressor and more. 100% browser-based, no file uploads.",
    type: "website",
    url: "https://toolsmani.com",
    siteName: "ToolsMani",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "ToolsMani - Free Online Tools for Everyone",
    description:
      "Free online tools: PDF merger, splitter, compressor and more. 100% browser-based, no file uploads.",
    images: ["/og-image.png"],
  },
  metadataBase: new URL("https://toolsmani.com"),
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      tr: "/tr/",
      es: "/es/",
      de: "/de/",
      pt: "/pt/",
      fr: "/fr/",
      "x-default": "/",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

// Not: site geneli FAQPage schema'sı bilinçli olarak burada DEĞİL — kök layout
// her sayfaya basıldığı için araç sayfalarının kendi FAQPage'leriyle çakışıyordu.
// Ana sayfaya özel FAQ schema'sı src/app/page.tsx içinde üretilir.
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "ToolsMani",
    url: "https://toolsmani.com",
    description: "Free online PDF tools, image converter, text utilities and developer tools. 100% browser-based, no file uploads.",
    applicationCategory: "UtilityApplication",
    operatingSystem: "All",
    inLanguage: ["en", "tr"],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "PDF Merge", "PDF Split", "PDF Compress", "PDF Rotate",
      "PDF Page Manager", "PDF Watermark", "PDF Page Numbers",
      "Image Converter", "Text Counter", "JSON Formatter",
      "QR Code Generator", "Password Generator", "Image Compressor",
      "Base64 Encoder", "Color Picker", "Lorem Ipsum Generator",
      "Markdown Preview", "Unit Converter",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ToolsMani",
    url: "https://toolsmani.com",
    logo: "https://toolsmani.com/icon.png",
    sameAs: [],
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
      </head>
      <body className="font-sans">
        <LanguageProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <FeedbackWidget />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}

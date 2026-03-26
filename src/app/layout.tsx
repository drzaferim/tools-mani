import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "ToolsMani - Free Online Tools for Everyone",
  description:
    "Free online tools: PDF merger, image compressor, text counter, JSON formatter, QR generator and more. Fast, private, and easy to use.",
  keywords: [
    "online tools",
    "pdf merge",
    "image compress",
    "text counter",
    "json formatter",
    "qr code generator",
    "free tools",
  ],
  openGraph: {
    title: "ToolsMani - Free Online Tools for Everyone",
    description:
      "Free online tools: PDF merger, image compressor, text counter, JSON formatter, QR generator and more.",
    type: "website",
  },
};

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
      </head>
      <body className="font-sans">
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

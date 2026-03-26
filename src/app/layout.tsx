import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HelperTools - Free Online Tools for Everyone",
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
    title: "HelperTools - Free Online Tools for Everyone",
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
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

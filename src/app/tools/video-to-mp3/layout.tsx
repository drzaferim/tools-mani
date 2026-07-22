import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video to MP3 Converter - Extract Audio Free | ToolsMani",
  description:
    "Convert MP4, MOV, WebM and other videos to MP3 or WAV in your browser. Free, no upload, no file size games \u2014 your video never leaves your device.",
  alternates: {
    canonical: "/tools/video-to-mp3/",
    languages: {
      en: "/tools/video-to-mp3/",
      tr: "/tr/tools/video-to-mp3/",
      "x-default": "/tools/video-to-mp3/",
    },
  },
  openGraph: {
    title: "Video to MP3 Converter - Extract Audio Free | ToolsMani",
    description:
      "Convert MP4, MOV, WebM and other videos to MP3 or WAV in your browser. Free, no upload, no file size games \u2014 your video never leaves your device.",
    images: ["/og-image.png"],
  },
};

export default function VideoToMp3Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Video to MP3 Converter - Extract Audio Free | ToolsMani",
    url: "https://toolsmani.com/tools/video-to-mp3/",
    description:
      "Convert MP4, MOV, WebM and other videos to MP3 or WAV in your browser. Free, no upload, no file size games \u2014 your video never leaves your device.",
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

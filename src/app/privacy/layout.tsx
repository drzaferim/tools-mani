import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - ToolsMani",
  description:
    "ToolsMani privacy policy. Your files are processed entirely in your browser and never uploaded. Learn what limited data we collect and why.",
  alternates: {
    canonical: "/privacy/",
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

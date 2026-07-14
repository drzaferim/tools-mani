import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - ToolsMani",
  description:
    "Get in touch with ToolsMani. Report a bug, suggest a new tool, or send feedback — we read every message.",
  alternates: {
    canonical: "/contact/",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import { getAllPosts } from "@/lib/blog";
import { BlogHeading, BlogList } from "@/components/BlogList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Guides | ToolsMani",
  description: "Learn how to manage your PDFs, format code, and optimize your daily workflows safely.",
  alternates: {
    canonical: "/blog/",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-gray-50/50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <BlogHeading />
        <BlogList posts={posts} />
      </div>
    </div>
  );
}

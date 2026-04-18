import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { BlogList } from "@/components/BlogList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Guides | ToolsMani",
  description: "Learn how to manage your PDFs, format code, and optimize your daily workflows safely.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-gray-50/50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-4">
            Guides & Blog
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover tips, tricks, and tutorials on how to handle your digital files with 100% privacy and speed.
          </p>
        </div>

        <BlogList posts={posts} />
      </div>
    </div>
  );
}

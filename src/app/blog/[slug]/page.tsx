import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Metadata } from "next";

interface PostPageProps {
  params: {
    slug: string;
  };
}

// Next.js static export requires this to know which pages to build
export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Dynamic SEO metadata
export function generateMetadata({ params }: PostPageProps): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return { title: "Post Not Found | ToolsMani" };
  }

  return {
    title: `${post.title} | ToolsMani`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default function BlogPostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50/30 py-8 md:py-16">
      <main className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Back link */}
        <Link 
          href="/blog" 
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary-600 transition-colors mb-8 group"
        >
          <svg className="w-4 h-4 mr-1.5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Guides
        </Link>
        
        {/* Article Header */}
        <article className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 mb-8">
          <header className="mb-10 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
                 {post.language === "tr" ? "Türkçe Rehber" : "English Guide"}
              </span>
              <time className="text-sm text-gray-500 font-medium" dateTime={post.date}>
                {new Date(post.date).toLocaleDateString(
                  post.language === "tr" ? "tr-TR" : "en-US",
                  { year: "numeric", month: "long", day: "numeric" }
                )}
              </time>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
              {post.title}
            </h1>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {post.description}
            </p>
          </header>

          {/* Markdown Content rendered via react-markdown */}
          {/* We're using prose classes manually to match your design without requiring tailwind typography plugin */}
          <div className="markdown-content">
            <style dangerouslySetInnerHTML={{__html: `
              .markdown-content h2 { font-size: 1.875rem; font-weight: 700; margin-top: 2rem; margin-bottom: 1rem; color: #111827; }
              .markdown-content h3 { font-size: 1.5rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 0.75rem; color: #1f2937; }
              .markdown-content p { margin-top: 1.25rem; margin-bottom: 1.25rem; line-height: 1.75; color: #374151; font-size: 1.05rem; }
              .markdown-content a { color: #0284c7; text-decoration: none; font-weight: 500; }
              .markdown-content a:hover { text-decoration: underline; }
              .markdown-content ul { list-style-type: disc; margin-left: 1.5rem; margin-top: 1rem; margin-bottom: 1rem; color: #374151;}
              .markdown-content ol { list-style-type: decimal; margin-left: 1.5rem; margin-top: 1rem; margin-bottom: 1rem; color: #374151;}
              .markdown-content li { margin-bottom: 0.5rem; }
              .markdown-content strong { font-weight: 600; color: #111827; }
            `}} />
            
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>
          
          <footer className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold">
                 {post.author.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{post.author}</p>
                <p className="text-xs text-gray-500">ToolsMani Expert</p>
              </div>
            </div>
          </footer>
        </article>

      </main>
    </div>
  );
}

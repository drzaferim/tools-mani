"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import type { BlogPost } from "@/lib/blog";
import { useMemo } from "react";

const blogHeadings = {
  en: {
    title: "Guides & Blog",
    subtitle: "Discover practical guides for handling digital files with privacy and speed.",
  },
  tr: {
    title: "Rehberler ve Blog",
    subtitle: "Dijital dosyalarınızı gizli ve hızlı biçimde yönetmek için uygulamalı rehberler.",
  },
};

export function BlogHeading() {
  const { locale } = useLanguage();
  const heading = locale === "tr" ? blogHeadings.tr : blogHeadings.en;

  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-4">
        {heading.title}
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">{heading.subtitle}</p>
    </div>
  );
}

export function BlogList({ posts }: { posts: BlogPost[] }) {
  const { locale, t } = useLanguage();

  // Filter posts based on the active locale
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => post.language === locale);
  }, [posts, locale]);

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2">
        {filteredPosts.map((post) => (
          <Link
            key={post.slug}
            href={locale === "tr" ? `/tr/blog/${post.slug}` : `/blog/${post.slug}`}
            className="group"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full transition-all duration-300 hover:shadow-md hover:border-primary-200 hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-semibold text-primary-700">
                  {post.language === "tr" ? "Türkçe" : "English"}
                </span>
                <span className="text-sm text-gray-500 font-medium">
                  {new Date(post.date).toLocaleDateString(
                    post.language === "tr" ? "tr-TR" : "en-US",
                    { year: "numeric", month: "long", day: "numeric" }
                  )}
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                {post.title}
              </h2>
              <p className="text-gray-600 line-clamp-3 mb-4">
                {post.description}
              </p>
              <div className="flex items-center text-primary-600 font-medium text-sm mt-auto">
                {locale === "tr" ? "Yazıyı Oku" : "Read Article"}
                <svg className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {filteredPosts.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200">
          <p className="text-gray-500">
            {locale === "tr" 
              ? "Henüz bu dilde bir blog yazısı bulunmamaktadır." 
              : "No blog posts found for this language."}
          </p>
        </div>
      )}
    </>
  );
}

import type { Metadata } from "next";
import BlogPostPage, {
  generateMetadata as generateBaseMetadata,
} from "@/app/blog/[slug]/page";
import { getAllPosts } from "@/lib/blog";

type PostPageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getAllPosts()
    .filter((post) => post.language === "tr")
    .map((post) => ({ slug: post.slug }));
}

export function generateMetadata(props: PostPageProps): Metadata {
  return generateBaseMetadata(props);
}

export default BlogPostPage;

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const blogDirectory = path.join(process.cwd(), "src/content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  language: string;
  content: string;
}

export function getAllPosts(): BlogPost[] {
  // Check if directory exists
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(blogDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      // Remove ".md" from file name to get slug
      const slug = fileName.replace(/\.md$/, "");

      // Read markdown file as string
      const fullPath = path.join(blogDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      return {
        slug,
        title: matterResult.data.title || "Untitled",
        description: matterResult.data.description || "",
        date: matterResult.data.date || new Date().toISOString(),
        author: matterResult.data.author || "Admin",
        language: matterResult.data.language || "en",
        content: matterResult.content,
      };
    });

  // Sort posts by date (newest first)
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(blogDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    return {
      slug,
      title: matterResult.data.title || "Untitled",
      description: matterResult.data.description || "",
      date: matterResult.data.date || new Date().toISOString(),
      author: matterResult.data.author || "Admin",
      language: matterResult.data.language || "en",
      content: matterResult.content,
    };
  } catch (error) {
    return null;
  }
}

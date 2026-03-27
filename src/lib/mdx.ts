import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "src/content/blog");

export type FAQ = {
  question: string;
  answer: string;
};

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updatedAt?: string;
  author?: string;
  category?: string;
  tags?: string[];
  keywords?: string[];
  locale?: string;
  canonicalPath?: string;
  coverImage?: string;
  faqs?: FAQ[];
};

export type Post = {
  meta: PostMeta;
  content: string;
};

export function getPostSlugs(locale: string) {
  const dirPath = path.join(POSTS_DIR, locale);
  if (!fs.existsSync(dirPath)) return [];
  return fs.readdirSync(dirPath).filter((file) => file.endsWith(".mdx"));
}

export function getPostBySlug(slug: string, locale: string): Post | null {
  try {
    const realSlug = slug.replace(/\.mdx$/, "");
    const fullPath = path.join(POSTS_DIR, locale, `${realSlug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { data, content } = matter(fileContents);

    return {
      meta: {
        slug: realSlug,
        title: data.title,
        description: data.description,
        date: data.date,
        updatedAt: data.updatedAt,
        author: data.author,
        category: data.category,
        tags: data.tags,
        keywords: data.keywords,
        locale,
        canonicalPath: data.canonicalPath,
        coverImage: data.coverImage,
        faqs: data.faqs,
      },
      content,
    };
  } catch {
    return null;
  }
}

export function getAllPosts(locale: string): Post[] {
  const slugs = getPostSlugs(locale);
  const posts = slugs
    .map((slug) => getPostBySlug(slug, locale))
    .filter((post): post is Post => post !== null)
    .sort((post1, post2) => (post1.meta.date > post2.meta.date ? -1 : 1));
  return posts;
}

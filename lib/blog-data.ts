import { createClient } from "@/lib/supabase/server";

import type { BlogPostRow } from "@/lib/blog-types";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readingMinutes: number;
  author: string;
  coverImage: { src: string; alt: string };
  paragraphs: string[];
};

function normalizeParagraphs(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter((p): p is string => typeof p === "string");
}

function rowToBlogPost(row: BlogPostRow): BlogPost {
  const publishedAt = row.published_at;
  if (!publishedAt) {
    throw new Error("rowToBlogPost: expected published_at");
  }
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    publishedAt: publishedAt.slice(0, 10),
    readingMinutes: row.reading_minutes,
    author: row.author,
    coverImage: {
      src: row.cover_image_src,
      alt: row.cover_image_alt,
    },
    paragraphs: normalizeParagraphs(row.paragraphs),
  };
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("[blog] getPublishedPosts", error.message);
    return [];
  }

  const rows = (data ?? []) as BlogPostRow[];
  return rows.map(rowToBlogPost);
}

export async function getPublishedPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    console.error("[blog] getPublishedPostBySlug", error.message);
    return null;
  }
  if (!data) return null;
  return rowToBlogPost(data as BlogPostRow);
}

export async function getAllPublishedSlugs(): Promise<string[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("slug")
    .eq("status", "published");

  if (error) {
    console.error("[blog] getAllPublishedSlugs", error.message);
    return [];
  }
  return (data ?? []).map((r) => (r as { slug: string }).slug);
}

export function formatBlogDate(isoDate: string): string {
  return new Intl.DateTimeFormat("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(isoDate));
}

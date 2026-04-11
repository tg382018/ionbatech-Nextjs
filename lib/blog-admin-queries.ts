import "server-only";

import type { AdminBlogRow, BlogPostRow } from "@/lib/blog-types";
import { createAdminClient } from "@/lib/supabase/admin";

export function mapRowToAdminBlogRow(row: BlogPostRow): AdminBlogRow {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    coverImageUrl: row.cover_image_src,
    publishedAt: row.published_at,
    status: row.status,
    seoTags: row.seo_tags ?? "",
  };
}

export async function listAllBlogPostsForAdmin(): Promise<{
  published: AdminBlogRow[];
  drafts: AdminBlogRow[];
  loadError: string | null;
}> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    const missingTable =
      /could not find the table|schema cache|PGRST205/i.test(error.message) ||
      error.code === "PGRST205";
    if (!missingTable) {
      console.error("[blog admin] list", error.message);
    }
    const loadError = missingTable
      ? "Veritabanında `blog_posts` tablosu yok. Supabase Dashboard → SQL Editor’de `supabase/migrations/20260411120000_blog_posts.sql` dosyasının içeriğini çalıştırın, ardından sayfayı yenileyin."
      : error.message;
    return { published: [], drafts: [], loadError };
  }

  const rows = (data ?? []) as BlogPostRow[];
  const published = rows
    .filter((r) => r.status === "published")
    .map(mapRowToAdminBlogRow);
  const drafts = rows
    .filter((r) => r.status === "draft")
    .map(mapRowToAdminBlogRow);
  return { published, drafts, loadError: null };
}

export async function getBlogPostRowByIdForAdmin(
  id: string
): Promise<BlogPostRow | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("[blog admin] get by id", error.message);
    return null;
  }
  return data as BlogPostRow | null;
}

"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { isAdminSessionValid } from "@/lib/admin-session";
import { slugifyTitle } from "@/lib/slug";
import { createAdminClient } from "@/lib/supabase/admin";

async function requireAdmin() {
  if (!(await isAdminSessionValid())) {
    throw new Error("Unauthorized");
  }
}

function readingMinutesFromBody(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function paragraphsFromBody(body: string): string[] {
  const parts = body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  if (parts.length) return parts;
  return body.trim() ? [body.trim()] : [];
}

export async function createBlogPostAction(formData: FormData) {
  await requireAdmin();

  const intent = String(formData.get("intent") ?? "draft");
  const publish = intent === "publish";

  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const body = String(formData.get("body") ?? "");
  const coverUrl = String(formData.get("coverUrl") ?? "").trim();
  const seoTags = String(formData.get("seoTags") ?? "").trim();
  let slug = String(formData.get("slug") ?? "").trim();
  const author = String(formData.get("author") ?? "IonBATech").trim() || "IonBATech";

  if (!title || !coverUrl) {
    redirect(
      "/admin/dashboard/blog/yeni?error=" +
        encodeURIComponent("Başlık ve kapak URL zorunludur.")
    );
  }

  if (!slug) slug = slugifyTitle(title);

  const readingMinutes = readingMinutesFromBody(body);
  const paragraphs = paragraphsFromBody(body);
  const now = new Date().toISOString();

  const supabase = createAdminClient();
  const { error } = await supabase.from("blog_posts").insert({
    slug,
    title,
    excerpt,
    published_at: publish ? now : null,
    reading_minutes: readingMinutes,
    author,
    cover_image_src: coverUrl,
    cover_image_alt: title,
    paragraphs,
    status: publish ? "published" : "draft",
    seo_tags: seoTags,
    updated_at: now,
  });

  if (error) {
    redirect(
      "/admin/dashboard/blog/yeni?error=" + encodeURIComponent(error.message)
    );
  }

  revalidatePath("/blog");
  revalidatePath("/admin/dashboard/blog");
  redirect("/admin/dashboard/blog");
}

export async function updateBlogPostAction(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing id");

  const intent = String(formData.get("intent") ?? "draft");
  const publish = intent === "publish";

  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const body = String(formData.get("body") ?? "");
  const coverUrl = String(formData.get("coverUrl") ?? "").trim();
  const seoTags = String(formData.get("seoTags") ?? "").trim();
  let slug = String(formData.get("slug") ?? "").trim();
  const author = String(formData.get("author") ?? "IonBATech").trim() || "IonBATech";

  if (!title || !coverUrl) {
    redirect(
      `/admin/dashboard/blog/${id}/duzenle?error=` +
        encodeURIComponent("Başlık ve kapak URL zorunludur.")
    );
  }

  if (!slug) slug = slugifyTitle(title);

  const readingMinutes = readingMinutesFromBody(body);
  const paragraphs = paragraphsFromBody(body);
  const now = new Date().toISOString();

  const supabase = createAdminClient();

  const { data: existing } = await supabase
    .from("blog_posts")
    .select("published_at, slug")
    .eq("id", id)
    .maybeSingle();

  const prevPublishedAt =
    (existing as { published_at: string | null } | null)?.published_at ?? null;
  const prevSlug = (existing as { slug: string } | null)?.slug ?? "";

  const published_at = publish ? (prevPublishedAt ?? now) : null;

  const { error } = await supabase
    .from("blog_posts")
    .update({
      slug,
      title,
      excerpt,
      published_at,
      reading_minutes: readingMinutes,
      author,
      cover_image_src: coverUrl,
      cover_image_alt: title,
      paragraphs,
      status: publish ? "published" : "draft",
      seo_tags: seoTags,
      updated_at: now,
    })
    .eq("id", id);

  if (error) {
    redirect(
      `/admin/dashboard/blog/${id}/duzenle?error=` + encodeURIComponent(error.message)
    );
  }

  revalidatePath("/blog");
  if (prevSlug && prevSlug !== slug) {
    revalidatePath(`/blog/${prevSlug}`);
  }
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/admin/dashboard/blog");
  redirect("/admin/dashboard/blog");
}

export async function deleteBlogPostAction(id: string) {
  await requireAdmin();
  if (!id) throw new Error("Missing id");

  const supabase = createAdminClient();
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);

  if (error) {
    return { ok: false as const, error: error.message };
  }

  revalidatePath("/blog");
  revalidatePath("/admin/dashboard/blog");
  return { ok: true as const };
}

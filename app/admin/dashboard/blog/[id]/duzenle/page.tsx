import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { updateBlogPostAction } from "@/app/admin/dashboard/blog/actions";
import { BlogEditorForm } from "@/components/admin/blog-editor-form";
import { Button } from "@/components/ui/button";
import { getBlogPostRowByIdForAdmin } from "@/lib/blog-admin-queries";

function paragraphsToBody(raw: unknown): string {
  if (!Array.isArray(raw)) return "";
  return raw.filter((x): x is string => typeof x === "string").join("\n\n");
}

export default async function AdminBlogEditPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;

  const row = await getBlogPostRowByIdForAdmin(id);
  if (!row) {
    notFound();
  }

  const initial = {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    coverUrl: row.cover_image_src,
    seoTags: row.seo_tags ?? "",
    body: paragraphsToBody(row.paragraphs),
  };

  return (
    <div className="flex flex-1 flex-col p-6 sm:p-8">
      <div className="mb-6">
        <Button
          variant="ghost"
          size="sm"
          className="-ml-2 gap-1.5 text-stone-600 hover:text-stone-900"
          render={<Link href="/admin/dashboard/blog" />}
        >
          <ArrowLeft className="size-4" aria-hidden />
          Blog listesine dön
        </Button>
      </div>
      <header className="border-b border-stone-200/90 pb-6">
        <h1 className="font-heading text-2xl font-bold tracking-tight text-stone-900">
          Yazıyı düzenle
        </h1>
        <p className="mt-1 text-sm text-stone-500">
          Slug veya içerik değişince site önbelleği yenilenir.
        </p>
      </header>
      <div className="mt-8 flex-1">
        <BlogEditorForm
          key={row.id}
          action={updateBlogPostAction}
          initial={initial}
          errorMessage={error ? decodeURIComponent(error) : undefined}
        />
      </div>
    </div>
  );
}

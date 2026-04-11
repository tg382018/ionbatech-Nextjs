import Link from "next/link";
import { Plus } from "lucide-react";

import { BlogList } from "@/components/admin/blog-list";
import { Button } from "@/components/ui/button";
import { listAllBlogPostsForAdmin } from "@/lib/blog-admin-queries";

export default async function AdminBlogPage() {
  const { published, drafts, loadError } = await listAllBlogPostsForAdmin();

  return (
    <div className="flex flex-1 flex-col p-6 sm:p-8">
      <header className="flex flex-col gap-4 border-b border-stone-200/90 pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-stone-900">
            Blog
          </h1>
          <p className="mt-1 text-sm text-stone-500">
            Yayınları yönetin; yeni yazı oluşturun. Veriler Supabase üzerinden
            okunur ve yazılır.
          </p>
        </div>
        <Button
          size="lg"
          className="shrink-0 rounded-lg bg-[#126458] font-semibold text-white hover:bg-[#0e4d44] sm:self-center"
          render={<Link href="/admin/dashboard/blog/yeni" />}
        >
          <Plus className="size-4" aria-hidden />
          Yeni blog
        </Button>
      </header>

      {loadError ? (
        <div
          className="mt-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950"
          role="alert"
        >
          {loadError}
        </div>
      ) : null}

      <div className="mt-8 flex-1">
        <BlogList published={published} drafts={drafts} />
      </div>
    </div>
  );
}

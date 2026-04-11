import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { BlogEditorForm } from "@/components/admin/blog-editor-form";
import { Button } from "@/components/ui/button";

export default function AdminBlogNewPage() {
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
          Yeni blog yazısı
        </h1>
        <p className="mt-1 text-sm text-stone-500">
          Taslak veya yayın API hazır olduğunda kaydedilecek.
        </p>
      </header>
      <div className="mt-8 flex-1">
        <BlogEditorForm />
      </div>
    </div>
  );
}

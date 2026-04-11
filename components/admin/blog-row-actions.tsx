"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { ExternalLink, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { deleteBlogPostAction } from "@/app/admin/dashboard/blog/actions";
import type { AdminBlogRow } from "@/lib/blog-types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function BlogRowActions({ row }: { row: AdminBlogRow }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function onDelete() {
    if (!confirm("Bu yazı silinsin mi?")) return;
    startTransition(async () => {
      const res = await deleteBlogPostAction(row.id);
      if (res?.ok) router.refresh();
      else if (res?.error) alert(res.error);
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        disabled={pending}
        className={cn(
          "inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          pending && "opacity-50"
        )}
        aria-label="İşlemler"
      >
        <MoreHorizontal className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        {row.status === "published" ? (
          <DropdownMenuItem
            onClick={() => router.push(`/blog/${row.slug}`)}
            className="cursor-pointer"
          >
            <ExternalLink className="size-4 opacity-70" />
            Sitede aç
          </DropdownMenuItem>
        ) : null}
        <DropdownMenuItem
          onClick={() =>
            router.push(`/admin/dashboard/blog/${row.id}/duzenle`)
          }
          className="cursor-pointer"
        >
          <Pencil className="size-4 opacity-70" />
          Düzenle
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={onDelete}
          className="cursor-pointer"
        >
          <Trash2 className="size-4 opacity-70" />
          Sil
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

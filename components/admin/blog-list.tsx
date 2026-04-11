"use client";

import Image from "next/image";

import { BlogRowActions } from "@/components/admin/blog-row-actions";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { AdminBlogRow } from "@/lib/blog-types";

function formatDate(iso: string | null) {
  if (!iso) return "—";
  try {
    return new Intl.DateTimeFormat("tr-TR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function BlogTable({ rows }: { rows: AdminBlogRow[] }) {
  if (rows.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-stone-200 bg-stone-50/50 py-12 text-center text-sm text-muted-foreground">
        Kayıt yok.
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[52px]">Kapak</TableHead>
          <TableHead>Başlık</TableHead>
          <TableHead className="hidden lg:table-cell">SEO etiketleri</TableHead>
          <TableHead className="hidden sm:table-cell">Tarih</TableHead>
          <TableHead className="w-[100px]">Durum</TableHead>
          <TableHead className="w-[56px] text-right">
            <span className="sr-only">İşlemler</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="p-2">
              <div className="relative size-10 overflow-hidden rounded-md bg-muted ring-1 ring-border">
                <Image
                  src={row.coverImageUrl}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
            </TableCell>
            <TableCell className="max-w-[min(280px,40vw)]">
              <span className="line-clamp-2 font-medium text-foreground">
                {row.title}
              </span>
              <span className="mt-0.5 block font-mono text-[11px] text-muted-foreground lg:hidden">
                {row.seoTags}
              </span>
            </TableCell>
            <TableCell className="hidden max-w-[200px] lg:table-cell">
              <span className="line-clamp-2 text-muted-foreground">
                {row.seoTags}
              </span>
            </TableCell>
            <TableCell className="hidden whitespace-nowrap text-muted-foreground sm:table-cell">
              {formatDate(row.publishedAt)}
            </TableCell>
            <TableCell>
              {row.status === "published" ? (
                <Badge>Yayında</Badge>
              ) : (
                <Badge variant="secondary">Taslak</Badge>
              )}
            </TableCell>
            <TableCell className="text-right">
              <BlogRowActions row={row} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

type BlogListProps = {
  published: AdminBlogRow[];
  drafts: AdminBlogRow[];
};

export function BlogList({ published, drafts }: BlogListProps) {
  const pubCount = published.length;
  const draftCount = drafts.length;

  return (
    <Card className="border-stone-200 bg-white shadow-sm">
      <CardHeader className="border-b border-stone-100 pb-4">
        <CardTitle className="font-heading text-lg text-stone-900">
          Yazılar
        </CardTitle>
        <CardDescription>
          Yayında olan içerikler ve taslaklar. Düzenleme ve silme buradan.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs defaultValue="published" className="gap-4">
          <TabsList className="h-9 w-full max-w-md bg-stone-100/90">
            <TabsTrigger value="published" className="flex-1">
              Yayında ({pubCount})
            </TabsTrigger>
            <TabsTrigger value="drafts" className="flex-1">
              Taslaklar ({draftCount})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="published" className="mt-0">
            <BlogTable rows={published} />
          </TabsContent>
          <TabsContent value="drafts" className="mt-0">
            <BlogTable rows={drafts} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

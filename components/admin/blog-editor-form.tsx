"use client";

import {
  AlignLeft,
  Bold,
  ImageIcon,
  Italic,
  Link2,
  List,
  ListOrdered,
  Quote,
  type LucideIcon,
} from "lucide-react";
import { useFormStatus } from "react-dom";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export type BlogEditorInitial = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverUrl: string;
  seoTags: string;
  body: string;
};

function SubmitRow() {
  const { pending } = useFormStatus();
  return (
    <div className="flex flex-col-reverse gap-3 border-t border-stone-200 pt-6 sm:flex-row sm:justify-end">
      <Button
        type="submit"
        name="intent"
        value="draft"
        variant="outline"
        disabled={pending}
        className="sm:min-w-[120px]"
      >
        Taslak
      </Button>
      <Button
        type="submit"
        name="intent"
        value="publish"
        disabled={pending}
        className="bg-[#126458] font-semibold text-white hover:bg-[#0e4d44] sm:min-w-[120px]"
      >
        Yayınla
      </Button>
    </div>
  );
}

type BlogEditorFormProps = {
  action: (formData: FormData) => Promise<void>;
  initial?: BlogEditorInitial;
  errorMessage?: string | null;
};

export function BlogEditorForm({
  action,
  initial,
  errorMessage,
}: BlogEditorFormProps) {
  const [coverUrl, setCoverUrl] = useState(initial?.coverUrl ?? "");
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [seoTags, setSeoTags] = useState(initial?.seoTags ?? "");
  const [body, setBody] = useState(initial?.body ?? "");

  return (
    <form action={action} className="mx-auto max-w-3xl space-y-6">
      {initial?.id ? (
        <input type="hidden" name="id" value={initial.id} />
      ) : null}
      <input type="hidden" name="author" value="IonBATech" />

      {errorMessage ? (
        <p
          className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
          role="alert"
        >
          {errorMessage}
        </p>
      ) : null}

      <Card className="border-stone-200 bg-white shadow-sm">
        <CardHeader className="border-b border-stone-100 pb-4">
          <CardTitle className="font-heading text-base text-stone-900">
            Yayın bilgileri
          </CardTitle>
          <CardDescription>
            Kapak görseli URL, başlık, slug, özet ve SEO alanları.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 pt-6">
          <div className="space-y-2">
            <Label htmlFor="blog-cover-url">Kapak görseli (URL)</Label>
            <Input
              id="blog-cover-url"
              type="url"
              name="coverUrl"
              value={coverUrl}
              onChange={(e) => setCoverUrl(e.target.value)}
              placeholder="https://…"
              autoComplete="off"
              required
              className="h-10 border-stone-200 bg-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="blog-title">Blog başlığı</Label>
            <Input
              id="blog-title"
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Yazı başlığı"
              required
              className="h-10 border-stone-200 bg-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="blog-slug">Slug (boş bırakılırsa başlıktan üretilir)</Label>
            <Input
              id="blog-slug"
              type="text"
              name="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="ornek-yazi-url"
              className="h-10 border-stone-200 bg-white font-mono text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="blog-excerpt">Özet</Label>
            <Textarea
              id="blog-excerpt"
              name="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Liste ve önizleme için kısa özet"
              rows={3}
              className="border-stone-200 bg-white text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="blog-seo">SEO etiketleri</Label>
            <Input
              id="blog-seo"
              type="text"
              name="seoTags"
              value={seoTags}
              onChange={(e) => setSeoTags(e.target.value)}
              placeholder="enerji depolama, LiFePO4, inverter"
              className="h-10 border-stone-200 bg-white"
            />
            <p className="text-xs text-muted-foreground">
              Virgülle ayırın; meta anahtar kelimeler veya etiketler için
              kullanılacak.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-stone-200 bg-white shadow-sm">
        <CardHeader className="border-b border-stone-100 pb-4">
          <CardTitle className="font-heading text-base text-stone-900">
            İçerik
          </CardTitle>
          <CardDescription>
            Paragrafları boş satırla ayırın; her blok ayrı paragraf olarak
            kaydedilir.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-0 pt-0">
          <div className="overflow-hidden rounded-lg border border-stone-200">
            <div
              className="flex flex-wrap items-center gap-0.5 border-b border-stone-200 bg-stone-50/90 px-2 py-1.5"
              role="toolbar"
              aria-label="Biçimlendirme (yakında)"
            >
              <ToolbarIconBtn icon={Bold} label="Kalın" />
              <ToolbarIconBtn icon={Italic} label="İtalik" />
              <span className="mx-1 h-5 w-px bg-stone-200" aria-hidden />
              <ToolbarIconBtn icon={List} label="Madde listesi" />
              <ToolbarIconBtn icon={ListOrdered} label="Numaralı liste" />
              <ToolbarIconBtn icon={Quote} label="Alıntı" />
              <span className="mx-1 h-5 w-px bg-stone-200" aria-hidden />
              <ToolbarIconBtn icon={Link2} label="Bağlantı" />
              <ToolbarIconBtn icon={ImageIcon} label="Görsel" />
              <span className="mx-1 h-5 w-px bg-stone-200" aria-hidden />
              <ToolbarIconBtn icon={AlignLeft} label="Hizalama" />
            </div>
            <Textarea
              id="blog-body"
              name="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={16}
              placeholder="Yazı gövdesi. Paragraflar arasında boş satır kullanın."
              className={cn(
                "min-h-[280px] resize-y rounded-none border-0 bg-transparent px-3 py-3 text-sm leading-relaxed shadow-none focus-visible:ring-0"
              )}
            />
          </div>
        </CardContent>
      </Card>

      <SubmitRow />
    </form>
  );
}

function ToolbarIconBtn({
  icon: Icon,
  label,
}: {
  icon: LucideIcon;
  label: string;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      disabled
      className="rounded-md p-2 text-stone-500 opacity-60 hover:bg-stone-100 hover:text-stone-700 disabled:cursor-not-allowed"
    >
      <Icon className="size-4" aria-hidden />
    </button>
  );
}

"use client";

import { ImagePlus, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";

import { BlogRichEditor } from "@/components/admin/blog-rich-editor";
import { uploadBlogImage } from "@/components/admin/upload-blog-image";
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
  const [coverError, setCoverError] = useState<string | null>(null);
  const [coverBusy, setCoverBusy] = useState(false);
  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [seoTags, setSeoTags] = useState(initial?.seoTags ?? "");
  const [body, setBody] = useState(initial?.body ?? "");
  const coverInputRef = useRef<HTMLInputElement>(null);

  async function onCoverFile(file: File | undefined) {
    if (!file) return;
    setCoverError(null);
    setCoverBusy(true);
    try {
      setCoverUrl(await uploadBlogImage(file));
    } catch (error) {
      setCoverError(error instanceof Error ? error.message : "Görsel yüklenemedi.");
    } finally {
      setCoverBusy(false);
    }
  }

  return (
    <form
      action={action}
      className="mx-auto max-w-4xl space-y-6"
      onSubmit={(event) => {
        if (!coverUrl.trim()) {
          event.preventDefault();
          setCoverError("Yayınlamak için bir kapak görseli yükleyin.");
        }
      }}
    >
      {initial?.id ? (
        <input type="hidden" name="id" value={initial.id} />
      ) : null}
      <input type="hidden" name="author" value="IonBATech" />
      <input type="hidden" name="coverUrl" value={coverUrl} />

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
            Kapak görseli Supabase Storage’a yüklenir. Başlık, slug, özet ve SEO
            alanları buradan düzenlenir.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 pt-6">
          <div className="space-y-2">
            <Label htmlFor="blog-cover-file">Kapak görseli</Label>
            <div
              className={cn(
                "overflow-hidden rounded-lg border border-dashed border-stone-300 bg-stone-50/70",
                coverBusy && "opacity-70"
              )}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                const file = event.dataTransfer.files[0];
                if (file) void onCoverFile(file);
              }}
            >
              {coverUrl ? (
                // Preview only; the public page uses next/image.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={coverUrl}
                  alt=""
                  className="aspect-[21/9] w-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 px-4 py-10 text-center text-sm text-stone-500">
                  <ImagePlus className="size-6 text-stone-400" aria-hidden />
                  JPEG, PNG, WEBP veya GIF. En fazla 5 MB.
                </div>
              )}
              <div className="flex flex-wrap items-center gap-2 border-t border-stone-200 bg-white px-3 py-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={coverBusy}
                  onClick={() => coverInputRef.current?.click()}
                >
                  {coverBusy ? (
                    <Loader2 className="size-4 animate-spin" aria-hidden />
                  ) : (
                    <ImagePlus className="size-4" aria-hidden />
                  )}
                  {coverUrl ? "Görseli değiştir" : "Görsel yükle"}
                </Button>
                {coverUrl ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setCoverUrl("")}
                  >
                    Kaldır
                  </Button>
                ) : null}
                <span className="text-xs text-stone-500">
                  Sürükleyip bırakabilir veya dosya seçebilirsiniz.
                </span>
              </div>
            </div>
            <input
              ref={coverInputRef}
              id="blog-cover-file"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="sr-only"
              onChange={(event) => {
                const file = event.target.files?.[0];
                event.target.value = "";
                void onCoverFile(file);
              }}
            />
            {coverError ? (
              <p className="text-sm text-destructive" role="alert">
                {coverError}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="blog-title">Blog başlığı</Label>
            <Input
              id="blog-title"
              type="text"
              name="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
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
              onChange={(event) => setSlug(event.target.value)}
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
              onChange={(event) => setExcerpt(event.target.value)}
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
              onChange={(event) => setSeoTags(event.target.value)}
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
            Başlık, liste, bağlantı, renk ve hizalama kullanılabilir. Yapıştırılan
            metin stilleriyle gelir; görseller de Storage’a yüklenir.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <BlogRichEditor value={body} onChange={setBody} />
        </CardContent>
      </Card>

      <SubmitRow />
    </form>
  );
}

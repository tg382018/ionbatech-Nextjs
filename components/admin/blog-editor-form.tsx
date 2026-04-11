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

export function BlogEditorForm() {
  const [coverUrl, setCoverUrl] = useState("");
  const [title, setTitle] = useState("");
  const [seoTags, setSeoTags] = useState("");
  const [body, setBody] = useState("");

  return (
    <form
      className="mx-auto max-w-3xl space-y-6"
      onSubmit={(e) => e.preventDefault()}
    >
      <Card className="border-stone-200 bg-white shadow-sm">
        <CardHeader className="border-b border-stone-100 pb-4">
          <CardTitle className="font-heading text-base text-stone-900">
            Yayın bilgileri
          </CardTitle>
          <CardDescription>
            Kapak görseli URL, başlık ve SEO alanları.
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
              className="h-10 border-stone-200 bg-white"
            />
            <p className="text-xs text-muted-foreground">
              Görsel adresi kaydedilecek; yükleme API ile eklenecek.
            </p>
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
              className="h-10 border-stone-200 bg-white"
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
            İçerik (zengin metin)
          </CardTitle>
          <CardDescription>
            Şimdilik düz metin; editör API ile birlikte eklenecek.
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
              placeholder="Yazı gövdesi. Gerçek editör (Tiptap vb.) API ile birlikte eklenecek."
              className={cn(
                "min-h-[280px] resize-y rounded-none border-0 bg-transparent px-3 py-3 text-sm leading-relaxed shadow-none focus-visible:ring-0"
              )}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col-reverse gap-3 border-t border-stone-200 pt-6 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" className="sm:min-w-[120px]">
          Taslak
        </Button>
        <Button
          type="button"
          className="bg-[#126458] font-semibold text-white hover:bg-[#0e4d44] sm:min-w-[120px]"
        >
          Yayınla
        </Button>
      </div>
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

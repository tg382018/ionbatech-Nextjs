"use client";

import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading2,
  Heading3,
  ImageIcon,
  Italic,
  Link2,
  List,
  ListOrdered,
  Minus,
  Pilcrow,
  Quote,
  Redo2,
  RemoveFormatting,
  Strikethrough,
  Underline,
  Undo2,
  Unlink,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { uploadBlogImage } from "@/components/admin/upload-blog-image";
import { plainTextFromHtml } from "@/lib/blog-content";
import {
  dataUrlToFile,
  safeHref,
  sanitizeBrowserHtml,
} from "@/lib/sanitize-blog-html-browser";
import { cn } from "@/lib/utils";

type BlogRichEditorProps = {
  value: string;
  onChange: (html: string) => void;
};

export function BlogRichEditor({ value, onChange }: BlogRichEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const hiddenRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const savedRange = useRef<Range | null>(null);
  const [html, setHtml] = useState(value);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (editorRef.current) editorRef.current.innerHTML = value;
    if (hiddenRef.current) hiddenRef.current.value = value;
    // Seed once. Later keystrokes own the DOM so the caret stays put.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function emit() {
    const next = editorRef.current?.innerHTML ?? "";
    if (hiddenRef.current) hiddenRef.current.value = next;
    setHtml(next);
    onChange(next);
    const selection = document.getSelection();
    if (selection && selection.rangeCount > 0 && editorRef.current?.contains(selection.anchorNode)) {
      savedRange.current = selection.getRangeAt(0);
    }
  }

  function rememberSelection() {
    const selection = document.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    const anchor = selection.anchorNode;
    if (!anchor || !editorRef.current?.contains(anchor)) return;
    savedRange.current = selection.getRangeAt(0);
  }

  function restoreSelection() {
    const selection = document.getSelection();
    if (!selection || !savedRange.current) return;
    selection.removeAllRanges();
    selection.addRange(savedRange.current);
  }

  function run(command: string, arg?: string) {
    editorRef.current?.focus();
    restoreSelection();
    document.execCommand(command, false, arg);
    emit();
  }

  function formatBlock(tag: string) {
    editorRef.current?.focus();
    restoreSelection();
    document.execCommand("formatBlock", false, tag);
    const current = document.queryCommandValue("formatBlock").toLowerCase();
    if (current !== tag) {
      document.execCommand("formatBlock", false, `<${tag}>`);
    }
    emit();
  }

  function addLink() {
    rememberSelection();
    const raw = window.prompt("Bağlantı adresi", "https://");
    if (raw === null) return;
    editorRef.current?.focus();
    restoreSelection();
    if (!raw.trim()) {
      document.execCommand("unlink");
      emit();
      return;
    }
    const href = safeHref(raw);
    if (!href) {
      window.alert("Yalnızca http, https veya mailto bağlantıları kullanılabilir.");
      return;
    }
    document.execCommand("createLink", false, href);
    emit();
  }

  async function uploadAndInsert(file: File) {
    setUploadError(null);
    setUploading(true);
    try {
      const url = await uploadBlogImage(file);
      editorRef.current?.focus();
      restoreSelection();
      document.execCommand(
        "insertHTML",
        false,
        `<img src="${url.replace(/"/g, "")}" alt="" />`
      );
      emit();
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Görsel yüklenemedi.");
    } finally {
      setUploading(false);
    }
  }

  async function onPaste(event: ClipboardEvent) {
    const clipboard = event.clipboardData;
    if (!clipboard) return;
    const imageFiles = Array.from(clipboard.files).filter((file) =>
      file.type.startsWith("image/")
    );
    const html = clipboard.getData("text/html");
    const text = clipboard.getData("text/plain");
    event.preventDefault();
    rememberSelection();

    if (html.trim()) {
      setUploading(true);
      setUploadError(null);
      try {
        const withUploadedImages = await uploadEmbeddedImages(html);
        editorRef.current?.focus();
        restoreSelection();
        const clean = sanitizeBrowserHtml(withUploadedImages);
        document.execCommand("insertHTML", false, clean || escapeText(text));
        emit();
        if (imageFiles.length > 0 && !/<img\b/i.test(clean)) {
          for (const file of imageFiles) {
            await uploadAndInsert(file);
          }
        }
      } catch (error) {
        setUploadError(error instanceof Error ? error.message : "Yapıştırma başarısız.");
      } finally {
        setUploading(false);
      }
      return;
    }

    if (imageFiles.length > 0) {
      for (const file of imageFiles) {
        await uploadAndInsert(file);
      }
      return;
    }

    editorRef.current?.focus();
    restoreSelection();
    document.execCommand("insertText", false, text);
    emit();
  }

  async function onDrop(event: DragEvent) {
    const transfer = event.dataTransfer;
    if (!transfer) return;
    const files = Array.from(transfer.files).filter((file) =>
      file.type.startsWith("image/")
    );
    if (files.length === 0) return;
    event.preventDefault();
    rememberSelection();
    for (const file of files) {
      await uploadAndInsert(file);
    }
  }

  const empty = plainTextFromHtml(html).length === 0 && !/<img\b/i.test(html);

  const handlers = useRef({ emit, onPaste, onDrop });
  handlers.current = { emit, onPaste, onDrop };

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    const onInput = () => handlers.current.emit();
    const onPasteEvent = (event: Event) => {
      void handlers.current.onPaste(event as ClipboardEvent);
    };
    const onDropEvent = (event: Event) => {
      void handlers.current.onDrop(event as DragEvent);
    };
    const form = editor.closest("form");
    const onSubmit = () => handlers.current.emit();
    editor.addEventListener("input", onInput);
    editor.addEventListener("paste", onPasteEvent);
    editor.addEventListener("drop", onDropEvent);
    form?.addEventListener("submit", onSubmit);
    return () => {
      editor.removeEventListener("input", onInput);
      editor.removeEventListener("paste", onPasteEvent);
      editor.removeEventListener("drop", onDropEvent);
      form?.removeEventListener("submit", onSubmit);
    };
  }, []);

  return (
    <div className="overflow-hidden rounded-lg border border-stone-200">
      <div
        className="flex flex-wrap items-center gap-0.5 border-b border-stone-200 bg-stone-50/90 px-2 py-1.5"
        role="toolbar"
        aria-label="Metin biçimlendirme"
        onMouseDown={(event) => {
          const target = event.target as HTMLElement;
          if (target.closest("input, label")) return;
          event.preventDefault();
          rememberSelection();
        }}
      >
        <ToolButton icon={Undo2} label="Geri al" onClick={() => run("undo")} />
        <ToolButton icon={Redo2} label="Yinele" onClick={() => run("redo")} />
        <Divider />
        <ToolButton icon={Pilcrow} label="Paragraf" onClick={() => formatBlock("p")} />
        <ToolButton icon={Heading2} label="Başlık 2" onClick={() => formatBlock("h2")} />
        <ToolButton icon={Heading3} label="Başlık 3" onClick={() => formatBlock("h3")} />
        <Divider />
        <ToolButton icon={Bold} label="Kalın" onClick={() => run("bold")} />
        <ToolButton icon={Italic} label="İtalik" onClick={() => run("italic")} />
        <ToolButton icon={Underline} label="Altı çizili" onClick={() => run("underline")} />
        <ToolButton icon={Strikethrough} label="Üstü çizili" onClick={() => run("strikeThrough")} />
        <ColorControl
          label="Yazı rengi"
          swatchClassName="bg-stone-900"
          onPick={(color) => run("foreColor", color)}
        />
        <ColorControl
          label="Vurgu rengi"
          swatchClassName="bg-amber-300"
          onPick={(color) => run("hiliteColor", color)}
        />
        <Divider />
        <ToolButton icon={AlignLeft} label="Sola hizala" onClick={() => run("justifyLeft")} />
        <ToolButton icon={AlignCenter} label="Ortala" onClick={() => run("justifyCenter")} />
        <ToolButton icon={AlignRight} label="Sağa hizala" onClick={() => run("justifyRight")} />
        <Divider />
        <ToolButton icon={List} label="Madde listesi" onClick={() => run("insertUnorderedList")} />
        <ToolButton icon={ListOrdered} label="Numaralı liste" onClick={() => run("insertOrderedList")} />
        <ToolButton icon={Quote} label="Alıntı" onClick={() => formatBlock("blockquote")} />
        <ToolButton icon={Minus} label="Yatay çizgi" onClick={() => run("insertHorizontalRule")} />
        <Divider />
        <ToolButton icon={Link2} label="Bağlantı" onClick={addLink} />
        <ToolButton icon={Unlink} label="Bağlantıyı kaldır" onClick={() => run("unlink")} />
        <ToolButton
          icon={ImageIcon}
          label={uploading ? "Görsel yükleniyor" : "Görsel yükle"}
          onClick={() => imageInputRef.current?.click()}
          disabled={uploading}
        />
        <Divider />
        <ToolButton
          icon={RemoveFormatting}
          label="Biçimi temizle"
          onClick={() => run("removeFormat")}
        />
      </div>

      <input ref={hiddenRef} type="hidden" name="body" defaultValue={value} />
      <input
        ref={imageInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="sr-only"
        onChange={(event) => {
          const file = event.target.files?.[0];
          event.target.value = "";
          if (file) void uploadAndInsert(file);
        }}
      />

      <div className="relative">
        {empty ? (
          <p className="pointer-events-none absolute left-3 top-3 text-sm text-stone-400">
            Yazıyı buraya yazın. Word, Google Docs veya web’den yapıştırınca kalın,
            renk, liste ve bağlantı stilleri korunur.
          </p>
        ) : null}
        <div
          ref={editorRef}
          className={cn(
            "blog-content blog-editor min-h-[320px] px-3 py-3 text-sm leading-relaxed text-stone-900"
          )}
          contentEditable
          role="textbox"
          aria-multiline="true"
          aria-label="Yazı içeriği"
          suppressContentEditableWarning
          onKeyUp={rememberSelection}
          onMouseUp={rememberSelection}
          onDragOver={(event) => {
            if ([...event.dataTransfer.types].includes("Files")) {
              event.preventDefault();
            }
          }}
        />
      </div>

      {uploadError ? (
        <p className="border-t border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
          {uploadError}
        </p>
      ) : null}
    </div>
  );
}

async function uploadEmbeddedImages(html: string): Promise<string> {
  const doc = new DOMParser().parseFromString(html, "text/html");
  for (const image of [...doc.querySelectorAll("img")]) {
    const src = image.getAttribute("src") ?? "";
    if (!src.startsWith("data:image/")) continue;
    const file = dataUrlToFile(src);
    if (!file) {
      image.remove();
      continue;
    }
    try {
      image.setAttribute("src", await uploadBlogImage(file));
    } catch {
      image.remove();
    }
  }
  return doc.body.innerHTML;
}

function escapeText(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br>");
}

function Divider() {
  return <span className="mx-1 h-5 w-px bg-stone-200" aria-hidden />;
}

function ToolButton({
  icon: Icon,
  label,
  onClick,
  disabled,
}: {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="rounded-md p-2 text-stone-600 hover:bg-stone-200/80 hover:text-stone-900 disabled:cursor-wait disabled:opacity-50"
    >
      <Icon className="size-4" aria-hidden />
    </button>
  );
}

function ColorControl({
  label,
  swatchClassName,
  onPick,
}: {
  label: string;
  swatchClassName: string;
  onPick: (color: string) => void;
}) {
  return (
    <label
      title={label}
      className="relative grid size-8 cursor-pointer place-items-center rounded-md text-stone-600 hover:bg-stone-200/80"
    >
      <span className="sr-only">{label}</span>
      <span
        className={cn("size-3.5 rounded-sm border border-stone-300", swatchClassName)}
        aria-hidden
      />
      <input
        type="color"
        aria-label={label}
        className="absolute inset-0 cursor-pointer opacity-0"
        onChange={(event) => onPick(event.target.value)}
      />
    </label>
  );
}

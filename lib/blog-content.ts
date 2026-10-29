export function looksLikeHtml(value: string): boolean {
  return /<\/?[a-z][\s\S]*>/i.test(value);
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function plainTextFromHtml(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, " ")
    .trim();
}

/** Plain paragraphs from older posts become HTML the editor and the public page can share. */
export function paragraphsToEditorHtml(raw: unknown): string {
  if (!Array.isArray(raw)) return "";
  const parts = raw.filter((part): part is string => typeof part === "string" && part.trim().length > 0);
  if (parts.length === 0) return "";
  if (parts.length === 1 && looksLikeHtml(parts[0])) return parts[0];
  return parts
    .map((part) =>
      looksLikeHtml(part)
        ? part
        : `<p>${escapeHtml(part).replace(/\n/g, "<br>")}</p>`
    )
    .join("");
}

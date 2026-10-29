import "server-only";

import sanitizeHtml from "sanitize-html";

import { paragraphsToEditorHtml, plainTextFromHtml } from "@/lib/blog-content";

const COLOR =
  /^(?:#[0-9a-f]{3,8}|rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)|rgba\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*(?:0|1|0?\.\d+)\s*\)|hsl\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*\)|hsla\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*,\s*(?:0|1|0?\.\d+)\s*\)|[a-z]{3,30}|transparent)$/i;

const STYLE: Record<string, RegExp[]> = {
  color: [COLOR],
  "background-color": [COLOR],
  "text-align": [/^(?:left|right|center|justify|start|end)$/i],
  "font-weight": [/^(?:normal|bold|bolder|lighter|[1-9]00)$/i],
  "font-style": [/^(?:normal|italic|oblique)$/i],
  "font-size": [/^\d+(?:\.\d+)?(?:px|pt|em|rem|%)$/i],
  "font-family": [/^[a-z0-9 ,"'\-]{1,80}$/i],
  "text-decoration": [/^(?:none|underline|line-through|underline line-through|line-through underline)$/i],
  "text-decoration-line": [/^(?:none|underline|line-through|underline line-through|line-through underline)$/i],
  "line-height": [/^(?:normal|\d+(?:\.\d+)?(?:px|em|rem|%)?)$/i],
  "margin-left": [/^\d+(?:\.\d+)?(?:px|em|rem|pt)$/i],
  "padding-left": [/^\d+(?:\.\d+)?(?:px|em|rem|pt)$/i],
  "vertical-align": [/^(?:baseline|sub|super|middle|top|bottom)$/i],
  "list-style-type": [/^(?:disc|circle|square|decimal|decimal-leading-zero|lower-alpha|upper-alpha|lower-roman|upper-roman|none)$/i],
};

const styleRules = { "*": STYLE };

export function sanitizeBlogHtml(dirty: string): string {
  return sanitizeHtml(dirty, {
    allowedTags: [
      "p",
      "br",
      "div",
      "span",
      "h1",
      "h2",
      "h3",
      "h4",
      "strong",
      "b",
      "em",
      "i",
      "u",
      "s",
      "strike",
      "del",
      "ul",
      "ol",
      "li",
      "blockquote",
      "a",
      "img",
      "hr",
      "pre",
      "code",
      "table",
      "thead",
      "tbody",
      "tfoot",
      "tr",
      "th",
      "td",
      "sub",
      "sup",
      "figure",
      "figcaption",
      "font",
    ],
    allowedAttributes: {
      a: ["href", "name", "target", "rel"],
      img: ["src", "alt"],
      font: ["color"],
      th: ["colspan", "rowspan"],
      td: ["colspan", "rowspan"],
      "*": ["style"],
    },
    allowedStyles: styleRules,
    allowedSchemes: ["http", "https", "mailto"],
    allowedSchemesByTag: { img: ["https"] },
    allowProtocolRelative: false,
    exclusiveFilter: (frame) =>
      frame.tag === "img" && !/^https:\/\//i.test(frame.attribs.src ?? ""),
    transformTags: {
      a: (tagName, attribs) => {
        const href = attribs.href ?? "";
        const next: Record<string, string> = {
          href,
          rel: "noopener noreferrer",
        };
        if (href.startsWith("http")) next.target = "_blank";
        return { tagName, attribs: next };
      },
      img: (_tagName, attribs) => ({
        tagName: "img",
        attribs: {
          src: attribs.src ?? "",
          alt: (attribs.alt ?? "").slice(0, 200),
        },
      }),
    },
  }).trim();
}

export function paragraphsFromEditorHtml(body: string): string[] {
  const clean = sanitizeBlogHtml(body);
  const hasText = plainTextFromHtml(clean).length > 0;
  const hasImage = /<img\b/i.test(clean);
  if (!hasText && !hasImage) return [];
  return [clean];
}

export function renderBlogHtml(raw: unknown): string {
  const html = paragraphsToEditorHtml(raw);
  if (!html) return "";
  return sanitizeBlogHtml(html);
}

const DROP = new Set([
  "script",
  "style",
  "iframe",
  "object",
  "embed",
  "link",
  "meta",
  "form",
  "input",
  "button",
  "textarea",
  "select",
  "svg",
  "math",
  "noscript",
]);

const ALLOW = new Set([
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
]);

const COLOR =
  /^(?:#[0-9a-f]{3,8}|rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)|rgba\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*(?:0|1|0?\.\d+)\s*\)|hsl\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*\)|hsla\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*,\s*(?:0|1|0?\.\d+)\s*\)|[a-z]{3,30}|transparent)$/i;

const STYLE_VALUE: Record<string, RegExp> = {
  color: COLOR,
  "background-color": COLOR,
  "text-align": /^(?:left|right|center|justify|start|end)$/i,
  "font-weight": /^(?:normal|bold|bolder|lighter|[1-9]00)$/i,
  "font-style": /^(?:normal|italic|oblique)$/i,
  "font-size": /^\d+(?:\.\d+)?(?:px|pt|em|rem|%)$/i,
  "font-family": /^[a-z0-9 ,"'\-]{1,80}$/i,
  "text-decoration": /^(?:none|underline|line-through|underline line-through|line-through underline)$/i,
  "text-decoration-line": /^(?:none|underline|line-through|underline line-through|line-through underline)$/i,
  "line-height": /^(?:normal|\d+(?:\.\d+)?(?:px|em|rem|%)?)$/i,
  "margin-left": /^\d+(?:\.\d+)?(?:px|em|rem|pt)$/i,
  "padding-left": /^\d+(?:\.\d+)?(?:px|em|rem|pt)$/i,
  "vertical-align": /^(?:baseline|sub|super|middle|top|bottom)$/i,
  "list-style-type": /^(?:disc|circle|square|decimal|decimal-leading-zero|lower-alpha|upper-alpha|lower-roman|upper-roman|none)$/i,
};

function safeStyle(raw: string): string {
  const kept: string[] = [];
  for (const part of raw.split(";")) {
    const index = part.indexOf(":");
    if (index < 0) continue;
    const prop = part.slice(0, index).trim().toLowerCase();
    const value = part.slice(index + 1).trim();
    const rule = STYLE_VALUE[prop];
    if (!rule || value.length > 120) continue;
    if (/url\s*\(|expression\s*\(|javascript:|@import/i.test(value)) continue;
    if (!rule.test(value)) continue;
    kept.push(`${prop}: ${value}`);
  }
  return kept.join("; ");
}

export function safeHref(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const withScheme = /^[a-z][a-z0-9+.-]*:/i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;
  try {
    const url = new URL(withScheme);
    if (url.protocol === "http:" || url.protocol === "https:" || url.protocol === "mailto:") {
      return url.href;
    }
  } catch {
    return null;
  }
  return null;
}

function appendChildren(source: Element, target: Node, doc: Document) {
  for (const child of source.childNodes) {
    const cleaned = cleanNode(child, doc);
    if (!cleaned) continue;
    target.appendChild(cleaned);
  }
}

function cleanNode(node: Node, doc: Document): Node | null {
  if (node.nodeType === Node.TEXT_NODE) {
    return doc.createTextNode(node.textContent ?? "");
  }
  if (node.nodeType !== Node.ELEMENT_NODE) return null;

  const element = node as HTMLElement;
  const tag = element.tagName.toLowerCase();
  if (DROP.has(tag)) return null;

  if (tag === "font") {
    const span = doc.createElement("span");
    const bits: string[] = [];
    const color = element.getAttribute("color");
    if (color && COLOR.test(color)) bits.push(`color: ${color}`);
    const face = element.getAttribute("face");
    if (face && STYLE_VALUE["font-family"].test(face)) {
      bits.push(`font-family: ${face}`);
    }
    const style = safeStyle(element.getAttribute("style") ?? "");
    if (style) bits.push(style);
    if (bits.length) span.setAttribute("style", bits.join("; "));
    appendChildren(element, span, doc);
    return span;
  }

  if (!ALLOW.has(tag)) {
    const fragment = doc.createDocumentFragment();
    appendChildren(element, fragment, doc);
    return fragment;
  }

  const out = doc.createElement(tag);
  if (tag === "a") {
    const href = safeHref(element.getAttribute("href") ?? "");
    if (href) {
      out.setAttribute("href", href);
      out.setAttribute("rel", "noopener noreferrer");
      if (/^https?:/i.test(href)) out.setAttribute("target", "_blank");
    }
  } else if (tag === "img") {
    const src = element.getAttribute("src") ?? "";
    if (!/^https:\/\//i.test(src)) return null;
    out.setAttribute("src", src);
    out.setAttribute("alt", (element.getAttribute("alt") ?? "").slice(0, 200));
  }

  const style = safeStyle(element.getAttribute("style") ?? "");
  if (style && tag !== "img") out.setAttribute("style", style);
  if (tag === "th" || tag === "td") {
    for (const name of ["colspan", "rowspan"] as const) {
      const value = element.getAttribute(name);
      if (value && /^\d{1,2}$/.test(value)) out.setAttribute(name, value);
    }
  }

  if (tag !== "br" && tag !== "hr" && tag !== "img") {
    appendChildren(element, out, doc);
  }
  return out;
}

export function sanitizeBrowserHtml(dirty: string): string {
  const doc = new DOMParser().parseFromString(dirty, "text/html");
  const clean = doc.implementation.createHTMLDocument("");
  appendChildren(doc.body, clean.body, clean);
  return clean.body.innerHTML;
}

export function dataUrlToFile(dataUrl: string): File | null {
  const match = /^data:(image\/(?:jpeg|png|webp|gif));base64,([a-z0-9+/=\s]+)$/i.exec(
    dataUrl.trim()
  );
  if (!match) return null;
  const type = match[1].toLowerCase();
  const binary = atob(match[2].replace(/\s/g, ""));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  const extension = type === "image/jpeg" ? "jpg" : type.slice("image/".length);
  return new File([bytes], `yapistirma.${extension}`, { type });
}

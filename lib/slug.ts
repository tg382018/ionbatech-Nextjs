/** URL-safe slug from a title (ASCII, hyphens). */
export function slugifyTitle(input: string): string {
  const map: Record<string, string> = {
    ı: "i",
    İ: "i",
    ğ: "g",
    Ğ: "g",
    ü: "u",
    Ü: "u",
    ş: "s",
    Ş: "s",
    ö: "o",
    Ö: "o",
    ç: "c",
    Ç: "c",
  };
  let s = input.trim().toLowerCase();
  for (const [k, v] of Object.entries(map)) {
    s = s.split(k).join(v);
  }
  s = s
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
  return s || "yazi";
}

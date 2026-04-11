export type AdminBlogRow = {
  id: string;
  slug: string;
  title: string;
  coverImageUrl: string;
  publishedAt: string | null;
  status: "published" | "draft";
  seoTags: string;
};

export type BlogPostRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  published_at: string | null;
  reading_minutes: number;
  author: string;
  cover_image_src: string;
  cover_image_alt: string;
  paragraphs: string[] | unknown;
  status: "draft" | "published";
  seo_tags: string | null;
};

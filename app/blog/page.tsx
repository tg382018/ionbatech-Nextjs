import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

import { Container } from "@/components/layout/container";
import { formatBlogDate, getPublishedPosts } from "@/lib/blog-data";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Enerji depolama, solar ve sistem entegrasyonu hakkında teknik yazılar ve güncellemeler.",
  openGraph: {
    title: "Blog",
    description:
      "Enerji depolama, solar ve sistem entegrasyonu hakkında teknik yazılar ve güncellemeler.",
  },
};

export default async function BlogPage() {
  const blogPosts = await getPublishedPosts();

  return (
    <div className="border-b border-border bg-background">
      <div className="border-b border-border/80 bg-muted/30 py-12 sm:py-16">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Blog
          </p>
          <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Teknik yazılar ve haberler
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Batarya sistemleri, inverter seçimi ve saha uygulamalarına dair özet
            içerikler.
          </p>
        </Container>
      </div>

      <Container className="py-10 sm:py-14">
        {blogPosts.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground">
            Henüz yayınlanmış yazı yok.
          </p>
        ) : (
          <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4 xl:gap-5">
            {blogPosts.map((post, index) => (
              <li key={post.slug}>
                <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border/80 bg-card shadow-sm ring-1 ring-foreground/[0.04] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="relative aspect-[16/9] w-full overflow-hidden bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    aria-label={post.title}
                  >
                    <Image
                      src={post.coverImage.src}
                      alt={post.coverImage.alt}
                      fill
                      priority={index === 0}
                      loading={index === 0 ? "eager" : undefined}
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col p-4">
                    <time
                      className="text-xs text-muted-foreground"
                      dateTime={post.publishedAt}
                    >
                      {formatBlogDate(post.publishedAt)}
                    </time>
                    <h2 className="mt-2 font-heading text-base font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="line-clamp-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground sm:text-[13px] line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border/60 pt-3">
                      <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                        <Clock className="size-3" aria-hidden />
                        {post.readingMinutes} dk
                      </span>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-0.5 text-xs font-semibold text-primary transition-colors hover:text-primary/80"
                      >
                        Oku
                        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </div>
  );
}

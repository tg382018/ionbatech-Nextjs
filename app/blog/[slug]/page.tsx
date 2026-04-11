import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { formatBlogDate, getAllSlugs, getPostBySlug } from "@/lib/blog-data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return { title: "Yazı bulunamadı" };
  }
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: post.coverImage.src,
          alt: post.coverImage.alt,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  return (
    <article className="border-b border-border bg-background">
      <Container className="py-10 sm:py-14">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Bloga dön
        </Link>

        <header className="mx-auto mt-8 max-w-3xl">
          <p className="text-sm font-medium text-primary">{post.author}</p>
          <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <time dateTime={post.publishedAt}>
              {formatBlogDate(post.publishedAt)}
            </time>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5" aria-hidden />
              {post.readingMinutes} dakika okuma
            </span>
          </div>
        </header>

        <div className="relative mx-auto mt-8 aspect-[21/9] w-full max-w-3xl overflow-hidden rounded-xl bg-muted">
          <Image
            src={post.coverImage.src}
            alt={post.coverImage.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </div>

        <div className="mx-auto mt-10 max-w-3xl space-y-6 text-base leading-relaxed text-foreground/90">
          {post.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-3xl border-t border-border pt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-semibold text-primary hover:text-primary/85"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Tüm yazılar
          </Link>
        </div>
      </Container>
    </article>
  );
}

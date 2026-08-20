import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getBlogArticle, getBlogArticles } from '@/lib/strapi';
import { resolveBlogArticle } from '@/lib/strapi/resolvers';
import GetSolar from '@/reuseables/getsolar';

export const revalidate = 60;

interface BlogArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { data } = await getBlogArticles();
  const articles = Array.isArray(data) ? data : [];
  return articles
    .map((a) => a.slug)
    .filter((slug): slug is string => Boolean(slug))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const article = await getBlogArticle(slug);
  const resolved = resolveBlogArticle(article);
  if (!resolved) return { title: 'Article not found' };
  return {
    title: resolved.title,
    description: resolved.description || undefined,
  };
}

const BlogArticlePage = async ({ params }: BlogArticlePageProps) => {
  const { slug } = await params;
  const article = await getBlogArticle(slug);
  const resolved = resolveBlogArticle(article);

  if (!resolved) notFound();

  const publishedDate = resolved.publishedAt
    ? new Date(resolved.publishedAt).toLocaleDateString('en-AU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null;

  return (
    <div className="bg-white min-h-screen text-black">
      <article className="max-w-4xl mx-auto px-[5%] md:px-[3%] pt-28 md:pt-32 pb-12 md:pb-20">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-black/60 hover:text-black transition-colors mb-8"
        >
          &larr; Back to blog
        </Link>

        {resolved.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {resolved.categories.map((cat) => (
              <span
                key={cat.key}
                className="text-xs font-medium uppercase tracking-wide px-3 py-1 rounded-full bg-[#E5EFD5] text-[#4d7a17]"
              >
                {cat.label}
              </span>
            ))}
          </div>
        )}

        <h1 className="text-3xl md:text-5xl font-normal tracking-tight leading-tight mb-4">
          {resolved.title}
        </h1>

        {resolved.description && (
          <p className="text-lg text-black/70 leading-relaxed mb-6">
            {resolved.description}
          </p>
        )}

        {publishedDate && (
          <p className="text-sm text-black/50 mb-8">{publishedDate}</p>
        )}

        {resolved.image && (
          <div className="relative w-full h-[280px] md:h-[440px] rounded-[20px] overflow-hidden bg-[#E5EFD5] mb-10">
            <Image
              src={resolved.image}
              alt={resolved.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {resolved.content && (
          <div
            className="article-content text-base md:text-lg leading-relaxed text-black/80 space-y-4 [&_h1]:text-3xl [&_h2]:text-2xl [&_h3]:text-xl [&_h2,&_h3]:font-medium [&_h2,&_h3]:mt-8 [&_h2,&_h3]:mb-3 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_a]:text-[#4d7a17] [&_a]:underline [&_img]:rounded-xl [&_img]:my-6 [&_blockquote]:border-l-4 [&_blockquote]:border-[#A0CF44] [&_blockquote]:pl-4 [&_blockquote]:italic [&_strong]:font-semibold"
            dangerouslySetInnerHTML={{ __html: resolved.content }}
          />
        )}
      </article>

      <GetSolar
        subtitle=""
        mainTitle="Get Your Free Solar Quote"
        description="Ready to start saving with solar? Get a free, no-obligation quote from the Regen Power team."
        buttonText="Get Your Free Quote"
        buttonHref="#quote-form"
      />
    </div>
  );
};

export default BlogArticlePage;

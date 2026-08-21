import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPressArticle, getPressArticles } from '@/lib/strapi';
import { resolvePressArticle, resolveLatestPressItems } from '@/lib/strapi/resolvers';
import GetSolar from '@/reuseables/getsolar';

export const revalidate = 60;

interface PressArticlePageProps {
  params: Promise<{ slug: string }>;
}

/** How many items the "Latest News" sidebar shows. */
const LATEST_NEWS_COUNT = 5;

export async function generateStaticParams() {
  const { data } = await getPressArticles();
  const articles = Array.isArray(data) ? data : [];
  return articles
    .map((a) => a.slug)
    .filter((slug): slug is string => Boolean(slug))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PressArticlePageProps) {
  const { slug } = await params;
  const article = await getPressArticle(slug);
  const resolved = resolvePressArticle(article);
  if (!resolved) return { title: 'Article not found' };
  return {
    title: resolved.title,
    description: resolved.description || undefined,
  };
}

const PressArticlePage = async ({ params }: PressArticlePageProps) => {
  const { slug } = await params;
  const [article, latest] = await Promise.all([
    getPressArticle(slug),
    getPressArticles(),
  ]);
  const resolved = resolvePressArticle(article);

  if (!resolved) notFound();

  // Most recent articles for the sidebar, excluding the one being read.
  const latestItems = resolveLatestPressItems(latest.data)
    .filter((item) => item.href !== `/press-media/${resolved.slug}`)
    .slice(0, LATEST_NEWS_COUNT);

  const formatDate = (value: string) =>
    value
      ? new Date(value).toLocaleDateString('en-AU', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })
      : null;

  const publishedDate = formatDate(resolved.publishedAt);

  return (
    <div className="bg-white min-h-screen text-black">
      <div className="max-w-7xl mx-auto px-[5%] md:px-[3%] pt-28 md:pt-32 pb-12 md:pb-20">
        <div className="flex justify-center gap-10 xl:gap-14">
          {/* ── Article ── */}
          <article className="w-full min-w-0 max-w-3xl">
            <Link
              href="/press-media"
              className="inline-flex items-center gap-2 text-sm text-black/60 hover:text-black transition-colors mb-8"
            >
              &larr; Back to press &amp; media
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
                  preload
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

          {/* ── Latest News sidebar (desktop only) ── */}
          {latestItems.length > 0 && (
            <aside className="hidden lg:block w-[300px] xl:w-[340px] shrink-0">
              <div className="sticky top-28">
                <h2 className="text-lg font-medium tracking-tight mb-2">
                  Latest News
                </h2>
                <ul className="flex flex-col">
                  {latestItems.map((item) => {
                    const date = formatDate(item.publishedAt);
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="group flex items-start gap-4 rounded-2xl p-3 -mx-3 transition-colors hover:bg-[#F3F8EA]"
                        >
                          {item.image && (
                            <span className="relative w-[88px] h-[66px] shrink-0 rounded-xl overflow-hidden bg-[#E5EFD5]">
                              <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                sizes="176px"
                                className="object-cover"
                              />
                            </span>
                          )}
                          <span className="min-w-0">
                            <span className="block text-sm font-medium leading-snug tracking-tight line-clamp-2 group-hover:text-[#4d7a17] transition-colors">
                              {item.title}
                            </span>
                            {date && (
                              <span className="block text-xs text-black/50 mt-1.5">
                                {date}
                              </span>
                            )}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <Link
                  href="/press-media"
                  className="inline-flex items-center gap-1.5 mt-4 px-3 py-1.5 -mx-3 text-sm font-medium text-[#4d7a17] tracking-tight rounded-full hover:bg-[#E5EFD5] transition-colors"
                >
                  View all news &rarr;
                </Link>
              </div>
            </aside>
          )}
        </div>
      </div>

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

export default PressArticlePage;

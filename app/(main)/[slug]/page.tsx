import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  getBlogArticle,
  getBlogArticles,
  getLatestBlogArticles,
  getPressArticle,
  getPressArticles,
} from '@/lib/strapi';
import {
  resolveBlogArticle,
  resolveLatestBlogItems,
  resolvePressArticle,
  resolveLatestPressItems,
} from '@/lib/strapi/resolvers';
import type { ResolvedSeo } from '@/lib/strapi/resolvers/shared';
import GetSolar from '@/reuseables/getsolar';

export const revalidate = 60;

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

/** How many items the sidebar shows. */
const LATEST_COUNT = 5;

export async function generateStaticParams() {
  const [{ data: blogArticles }, { data: pressArticles }] = await Promise.all([
    getBlogArticles(),
    getPressArticles(),
  ]);

  const slugs = new Set<string>();
  for (const a of Array.isArray(blogArticles) ? blogArticles : []) {
    if (a.slug) slugs.add(a.slug);
  }
  for (const a of Array.isArray(pressArticles) ? pressArticles : []) {
    if (a.slug) slugs.add(a.slug);
  }

  return [...slugs].map((slug) => ({ slug }));
}

/** Build a full Next.js Metadata object from an article + its (optional) shared.seo data. */
function buildArticleMetadata(article: {
  title: string;
  slug: string;
  description: string;
  image: string;
  publishedAt: string;
  updatedAt: string;
  seo: ResolvedSeo | null;
}): Metadata {
  const seo = article.seo;
  const title = seo?.metaTitle || article.title;
  const description = seo?.metaDescription || article.description || undefined;
  const ogTitle = seo?.ogTitle || title;
  const ogDescription = seo?.ogDescription || description;
  const ogImage = seo?.ogImage || article.image || undefined;
  const twitterTitle = seo?.twitterTitle || title;
  const twitterDescription = seo?.twitterDescription || description;
  const twitterImage = seo?.twitterImage || article.image || undefined;
  const validCardTypes = ['summary', 'summary_large_image', 'app', 'player'] as const;
  const twitterCard =
    (validCardTypes as readonly string[]).includes(seo?.twitterCard ?? '')
      ? (seo!.twitterCard as (typeof validCardTypes)[number])
      : twitterImage
      ? 'summary_large_image'
      : 'summary';

  return {
    title,
    description,
    keywords: seo?.keywords || undefined,
    ...(seo?.canonicalURL ? { alternates: { canonical: seo.canonicalURL } } : {}),
    ...(seo?.metaRobots ? { robots: seo.metaRobots } : {}),
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      type: (seo?.ogType as 'article' | undefined) || 'article',
      ...(article.publishedAt ? { publishedTime: article.publishedAt } : {}),
      ...(article.updatedAt ? { modifiedTime: article.updatedAt } : {}),
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: {
      card: twitterCard,
      title: twitterTitle,
      description: twitterDescription,
      ...(twitterImage ? { images: [twitterImage] } : {}),
      ...(seo?.twitterSite ? { site: seo.twitterSite } : {}),
      ...(seo?.twitterCreator ? { creator: seo.twitterCreator } : {}),
    },
  };
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;

  const blogArticle = resolveBlogArticle(await getBlogArticle(slug));
  if (blogArticle) {
    return buildArticleMetadata(blogArticle);
  }

  const pressArticle = resolvePressArticle(await getPressArticle(slug));
  if (pressArticle) {
    return buildArticleMetadata(pressArticle);
  }

  return { title: 'Article not found' };
}

const ArticlePage = async ({ params }: ArticlePageProps) => {
  const { slug } = await params;

  // Blog articles take priority over press/media articles when a slug matches both.
  const blogArticle = resolveBlogArticle(await getBlogArticle(slug));

  if (blogArticle) {
    const latest = await getLatestBlogArticles(LATEST_COUNT + 1);
    const latestItems = resolveLatestBlogItems(latest)
      .filter((item) => item.href !== `/${blogArticle.slug}`)
      .slice(0, LATEST_COUNT);

    return (
      <>
        <StructuredData data={blogArticle.seo?.structuredData} />
        <ArticleLayout
          article={blogArticle}
          latestItems={latestItems}
          backHref="/blog"
          backLabel="Back to blog"
          sidebarTitle="Latest Blogs"
          viewAllHref="/blog"
          viewAllLabel="View all blogs"
        />
      </>
    );
  }

  const pressArticle = resolvePressArticle(await getPressArticle(slug));

  if (pressArticle) {
    const { data: allPress } = await getPressArticles();
    const latestItems = resolveLatestPressItems(allPress)
      .filter((item) => item.href !== `/${pressArticle.slug}`)
      .slice(0, LATEST_COUNT);

    return (
      <>
        <StructuredData data={pressArticle.seo?.structuredData} />
        <ArticleLayout
          article={pressArticle}
          latestItems={latestItems}
          backHref="/press-media"
          backLabel="Back to press & media"
          sidebarTitle="Latest News"
          viewAllHref="/press-media"
          viewAllLabel="View all news"
        />
      </>
    );
  }

  notFound();
};

/** Renders a `shared.seo.structuredData` JSON-LD blob, if present. */
const StructuredData = ({ data }: { data?: Record<string, unknown> }) => {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

interface ArticleLayoutProps {
  article: {
    title: string;
    description: string;
    content: string;
    categories: { key: string; label: string }[];
    image: string;
    publishedAt: string;
  };
  latestItems: { title: string; href: string; image: string; publishedAt: string }[];
  backHref: string;
  backLabel: string;
  sidebarTitle: string;
  viewAllHref: string;
  viewAllLabel: string;
}

const formatDate = (value: string) =>
  value
    ? new Date(value).toLocaleDateString('en-AU', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : null;

const ArticleLayout = ({
  article,
  latestItems,
  backHref,
  backLabel,
  sidebarTitle,
  viewAllHref,
  viewAllLabel,
}: ArticleLayoutProps) => {
  const publishedDate = formatDate(article.publishedAt);

  return (
    <div className="bg-white min-h-screen text-black">
      <div className="max-w-7xl mx-auto px-[5%] md:px-[3%] pt-28 md:pt-32 pb-12 md:pb-20">
        <div className="flex justify-center gap-10 xl:gap-14">
          {/* ── Article ── */}
          <article className="w-full min-w-0 max-w-3xl">
            <Link
              href={backHref}
              className="inline-flex items-center gap-2 text-sm text-black/60 hover:text-black transition-colors mb-8"
            >
              &larr; {backLabel}
            </Link>

            {article.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {article.categories.map((cat) => (
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
              {article.title}
            </h1>

            {article.description && (
              <p className="text-lg text-black/70 leading-relaxed mb-6">
                {article.description}
              </p>
            )}

            {publishedDate && (
              <p className="text-sm text-black/50 mb-8">{publishedDate}</p>
            )}

            {article.image && (
              <div className="relative w-full h-[280px] md:h-[440px] rounded-[20px] overflow-hidden bg-[#E5EFD5] mb-10">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                  preload
                />
              </div>
            )}

            {article.content && (
              <div
                className="article-content text-base md:text-lg leading-relaxed text-black/80 space-y-4 [&_h1]:text-3xl [&_h2]:text-2xl [&_h3]:text-xl [&_h2,&_h3]:font-medium [&_h2,&_h3]:mt-8 [&_h2,&_h3]:mb-3 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_a]:text-[#4d7a17] [&_a]:underline [&_img]:rounded-xl [&_img]:my-6 [&_blockquote]:border-l-4 [&_blockquote]:border-[#A0CF44] [&_blockquote]:pl-4 [&_blockquote]:italic [&_strong]:font-semibold [&_figure.wp-caption]:my-6 [&_figure.wp-caption_img]:mb-2 [&_figcaption]:text-sm [&_figcaption]:text-black/50 [&_figcaption]:text-center [&_figcaption]:italic [&_.wp-shortcode-button]:inline-block [&_.wp-shortcode-button]:no-underline [&_.wp-shortcode-button]:bg-[#63B846] [&_.wp-shortcode-button]:text-white [&_.wp-shortcode-button]:px-5 [&_.wp-shortcode-button]:py-2.5 [&_.wp-shortcode-button]:rounded-full [&_.wp-shortcode-button]:font-medium [&_.wp-video-embed]:relative [&_.wp-video-embed]:my-6 [&_.wp-video-embed]:aspect-video [&_.wp-video-embed_iframe]:absolute [&_.wp-video-embed_iframe]:inset-0 [&_.wp-video-embed_iframe]:w-full [&_.wp-video-embed_iframe]:h-full [&_.wp-video-embed_iframe]:rounded-xl [&_.wp-video]:w-full [&_.wp-video]:rounded-xl [&_.wp-video]:my-6 [&_.wp-cta]:my-6 [&_.wp-cta]:p-6 [&_.wp-cta]:rounded-xl [&_.wp-cta]:bg-[#EEF6EB] [&_.wp-cta]:text-center [&_.wp-cta_img]:mx-auto [&_.wp-cta_img]:mb-3 [&_.wp-cta_img]:rounded-lg [&_.wp-cta_img]:max-h-48 [&_.wp-cta_img]:object-cover [&_.wp-cta-title]:font-medium [&_.wp-cta-title]:mb-3"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            )}
          </article>

          {/* ── Latest items sidebar (desktop only) ── */}
          {latestItems.length > 0 && (
            <aside className="hidden lg:block w-[300px] xl:w-[340px] shrink-0">
              <div className="sticky top-28">
                <h2 className="text-lg font-medium tracking-tight mb-2">
                  {sidebarTitle}
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
                  href={viewAllHref}
                  className="inline-flex items-center gap-1.5 mt-4 px-3 py-1.5 -mx-3 text-sm font-medium text-[#4d7a17] tracking-tight rounded-full hover:bg-[#E5EFD5] transition-colors"
                >
                  {viewAllLabel} &rarr;
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

export default ArticlePage;

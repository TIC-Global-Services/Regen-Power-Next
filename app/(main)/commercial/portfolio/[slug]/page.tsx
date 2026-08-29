import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPortfolioProject, getPortfolioProjects } from '@/lib/strapi';
import { resolvePortfolioProjectDetail } from '@/lib/strapi/resolvers';

export const revalidate = 60;

const FALLBACK_IMAGE = '/fallback.png';

interface PortfolioProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { data } = await getPortfolioProjects();
  const projects = Array.isArray(data) ? data : [];
  return projects
    .map((p) => p.slug)
    .filter((slug): slug is string => Boolean(slug))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PortfolioProjectPageProps) {
  const { slug } = await params;
  const project = await getPortfolioProject(slug);
  const resolved = resolvePortfolioProjectDetail(project);
  if (!resolved) return { title: 'Project not found' };
  return {
    title: resolved.title,
    description: resolved.description || undefined,
  };
}

const PortfolioProjectPage = async ({ params }: PortfolioProjectPageProps) => {
  const { slug } = await params;
  const project = await getPortfolioProject(slug);
  const resolved = resolvePortfolioProjectDetail(project);

  if (!resolved) notFound();

  const hasImage = Boolean(resolved.image);

  return (
    <div className="bg-white min-h-screen text-black">
      <div className="max-w-7xl mx-auto px-[5%] md:px-[3%] pt-28 md:pt-32 pb-12 md:pb-20">
        <Link
          href="/commercial/portfolio"
          className="inline-flex items-center gap-2 text-sm text-black/60 hover:text-black transition-colors mb-8"
        >
          &larr; Back to portfolio
        </Link>

        {/* ── Heading ── */}
        {resolved.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {resolved.categories.map((cat) => (
              <span
                key={cat}
                className="text-xs font-medium uppercase tracking-wide px-3 py-1 rounded-full bg-[#E5EFD5] text-[#4d7a17]"
              >
                {cat}
              </span>
            ))}
          </div>
        )}

        <h1 className="text-3xl md:text-5xl font-normal tracking-tight leading-tight mb-4">
          {resolved.title}
        </h1>

        {resolved.description && (
          <p className="text-lg text-black/70 leading-relaxed mb-2 max-w-3xl">
            {resolved.description}
          </p>
        )}

        {resolved.location && (
          <p className="text-sm text-black/50 mb-10">{resolved.location}</p>
        )}

        {/* ── Photo + content side by side ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Photo */}
          <div className="relative w-full h-[280px] md:h-[420px] lg:h-[520px] rounded-[20px] overflow-hidden bg-[#E5EFD5] lg:sticky lg:top-28">
            <Image
              src={hasImage ? resolved.image : FALLBACK_IMAGE}
              alt={resolved.title}
              fill
              className="object-cover"
              preload
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>

          {/* Content column */}
          <div className="min-w-0 flex flex-col gap-10">
            {resolved.specs.length > 0 && (
              <section aria-label="Project specifications">
                <h2 className="text-lg font-medium tracking-tight mb-3">
                  Project Details
                </h2>
                <dl>
                  {resolved.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex justify-between gap-6 py-2.5 border-b border-black/10"
                    >
                      <dt className="text-sm text-black/50 shrink-0">{spec.label}</dt>
                      <dd className="text-sm font-medium tracking-tight text-right">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}

            {resolved.contentHtml && (
              <section aria-label="About this project">
                <h2 className="text-lg font-medium tracking-tight mb-3">
                  About This Installation
                </h2>
                <div
                  className="text-base leading-relaxed text-black/80 [&_p]:mb-4 [&_strong]:font-semibold [&_strong]:text-black"
                  dangerouslySetInnerHTML={{ __html: resolved.contentHtml }}
                />
              </section>
            )}

            {!resolved.specs.length && !resolved.contentHtml && resolved.description && (
              <p className="text-base leading-relaxed text-black/80">
                {resolved.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioProjectPage;

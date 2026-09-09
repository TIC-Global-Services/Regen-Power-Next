import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CASE_STUDIES_DATA,
  getCaseStudyBySlug,
  normalizeCaseStudy,
  type CaseStudyItem,
  type RawCaseStudyItem,
} from "@/utils/case-studies-data";
import { CaseStudyDetailView } from "@/components/commercial/case-studies";
import { getCommercialSystemsPage, getCaseStudies } from "@/lib/strapi";
import { findSection } from "@/lib/strapi/section-utils";
import { resolveSharedFormSection, resolveCaseStudies } from "@/lib/strapi/resolvers";
import type {
  CommercialSystemsFeatureCardGridData,
  SharedFormSectionData,
} from "@/lib/strapi/schemas";

export const revalidate = 60;

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

async function resolveCaseStudy(slug: string): Promise<CaseStudyItem | undefined> {
  const cleanSlug = slug.toLowerCase().trim();

  // 1. Fetch full case studies collection from Strapi and find matching slug
  try {
    const res = await getCaseStudies();
    const liveStudies = resolveCaseStudies(res?.data);
    const liveMatch = liveStudies.find(
      (c) =>
        c.slug.toLowerCase() === cleanSlug ||
        c.aliases?.some((a) => a.toLowerCase() === cleanSlug)
    );
    if (liveMatch) return liveMatch;
  } catch {
    // Strapi offline or unreachable
  }

  // 2. Fall back to local dataset (case_studies.json)
  const staticMatch = getCaseStudyBySlug(slug);
  if (staticMatch) return staticMatch;

  // 3. Fall back to commercial systems page feature-card-grid if details embedded
  try {
    const pageRes = await getCommercialSystemsPage();
    const sections = pageRes?.data?.sections ?? [];
    const featureSection = findSection<CommercialSystemsFeatureCardGridData>(
      sections,
      "commercial-systems.feature-card-grid"
    );
    const cardMatch = featureSection?.cards?.find(
      (c) => c.details?.slug?.toLowerCase() === cleanSlug
    );
    if (cardMatch?.details) {
      return normalizeCaseStudy(cardMatch.details as RawCaseStudyItem);
    }
  } catch {
    // Strapi offline or unreachable
  }

  return undefined;
}

export async function generateStaticParams() {
  const slugs = new Set<string>();

  // 1. Slugs from Strapi collection type
  try {
    const res = await getCaseStudies();
    if (Array.isArray(res?.data)) {
      res.data.forEach((item) => {
        if (item.slug) slugs.add(item.slug);
      });
    }
  } catch {
    // Strapi offline
  }

  // 2. Slugs from local static dataset
  for (const item of CASE_STUDIES_DATA) {
    if (item.slug) slugs.add(item.slug);
    if (Array.isArray(item.aliases)) {
      item.aliases.forEach((a) => a && slugs.add(a));
    }
  }

  // 3. Slugs from commercial-systems-page
  try {
    const pageRes = await getCommercialSystemsPage();
    const sections = pageRes?.data?.sections ?? [];
    const featureSection = findSection<CommercialSystemsFeatureCardGridData>(
      sections,
      "commercial-systems.feature-card-grid"
    );
    featureSection?.cards?.forEach((c) => {
      if (c.details?.slug) slugs.add(c.details.slug);
    });
  } catch {
    // Strapi offline
  }

  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await resolveCaseStudy(slug);

  if (!caseStudy) {
    return {
      title: "Case Study Not Found | Regen Power",
      description: "The requested commercial case study could not be found.",
    };
  }

  return {
    title: `${caseStudy.title} | Case Study | Regen Power`,
    description:
      caseStudy.metaDescription ||
      caseStudy.heroDescription ||
      `Explore our commercial solar case study: ${caseStudy.title}.`,
    openGraph: {
      title: `${caseStudy.title} | Regen Power Commercial Case Study`,
      description: caseStudy.metaDescription || caseStudy.heroDescription,
      images: caseStudy.showcaseImage ? [{ url: caseStudy.showcaseImage }] : [],
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = await resolveCaseStudy(slug);

  if (!caseStudy) {
    notFound();
  }

  // Optionally fetch commercial form section if available in Strapi
  const commercialPageRes = await getCommercialSystemsPage().catch(() => ({ data: { sections: [] } }));
  const sections = commercialPageRes?.data?.sections ?? [];
  const formSection = findSection<SharedFormSectionData>(
    sections,
    "shared.form-section"
  );
  const formProps = resolveSharedFormSection(formSection);

  return (
    <main className="bg-white min-h-screen text-black">
      {/* Reusable Case Study View (Hero, Quote, Feature, Narratives, Showcase, Specs, Gallery, Nav) */}
      <CaseStudyDetailView caseStudy={caseStudy} />

      {/* Commercial Solar Quote & Inquiry Form */}
      {/* <section id="quote-form">
        <UnifiedFormSection
          resolved={formProps}
          title={formProps?.title || "Request a Commercial Solar Feasibility Study"}
          description={
            formProps?.description ||
            `Interested in a similar high-performance solar solution for your business? Our engineering team will analyze your electricity bills and rooftop layout to deliver a customized ROI report.`
          }
          video={formProps?.videoSrc || "/form-icon-video.mp4"}
          image={formProps?.imageSrc}
        />
      </section> */}
    </main>
  );
}
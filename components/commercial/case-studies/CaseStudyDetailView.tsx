"use client";

import React from "react";
import type { CaseStudyItem } from "@/utils/case-studies-data";
import CaseStudyHero from "./CaseStudyHero";
import CaseStudyHighlight from "./CaseStudyHighlight";
import CaseStudyFeatureCard from "./CaseStudyFeatureCard";
import CaseStudyNarrative from "./CaseStudyNarrative";
import CaseStudyShowcase from "./CaseStudyShowcase";
import CaseStudySpecs from "./CaseStudySpecs";
import CaseStudyNavigation from "./CaseStudyNavigation";

interface Props {
  caseStudy: CaseStudyItem;
  showNavigation?: boolean;
}

export default function CaseStudyDetailView({
  caseStudy,
  showNavigation = true,
}: Props) {
  const {
    highlightQuote,
    showcaseTitle,
    showcaseImage,
    images,
    tables,
    slug,
    title,
    casestudydetails,
  } = caseStudy;

  return (
    <article className="bg-white min-h-screen text-black">
      {/* 1. Hero Section (Header banner with kicker, title, description, and report download) */}
      <CaseStudyHero caseStudy={caseStudy} />

      {/* 2. High-Impact Highlight / Quote Block (Dual-tone scrub animation) */}
      <CaseStudyHighlight
        lead={highlightQuote?.lead}
        trail={highlightQuote?.trail}
      />

      {/* 3. Curved Feature Container / Badge Card */}
      <CaseStudyFeatureCard
        image={showcaseImage || images[0]}
        alt={title}
        badge={caseStudy.kicker}
      />

      {/* 4. Two-Column Narrative (Renders n details in a clean 2-column grid) */}
      <CaseStudyNarrative
        details={casestudydetails}
        findYourWay={caseStudy.narratives?.findYourWay}
        systemArchitecture={caseStudy.narratives?.systemArchitecture}
      />

      {/* 5. Project Showcase with Image Grid & Fullscreen Modal */}
      <CaseStudyShowcase
        title={showcaseTitle || "Project Showcase"}
        image={showcaseImage || images[0]}
        imageAlt={`${title} showcase`}
        images={images}
      />

      {/* 6. Technical Specifications (for projects with structured tables) */}
      {tables && tables.length > 0 && <CaseStudySpecs tables={tables} />}

      {/* 7. Prev / Next Navigation */}
      {showNavigation && <CaseStudyNavigation currentSlug={slug} />}
    </article>
  );
}

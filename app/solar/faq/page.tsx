import React from "react";
import type { Metadata } from "next";
import { getFaqPage } from "@/lib/strapi";
import { findSection } from "@/lib/strapi/section-utils";
import {
  resolveFaqHero,
  resolveFaqCategorizedFaq,
  resolveSharedCtaBanner,
} from "@/lib/strapi/resolvers";
import type {
  FaqHeroData,
  FaqCategorizedFaqData,
  FaqCtaBannerData,
} from "@/lib/strapi/schemas";

import FaqHeroSection from "@/components/solar/faq/FaqHeroSection";
import CategorizedFaqSection from "@/components/solar/faq/CategorizedFaqSection";
import CtaBannerSection from "@/components/solar/deals/CtaBannerSection";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Solar FAQ | Regen Power",
  description:
    "Browse engineer-written answers to common Perth solar questions across panels, inverters, batteries, installation, and rebates.",
};

export default async function SolarFaqPage() {
  const { data } = await getFaqPage();
  const sections = data.sections ?? [];

  const hero = findSection<FaqHeroData>(sections, "faq.hero");
  const categorizedFaq = findSection<FaqCategorizedFaqData>(sections, "faq.categorized-faq");
  const ctaBanner = findSection<FaqCtaBannerData>(sections, "shared.cta-banner");

  const heroProps = resolveFaqHero(hero);
  const categorizedFaqProps = resolveFaqCategorizedFaq(categorizedFaq);
  const ctaBannerProps = resolveSharedCtaBanner(ctaBanner);

  return (
    <div className="min-h-screen bg-white text-black">

      {heroProps && <FaqHeroSection resolved={heroProps} />}

      {categorizedFaqProps && <CategorizedFaqSection resolved={categorizedFaqProps} />}

      {ctaBannerProps && <CtaBannerSection resolved={ctaBannerProps} />}

    </div>
  );
}
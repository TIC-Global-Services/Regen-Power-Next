import React from "react";
import FeatureCardGrid, { FeatureCardItem } from "@/reuseables/FeatureCardGrid";
import type { ResolvedCommercialSystemsFeatureCardGrid } from "@/lib/strapi/resolvers/commercial";
import { getCaseStudyFeatureCards, type CaseStudyItem } from "@/utils/case-studies-data";

interface Props {
  resolved?: ResolvedCommercialSystemsFeatureCardGrid | null;
  caseStudies?: CaseStudyItem[] | null;
}

export default function FeatureCardGridSection({ resolved, caseStudies }: Props) {
  // Map cards using cardTitle and cardSubTitle, routing using the slug
  let cards: FeatureCardItem[];
  console.log("case study",caseStudies)
  if (caseStudies && caseStudies.length > 0) {
    cards = caseStudies.map((cs) => {
      const cardTitle = cs.card_title || cs.title;
      const cardSubTitle = cs.card_subtitle || cs.subtitle || undefined;

      return {
        title: cardTitle,
        subtitle: cardSubTitle,
        description: cs.location_details || cs.location || cs.reveal_text || "",
        image: cs.showcaseImage || cs.images?.[0] || "/portfolio_hero.png",
        textPosition: "top" as const,
        // footerTitle: "Read More",
        // footerDescription: cardSubTitle,
        href: `/commercial/case-studies/${cs.slug}`,
      };
    });
  } else if (resolved?.cards && resolved.cards.length > 0) {
    cards = resolved.cards.map((card) => {
      const cardTitle =
        card.cardTitle || card.title || card.details?.card_title || "";
      const cardSubTitle =
        card.cardSubTitle ||
        card.subtitle ||
        card.details?.card_subtitle ||
        undefined;
      const slug = card.details?.slug;
      const href =
        card.href ||
        (slug ? `/commercial/case-studies/${slug}` : undefined);

      return {
        title: cardTitle,
        subtitle: cardSubTitle,
        description: card.description,
        image: card.image,
        textPosition: card.textPosition,
        // footerTitle: card.footerTitle || "Read More",
        // footerDescription: card.footerDescription || cardSubTitle,
        href,
      };
    });
  } else {
    cards = getCaseStudyFeatureCards();
  }
  console.log("cards",cards)
  return (
    <FeatureCardGrid
      topSubtitle={resolved?.topSubtitle || ""}
      title={resolved?.title || "Our Commercial Solar Projects"}
      bottomSubtitle={
        resolved?.bottomSubtitle ||
        "Explore real-world commercial solar installations and proven energy savings across Australia."
      }
      showReadMore={true}
      cards={cards}
    />
  );
}

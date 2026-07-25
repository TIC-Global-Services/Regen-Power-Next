import React from "react";
import SolutionsPortfolio from "@/reuseables/SolutionsPortfolio";
import type { ResolvedCommercialOffGridSolutionsPortfolio } from "@/lib/strapi/resolvers/commercial";
import type { PortfolioCard } from "@/reuseables/SolutionsPortfolio";

interface Props {
  resolved: ResolvedCommercialOffGridSolutionsPortfolio;
}

export default function SolutionsPortfolioSection({ resolved }: Props) {
  const cards: PortfolioCard[] = resolved.cards.map((c) => {
    if (c.type === "image") {
      return {
        type: "image" as const,
        variant: c.variant as "light-gray" | "light-green" | "dark",
        image: c.image,
      };
    }
    return {
      type: "text" as const,
      variant: c.variant as "light-gray" | "light-green" | "dark",
      title: c.title,
      description: c.description,
      specs: c.specs || undefined,
    };
  });

  return (
    <SolutionsPortfolio
      subtitle={resolved.subtitle}
      title={resolved.title}
      description={resolved.description}
      cards={cards}
      layout={resolved.layout}
    />
  );
}

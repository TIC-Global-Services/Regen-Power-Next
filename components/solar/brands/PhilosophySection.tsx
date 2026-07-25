import React from "react";
import EditorialTextSection from "@/reuseables/EditorialTextSection";
import type { ResolvedBrandsPhilosophy } from "@/lib/strapi/resolvers/brands";

interface PhilosophySectionProps {
  resolved: ResolvedBrandsPhilosophy;
}

const PhilosophySection: React.FC<PhilosophySectionProps> = ({ resolved }) => {
  const paragraphs = (resolved.paragraphs ?? []).map((p) => ({
    text: p.text,
    isSecondary: p.isSecondary,
  }));

  return (
    <EditorialTextSection
      badge={resolved.badge ?? undefined}
      subtitle={resolved.subtitle ?? ""}
      title={resolved.title ?? ""}
      paragraphs={paragraphs}
      align="left"
      subtitleClass="text-lg md:text-2xl text-black font-normal"
      paragraphsClass="text-left max-w-4xl"
      revealEffect
    />
  );
};

export default PhilosophySection;

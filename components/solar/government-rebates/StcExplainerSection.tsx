import React from "react";
import EditorialTextSection from "@/reuseables/EditorialTextSection";
import type { ResolvedRebatesStcExplainer } from "@/lib/strapi/resolvers/rebates";

interface Props {
  resolved: ResolvedRebatesStcExplainer;
}

export default function StcExplainerSection({ resolved }: Props) {
  return (
    <EditorialTextSection
      subtitle={resolved.subtitle}
      title={resolved.title}
      paragraphs={resolved.paragraphs.map((p) => ({
        text: p.text,
        isSecondary: p.isSecondary,
      }))}
      align="left"
      subtitleClass="text-2xl md:text-2xl font-light text-black mb-2 block normal-case"
      titleClass="text-[2.5rem] md:text-7xl lg:text-[5.5rem] font-medium leading-[1.05] tracking-tighter mb-4"
      paragraphsClass="text-left capitalize text-xl md:text-[2.125rem]"
      revealEffect
    />
  );
}

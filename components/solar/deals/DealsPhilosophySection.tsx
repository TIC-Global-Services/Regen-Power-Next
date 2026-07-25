import React from "react";
import EditorialTextSection from "@/reuseables/EditorialTextSection";
import type { ResolvedDealsPhilosophy } from "@/lib/strapi/resolvers/deals";

interface Props {
  resolved: ResolvedDealsPhilosophy;
}

export default function DealsPhilosophySection({ resolved }: Props) {
  return (
    <EditorialTextSection
      badge={resolved.badge || ""}
      subtitle={resolved.subtitle || ""}
      title={resolved.title || ""}
      paragraphs={resolved.paragraphs.map((p) => ({
        text: p.text,
        isSecondary: p.isSecondary,
      }))}
      align="left"
      subtitleClass="text-lg md:text-2xl text-black font-normal"
      titleClass="text-4xl md:text-[5rem] text-[#63B846] leading-none font-normal tracking-tight"
      revealEffect
    />
  );
}

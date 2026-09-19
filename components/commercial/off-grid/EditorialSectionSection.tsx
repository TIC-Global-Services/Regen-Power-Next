import React from "react";
import EditorialTextSection from "@/reuseables/EditorialTextSection";
import type { ResolvedSharedEditorialSection } from "@/lib/strapi/resolvers/shared";

interface Props {
  resolved: ResolvedSharedEditorialSection;
}

export default function EditorialSectionSection({ resolved }: Props) {
  return (
    <EditorialTextSection
      subtitle={resolved.subtitle}
      title={resolved.title}
      paragraphs={resolved.paragraphs.map((p) => ({
        text: p.text,
        isSecondary: p.isSecondary,
      }))}
      align={resolved.align}
      subtitleClass="text-lg md:text-2xl text-black font-normal"
      titleClass="text-3xl md:text-6xl"
      paragraphsClass="text-center max-w-5xl mx-auto"
      revealEffect
    />
  );
}

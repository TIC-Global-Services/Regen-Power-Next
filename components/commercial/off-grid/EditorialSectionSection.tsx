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
      paragraphsClass="text-left max-w-5xl"
      revealEffect
    />
  );
}

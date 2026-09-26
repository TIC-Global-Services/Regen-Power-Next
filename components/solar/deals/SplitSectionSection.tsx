import React from "react";
import FullscreenSplitSection from "@/reuseables/FullscreenSplitSection";
import type { ResolvedSharedSplitSection } from "@/lib/strapi/resolvers/shared";

interface Props {
  resolved: ResolvedSharedSplitSection;
}

// A blank line (or single newline) in the Strapi text starts a new paragraph.
const toParagraphs = (text: string) =>
  text
    .split(/\r?\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

export default function SplitSectionSection({ resolved }: Props) {
  const paragraphs = toParagraphs(resolved.description);

  return (
    <FullscreenSplitSection
      subtitle={resolved.subtitle}
      title={resolved.title}
      description={paragraphs.map((text, index) => (
        <p key={index} className="mb-4 last:mb-0">
          {text}
        </p>
      ))}
      image={resolved.image?.src ?? ""}
      imageAlt=""
      textArrangement="split"
      imagePosition={resolved.imagePosition}
      badge={resolved.badge}
    />
  );
}

import React from 'react';
import EditorialTextSection from '@/reuseables/EditorialTextSection';

export interface WhatWeCheckData {
    subtitle: string;
    title: string;
    description?: string;
    /** Plain-text paragraphs. Lines containing " — " get a bolded title segment. */
    paragraphs: string[];
}

/** Renders a string with markdown-style `**bold**` segments as <strong>. */
const renderBold = (text: string): React.ReactNode => {
  if (!text.includes("**")) return text;

  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

const WhatWeCheck = ({ data }: { data: WhatWeCheckData }) => {
  const checkParagraphs = data.paragraphs.map((text) => {
    // Backward-compatible: any leading "Title — " segment becomes bold.
    if (text.includes(" — ") && !text.startsWith("**")) {
      const [title, rest] = text.split(" — ");
      return {
        text: (
          <>
            <strong>{title}</strong> — {rest}
          </>
        )
      };
    }
    return { text: renderBold(text) };
  });

  return (
    <EditorialTextSection
      subtitle={data.subtitle}
      title={data.title}
      description={data.description}
      paragraphs={checkParagraphs}
      align="left"
      revealEffect={true}
      className="py-16 md:py-24"
      subtitleClass="text-xl md:text-[1.75rem] text-black font-normal tracking-tight"
      titleClass="text-4xl md:text-6xl text-[#63B846] font-normal leading-[1.1] tracking-tight"
      descriptionClass="text-base md:text-lg text-black font-normal leading-tight tracking-tight mb-6"
    />
  );
};

export default WhatWeCheck;

import React from 'react';
import EditorialTextSection from '@/reuseables/EditorialTextSection';

interface WhatWeCheckProps {
  data: {
    subtitle: string;
    title: string;
    paragraphs: string[];
  };
}

const WhatWeCheck = ({ data }: WhatWeCheckProps) => {
  const checkParagraphs = data.paragraphs.map((text) => {
    if (text.includes(" — ")) {
      const [title, rest] = text.split(" — ");
      return {
        text: (
          <>
            <strong>{title}</strong>{" — "}{rest}
          </>
        )
      };
    }
    return { text };
  });

  return (
    <EditorialTextSection
      subtitle={data.subtitle}
      title={data.title}
      paragraphs={checkParagraphs}
      align="left"
      revealEffect={true}
      className="py-16 md:py-24"
      subtitleClass="text-xl md:text-[2rem] text-black font-normal mb-1 tracking-tight"
      titleClass="text-4xl md:text-[5rem] text-[#63B846] font-normal leading-[1.1] tracking-tight"
    />
  );
};

export default WhatWeCheck;

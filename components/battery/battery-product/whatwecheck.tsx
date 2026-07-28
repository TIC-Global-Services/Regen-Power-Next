import React from 'react';
import EditorialTextSection from '@/reuseables/EditorialTextSection';
import { Pin } from 'lucide-react';

const WhatWeCheck = () => {
  const rawParagraphs = [
    "We've Walked Away From Quotes That Looked Attractive On Paper Because Something At The Property Made The Install Unwise. Here's What We Check:",
    "Main Switchboard Capacity — Older Homes May Need A Switchboard Upgrade Before Battery Install",
    "Solar Inverter Compatibility (Existing Or New) — Which Batteries Work With What You Have",
    "Installation Location — Ventilation, Ambient Temperature, Protection From Direct Sun",
    "Network Connection Type — Synergy (SWIS) Or Horizon Power; Export Limits; ESM Requirements Post-1 May 2026",
    "Internet Reliability — Battery VPP, App And Monitoring All Require Stable Internet",
    "Roof And Solar Situation — For New Solar Installs Alongside Battery"
  ];

  const checkParagraphs = rawParagraphs.map((text) => {
    if (text.includes(" — ")) {
      const [title, rest] = text.split(" — ");
      return {
        text: (
          <>
            <strong>{title}</strong> — {rest}
          </>
        )
      };
    }
    return { text };
  });

  return (
    <EditorialTextSection
      subtitle="What We Check"
      title="Before We Quote You"
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
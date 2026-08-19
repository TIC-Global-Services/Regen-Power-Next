import React from 'react';
import CtaButton from '@/reuseables/CtaButton';
import Reveal from '@/reuseables/Reveal';
import type { ResolvedCommercialSystemsWatchSystemSection } from '@/lib/strapi/resolvers/commercial';

interface Props {
  resolved: ResolvedCommercialSystemsWatchSystemSection;
}

export default function WatchSystemSection({ resolved }: Props) {
  const { subtitle, title, paragraphs, ctaText, ctaHref, image } = resolved;

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="px-[5%] md:px-[3%] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          <Reveal className="relative w-full aspect-[3/4] rounded-[20px] overflow-hidden md:hidden">
            <img
              src={image?.src || '/fallback.png'}
              alt="Solar monitoring"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </Reveal>
          <div className="flex flex-col justify-center">
            <p className="text-lg md:text-[1.75rem] font-light text-black tracking-tight leading-none">
              {subtitle}
            </p>
            <h2 className="text-4xl md:text-6xl lg:text-[3.750rem] text-[#63B846] font-normal tracking-tighter leading-none mb-6">
              {title}
            </h2>
            <div className="space-y-4 mt-5">
              {paragraphs.map((p, idx) => (
                <p
                  key={idx}
                  className="text-sm md:text-xl text-black/80 leading-[1.2] tracking-tight"
                >
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-8">
              <CtaButton
                href={ctaHref}
                text={ctaText}
                textColor="text-black"
              />
            </div>
          </div>

          <Reveal className="relative w-full aspect-[4/4] rounded-[20px] overflow-hidden hidden md:flex">
            <img
              src={image?.src || '/fallback.png'}
              alt="Solar monitoring"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

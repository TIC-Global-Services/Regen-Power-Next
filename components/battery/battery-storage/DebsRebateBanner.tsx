import React from 'react';
import Image, { StaticImageData } from 'next/image';
import CtaButton from '@/reuseables/CtaButton';

export interface DebsRebateHighlight {
  label: string;
  description: string;
}

export interface DebsRebateData {
  subtitle: string;
  title: string;
  description: string;
  highlights?: DebsRebateHighlight[];
  image: StaticImageData | string;
  ctaText?: string;
  ctaLink?: string;
}

const DebsRebateBanner = ({ data }: { data: DebsRebateData }) => {
  const highlights = data.highlights ?? [];

  return (
    <section className="bg-white py-12 md:py-20 px-[5%] md:px-[3%]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Right — Image (on top on mobile, right column on desktop) */}
        <div className="relative w-full aspect-[4/5] md:aspect-[16/13] rounded-[20px] overflow-hidden order-1 lg:order-2 justify-self-center">
          <Image
            src={data.image}
            alt={data.title}
            fill
            className="object-cover object-[60%_80%]"

          />
        </div>

        {/* Left — Text Content */}
        <div className="flex flex-col justify-center order-2 lg:order-1 ">
          <h3 className="text-xl md:text-[2.125rem] text-black font-normal tracking-tight leading-[1.1] mb-1">
            {data.subtitle}
          </h3>
          <h2 className="text-5xl md:text-6xl lg:text-[3.125rem] text-[#63B846] font-medium leading-[1.05] tracking-tight mb-6">
            {data.title}
          </h2>
          <p className="text-base md:text-xl text-black leading-[1.2] tracking-tight mb-6 max-w-2xl">
            {data.description}
          </p>

          {highlights.length > 0 && (
            <ul className="space-y-4 max-w-2xl mb-10">
              {highlights.map((item, idx) => (
                <li key={`${item.label}-${idx}`} className="flex gap-3 text-sm md:text-base leading-tight tracking-tight text-black">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-black shrink-0" aria-hidden="true" />
                  <span>
                    <strong className="font-semibold">{item.label}</strong>
                    {item.description ? ` — ${item.description}` : ''}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <div>
            {data.ctaText && data.ctaLink && <CtaButton href={data.ctaLink} text={data.ctaText} textColor="text-black" />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DebsRebateBanner;

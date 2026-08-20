import React from 'react';
import Reveal from '@/reuseables/Reveal';
import Fade from '@/reuseables/fade';
import type { ResolvedCommercialSystemsComponentsSection } from '@/lib/strapi/resolvers/commercial';

interface Props {
  resolved: ResolvedCommercialSystemsComponentsSection;
}

export default function ComponentsSection({ resolved }: Props) {
  const subtitle = resolved.subtitle || 'Six Components';
  const { title, description, items } = resolved;
  const bgSrc = resolved.backgroundImage?.src ?? '/fallback.png';

  return (
    <section className="px-[5%] md:px-[3%] py-12 md:py-20 bg-white">
      {/* ── Mobile layout ── */}
      <div className="md:hidden">
        {/* Text on white background */}
        <div className="mb-6">
          <Fade>
            <p className="text-lg font-light text-black tracking-tight mb-1">
              {subtitle}
            </p>
            <h2 className="text-4xl text-[#63B846] font-normal tracking-tighter leading-none mb-4">
              {title}
            </h2>
            <p className="text-sm text-black/85 leading-[1.2] tracking-tight font-light">
              {description}
            </p>
          </Fade>
        </div>

        {/* Image card with tiles */}
        <div className="relative rounded-[24px] overflow-hidden min-h-[460px] flex flex-col  justify-start items-start">
          <div className="absolute inset-0 z-0">
            <img
              src={bgSrc}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/15 to-black/50" />
          </div>

          <div className="relative z-10 pt-8 p-5">
            <div className="grid grid-cols-3 gap-3">
              {items.map((item, idx) => (
                <Reveal
                  key={idx}
                  delay={idx * 0.08}
                  className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 hover:bg-white/20 transition-colors duration-300 min-h-[120px] flex flex-col justify-between"
                >
                  <span className="text-white text-2xl font-normal leading-none tracking-tight">
                    {item.letter}
                  </span>
                  <h3 className="text-white text-xs font-light leading-snug tracking-tight">
                    {item.title}
                  </h3>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Desktop layout ── */}
      <div className="hidden md:block">
        <div className="relative rounded-[24px] overflow-hidden flex flex-col">
          <div className="absolute inset-0 z-0">
            <img
              src={bgSrc}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/55" />
          </div>

          <div className="relative z-10 px-12 lg:px-10 pt-16 max-w-3xl">
            <Fade>
              <p className="text-[1.75rem] font-light text-white tracking-tight leading-none">
                {subtitle}
              </p>
              <h2 className="text-6xl lg:text-[3.75rem] text-[#63B846] font-normal tracking-tighter leading-none mb-5">
                {title}
              </h2>
              <p className="text-base text-white/85 leading-[1.2] tracking-tight max-w-2xl font-light">
                {description}
              </p>
            </Fade>
          </div>

          <div className="relative z-10 mt-auto p-10 lg:pt-30">
            <div className="grid grid-cols-3 gap-4 max-w-4xl justify-start">
              {items.map((item, idx) => (
                <Reveal
                  key={idx}
                  delay={idx * 0.08}
                  className="bg-white/10 backdrop-blur-md border pb-20 border-white/15 rounded-lg hover:bg-white/20 transition-colors duration-300 flex flex-col justify-start  px-3 py-2"
                >
                  <span className="text-white text-[3.5rem] font-normal leading-none tracking-tight">
                    {item.letter}
                  </span>
                  <h3 className="text-white text-[1.375rem] text-center font-light leading-snug max-w-sm tracking-tight mt-4 whitespace-pre-line">
                    {item.title}
                  </h3>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import { CylinderCarousel } from '@/components/motion/cylinder-carousel';
import type { ResolvedCoreAchievementsSection } from '@/lib/strapi/resolvers/research';

interface Props {
  resolved: ResolvedCoreAchievementsSection;
}

const CoreAchievements = ({ resolved }: Props) => {
  const items = resolved.items ?? [];
  const [itemSize, setItemSize] = useState(900);
  const [height, setHeight] = useState(420);

  useEffect(() => {
    const update = () => {
      const isMobile = window.innerWidth < 768;
      setItemSize(isMobile ? 320 : 900);
      setHeight(isMobile ? 280 : 420);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  if (items.length === 0) return null;

  return (
    <section className="w-full py-10 md:py-20 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-[5%] md:px-[3%]">
        <div className="text-center mb-8 md:mb-10">
          <p className="text-2xl md:text-3xl font-light tracking-tight text-black leading-none">
            {resolved.subtitle}
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-[#63B846]">
            {resolved.title}
          </h2>
        </div>
      </div>

      <CylinderCarousel
        itemSize={itemSize}
        height={height}
        autoplayMs={2800}
        perspective={1200}
        radiusScale={1.15}
        gapDeg={18}
        showDots={false}
        interactive={false}
        className="mx-auto max-w-7xl"
      >
        {items.map((item, i) => (
          <div key={i} className="relative h-full w-full">
            <img
              src={item.image?.src || '/fallback.png'}
              alt={item.image?.alt ?? item.title}
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none"
            />
            {/* gradient — darker at bottom for legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            {/* content — always visible; active face gets the highlight ring from CylinderCarousel's Face */}
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 text-white">
              <h3 className="text-xl md:text-2xl font-medium tracking-tight leading-tight mb-1.5">
                {item.title}
              </h3>
              <p className="text-sm md:text-[15px] leading-snug tracking-tight text-white/85 line-clamp-3">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </CylinderCarousel>
    </section>
  );
};

export default CoreAchievements;

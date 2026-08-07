'use client';

import React from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay, Navigation } from 'swiper/modules';
import { ArrowRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import type { ResolvedCoreAchievementsSection } from '@/lib/strapi/resolvers/research';

interface Props {
  resolved: ResolvedCoreAchievementsSection;
}

const CoreAchievements = ({ resolved }: Props) => {
  return (
    <section className="w-full px-[5%] py-10 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-2xl md:text-3xl font-light tracking-tight text-black leading-none">
            {resolved.subtitle}
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-[#63B846]">
            {resolved.title}
          </h2>
        </div>

        <div
          className="core-achievements-swiper"
          style={
            {
              '--swiper-pagination-color': '#63B846',
            } as React.CSSProperties
          }
        >
          <Swiper
            modules={[EffectCoverflow, Autoplay, Navigation]}
            effect="coverflow"
            grabCursor
            centeredSlides
            loop
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 30,
              stretch: 0,
              depth: 200,
              modifier: 1,
              scale: 0.85,
              slideShadows: false,
            }}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
            }}
            
            className="!py-6"
          >
            {resolved.items.map((item, index) => (
              <SwiperSlide
                key={index}
                className="!w-[280px] md:!w-[640px] !h-[380px] md:!h-[440px]"
              >
                <Link
                  href={item.href}
                  className="group relative block w-full h-full rounded-2xl overflow-hidden"
                >
                  <img
                    src={item.image?.src || '/fallback.png'}
                    alt={item.image?.alt ?? item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 text-white">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-medium tracking-tight leading-tight mb-2 md:mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm md:text-base leading-snug tracking-tight text-white/85 max-w-md mb-4 md:mb-5">
                      {item.description}
                    </p>
                    <span className="inline-flex items-center gap-2 bg-[#A0CF44] text-black px-4 py-2 rounded-full text-xs md:text-sm font-medium tracking-tight group-hover:gap-3 transition-all duration-300">
                      Explore
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white group-hover:translate-x-1 transition-transform duration-300">
                        <ArrowRight size={14} strokeWidth={2.5} className="text-black" />
                      </span>
                    </span>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default CoreAchievements;

'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Reveal from '@/reuseables/Reveal';
import SectionHeader from '@/reuseables/SectionHeader';

import 'swiper/css';

export interface StaggeredCard {
  title: string;
  subtitle?: string;
  middleTitle?: string;
  desc: string;
  isDark?: boolean;
  delay?: number;
}

export type GridItem = StaggeredCard | 'spacer';

export interface ColumnConfig {
  items: GridItem[];
}

interface StaggeredCardsGridProps {
  subtitle: string;
  title: string | React.ReactNode;
  description?: string;
  columns: ColumnConfig[];
  align?: 'left' | 'center' | 'right';
  className?: string;
  headerClass?: string;
  subtitleClass?: string;
  titleClass?: string;
  cardWidthClass?: string;
  cardHeightClass?: string;
  spacerHeightClass?: string;
  badge?: string;
  enableMobileSlider?: boolean;
}

const StaggeredCardsGrid: React.FC<StaggeredCardsGridProps> = ({
  subtitle,
  title,
  description,
  columns,
  align = 'left',
  className = '',
  headerClass = '',
  subtitleClass = '',
  titleClass = '',
  cardWidthClass = 'max-w-[434px]',
  cardHeightClass = 'h-[280px]',
  spacerHeightClass = 'h-[280px]',
  badge,
  enableMobileSlider = false
}) => {
  const cardItems = columns
    .flatMap((col) => col.items)
    .filter((item): item is StaggeredCard => item !== 'spacer');

  return (
    <section className={`py-10 md:py-24 bg-white ${className}`}>
      <div className=" md:px-[5%]">

        {badge && (
          <div className={`mb-6 flex ${align === 'left' ? 'justify-start' : align === 'right' ? 'justify-end' : 'justify-center'}`}>
            <span className="bg-[#E1D9D4] text-[10px] uppercase tracking-tight px-4 py-1.5 rounded-full">
              {badge}
            </span>
          </div>
        )}

        {/* Section Header */}
        <SectionHeader
          subtitle={subtitle}
          title={title}
          description={description}
          align={align}
          subtitleClass={subtitleClass}
          titleClass={titleClass}
          className={headerClass || (align === 'left' ? 'max-w-3xl mb-12' : 'mx-auto mb-12')}
        />

        {/* Layout Grid */}
        <div className={`${enableMobileSlider ? 'hidden md:grid' : 'grid'} grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr mx-auto max-w-7xl`}>
          {columns.map((column, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-4 h-full justify-between">
              {column.items.map((item, itemIdx) => {
                if (item === 'spacer') {
                  return (
                    <div
                      key={itemIdx}
                      className={`hidden lg:block ${spacerHeightClass}`}
                    />
                  );
                }

                const bgClass = item.isDark ? 'bg-[#3B3B33]' : 'bg-[#EBEBEB]';


                return (
                  <Reveal
                    key={itemIdx}
                    delay={item.delay || 0.1}
                    className={`${bgClass} rounded-[14px] p-6 md:p-7 flex flex-col justify-between w-full h-full mx-auto shadow-sm hover:shadow-md transition-shadow ${cardWidthClass} min-h-[240px] ${cardHeightClass}`}
                  >
                    <div className="flex flex-col">
                      <h3 className="text-[#63B846] text-[2.5rem] md:text-[3.125rem] leading-[1.0] tracking-tighter mb-1">
                        {item.title}
                      </h3>
                      {item.subtitle && (
                        <span className={`text-xs md:text-sm tracking-tight mt-1 ${item.isDark ? 'text-white' : 'text-black'}`}>
                          {item.subtitle}
                        </span>
                      )}
                    </div>

                    <div className="mt-auto">
                      {item.middleTitle && (
                        <h4 className={`text-sm md:text-xl tracking-tight mb-2 ${item.isDark ? 'text-white' : 'text-black'}`}>
                          {item.middleTitle}
                        </h4>
                      )}
                      <p className={`text-xs md:text-sm leading-tight text-[#888888]`}>
                        {item.desc}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          ))}
        </div>

        {/* Mobile Carousel / Slider */}
        {enableMobileSlider && (
          <div className="block md:hidden w-full h-full relative pb-4 pl-3">
            <Swiper
              spaceBetween={16}
              slidesPerView={1.15}
              breakpoints={{
                480: { slidesPerView: 1.25 },
                640: { slidesPerView: 1.8 },
              }}
              className="w-full px-5"
            >
              {cardItems.map((item, idx) => {
                const bgClass = item.isDark ? 'bg-[#3B3B33]' : 'bg-[#EBEBEB]';
                return (
                  <SwiperSlide key={idx} className="h-full flex pb-4">
                    <div
                      className={`${bgClass} rounded-[14px] p-6 flex flex-col md:justify-between w-full h-full mx-auto shadow-sm hover:shadow-md transition-shadow ${cardHeightClass}`}
                    >
                      <div className="flex flex-col">
                        <h3 className="text-[#63B846] text-[2.25rem] md:text-[2.5rem] leading-[1.0] tracking-tighter mb-1">
                          {item.title}
                        </h3>
                        {item.subtitle && (
                          <span className={`text-xs tracking-tight mt-1 ${item.isDark ? 'text-white' : 'text-black'}`}>
                            {item.subtitle}
                          </span>
                        )}
                      </div>

                      <div className="mt-auto pt-6">
                        {item.middleTitle && (
                          <h4 className={`text-sm tracking-tight mb-2 ${item.isDark ? 'text-white' : 'text-black'}`}>
                            {item.middleTitle}
                          </h4>
                        )}
                        <p className="text-xs leading-tight text-[#888888]">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        )}

      </div>
    </section>
  );
};

export default StaggeredCardsGrid;

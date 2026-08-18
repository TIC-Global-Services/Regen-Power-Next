"use client";

import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

export interface SpecDetail {
  title: string;
  description: string;
}

export interface SpecificationCard {
  title: string;
  specdetails: SpecDetail[];
}

export interface BrandCardData {
  title: string;
  description: string;
  specification: SpecificationCard[];
}

export interface SevenBrandData {
  title: string;
  brands: BrandCardData[];
}

const SevenBrand: React.FC<{ data: SevenBrandData }> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const measure = () => {
    const container = containerRef.current;
    if (!container) return;

    const slides = container.querySelectorAll('.swiper-slide');
    let max = 0;

    slides.forEach(slide => {
      (slide as HTMLElement).style.height = 'auto';
      const h = (slide as HTMLElement).getBoundingClientRect().height;
      if (h > max) max = h;
    });

    slides.forEach(slide => {
      (slide as HTMLElement).style.height = `${max}px`;
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const attempts = [100, 300, 600];
    const timers: ReturnType<typeof setTimeout>[] = [];

    attempts.forEach(delay => {
      timers.push(setTimeout(() => {
        measure();
      }, delay));
    });

    const observer = new MutationObserver(() => {
      requestAnimationFrame(measure);
    });
    observer.observe(container, { childList: true, subtree: true, attributes: true, characterData: true });

    window.addEventListener('resize', measure);
    return () => {
      timers.forEach(clearTimeout);
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [data]);

  if (!data || !data.brands || data.brands.length === 0) return null;

  return (
    <section className="bg-white py-16 md:py-24 px-[3%] w-full">
      <style>{`
        .seven-brand-swiper .swiper-slide {
          height: auto !important;
          display: flex !important;
          align-items: stretch !important;
        }
        .card-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .card-scroll::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }
        .card-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }
        .seven-brand-swiper .swiper-pagination-bullet {
          background-color: #A0CF44;
          opacity: 0.4;
        }
        .seven-brand-swiper .swiper-pagination-bullet-active {
          background-color: #63B846;
          opacity: 1;
        }
      `}</style>
      <div ref={containerRef}>
        {/* Title */}
        <div className="text-center mb-4 md:mb-16">
          <h2 className="text-[2.5rem] md:text-[5rem] font-normal text-[#63B846] leading-tight tracking-tight">
            {data.title}
          </h2>
        </div>

        {/* Swiper Slider */}
        <div className="relative w-full">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            pagination={{ clickable: true }}
            className="w-full pb-16 seven-brand-swiper"
            onInit={() => setTimeout(measure, 50)}
            onSlideChange={() => setTimeout(measure, 50)}
          >
            {data.brands.map((brand, idx) => {
              const spec0 = brand.specification[0]; // Key Specs
              const spec1 = brand.specification[1]; // Smart Home / Certifications
              const spec2 = brand.specification[2]; // Why We Carry It
              const spec3 = brand.specification[3]; // Feature Bullets
              const spec4 = brand.specification[4]; // Best For / VPP

              return (
                <SwiperSlide key={idx} className="h-auto">
                  {/* Main Card Container: Dark Grey */}
                  <div className="brand-card bg-[#2D2E2A] text-white rounded-[20px] p-6 md:p-8 lg:p-10 w-full flex flex-col justify-between select-none transition-all duration-300">

                    {/* 3x2 Grid structure on desktop */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-6 w-full flex-grow">

                      {/* Cell 1: Top Left - Title & Description block */}
                      <div className="flex flex-col justify-start p-2 md:p-4 lg:h-[204px] overflow-y-auto card-scroll">
                        <h3 className="text-3xl md:text-[2.5rem] font-medium tracking-tight text-[#63B846] mb-3">
                          {brand.title}
                        </h3>
                        <p className="text-white font-normal text-sm md:text-xl tracking-tight leading-[1.2]">
                          {brand.description}
                        </p>
                      </div>

                      {/* Cell 2: Top Middle - Smart Home / Certifications */}
                      <div className="bg-white/30 rounded-[8px] p-5 md:p-6 flex flex-col h-[204px] overflow-y-auto card-scroll justify-start">
                        {spec1 && (
                          <>
                            {spec1.title && (
                              <h4 className="text-white text-base font-normal mb-3 tracking-tight border-b border-[#5e5f5a] pb-2">
                                {spec1.title}
                              </h4>
                            )}
                            {spec1.specdetails.map((block, bIdx) => (
                              <div key={bIdx} className={bIdx > 0 ? "mt-3 pt-2" : ""}>
                                {block.title && (
                                  <h4 className="text-white text-xl font-normal mb-1 tracking-tight">
                                    {block.title}
                                  </h4>
                                )}
                                <p className="text-white font-normal text-xs md:text-sm tracking-tight leading-[1.2]">
                                  {block.description}
                                </p>
                              </div>
                            ))}
                          </>
                        )}
                      </div>

                      {/* Cell 3: Top Right - Feature Bullets */}
                      <div className="bg-white/30 rounded-[8px] p-5 md:p-6 flex flex-col h-[204px] overflow-y-auto card-scroll justify-start">
                        {spec3 && (
                          <>
                            {spec3.title && (
                              <h4 className="text-white text-xl font-normal mb-2 tracking-tight">
                                {spec3.title}
                              </h4>
                            )}
                            <ul className="text-xs md:text-sm text-white font-normal leading-[1.2] list-none">
                              {spec3.specdetails.map((bullet, fIdx) => (
                                <li key={fIdx} className="flex items-start">
                                  <span className="mr-2 text-white font-normal">•</span>
                                  <span>{bullet.description}</span>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>

                      {/* Cell 4: Bottom Left - Key Specs */}
                      <div className="bg-white/30 rounded-[8px] p-5 md:p-4 flex flex-col h-[204px] overflow-y-auto card-scroll justify-start">
                        {spec0 && (
                          <>
                            {spec0.title && (
                              <h4 className="text-white text-xl mb-2 font-normal tracking-tight">
                                {spec0.title}
                              </h4>
                            )}
                            <ul className="text-xs md:text-sm text-white font-normal tracking-tight leading-[1.2] list-none">
                              {spec0.specdetails.map((spec, sIdx) => (
                                <li key={sIdx} className="flex items-start">
                                  <span className="mr-2 text-white font-normal">•</span>
                                  <span>
                                    {spec.title ? (
                                      <>
                                        <strong className="text-white font-medium">{spec.title}: </strong>
                                        {spec.description}
                                      </>
                                    ) : (
                                      spec.description
                                    )}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>

                      {/* Cell 5: Bottom Middle - Why We Carry It */}
                      <div className="bg-white/30 rounded-[8px] p-4 md:p-4 flex flex-col h-[204px] overflow-y-auto card-scroll justify-start">
                        {spec2 && (
                          <>
                            {spec2.title && (
                              <h4 className="text-white text-xl font-normal  tracking-tight">
                                {spec2.title}
                              </h4>
                            )}
                            {spec2.specdetails.map((detail, dIdx) => (
                              <p key={dIdx} className="text-white font-normal text-xs md:text-sm tracking-tightleading-[1.2]">
                                {detail.description}
                              </p>
                            ))}
                          </>
                        )}
                      </div>

                      {/* Cell 6: Bottom Right - Best For / VPP Compatibility */}
                      <div className="bg-white/30 rounded-[8px] p-5 md:p-6 flex flex-col h-[204px] overflow-y-auto card-scroll justify-start">
                        {spec4 && (
                          <>
                            {spec4.title && (
                              <h4 className="text-white text-base font-normal  tracking-tight">
                                {spec4.title}
                              </h4>
                            )}
                            {spec4.specdetails.map((block, bIdx) => (
                              <div key={bIdx} className={bIdx > 0 ? "mt-3 pt-2" : ""}>
                                {block.title && (
                                  <h4 className="text-white text-xl font-normal mb-1 tracking-tight">
                                    {block.title}
                                  </h4>
                                )}
                                <p className="text-white font-normal text-xs md:text-sm tracking-tight leading-[1.2]">
                                  {block.description}
                                </p>
                              </div>
                            ))}
                          </>
                        )}
                      </div>

                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

      </div>
    </section>
  );
};

export default SevenBrand;

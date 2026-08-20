'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image, { StaticImageData } from 'next/image';

export interface FinanceSectionData {
  title: string;
  listItems: string[];
  image: StaticImageData | string;
}

export interface FinanceOptionData {
  sectionTitle: string;
  sectionSubtitle: string;
  sections: FinanceSectionData[];
}

export interface FinanceOptionProps {
  data?: FinanceOptionData[];
}

const FinanceOptionBlock: React.FC<{ data: FinanceOptionData }> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [ipadIndex, setIpadIndex] = useState(0);
  const triggerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Reset refs array length to match data sections safely
    triggerRefs.current = triggerRefs.current.slice(0, data.sections.length);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setActiveIndex(index);
          }
        });
      },
      {
        root: null,
        // The active zone is defined by this margin. detects when the trigger occupies the center of the screen
        rootMargin: '-35% 0px -35% 0px',
        threshold: 0,
      }
    );

    triggerRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [data.sections.length]);

  // iPad autoplay: cycle image + active text block every 4s (independent of the desktop scroll observer)
  useEffect(() => {
    if (data.sections.length <= 1) return;
    const id = setInterval(() => {
      setIpadIndex((prev) => (prev + 1) % data.sections.length);
    }, 4000);
    return () => clearInterval(id);
  }, [data.sections.length]);

  return (
    <section className="w-full px-[5%] md:px-[3%] py-12 md:py-16 bg-white max-w-7xl mx-auto">
      {/* iPad-only layout (md–lg): full-width image, then text | text | text */}
      <div className="hidden md:block lg:hidden">
        <div className="text-left md:text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-light text-[#63B846] leading-[1.1] tracking-tight mb-4">
            {data.sectionTitle}
          </h2>
          <p className="text-base md:text-xl text-black font-medium leading-[1.2] max-w-5xl mx-auto">
            {data.sectionSubtitle}
          </p>
        </div>

        <div className="relative rounded-[20px] overflow-hidden aspect-[6/5]">
          {data.sections.map((section, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${ipadIndex === index ? 'opacity-100' : 'opacity-0'}`}
            >
              <Image
                src={section.image}
                alt={section.title}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {data.sections.map((section, index) => (
            <div
              key={index}
              className={`${index > 0 ? 'border-t border-black/30 pt-5 md:pt-0 md:border-t-0' : ''} ${index < data.sections.length - 1 ? 'md:border-r md:border-black/30 md:pr-6' : ''} transition-opacity duration-500 ${ipadIndex === index ? '' : 'opacity-50'}`}
            >
              <h3 className={`text-2xl font-normal mb-3 tracking-tight transition-colors duration-500 ${ipadIndex === index ? 'text-black' : 'text-[#9CA3AF]'}`}>
                {section.title}
              </h3>
              <ul className="flex flex-col">
                {section.listItems.map((item, i) => (
                  <li key={i} className={`flex items-start text-base font-normal leading-[1.2] transition-colors duration-500 ${ipadIndex === index ? 'text-black' : 'text-[#9CA3AF]'}`}>
                    <span className="mr-2 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll-pinned layout: mobile (< md) + desktop (lg+), hidden on iPad */}
      <div className="md:hidden lg:block">
        {/* Scrolling Parent Container */}
        <div className="relative w-full max-w-[1400px] mx-auto" style={{ height: `${data.sections.length * 80}vh` }}>

          {/* Sticky viewport wrapper */}
          <div className="sticky top-8 md:top-6 w-full flex flex-col gap-6 lg:gap-8 ">

            {/* Header — pinned inside the sticky section */}
            <div className="text-left md:text-center">
              <h2 className="text-3xl md:text-4xl lg:text-[3.125rem] font-light text-[#63B846] leading-[1.1] tracking-tight mb-4">
                {data.sectionTitle}
              </h2>
              <p className="text-base md:text-xl text-black font-medium leading-[1.2] max-w-5xl mx-auto">
                {data.sectionSubtitle}
              </p>
            </div>

            {/* Pinned image + text row */}
            <div className="w-full flex flex-col md:flex-row gap-8 lg:gap-12 flex-1">

              {/* Left Side: Sticky Image — full-width on mobile (6:5 aspect), fixed 600x500 on desktop */}
              <div className="w-full md:w-[600px] md:h-[500px] aspect-[6/5] md:self-center rounded-[20px] overflow-hidden relative transition-all duration-500">
                {data.sections.map((section, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${activeIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
                      }`}
                  >
                    <Image
                      src={section.image}
                      alt={section.title}
                      fill
                      className="object-cover h-full"
                    />
                  </div>
                ))}
              </div>

              {/* Right Side: Text — Mobile accordion (active expands) / Desktop highlighted list */}
              <div className="w-full md:flex-1 flex flex-col">

                {/* Mobile: accordion — only the active section shows its list */}
                <div className="md:hidden flex flex-col">
                  {data.sections.map((section, index) => (
                    <div key={index}>
                      <div className="py-4 transition-all duration-500 ease-in-out">
                        <h3 className={`text-2xl font-normal mb-2 tracking-tight transition-colors duration-500 ${activeIndex === index ? 'text-black' : 'text-[#9CA3AF]'}`}>
                          {section.title}
                        </h3>
                        {/* Smooth expand/collapse via animated grid rows */}
                        <div
                          className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
                            activeIndex === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                          }`}
                        >
                          <div className="overflow-hidden">
                            <ul className="flex flex-col">
                              {section.listItems.map((item, i) => (
                                <li key={i} className="flex items-start text-base font-normal leading-[1.2] text-black transition-colors duration-500">
                                  <span className="mr-2 mt-0.5">•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      {index < data.sections.length - 1 && (
                        <hr className="border-black/30 w-full" />
                      )}
                    </div>
                  ))}
                </div>

                {/* Desktop: all sections, active highlighted */}
                <div className="hidden md:flex flex-col">
                  {data.sections.map((section, index) => (
                    <div key={index} className="flex flex-col justify-between">
                      <div className="pb-5 transition-all duration-500 ease-in-out">
                        <h3 className={`text-2xl md:text-3xl font-normal mb-4 tracking-tight transition-colors duration-500 ${activeIndex === index ? 'text-black' : 'text-[#9CA3AF]'}`}>
                          {section.title}
                        </h3>
                        <ul className="flex flex-col">
                          {section.listItems.map((item, i) => (
                            <li key={i} className={`flex items-start text-base md:text-lg font-normal leading-[1.2] transition-colors duration-500 ${activeIndex === index ? 'text-black' : 'text-[#9CA3AF]'}`}>
                              <span className="mr-2 mt-0.5">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {index < data.sections.length - 1 && (
                        <hr className="border-black/30 w-full pb-5" />
                      )}
                    </div>
                  ))}
                </div>

              </div>

            </div>{/* end pinned image+text row */}

          </div>

          {/* Invisible absolute scroll triggers */}
          <div className="absolute inset-0 pointer-events-none flex flex-col">
            {data.sections.map((_, index) => (
              <div
                key={index}
                ref={(el) => { triggerRefs.current[index] = el; }}
                data-index={index}
                className="flex-1 w-full"
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

const FinanceOption: React.FC<FinanceOptionProps> = ({ data = [] }) => {
  if (!data || data.length === 0) return null;

  return (
    <>
      {data.map((item, index) => (
        <FinanceOptionBlock key={index} data={item} />
      ))}
    </>
  );
};

export default FinanceOption;
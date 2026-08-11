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

  return (
    <section className="w-full px-[5%] py-12 md:py-20 bg-white">
      {/* Scrolling Parent Container */}
      <div className="relative w-full max-w-[1400px] mx-auto" style={{ height: `${data.sections.length * 80}vh` }}>

        {/* Sticky viewport wrapper */}
        <div className="sticky top-8 md:top-14 w-full flex flex-col gap-6 lg:gap-8">

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
          <div className="w-full flex flex-col md:flex-row gap-12 lg:gap-24 flex-1">

          {/* Left Side: Sticky Image */}
          <div className="w-full md:w-1/2 rounded-[20px] overflow-hidden relative transition-all duration-500">
            {data.sections.map((section, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  activeIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
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

          {/* Right Side: Static Text container with Highlight transitions */}
          <div className="w-full md:w-1/2 flex flex-col">
            {data.sections.map((section, index) => (
              <div key={index} className="flex flex-col justify-between">
                <div className="py-5 md:py-8 transition-all duration-500 ease-in-out">
                  <h3 className={`text-2xl md:text-3xl font-normal mb-4 tracking-tight transition-colors duration-500 ${activeIndex === index ? 'text-black' : 'text-[#9CA3AF]'}`}>
                    {section.title}
                  </h3>
                  <ul className="flex flex-col gap-1 ">
                    {section.listItems.map((item, i) => (
                      <li key={i} className={`flex items-start text-base md:text-lg font-normal leading-[1.2] transition-colors duration-500 ${activeIndex === index ? 'text-black' : 'text-[#9CA3AF]'}`}>
                        <span className="mr-2 mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Divider if not last */}
                {index < data.sections.length - 1 && (
                  <hr className="border-gray-200 w-full" />
                )}
              </div>
            ))}
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
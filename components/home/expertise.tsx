'use client';

import React from 'react';
import Image, { StaticImageData } from 'next/image';
import Reveal from '@/reuseables/Reveal';
import { SliderDots, SliderArrows, useSnapSlider } from '@/reuseables/MobileSliderControls';

export interface ExpertiseItem {
  title: string;
  image: StaticImageData | string;
  icon: StaticImageData | string;
  textColor: string;
}

export interface ExpertiseData {
  subtitle: string;
  accentTitle: string;
  bgImage: StaticImageData | string;
  items: ExpertiseItem[];
}

interface ExpertiseProps {
  data: ExpertiseData;
}

const Expertise = ({ data }: ExpertiseProps) => {
  // Dark section (navy overlay) — dots use the white variant.
  const { trackRef, sync, active, canPrev, canNext, goTo, next, prev } = useSnapSlider(data.items.length);

  return (
    <section className="py-20 md:py-20 relative overflow-hidden lg:min-h-screen lg:max-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={data.bgImage}
          alt="Expertise background"
          fill
          className="object-cover object-center"
          preload
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-[#0a1c30]/70" />
      </div>

      <div className="lg:px-[5%] md:px-[3%] relative z-10 h-full flex flex-col justify-center">

        {/* Header */}
        <div className="mb-12 md:mb-10 flex justify-center">
          <h2 className="text-4xl md:text-5xl lg:text-[2rem] font-light text-center text-white leading-[0.9] tracking-tight">
            {data.subtitle}<br />
            <span className="text-[#8dc63f] font-medium tracking-tighter lg:text-[5rem]">{data.accentTitle}</span>
          </h2>
        </div>

        {/* Cards Carousel/Grid */}
        <div className='relative w-full h-full'>
          <div
            ref={trackRef}
            onScroll={sync}
            className="flex overflow-x-auto items-stretch lg:grid lg:snap-none lg:grid-cols-4 gap-4 md:gap-6 px-[5%] md:px-[0%] pt-4 pb-6 lg:pb-0 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {data.items.map((item, index) => (
              <Reveal
                key={index}
                delay={index * 0.1}
                className="min-w-[60vw] md:min-w-[45vw] lg:min-w-0 snap-center shrink-0 flex flex-col h-auto"
              >
                <div
                  className={`bg-[#f0f6ec] rounded-[20px] p-6 lg:p-8 flex flex-col w-full h-[420px] md:h-[480px] lg:h-[58dvh] hover:bg-[#8dc63f] shadow-2xl hover:-translate-y-2 transition-transform duration-300 group`}
                >
                  {/* 3D Image Container */}
                  <div className="relative w-full h-[90%] flex justify-end items-end overflow-visible md:ml-6">
                    <div className="relative w-[90%] h-full transform group-hover:scale-105 transition-transform duration-500">
                      <Image
                        src={item.image}
                        alt={item.title.replace('\\n', ' ')}
                        fill
                        className="object-contain object-right-bottom drop-shadow-xl"
                      />
                    </div>
                  </div>

                  {/* Text and Icon at the bottom */}
                  <div className="h-[43%] flex flex-col justify-end mt-auto">
                    <div className="mb-4">
                      <Image src={item.icon} alt="" width={32} height={32} className="w-8 h-8 object-contain shrink-0" />
                    </div>
                    <h3 className={`text-xl md:text-2xl lg:text-[1.90rem] font-medium leading-[1.2] tracking-tight whitespace-pre-line ${item.textColor}`}>
                      {item.title}
                    </h3>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Mobile controls — same dots/arrows as the other native sliders.
              px-[5%] matches the track's gutter (this section has no outer padding). */}
          <SliderDots count={data.items.length} active={active} onSelect={goTo} className="mt-4 lg:hidden" dark />
          <SliderArrows canPrev={canPrev} canNext={canNext} onPrev={prev} onNext={next} className="mt-2 lg:hidden px-[5%]" />

        </div>
      </div>
    </section>
  );
};

export default Expertise;
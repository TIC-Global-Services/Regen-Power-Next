'use client';

import React from 'react';
import Image from 'next/image';
import Fade from '@/reuseables/fade';
import Reveal from '@/reuseables/Reveal';
import CtaButton from '@/reuseables/CtaButton';

interface HomeBatteryData {
  subtitle: string;
  title: string;
  paragraphs: string[];
  bulletPoints: string[];
  ctaText: string;
  ctaLink: string;
  image: string;
}

interface HomeBatteryProps {
  data: HomeBatteryData;
}

const HomeBattery = ({ data }: HomeBatteryProps) => {
  return (
    <Fade>
      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="px-[5%]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-10 items-center">
            <Reveal>
              <div className="relative w-full aspect-[3/3] max-w-[500px] mx-auto pointer-events-none">
                <Image
                  src={data.image}
                  alt={data.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="flex flex-col gap-2 max-w-[620px] justify-start">
                <div className="leading-[1.1]">
                  <h2 className="text-2xl md:text-[2.125rem] font-medium text-black tracking-tight mb-1">
                    {data.subtitle}
                  </h2>
                  <p className="text-[#63B846] font-light text-[3rem] md:text-[4rem] lg:text-[5rem] tracking-tighter leading-none">
                    {data.title}
                  </p>
                </div>
                <div className="flex flex-col gap-4 text-sm md:text-sm leading-[1.2] font-normal">
                  {data.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <ul className="flex flex-col my-2">
                  {data.bulletPoints.map((point, index) => (
                    <li key={index} className="text-sm md:text-sm font-semibold text-black tracking-tight flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-black flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="mt-2">
                  <CtaButton href={data.ctaLink} text={data.ctaText} textColor="text-black" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </Fade>
  );
};

export default HomeBattery;

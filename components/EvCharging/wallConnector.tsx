'use client';

import React from 'react';
import Image, { StaticImageData } from 'next/image';
import Fade from '@/reuseables/fade';
import Reveal from '@/reuseables/Reveal';

export interface WallConnectorData {
  title: string;
  subtitle: string;
  description: string;
  specs: string[];
  image: StaticImageData | string;
  imageAlt: string;
}

interface WallConnectorProps {
  data: WallConnectorData;
}

const WallConnector = ({ data }: WallConnectorProps) => {
  return (
    <Fade>
      <section className="bg-white overflow-hidden w-full relative">
        {/*
          Stack order below lg: header → image → content (via order-*).
          At lg: 2×2 grid — left column stacks header over content, right
          cell is a full-height edge-to-edge image (row-span-2).
        */}
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-[auto_1fr] min-h-[50vh] lg:min-h-screen">
          {/* Header — title + subtitle */}
          <div className="order-1 px-[5%] md:px-[3%] pt-10 pb-7 md:pt-14 md:pb-10 lg:pt-24 lg:pb-6 lg:pr-[3%] flex flex-col justify-center">
            <Reveal>
              <div className="leading-[0.85]">
                <h2 className="text-2xl md:text-4xl font-medium text-black tracking-tight mb-2">
                  {data.title}
                </h2>
                <p className="text-[#63B846] font-light text-[3rem] md:text-[4.5rem] lg:text-[6rem] tracking-tighter">
                  {data.subtitle}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Image — inset card on phone/iPad, full-bleed column on desktop.
              Phone: 4/3 landscape crop; iPad: wider 16/9 banner; desktop fills. */}
          <Reveal
            delay={0.2}
            className="order-2 lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-2 h-full w-full"
          >
            <div className="relative w-full h-full aspect-[4/3] md:aspect-[16/9] lg:aspect-auto overflow-hidden lg:overflow-hidden px-0">
              <div className="absolute inset-x-[5%] top-0 bottom-0 md:inset-x-[3%] lg:inset-x-0">
                <div className="relative w-full h-full overflow-hidden rounded-[20px] lg:rounded-none">
                  <Image
                    src={data.image}
                    alt={data.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    preload
                  />
                </div>
              </div>
            </div>
          </Reveal>

          {/* Content — description + specs (full-width text on phone/iPad) */}
          <div className="order-3 px-[5%] md:px-[3%] py-10 lg:pt-6 lg:pb-24 lg:pr-[3%] flex flex-col justify-center">
            <Reveal>
              <div className="flex flex-col gap-5 mt-0 lg:mt-5">
                <div>
                  <p className="text-[15px] md:text-lg text-black leading-[1.2] tracking-tight max-w-none lg:max-w-[540px]">
                    {data.description}
                  </p>
                </div>
                <div>
                  {data.specs.map((spec, index) => (
                    <p
                      key={index}
                      className="text-base md:text-lg font-bold text-black tracking-tight leading-[1.2]"
                    >
                      {spec}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </Fade>
  );
};

export default WallConnector;

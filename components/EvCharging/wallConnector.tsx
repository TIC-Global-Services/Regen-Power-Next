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
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[50vh] lg:min-h-screen">
          {/* Mobile Image (shown only on mobile) */}
          <Reveal delay={0.2} className="lg:hidden w-full px-[3%] pt-5">
            <div className="relative w-full aspect-[4/5] overflow-hidden rounded-[20px] ">
              <Image
                src={data.image}
                alt={data.imageAlt}
                fill
                className="object-cover"
                sizes="100vw"
                preload
              />
            </div>
          </Reveal>

          {/* Left Side — Text Content */}
          <div className="flex flex-col justify-center px-[5%] py-10 lg:py-24">
            <Reveal>
              <div className="flex flex-col gap-2 md:gap-20 ">
                {/* Title */}
                <div className="leading-[0.85]">
                  <h2 className="text-2xl md:text-3xl font-medium text-black tracking-tight mb-2">
                    {data.title}
                  </h2>
                  <p className="text-[#63B846] font-light text-[3rem] md:text-[4.5rem] lg:text-[6rem] tracking-tighter">
                    {data.subtitle}
                  </p>
                </div>

                {/* Description */}


                {/* Specs */}
                <div className="flex flex-col gap-5 mt-5">
                  <div>
                    <p className="text-[15px] lg:text-lg text-black leading-[1.2] max-w-[540px]">
                      {data.description}
                    </p>
                  </div>
                  <div>
                    {data.specs.map((spec, index) => (
                      <p
                        key={index}
                        className="text-base lg:text-lg font-bold text-black tracking-tight leading-[1.2]"
                      >
                        {spec}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Side — Image (desktop) */}
          <Reveal delay={0.2} className="hidden lg:block h-full w-full">
            <div className="relative w-full h-full min-h-[500px] overflow-hidden">
              <Image
                src={data.image}
                alt={data.imageAlt}
                fill
                className="object-cover"
                sizes="50vw"
                preload
              />
            </div>
          </Reveal>
        </div>
      </section>
    </Fade>
  );
};

export default WallConnector;
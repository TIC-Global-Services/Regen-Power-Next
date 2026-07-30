'use client';

import React from 'react';
import Image from 'next/image';
import Fade from '@/reuseables/fade';
import Reveal from '@/reuseables/Reveal';

interface WallConnectorData {
  title: string;
  subtitle: string;
  description: string;
  specs: string[];
  image: string;
}

interface WallConnectorProps {
  data: WallConnectorData;
}

const WallConnector = ({ data }: WallConnectorProps) => {
  return (
    <Fade>
      <section className="bg-white overflow-hidden max-h-screen">
        <div className="">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <Reveal>
              <div className="flex flex-col gap-8 md:gap-10 pl-[5%]">
                <div className="leading-[0.85]">
                  <h2 className="text-2xl md:text-3xl font-medium text-black tracking-tight">
                    {data.title}
                  </h2>
                  <p className="text-[#63B846] font-light text-[3rem] md:text-[4rem] lg:text-[5.5rem] tracking-tighter">
                    {data.subtitle}
                  </p>
                </div>
                <p className="text-sm md:text-lg text-black leading-[1.2] max-w-[540px]">
                  {data.description}
                </p>
                <div className="flex flex-col gap-1.5">
                  {data.specs.map((spec, index) => (
                    <p key={index} className="text-sm md:text-base font-semibold text-black tracking-tight">
                      {spec}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="relative w-full aspect-[4/5] md:aspect-[3/4] overflow-hidden">
                <Image
                  src={data.image}
                  alt={data.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </Fade>
  );
};

export default WallConnector;

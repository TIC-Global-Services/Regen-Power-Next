'use client';

import React from 'react';
import Image, { StaticImageData } from 'next/image';
import Fade from '@/reuseables/fade';

export interface ChargerProduct {
  name: string;
  image: StaticImageData | string;
  description: string;
}

export interface OneChargerData {
  subtitle: string;
  title: string;
  products: ChargerProduct[];
}

interface OneChargerProps {
  data: OneChargerData;
}

const OneCharger = ({ data }: OneChargerProps) => {
  return (
    <Fade>
      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-[5%]">
          {/* Header */}
          <div className="lg:text-center mb-12 md:mb-16">
            <h2 className="text-xl md:text-[2rem] font-medium text-black tracking-tight mb-1">
              {data.subtitle}
            </h2>
            <p className="text-[#63B846] font-light text-[2.5rem] md:text-[3.5rem] lg:text-[5rem] tracking-tighter leading-none">
              {data.title}
            </p>
          </div>

          {/* Simple 2-column grid — image on top, title + desc below */}
          <div className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2 md:gap-x-16 md:gap-y-20">
            {data.products.map((product, index) => (
              <div key={index} className="flex flex-col gap-4">
                <div className="relative w-full aspect-[14/10] rounded-[20px] overflow-hidden bg-[#F7F7F5]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index === 0}
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="text-3xl md:text-[2rem] font-medium text-black tracking-tight leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-sm tracking-tight text-black leading-[1.2] font-normal">
                    {product.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Fade>
  );
};

export default OneCharger;

'use client';

import React from 'react';
import Image from 'next/image';
import Fade from '@/reuseables/fade';
import Reveal from '@/reuseables/Reveal';

interface BenefitCard {
  title: string;
  description: string;
  image: string;
}

interface WhyChargeAtHomeData {
  title: string;
  benefits: BenefitCard[];
}

interface WhyChargeAtHomeProps {
  data: WhyChargeAtHomeData;
}

const WhyChargeAtHome = ({ data }: WhyChargeAtHomeProps) => {
  return (
    <Fade>
      <section className="py-16 md:py-24 bg-white">
        <div className="px-[5%]">
          <div className="mb-12 md:mb-10 leading-[0.8] flex justify-center items-center flex-col">
            <h2 className="text-2xl md:text-[5rem] font-medium text-[#63B846] tracking-tight">
              {data.title}
            </h2>
          </div>

          <div className="flex gap-3">
            {data.benefits.map((benefit, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div className="bg-[#EEF6EB] rounded-[24px] overflow-hidden group hover:shadow-lg transition-all duration-500 flex flex-col h-full">
                  <div className="relative w-full aspect-[16/10] overflow-hidden flex justify-center items-center">
                    <Image
                      src={benefit.image}
                      alt={benefit.title}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6 md:p-8 flex flex-col gap-2 flex-grow">
                    <h3 className="text-xl md:text-2xl font-medium text-black tracking-tight leading-snug">
                      {benefit.title}
                    </h3>
                    <p className="text-sm md:text-base tracking-tight leading-snug max-w-sm">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </Fade>
  );
};

export default WhyChargeAtHome;

import React from 'react';
import Image, { StaticImageData } from 'next/image';
import CtaButton from '@/reuseables/CtaButton';

export interface InstallStepItem {
  step: string;
  title: string;
  description: string;
}

export interface InstallProcessData {
  topSubtitle: string;
  title: string;
  description?: string;
  steps: InstallStepItem[];
  image: StaticImageData | string;
  ctaText?: string;
  ctaLink?: string;
}

const InstallProcess = ({ data }: { data: InstallProcessData }) => {
  return (
    <section className="bg-[#F9F9F9] py-16 md:py-24 px-[5%]">
      <div className="">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h3 className="text-xl md:text-[2rem] text-black font-normal mb-2 tracking-tight">
            {data.topSubtitle}
          </h3>
          <h2 className="text-4xl md:text-5xl lg:text-[5rem] text-[#63B846] font-normal tracking-tight mb-4">
            {data.title}
          </h2>
          {data.description && (
            <p className="text-base md:text-lg text-black/80 max-w-3xl mx-auto">
              {data.description}
            </p>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Left - Steps */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            {data.steps.map((step, idx) => (
              <div key={idx} className="flex gap-5 items-start">
                <div className="shrink-0 w-10 h-10 rounded-full bg-[#63B846] flex items-center justify-center text-white font-bold text-sm">
                  {step.step}
                </div>
                <div>
                  <h4 className="text-lg md:text-xl font-semibold text-black mb-1 tracking-tight">
                    {step.title}
                  </h4>
                  <p className="text-sm md:text-base text-black/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}

            {data.ctaText && (
              <div className="mt-4">
                <CtaButton
                  href={data.ctaLink || '#'}
                  text={data.ctaText}
                  textColor="text-black"
                />
              </div>
            )}
          </div>

          {/* Right - Image */}
          <div className="w-full lg:w-1/2">
            <div className="relative w-full min-h-[400px] lg:min-h-[550px] rounded-[20px] overflow-hidden bg-gray-100">
              <Image
                src={data.image}
                alt={data.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstallProcess;

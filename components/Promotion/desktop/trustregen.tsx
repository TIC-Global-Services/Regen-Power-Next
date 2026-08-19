"use client";

import React, { useState } from "react";
import Fade from "@/reuseables/fade";
import * as Icons from "lucide-react";
import Reveal from "@/reuseables/Reveal";

export interface TrustFeature {
  title: string;
  description: string;
  icon: string;
}

export interface TrustRegenProps {
  title: string;
  subtitle: string;
  features: TrustFeature[];
}

const TrustRegen = ({ data }: { data: TrustRegenProps }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="bg-white py-16 md:py-20 px-[5%] md:px-[3%]">
      <Fade>
        <div className="">
          <div className="text-center mb-14 md:mb-20">
            <span className="block text-base md:text-[2.125rem] font-bold tracking-tight leading-none text-black">
              {data.subtitle}
            </span>
            <h2 className="text-3xl md:text-[5rem] font-bold text-[#63B846] tracking-tight leading-none mt-2">
              {data.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 items-stretch">
            {data?.features?.map((feature, idx) => {
              const isActive = activeIdx === idx;
              const borderColor = isActive ? '#63B846' : 'rgba(99, 184, 70, 0.25)';

              return (
                <Reveal key={idx} className="h-full">
                  <div

                    className="relative h-full flex flex-col items-center text-center cursor-pointer px-6 py-10 md:px-8 md:py-12 transition-all duration-300"
                    onMouseEnter={() => setActiveIdx(idx)}
                    style={{
                      borderBottom: `2px solid ${borderColor}`,
                      borderLeft: idx === 0 ? `0px solid transparent` : `1px solid ${borderColor}`,
                      borderRight: idx === 2 ? `0px solid transparent` : `1px solid ${borderColor}`,
                      zIndex: isActive ? 2 : 1,
                    }}
                  >
                    <div className="mb-6 flex h-24 w-24 items-center justify-center md:h-30 md:w-30">
                      <img
                        src={feature.icon}
                        alt={feature.title}
                        className="h-full w-full object-contain"
                      />
                    </div>

                    <h3 className="text-lg md:text-[2.25rem] font-bold text-black leading-[1.2] whitespace-pre-line">
                      {feature.title}
                    </h3>

                    <p className="mt-4 text-xs md:text-xl leading-[1.2] whitespace-pre-line tracking-tight text-black/80">
                      {feature.description}
                    </p>

                    {idx < 2 && (
                      <img
                        src="/dot.svg"
                        alt=""
                        className="hidden md:block absolute -right-2 bottom-0 h-5 w-5 translate-y-1/2 rounded-full border-[3px] border-white bg-[#63B846]"
                      />
                    )}
                  </div>
                </Reveal>

              );
            })}
          </div>
        </div>
      </Fade>
    </section>
  );
};

export default TrustRegen;

"use client";

import React, { useState } from 'react';
import Fade from '@/reuseables/fade';
import * as Icons from 'lucide-react';

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
    <section className="bg-white py-16 md:py-24 px-[5%]">
      <Fade>
        <div className="">
          {/* Header */}
          <div className="text-center mx-auto mb-14 md:mb-20">
            <span className="text-base md:text-[2.125rem] font-bold tracking-tight leading-none">
              {data.subtitle}
            </span>
            <h2 className="text-3xl md:text-[5rem] font-bold text-[#63B846] tracking-tight leading-none ">
              {data.title}
            </h2>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3">
            {data?.features?.map((feature, idx) => {
              const IconComponent = (Icons as any)[feature.icon] || Icons.HelpCircle;
              const isActive = activeIdx === idx;
              
              // Light green by default, dark green when active
              const borderColor = isActive ? '#63B846' : 'rgba(99, 184, 70, 0.25)';

              return (
                <div
                  key={idx}
                  className={`flex flex-col items-center text-center cursor-pointer py-10 px-6 relative transition-colors duration-300
                    border-b-2
                    ${idx === 0 ? 'md:border-r-2' : ''}
                    ${idx === 1 ? 'md:border-l-1.5 md:border-r-2 md:-mx-[2px]' : ''}
                    ${idx === 2 ? 'md:border-l-1.5 md:-ml-[2px]' : ''}
                  `}
                  onMouseEnter={() => setActiveIdx(idx)}
                  style={{
                    borderBottomColor: borderColor,
                    borderRightColor: borderColor,
                    borderLeftColor: borderColor,
                    zIndex: isActive ? 2 : 1,
                  }}
                >
                  {/* Icon */}
                  <div className="text-[#63B846] mb-5">
                    <IconComponent size={100} strokeWidth={1.2} />
                  </div>

                  {/* Vertical green line */}
                 

                  {/* Title */}
                  <h3 className="text-lg md:text-4xl font-bold text-black  leading-none">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs md:text-xl leading-none max-w-sm mt-4">
                    {feature.description}
                  </p>

                  {/* Dot (Only for column 1 & 2, positioned at the bottom right corner on desktop) */}
                  {idx < 2 && (
                    <div
                      className="hidden md:block absolute bottom-0 right-0 w-4 h-4 rounded-full translate-x-[9px] translate-y-[9px] z-30"
                      style={{
                        backgroundColor: activeIdx === idx || activeIdx === idx + 1 ? '#63B846' : 'rgba(99, 184, 70, 0.25)',
                        border: '3px solid white',
                        transition: 'background-color 0.3s ease',
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Fade>
    </section>
  );
};

export default TrustRegen;


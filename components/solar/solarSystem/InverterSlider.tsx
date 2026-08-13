"use client";

import React, { useState, useEffect } from "react";
import Fade from "@/reuseables/fade";
import SectionHeader from "@/reuseables/SectionHeader";
import MissingImage from "@/reuseables/MissingImage";
import type { ResolvedSolarInverterSlider } from "@/lib/strapi/resolvers/solar";

interface InverterSliderProps {
  resolved: ResolvedSolarInverterSlider;
}

const InverterSlider: React.FC<InverterSliderProps> = ({ resolved }) => {
  const slides = resolved.inverters;
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-white">
        <div className="px-[5%]">
          <SectionHeader
            subtitle={resolved.subtitle}
            title={resolved.title}
            align="left"
          />
          <MissingImage label="Inverter slides" aspect="aspect-[16/9] mt-8" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="px-[5%]">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 mb-12">
          <div className="">
            {/* <SectionHeader
              subtitle={resolved.subtitle}
              title={resolved.title}
              align="left"
              className="mb-0"
              subtitleClass="text-2xl"
              titleClass="text-[2.125rem]"
            /> */}
            <p className="text-2xl leading-none tracking-tight">{resolved.subtitle}</p>
            <h1 className="text-2xl md:text-[3.125rem] text-[#63B846] leading-none">
              {resolved.title}
            </h1>
          </div>
          <div className="lg:max-w-2xl">
            <Fade delay={0.2}>
              <p className="text-sm leading-tight">{resolved.description}</p>
            </Fade>
          </div>
        </div>

        <div className="relative rounded-[20px] overflow-hidden min-h-[550px] md:h-[580px] flex flex-col justify-between p-6 md:p-10 z-10">
          <div className="absolute inset-0 z-0">
            {slides[activeTab].background ? (
              <img
                src={slides[activeTab].background.src}
                alt={slides[activeTab].background.alt}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out"
              />
            ) : (
              <img
                src="/fallback.png"
                alt="fallback"
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-black/35" />
          </div>

          <div className="relative z-10 mt-4">
            <h3
              className="text-5xl md:text-7xl lg:text-[6rem] tracking-tight text-[#63B846]"
            >
              {slides[activeTab].title}
            </h3>
          </div>

          <div className="relative z-30 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-auto">
            {slides[activeTab].infoCards.length > 0 ? (
              slides[activeTab].infoCards.map((card, idx) => (
                <div
                  key={idx}
                  className="bg-white/30 backdrop-blur-md border border-white/15 rounded-[0.5rem] p-5 hover:bg-white/15 transition-colors"
                >
                  <h4 className="text-white text-xl uppercase tracking-tight mb-2">
                    {card.label}
                  </h4>
                  <p className="text-white text-sm leading-tight">{card.text}</p>
                </div>
              ))
            ) : (
              <div className="col-span-full text-white/80 text-sm">
                Add inverter detail cards in Strapi.
              </div>
            )
            }
          </div>
        </div>

        {slides.length > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`h-1.5 rounded-full transition-all duration-300
                  ${activeTab === index ? "w-8 bg-[#63B846]" : "w-2.5 bg-gray-300"}
                `}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default InverterSlider;

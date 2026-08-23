"use client";

import React, { useState, useEffect } from "react";
import Fade from "@/reuseables/fade";
import SectionHeader from "@/reuseables/SectionHeader";
import MissingImage from "@/reuseables/MissingImage";
import FadeSwap from "@/reuseables/FadeSwap";
import type { ResolvedSolarInverterSlider } from "@/lib/strapi/resolvers/solar";

interface InverterSliderProps {
  resolved: ResolvedSolarInverterSlider;
}

const InverterSlider: React.FC<InverterSliderProps> = ({ resolved }) => {
  const slides = resolved.inverters;
  const [activeTab, setActiveTab] = useState(0);

  // Autoplay: self-resetting timeout so manual dot clicks restart the countdown
  // instead of racing against the old interval.
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setTimeout(() => {
      setActiveTab((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [activeTab, slides.length]);

  if (slides.length === 0) {
    return (
      <section className="py-16 md:py-24 bg-white">
        <div className="px-[5%] md:px-[3%]">
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
      <div className="px-[5%] md:px-[3%]">
        <div className="flex flex-col lg:flex-row  lg:items-center lg:justify-between gap-10 mb-12">
          <div className="">
            {/* <SectionHeader
              subtitle={resolved.subtitle}
              title={resolved.title}
              align="left"
              className="mb-0"
              subtitleClass="text-2xl"
              titleClass="text-[2.125rem]"
            /s> */}
            <p className="text-2xl leading-none tracking-tight">{resolved.subtitle}</p>
            <h1 className="text-2xl md:text-[3.125rem] tracking-tight text-[#63B846] leading-none">
              {resolved.title}
            </h1>
          </div>
          <div className="lg:max-w-xl">
            <Fade delay={0.2}>
              <p className="text-sm leading-tight tracking-tight ">{resolved.description}</p>
            </Fade>
          </div>
        </div>

        <div className="relative rounded-[20px] overflow-hidden h-[700px] md:h-[580px] flex flex-col justify-between p-4 md:p-10 z-10">
          <div className="absolute inset-0 z-0">
            {/* All backgrounds rendered stacked and preloaded; only opacity changes,
                so the image genuinely crossfades in sync with the text. */}
            {slides.map((slide, idx) => (
              <img
                key={idx}
                src={slide.background?.src ?? "/fallback.png"}
                alt={slide.background?.alt ?? slide.title}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                  idx === activeTab ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-black/35" />
          </div>

          <div className="relative z-10 mt-4">
            <FadeSwap swapKey={activeTab}>
              <h3 className="text-5xl md:text-7xl lg:text-[6rem] tracking-tight text-black md:text-white mb-4 md:mb-0">
                {slides[activeTab].title}
              </h3>
            </FadeSwap>
          </div>

          <FadeSwap
            swapKey={activeTab}
            className="relative z-30 grid grid-cols-2 lg:grid-cols-5 justify-items-center gap-2 md:gap-4 mt-auto"
          >
            {slides[activeTab].infoCards.length > 0 ? (
              slides[activeTab].infoCards.map((card, idx, arr) => (
                <div
                  key={idx}
                  className={`bg-white/30 backdrop-blur-md border border-white/15 rounded-[0.5rem] p-3 md:p-5 hover:bg-white/15 transition-colors w-full ${
                    arr.length % 2 !== 0 && idx === arr.length - 1
                      ? "col-span-2 lg:col-span-1 max-w-full w-full lg:max-w-none"
                      : ""
                  }`}
                >
                  <h4 className="text-black md:text-white text-xl md:text-[1.375rem] capitalize tracking-tight">
                    {card.label}
                  </h4>
                  <p className="text-black md:text-white text-sm leading-[1.2]">{card.text}</p>
                </div>
              ))
            ) : (
              <div className="col-span-full text-white/80 text-sm">
                Add inverter detail cards in Strapi.
              </div>
            )
            }
          </FadeSwap>
        </div>

        {slides.length > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`h-1 rounded-full transition-all duration-300
                  ${activeTab === index ? "w-8 bg-[#63B846]" : "w-2.5 bg-gray-400"}
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

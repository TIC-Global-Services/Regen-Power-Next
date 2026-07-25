"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Reveal from "@/reuseables/Reveal";
import SectionHeader from "@/reuseables/SectionHeader";
import MissingImage from "@/reuseables/MissingImage";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ResolvedBrandsInvertersSlider } from "@/lib/strapi/resolvers/brands";

import froniusLogo from "@/assets/solar/brands-tech/fronius.png";
import sungrowLogo from "@/assets/solar/brands-tech/sungrow.png";
import goodweLogo from "@/assets/solar/brands-tech/goodwe.png";
import istoreLogo from "@/assets/solar/brands-tech/istore.png";

const logoMap: Record<string, any> = {
  Fronius: froniusLogo,
  Sungrow: sungrowLogo,
  GoodWe: goodweLogo,
  iStore: istoreLogo,
};

interface InvertersSliderSectionProps {
  resolved: ResolvedBrandsInvertersSlider;
}

const InvertersSliderSection: React.FC<InvertersSliderSectionProps> = ({
  resolved,
}) => {
  const inverters = resolved.inverters ?? [];
  const [index, setIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrev = () => {
    setIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setIndex((prev) => Math.min(prev + 1, inverters.length - 2));
  };

  if (inverters.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden border-t border-gray-50">
      <div className="pl-[5%] pr-0 mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start lg:items-center">
          <div className="w-full lg:w-[22%] shrink-0 pr-8 lg:pr-0">
            <SectionHeader
              subtitle={resolved.subtitle ?? ""}
              title={resolved.title ?? ""}
              align="left"
              className="mb-0"
              subtitleClass="text-sm md:text-2xl uppercase tracking-tight font-medium text-black"
              titleClass="text-5xl md:text-6xl lg:text-[5.5rem] font-normal leading-none tracking-tight text-[#63B846]"
            />
          </div>

          <div className="w-full lg:w-[78%] overflow-hidden relative">
            <div className="overflow-x-auto lg:overflow-hidden pr-4 md:pr-0">
              <div
                className="flex gap-6 transition-transform duration-500 ease-out"
                style={{
                  transform: isDesktop
                    ? `translate3d(-${index * 404}px, 0, 0)`
                    : "none",
                }}
              >
                {inverters.map((item, idx) => (
                  <Reveal
                    key={idx}
                    delay={idx * 0.1}
                    className="bg-[#EEF6EB]/50 rounded-[24px] p-8 flex flex-col justify-between h-[520px] w-[380px] shrink-0 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col">
                      <div className="relative w-[150px] h-[60px] mb-6 flex items-center">
                        {logoMap[item.name] ? (
                          <Image
                            src={logoMap[item.name]}
                            alt={item.name}
                            style={{
                              objectFit: "contain",
                              width: "auto",
                              height: "100%",
                            }}
                          />
                        ) : (
                          <span className="text-lg font-bold text-black">
                            {item.name}
                          </span>
                        )}
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="text-xs uppercase tracking-wider text-black/50 font-bold mb-1">
                            Origin
                          </h4>
                          <p className="text-base text-black font-medium normal-case">
                            {item.origin ?? ""}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-xs uppercase tracking-wider text-black/50 font-bold mb-1">
                            Positioning
                          </h4>
                          <p className="text-sm md:text-base text-gray-700 leading-relaxed font-light">
                            {item.positioning ?? ""}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 border-t border-gray-200/50 pt-6">
                      <div>
                        <h4 className="text-xs uppercase tracking-wider text-black/50 font-bold mb-1">
                          Range
                        </h4>
                        <p className="text-sm md:text-base text-black font-medium">
                          {item.range ?? ""}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-xs uppercase tracking-wider text-black/50 font-bold mb-1">
                          Warranty
                        </h4>
                        <p className="text-sm md:text-base text-black font-medium">
                          {item.warranty ?? ""}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8 pr-[5%]">
          <button
            onClick={handlePrev}
            disabled={index === 0}
            className={`p-4 rounded-full border border-gray-200 transition-colors cursor-pointer ${
              index === 0
                ? "text-gray-300 bg-gray-50 border-gray-100 cursor-not-allowed"
                : "text-black bg-white hover:bg-gray-50"
            }`}
          >
            <ArrowLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            disabled={index >= inverters.length - 2}
            className={`p-4 rounded-full border border-gray-200 transition-colors cursor-pointer ${
              index >= inverters.length - 2
                ? "text-gray-300 bg-gray-50 border-gray-100 cursor-not-allowed"
                : "text-black bg-white hover:bg-gray-50"
            }`}
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default InvertersSliderSection;

"use client";
import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import CtaButton from '@/reuseables/CtaButton';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export interface BrandSpecification {
  title: string;
  logo?: StaticImageData | string;
  description: string;
}

export interface BatteryBrandCard {
  title: string;
  specification: BrandSpecification[];
  showbutton: boolean;
  buttonText: string;
  buttonLink: string;
}

export interface BatteryBrandsGridData {
  topSubtitle: string;
  title: string;
  subtitle: string;
  brands: BatteryBrandCard[];
}

const BatteryBrandsGrid = ({ data }: { data: BatteryBrandsGridData }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % data.brands.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + data.brands.length) % data.brands.length);
  };

  return (
    <section className="bg-white py-16 md:py-24 px-[5%] min-h-screen">
      <div className="">
        <div className="text-center mb-16">
          <h3 className="text-xl md:text-[2rem] text-black font-normal leading-none">
            {data.topSubtitle}
          </h3>
          <h2 className="text-4xl md:text-5xl lg:text-[5rem] text-[#63B846] font-normal tracking-tight">
            {data.title}
          </h2>
          <p className="text-base md:text-[1.375rem] text-black/80 font-medium">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {data.brands.map((brand, idx) => {
            // Find if any specification has a logo to render at the top
            const logoSpec = brand.specification.find(s => s.logo);
            
            return (
              <div 
                key={idx} 
                className={`bg-[#EEF6EB] rounded-[20px] p-8 md:p-10 flex-col items-start ${idx === currentSlide ? 'flex' : 'hidden md:flex'}`}
              >
                
                {logoSpec && logoSpec.logo && (
                  <div className="relative h-14 w-40 mb-6">
                    <Image 
                      src={logoSpec.logo} 
                      alt={brand.title} 
                      fill 
                      className="object-contain object-left" 
                    />
                  </div>
                )}
                
                <h4 className="text-2xl md:text-[1.75rem] text-black font-normal mb-8 leading-tight tracking-tight">
                  {brand.title}
                </h4>
                
                <div className="flex flex-col gap-6 mb-8 flex-1">
                  {brand.specification.map((spec, sIdx) => (
                    <div key={sIdx}>
                      <p className="text-black text-sm md:text-base leading-relaxed">
                        <span className="font-bold">{spec.title} </span>
                        {spec.description}
                      </p>
                    </div>
                  ))}
                </div>
                
                {brand.showbutton && (
                  <div className="mt-auto">
                    <CtaButton 
                      href={brand.buttonLink} 
                      text={brand.buttonText} 
                      textColor="text-black"
                      bgClass="bg-[#63B846]/40 hover:bg-[#63B846]/60 transition-colors"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Navigation */}
        {data.brands.length > 1 && (
          <div className="flex md:hidden justify-center items-center gap-4 mt-8">
            <button 
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-black flex items-center justify-center hover:bg-black/80 transition-colors cursor-pointer"
              aria-label="Previous slide"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <button 
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-black flex items-center justify-center hover:bg-black/80 transition-colors cursor-pointer"
              aria-label="Next slide"
            >
              <ArrowRight className="w-5 h-5 text-white" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BatteryBrandsGrid;

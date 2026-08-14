"use client";
import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import CtaButton from '@/reuseables/CtaButton';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export interface SplitSectionBlock {
  title: string;
  description: string;
}

export interface BatterySplitSlide {
  topSubtitle: string;
  title: string;
  mainDescription: string;
  blocks: SplitSectionBlock[];
  ctaText: string;
  ctaLink: string;
  image: StaticImageData | string;
}

export interface BatterySplitData {
  slides: BatterySplitSlide[];
}

const BatterySplitSection = ({ data }: { data: BatterySplitData }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % data.slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + data.slides.length) % data.slides.length);
  };

  const slide = data.slides[currentSlide];

  const renderImageAndNav = () => (
    <div className="w-full flex flex-col items-end gap-6">
      <div className="w-full relative min-h-[350px] max-w-full md:w-[660px] lg:min-h-[770px] rounded-[20px] overflow-hidden bg-gray-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image 
              src={slide.image} 
              alt={slide.title}
              fill 
              className="object-cover" 
            />
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Slider Navigation */}
      {data.slides.length > 1 && (
        <div className="flex items-center gap-4">
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
  );

  return (
    <section className="bg-white py-16 md:py-24 px-[5%] overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start shrink-0 lg:min-h-[500px]">
          {/* Mobile Image & Nav (Visible only on small screens) */}
          <div className="w-full block lg:hidden mb-8">
            {renderImageAndNav()}
          </div>

          <div className="relative w-full flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="flex flex-col items-start w-full"
              >
                <h3 className="text-xl md:text-2xl text-black font-normal mb-1">
                  {slide.topSubtitle}
                </h3>
                <h2 className="text-4xl md:text-[5rem] text-[#63B846] font-normal leading-[1] mb-6 lg:mb-8 tracking-tight">
                  {slide.title}
                </h2>

                <p className="text-base md:text-2xl text-black font-normal leading-[1] tracking-tight mb-8">
                  {slide.mainDescription}
                </p>

                <div className="space-y-2 mb-8 w-full capitalize">
                  {slide.blocks.map((block, idx) => (
                    <div key={idx}>
                      <h4 className="text-lg md:text-xl font-semibold text-black mb-1 tracking-tight">
                        {block.title}
                      </h4>
                      <p className="text-base md:text-xl font-normal leading-[1] tracking-tight text-black whitespace-pre-line">
                        {block.description}
                      </p>
                    </div>
                  ))}
                </div>

                <CtaButton 
                  href={slide.ctaLink} 
                  text={slide.ctaText} 
                  textColor="text-black"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Content - Image and Navigation (Visible only on lg screens) */}
        <div className="hidden lg:flex w-full lg:w-1/2">
          {renderImageAndNav()}
        </div>
      </div>
    </section>
  );
};

export default BatterySplitSection;

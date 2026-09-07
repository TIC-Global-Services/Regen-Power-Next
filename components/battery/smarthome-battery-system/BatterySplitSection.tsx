"use client";
import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import CtaButton from '@/reuseables/CtaButton';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowDown } from 'lucide-react';

export interface SplitSectionBlock {
  title: string;
  description: string;
}

export interface BatterySplitSlide {
  topSubtitle: string;
  title: string;
  mainDescription: string;
  blocks: SplitSectionBlock[];
  ctaText?: string;
  ctaLink?: string;
  image: StaticImageData | string;
}

export interface BatterySplitData {
  slides: BatterySplitSlide[];
}

const BatterySplitSection = ({ data }: { data: BatterySplitData }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % data.slides.length);
    setExpanded(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + data.slides.length) % data.slides.length);
    setExpanded(false);
  };

  const slide = data.slides[currentSlide];

  const renderImage = () => (
    <div className="w-full relative min-h-[350px] max-w-full lg:w-[660px] lg:min-h-[770px] rounded-[20px] overflow-hidden bg-gray-100">
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
  );

  const renderNav = () =>
    data.slides.length > 1 && (
      <div className="flex items-center gap-4">
        <button
          onClick={prevSlide}
          className="w-12 h-12 rounded-full bg-black flex items-center justify-center hover:bg-black/80 transition-colors cursor-pointer"
          aria-label="Previous slide"
        >
          <ArrowLeft className="w-5 h-5 text-[#63B846]" />
        </button>
        <button
          onClick={nextSlide}
          className="w-12 h-12 rounded-full bg-black flex items-center justify-center hover:bg-black/80 transition-colors cursor-pointer"
          aria-label="Next slide"
        >
          <ArrowRight className="w-5 h-5 text-[#63B846]" />
        </button>
      </div>
    );

  return (
    <section className="bg-white py-8 md:py-16 px-[5%] md:px-[3%] overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
        {/* IMAGE — mobile/iPad: first (order-1); desktop: right column (lg:order-2). */}
        <div className="order-1 w-full lg:order-2 lg:w-1/2 flex flex-col items-end gap-6">
          {renderImage()}
        </div>

        {/* CONTENT — mobile/iPad: after image (order-2); desktop: left column (lg:order-1) */}
        <div className="order-2 w-full lg:order-1 lg:w-1/2 flex flex-col items-start shrink-0 lg:min-h-[500px]">
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
                {/* Header — always visible (subtitle, title, description) */}
                <h3 className="text-xl md:text-2xl text-black font-normal mb-1">
                  {slide.topSubtitle}
                </h3>
                <h2 className="text-4xl md:text-[5rem] text-[#63B846] font-normal leading-[1] mb-6 lg:mb-8 tracking-tight">
                  {slide.title}
                </h2>
                <p className="text-base md:text-2xl text-black font-normal leading-[1] tracking-tight mb-8">
                  {slide.mainDescription}
                </p>

                {/* View more toggle + slide nav — mobile/iPad only: toggle centered,
                    arrows below it aligned to the right */}
                <div className="lg:hidden mt-2 mb-2 w-full flex flex-col items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setExpanded((v) => !v)}
                    aria-expanded={expanded}
                    className="flex items-center gap-2 text-base font-medium text-black cursor-pointer"
                  >
                    {expanded ? 'View less' : 'View more'}
                    <ArrowDown
                      className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <div className="w-full flex justify-end">{renderNav()}</div>
                </div>

                {/* Expandable content — blocks + CTA; smooth on mobile, always open on desktop */}
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out w-full ${
                    expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  } lg:grid-rows-[1fr]`}
                >
                  <div className="overflow-hidden">
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

                    {slide.ctaText && slide.ctaLink && (
                      <CtaButton
                        href={slide.ctaLink}
                        text={slide.ctaText}
                        textColor="text-black"
                      />
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          {/* Desktop arrows — left-aligned below the content */}
          <div className="hidden lg:flex justify-start w-full mt-8">
            {renderNav()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BatterySplitSection;

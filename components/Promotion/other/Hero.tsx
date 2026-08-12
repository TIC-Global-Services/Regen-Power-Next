'use client';

import React from 'react';
import Fade from '@/reuseables/fade';
import CtaButton from '@/reuseables/CtaButton';
import { ArrowRight } from 'lucide-react';

export interface HeroProps {
  title?: string;
  highlightText?: string;
  subtitle?: string;
  ctaText?: string;
  bgImage?: string;
  onCtaClick?: () => void;
}

const Hero = ({
  title = "20kWh Battery System",
  highlightText = "Up to $5,400 Back In Rebate",
  subtitle = "Lock In Today's Pricing Now!",
  ctaText = "Secure My Rebate",
  bgImage = "/fallback.png",
  onCtaClick,
}: HeroProps) => {

  // Process highlight text to make dollar values stand out (e.g. $5,400 or $5,255)
  const renderHighlight = (text: string) => {
    const regex = /(\$\d+(?:,\d+)?)/g;
    const parts = text.split(regex);
    return parts.map((part, index) => {
      if (regex.test(part)) {
        return (
          <span key={index} className="text-[#63B846] font-extrabold whitespace-nowrap">
            {part}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <section
      className="relative w-full min-h-[90vh] md:min-h-screen flex flex-col items-center justify-center text-center px-4 md:px-[5%] pt-32 pb-16 overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.45)), url('${bgImage}')`
      }}
    >
      <Fade>
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center gap-6">
          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight drop-shadow-md">
            {title.split(' ').map((word, i) => (
              <span key={i} className={word.toLowerCase().includes('battery') || word.toLowerCase().includes('system') ? 'block sm:inline' : ''}>
                {word}{' '}
              </span>
            ))}
          </h1>

          {/* Subtitle / Rebate Details */}
          <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-snug drop-shadow-sm mt-2 max-w-2xl">
            {renderHighlight(highlightText)}
          </div>

          {/* Prompt/CTA Text */}
          {subtitle && (
            <p className="text-base sm:text-lg md:text-xl text-gray-200 font-semibold tracking-wide uppercase mt-4">
              {subtitle}
            </p>
          )}

          {/* CTA Button */}
          <div className="mt-8 flex justify-center w-full max-w-xs sm:max-w-sm">
            <CtaButton
              text={ctaText}
              icon={ArrowRight}
              bgClass="bg-[#63B846] border-0"
              hoverClass="hover:bg-[#52a037] hover:scale-105"
              textColor="text-white font-bold"
              iconBgClass="bg-white/20"
              iconTextColor="text-white"
              className="py-3 px-6 text-base md:text-lg shadow-lg w-full justify-between"
              onClick={onCtaClick}
            />
          </div>
        </div>
      </Fade>

      {/* Decorative gradient overlay at bottom to blend with next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;

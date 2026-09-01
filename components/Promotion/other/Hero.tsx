
import React from 'react';
import Fade from '@/reuseables/fade';
import CtaButton from '@/reuseables/CtaButton';
import { ArrowRight } from 'lucide-react';

export interface HeroProps {
  title: string;
  subtitle: string;
  highlight?: {
    prefix?: string;
    value: string;
    suffix?: string;
  };
  description?: string;
  cta?: {
    label: string;
    href?: string;
  };
  backgroundImage: string;
  onCtaClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
}


const Hero = ({
  title = "20kWh",
  subtitle = "Battery System",
  highlight = {
    prefix: "Upto",
    value: "$5400",
  },
  description = "Back In Rebate",
  cta = {
    label: "See What's Included & Get A Quote",
    href: "#quote-form-section-mobile",
  },
  backgroundImage = "/fallback.png",
  onCtaClick,
}: HeroProps) => {

  return (
    <section className="relative w-full min-h-[100dvh] md:min-h-[100dvh] flex flex-col items-center justify-start text-center px-4 md:px-[3%] pt-45 overflow-hidden">
      <img
        src={backgroundImage}
        alt=""
        className="absolute inset-0 z-0 h-full w-full object-cover object-center"
      />
      <Fade>
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-start md:justify-center">
          {/* Main Title */}
          <h1 className="text-6xl font-black text-black leading-none tracking-tight drop-shadow-md">
            {title}
          </h1>
          <h2 className='text-white font-bold text-[2.125rem] leading-none'>{subtitle}</h2>
          {/* Highlight / Rebate Details */}
          {highlight && (
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-snug drop-shadow-sm max-w-2xl flex flex-wrap items-baseline justify-start items-start gap-2 mt-2">
              {highlight.prefix && <span className='text-xl sm:text-xl md:text-[1.875rem]'>{highlight.prefix}</span>}
              <span className="text-[#63B846] text-[3.125rem] sm:text-[3.125rem] md:text-[4.375rem] font-bold">
                {highlight.value}
              </span>
            </div>
          )}
          {description && (
            <span className="font-bold text-xl sm:text-3xl md:text-[2.5rem] text-white  block">
              {description}
            </span>
          )}
          {/* CTA Button */}
          {cta && (
            <div className="mt-8 flex justify-center w-full max-w-xs sm:max-w-sm">
              <CtaButton
                text={cta.label}
                href={cta.href}
                icon={ArrowRight}
                textClass='font-medium'
                textColor="text-white"
                onClick={onCtaClick}
              />
            </div>
          )}
        </div>
      </Fade>

      {/* Decorative gradient overlay at bottom to blend with next section */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" /> */}
    </section>
  );
};

export default Hero;

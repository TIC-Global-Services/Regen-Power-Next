'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';
import { ArrowBigRight, ArrowRight, MoveRight } from 'lucide-react';
import Fade from './fade';
import CtaButton from './CtaButton';

export interface FeatureCardItem {
  title: string;
  subtitle?: string;
  description: string;
  image: StaticImageData | { src: string; alt?: string } | string | null;
  colSpan?: number;
  textPosition?: 'top' | 'bottom';
  footerTitle?: string;
  footerDescription?: string;
}

export interface FeatureCardGridProps {
  topSubtitle?: string;
  title?: string;
  bottomSubtitle?: string;
  cards: FeatureCardItem[];
  showReadMore?: boolean
  showPersonalisedquoteCta?: boolean
  centerButton?: boolean
  centerButtonText?: string
  /** Hide the center CTA button on mobile (< md). */
  hideCenterButtonMobile?: boolean
}

const FeatureCardGrid: React.FC<FeatureCardGridProps> = ({
  topSubtitle = "Three Ways To Pay",
  title = "Including One With Zero Interest",
  bottomSubtitle = "",
  cards,
  showReadMore = true,
  showPersonalisedquoteCta = false,
  centerButton = false,
  centerButtonText = "",
  hideCenterButtonMobile = false
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      setContainerWidth(el.offsetWidth);
      setIsDesktop(window.innerWidth >= 768);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
  };

  // Same ratio as before: active card = 2.5, others = 1
  const ACTIVE_FLEX = 2;
  const INACTIVE_FLEX = 1;
  const gapPx = 20; // matches md:gap-5 (20px) — adjust if you change the gap class
  const totalGap = gapPx * (cards.length - 1);
  const usableWidth = Math.max(containerWidth - totalGap, 0);
  const flexSum = ACTIVE_FLEX + INACTIVE_FLEX * (cards.length - 1);

  const getCardWidth = (index: number) => {
    if (!isDesktop || usableWidth === 0) return undefined; // let mobile fall back to w-full via className
    const share = index === activeIndex ? ACTIVE_FLEX : INACTIVE_FLEX;
    return (usableWidth * share) / flexSum;
  };

  return (
    <Fade>
      <section className="py-10 md:py-20 bg-white px-[5%] md:px-[5%] overflow-hidden">
        <div className="text-left md:text-center mb-5 md:mb-16 -space-y-4">
          {topSubtitle && (
            <h3 className="text-base md:text-[2.125rem] text-black font-normal tracking-tight mb-1">
              {topSubtitle}
            </h3>
          )}
          {title && (
            <h2 className="text-[2.5rem] md:text-5xl lg:text-[5rem] text-[#63B846] leading-none font-normal tracking-tighter mb-2">
              {title}
            </h2>
          )}
          {bottomSubtitle && (
            <p className="text-xs md:text-xl text-black max-w-5xl mx-auto leading-[1.2] font-medium">
              {bottomSubtitle}
            </p>
          )}
        </div>

        <div ref={containerRef} className="flex overflow-x-auto md:overflow-hidden md:flex-row -mx-[5%] pl-[5%] pr-[5%] gap-4 md:gap-5 w-[calc(100%+10%)] md:w-full md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-4 md:pb-0">
          {cards.map((card, index) => {
            const isActive = !isDesktop || activeIndex === index;
            const widthPx = getCardWidth(index);

            return (
              <div
                key={index}
                role="button"
                tabIndex={0}
                onClick={() => handleCardClick(index)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleCardClick(index); }}
                onMouseEnter={() => window.innerWidth > 768 && setActiveIndex(index)}
                style={{
                  width: widthPx ? `${widthPx}px` : undefined,
                  transition: 'width 700ms cubic-bezier(0.4,0,0.2,1)',
                  transform: 'translateZ(0)',
                  WebkitBackfaceVisibility: 'hidden',
                }}
                className={`relative rounded-[24px] overflow-hidden group flex-none cursor-pointer focus-visible:outline-none ${isActive ? 'min-h-[400px] md:h-[460px]' : 'min-h-[80px] md:min-h-[400px]'
                  } w-[75vw] md:w-full shrink-0 snap-start md:snap-align-none`}
              >
                <div className="absolute inset-0 z-0 w-full h-full" style={{ transform: 'translateZ(0)' }}>
                  <Image
                    src={card.image && typeof card.image === 'object' && 'src' in card.image ? card.image.src : typeof card.image === 'string' ? card.image : ''}
                    alt={card.image && typeof card.image === 'object' && 'alt' in card.image ? (card.image.alt || card.title) : card.title}
                    fill
                    className={`object-cover transition-transform duration-700 ${isActive ? 'scale-105' : 'scale-100'} group-hover:scale-105`}
                  />
                  <div className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] bg-gradient-to-b ${isActive ? 'from-black/60 via-black/20 to-black/80' : 'from-black/70 via-black/40 to-black/80'}`} />
                </div>

                <div className="relative z-10 h-full p-6 md:p-8 flex flex-col">
                  {!isActive && <div className="flex-1" />}

                  <h4 className={`text-white font-normal tracking-tight transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${isActive ? 'text-xl md:text-3xl mb-3' : 'text-[1.75rem] md:text-xl mb-0'}`}>
                    {card.title}
                  </h4>

                  {card.subtitle && (
                    <p className="text-white/90 text-[#63B846] text-base font-medium tracking-tight leading-tight mb-2">
                      {card.subtitle}
                    </p>
                  )}

                  <p className={`text-white text-xs md:text-[15px] leading-tight max-w-[85%] font-light transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] opacity-100`}>
                    {card.description}
                  </p>

                  {isActive && (card.footerTitle || card.footerDescription) && (
                    <div className="mt-4">
                      {card.footerTitle && (
                        <h5 className="text-white font-semibold tracking-tight text-xl mb-0.5 whitespace-nowrap">
                          {card.footerTitle}
                        </h5>
                      )}
                      {card.footerDescription && (
                        <p className="text-white text-sm tracking-tight font-light">
                          {card.footerDescription}
                        </p>
                      )}
                    </div>
                  )}

                  {showReadMore && isActive && (
                    <div className="flex items-end mt-auto">
                      <p className="text-[#63B846] flex gap-2 items-center">Read more <span className="text-lg"><MoveRight size={20} color='#63B846' strokeWidth={3} /></span></p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {showPersonalisedquoteCta && (
          <div className='flex flex-wrap justify-end items-center gap-3 mt-10' >
            <p className='w-full max-w-md text-xs tracking-tight lg:text-sm'>Want an estimate for your home? Tell us your address and usage and we&apos;ll model it</p>
            <CtaButton text='Get a personalised quote' />
          </div>
        )}
        {centerButton && (
          <div className={`${hideCenterButtonMobile ? 'hidden md:flex' : 'flex'} justify-center items-center gap-3 mt-4 md:mt-10`} >
            <CtaButton text={centerButtonText} className="max-w-full whitespace-normal" buttonTextClass="whitespace-normal" />
          </div>
        )}
      </section>
    </Fade>
  );
};

export default FeatureCardGrid;
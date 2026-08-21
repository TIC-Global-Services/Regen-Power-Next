'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { PortfolioItem } from '@/utils/portfolio.model';

const FALLBACK_IMAGE = '/fallback.png';

interface PortfolioHoverRowProps {
  items: PortfolioItem[];
}

/* Active card takes 2x the flex share of an inactive card (same ratio as FeatureCardGrid). */
const ACTIVE_FLEX = 2;
const INACTIVE_FLEX = 1;
const GAP_PX = 20; // matches md:gap-5 (20px)

/**
 * One row of 3 portfolio cards with the FeatureCardGrid hover animation:
 * all cards sit equal with only the title visible; hovering a card smoothly
 * expands it (width 1x → 2x) and reveals its description.
 */
const PortfolioHoverRow: React.FC<PortfolioHoverRowProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const router = useRouter();

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

  /* Width math — active card = 2x share, inactive = 1x. With no active card, all equal. */
  const activeShare = activeIndex >= 0 ? ACTIVE_FLEX : INACTIVE_FLEX;
  const totalGap = GAP_PX * (items.length - 1);
  const usableWidth = Math.max(containerWidth - totalGap, 0);
  const flexSum = activeShare + INACTIVE_FLEX * (items.length - 1);

  const getCardWidth = (index: number) => {
    if (!isDesktop || usableWidth === 0) return undefined; // let mobile fall back to w-[75vw]
    const share = index === activeIndex ? ACTIVE_FLEX : INACTIVE_FLEX;
    return (usableWidth * share) / flexSum;
  };

  const handleActivate = (index: number) => {
    if (isDesktop) setActiveIndex(index);
  };

  const handleClick = (index: number) => {
    const item = items[index];
    /* Desktop: hover already expanded the card, so a click means "open it".
       Touch: first tap expands, tapping the expanded card opens its page. */
    if (item?.link && (isDesktop || activeIndex === index)) {
      router.push(item.link);
      return;
    }
    setActiveIndex(index);
  };

  return (
    <div
      ref={containerRef}
      className="flex gap-4 md:gap-5 overflow-x-auto md:overflow-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
    >
      {items.map((item, index) => {
        const isActive = index === activeIndex;
        const widthPx = getCardWidth(index);
        const description = item.description || item.categories.join(' · ');
        return (
          <div
            key={item.id}
            role="button"
            tabIndex={0}
            onClick={() => handleClick(index)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleClick(index);
            }}
            onMouseEnter={() => handleActivate(index)}
            onMouseLeave={() => {
              if (isDesktop) setActiveIndex(-1);
            }}
            style={{
              width: widthPx ? `${widthPx}px` : undefined,
              transition: 'width 700ms cubic-bezier(0.4,0,0.2,1)',
              transform: 'translateZ(0)',
              WebkitBackfaceVisibility: 'hidden',
            }}
            className="relative rounded-[20px] overflow-hidden group flex-none cursor-pointer focus-visible:outline-none w-[75vw] md:w-full shrink-0 snap-start h-[320px] md:h-[420px]"
          >
            <div className="absolute inset-0">
              <Image
                src={item.image || FALLBACK_IMAGE}
                alt={item.title}
                fill
                className={`object-cover transition-transform duration-700 ${isActive ? 'scale-105' : 'scale-100'}`}
              />
              {/* Gradient — deepens when the card is expanded so the text pops */}
              <div
                className={`absolute inset-0 transition-all duration-700 bg-gradient-to-t ${
                  isActive
                    ? 'from-black/85 via-black/30 to-transparent'
                    : 'from-black/60 via-black/20 to-transparent'
                }`}
              />
            </div>

            <div className="relative z-10 h-full p-5 md:p-8 flex flex-col justify-end">
              <h3 className="text-white font-normal tracking-tight leading-tight text-lg md:text-2xl">
                {item.title}
              </h3>
              <p
                className={`text-white/85 text-xs md:text-base mt-2 leading-snug tracking-tight transition-all duration-700 ${
                  isActive ? '' : 'opacity-0 h-0 overflow-hidden m-0'
                }`}
              >
                {description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PortfolioHoverRow;

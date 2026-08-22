'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';
import { ArrowLeft, ArrowRight, MoveRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Fade from './fade';
import CtaButton from './CtaButton';
import SectionHeader from './SectionHeader';

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
  centerButtonLink?: string
  /** Hide the center CTA button on mobile (< md). */
  hideCenterButtonMobile?: boolean
  /** Copy + link for the personalised-quote CTA (falls back to hardcoded defaults). */
  ctaDescription?: string;
  ctaText?: string;
  ctaLink?: string;
  /** Keep the description visible on inactive (narrow) cards too. */
  showDescriptionInactive?: boolean;
}

const FeatureCardGrid: React.FC<FeatureCardGridProps> = ({
  topSubtitle = "",
  title = "",
  bottomSubtitle = "",
  cards,
  showReadMore = true,
  showPersonalisedquoteCta = false,
  centerButton = false,
  centerButtonText = "",
  centerButtonLink,
  hideCenterButtonMobile = false,
  ctaDescription = "",
  ctaText = "",
  ctaLink,
  showDescriptionInactive = false
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev (page slide direction)
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

  // ── Pagination: show 3 cards per page on desktop when there are more ──
  const PAGE_SIZE = 3;
  const pageCount = Math.ceil(cards.length / PAGE_SIZE);
  const showPagination = isDesktop && cards.length > PAGE_SIZE;
  const startIndex = page * PAGE_SIZE;
  const visibleCards = showPagination
    ? cards.slice(startIndex, startIndex + PAGE_SIZE)
    : cards;
  const count = visibleCards.length;

  const goPage = (next: number) => {
    const clamped = Math.max(0, Math.min(next, pageCount - 1));
    setDirection(clamped > page ? 1 : -1);
    setPage(clamped);
    setActiveIndex(clamped * PAGE_SIZE);
  };

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
  };

  // Same ratio as before: active card = 2.5, others = 1
  const ACTIVE_FLEX = 1.8;
  const INACTIVE_FLEX = 1;
  // Desktop min-height floor, matching lg:min-h-[300px] / xl:min-h-[460px].
  // Inline height is only applied when content would exceed this (fluid growth).
  const MIN_HEIGHT = isDesktop ? 300 : 0;
  const gapPx = 20; // matches lg:gap-4 (20px) — adjust if you change the gap class
  const totalGap = gapPx * (count - 1);
  const usableWidth = Math.max(containerWidth - totalGap, 0);
  const flexSum = ACTIVE_FLEX + INACTIVE_FLEX * (count - 1);

  const getCardWidth = (index: number) => {
    if (!isDesktop || usableWidth === 0) return undefined; // let mobile fall back to w-full via className
    const share = index === activeIndex ? ACTIVE_FLEX : INACTIVE_FLEX;
    return (usableWidth * share) / flexSum;
  };


  const probeRef = useRef<HTMLDivElement>(null);
  const [probeH, setProbeH] = useState<number | null>(null);
  const activeCard = cards[activeIndex];

  useEffect(() => {
    if (!probeRef.current) return;
    const update = () => {
      if (probeRef.current) setProbeH(probeRef.current.offsetHeight);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(probeRef.current);
    return () => ro.disconnect();
  }, [activeIndex, isDesktop, containerWidth]);

  const renderCard = (card: FeatureCardItem, index: number) => {
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
      
          height: isDesktop && probeH ? `${Math.max(probeH, MIN_HEIGHT)}px` : undefined,
          transition: 'width 700ms cubic-bezier(0.4,0,0.2,1), height 700ms cubic-bezier(0.4,0,0.2,1)',
          transform: 'translateZ(0)',
          WebkitBackfaceVisibility: 'hidden',
        }}
        className={`relative rounded-[20px] overflow-hidden group flex-none cursor-pointer focus-visible:outline-none lg:min-h-[300px] xl:min-h-[460px] flex flex-col w-[55vw] lg:w-full shrink-0 snap-start lg:snap-align-none`}
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

        <div className="relative z-10 flex-1 p-6 lg:p-8 pt-5 flex flex-col">
          {!isActive && <div className="flex-1" />}

          <h4 className={`text-white font-normal tracking-tight transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${isActive ? 'text-xl lg:text-3xl mb-3' : 'text-[1.75rem] lg:text-2xl mb-0'}`}>
            {card.title}
          </h4>

          {isActive && card.subtitle && (
            <p className="text-white text-[#63B846] text-[1.375rem] font-normal tracking-tight leading-tight mb-2 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] opacity-100">
              {card.subtitle}
            </p>
          )}

          <p className={`text-white text-xs lg:text-base leading-tight max-w-[85%] tracking-tight transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${isActive ? '' : showDescriptionInactive ? 'mt-1.5' : 'opacity-0 h-0 overflow-hidden m-0'}`}>
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
                <p className="text-white text-base tracking-tight ">
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
  };

  return (
    <Fade>
      <section className="py-8 lg:py-16 bg-white px-[5%] lg:px-[3%] lg:px-[5%] lg:px-[3%] overflow-hidden">
        <SectionHeader
          subtitle={topSubtitle}
          title={title}
          description={bottomSubtitle}
          align="center"
          className="mb-5 lg:mb-16 hidden lg:block"
          subtitleClass="text-xl lg:text-[2.125rem] text-black tracking-tight capitalize"
          titleClass="text-[2.5rem] lg:text-6xl tracking-tight leading-[1]"
          descClass="text-base lg:text-xl text-black max-w-4xl mx-auto font-medium tracking-tight whitespace-pre-line"
        />
        <SectionHeader
          subtitle={topSubtitle}
          title={title}
          description={bottomSubtitle}
          align="left"
          className="mb-5 lg:mb-16 lg:hidden"
          subtitleClass="text-xl lg:text-[2.125rem] text-black tracking-tight capitalize"
          titleClass="text-[2.5rem] lg:text-6xl tracking-tight leading-[1]"
          descClass="text-base lg:text-base text-black max-w-4xl mx-auto font-medium tracking-tight whitespace-pre-line"
        />

        <div ref={containerRef} className="relative flex items-stretch overflow-x-auto lg:overflow-hidden lg:flex-row h-full -mx-[5%] px-[5%] gap-4 lg:gap-4 w-[calc(100%+10%)] lg:w-full lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-4 lg:pb-0">
          {showPagination ? (
            /* Paginated desktop: pages slide in/out like the cards are moving */
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={{
                  enter: (dir: number) => ({ x: dir > 0 ? "18%" : "-18%", opacity: 0 }),
                  center: { x: 0, opacity: 1 },
                  exit: (dir: number) => ({ x: dir > 0 ? "-18%" : "18%", opacity: 0 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full flex items-stretch gap-4"
              >
                {visibleCards.map((card, localIdx) =>
                  renderCard(card, showPagination ? startIndex + localIdx : localIdx)
                )}
              </motion.div>
            </AnimatePresence>
          ) : (
            /* Mobile slider + non-paginated desktop: cards directly in the row */
            visibleCards.map((card, localIdx) =>
              renderCard(card, showPagination ? startIndex + localIdx : localIdx)
            )
          )}

          {isDesktop && activeCard && (
            <div
              ref={probeRef}
              aria-hidden
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: getCardWidth(activeIndex) ?? undefined,
                visibility: 'hidden',
                pointerEvents: 'none',
                zIndex: -1,
              }}
            >
              <div className="p-6 lg:p-10 pt-5 flex flex-col">
                <h4 className="text-white font-normal tracking-tight text-xl lg:text-3xl mb-3">
                  {activeCard.title}
                </h4>
                {activeCard.subtitle && (
                  <p className="text-white text-[#63B846] text-[1.375rem] font-normal tracking-tight leading-tight mb-2">
                    {activeCard.subtitle}
                  </p>
                )}
                <p className="text-white text-xs lg:text-base leading-tight max-w-[85%] tracking-tight">
                  {activeCard.description}
                </p>
                {(activeCard.footerTitle || activeCard.footerDescription) && (
                  <div className="mt-4">
                    {activeCard.footerTitle && (
                      <h5 className="text-white font-semibold tracking-tight text-xl mb-0.5 whitespace-nowrap">
                        {activeCard.footerTitle}
                      </h5>
                    )}
                    {activeCard.footerDescription && (
                      <p className="text-white text-base tracking-tight">
                        {activeCard.footerDescription}
                      </p>
                    )}
                  </div>
                )}
                {showReadMore && (
                  <div className="pt-4">
                    <p className="text-[#63B846] flex gap-2 items-center">
                      Read more
                      <span className="text-lg">
                        <MoveRight size={20} color="#63B846" strokeWidth={3} />
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {showPagination && (
          <div className="flex justify-end items-center gap-3 mt-10">
            <button
              type="button"
              onClick={() => goPage(page - 1)}
              disabled={page === 0}
              aria-label="Previous 3 cards"
              className="w-12 h-12 rounded-full bg-black flex items-center justify-center hover:bg-black/80 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <button
              type="button"
              onClick={() => goPage(page + 1)}
              disabled={page >= pageCount - 1}
              aria-label="Next 3 cards"
              className="w-12 h-12 rounded-full bg-black flex items-center justify-center hover:bg-black/80 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ArrowRight className="w-5 h-5 text-white" />
            </button>
          </div>
        )}

        {showPersonalisedquoteCta && (
          <div className='flex flex-wrap justify-end items-center gap-3 mt-10' >
            <p className='w-full lg:w-auto max-w-lg text-xs tracking-tight lg:text-sm'>{ctaDescription}</p>
            <CtaButton text={ctaText} href={ctaLink} />
          </div>
        )}
        {centerButton && (
          <div className={`${hideCenterButtonMobile ? 'hidden lg:flex' : 'flex'} justify-end lg:justify-center items-center gap-3 mt-4 lg:mt-10`} >
            <CtaButton text={centerButtonText} href={centerButtonLink} className="max-w-full whitespace-normal" buttonTextClass="whitespace-normal" />
          </div>
        )}
      </section>
    </Fade>
  );
};

export default FeatureCardGrid;
'use client';

import React, { useEffect, useRef } from 'react';
import Image, { StaticImageData } from 'next/image';
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
  Variants,
} from 'framer-motion';

/* ─── Animated Counter ─────────────────────────────────── */

const AnimatedCounter = ({ from, to }: { from: number; to: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) =>
    Math.round(latest).toLocaleString(),
  );

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration: 2, ease: 'easeOut' });
      return controls.stop;
    }
  }, [inView, to, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

/* ─── Animation Variants ───────────────────────────────── */

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

/* ─── Types ────────────────────────────────────────────── */

export interface WhyChooseCard {
  variant: 'award' | 'installations' | 'years';
  bgColor: string;

  /** Award card — logo images */
  logoBg?: StaticImageData | string;
  logo?: StaticImageData | string;
  mobileLogo?: string;

  /** Award card — counter */
  count?: number;
  countSuffix?: string;
  mobileCount?: number;
  mobileCountSuffix?: string;

  /** Award card — text */
  title?: string;
  description?: string;
  mobileTitle?: string;

  /** Installations card */
  combinedText?: string;
  productImage?: string;
  showPlusButton?: boolean;

  /** Years card */
  backgroundImage?: StaticImageData | string;
  yearsText?: string;
}

export interface EvWhyChooseUsData {
  headerSubtitle: string;
  headerTitle: string;
  cards: WhyChooseCard[];
}

interface EvWhyChooseUsProps {
  data: EvWhyChooseUsData;
}

/* ─── Desktop Card Components ──────────────────────────── */

const DesktopAwardCard = ({ card }: { card: WhyChooseCard }) => (
  <motion.div
    variants={itemVariants}
    className="rounded-[20px] p-4 flex flex-col h-full"
    style={{ backgroundColor: card.bgColor }}
  >
    {/* Logo badge */}
    {card.logoBg && (
      <div className="w-full relative aspect-[2/1] rounded-3xl overflow-hidden mb-4 lg:mb-8 flex items-center justify-center">
        <Image
          src={card.logoBg}
          alt="Award Background"
          fill
          className="object-cover z-0"
        />
        {card.logo && (
          <Image
            src={card.logo}
            alt="Award Logo"
            fill
            className="object-contain p-4 z-10 relative"
          />
        )}
      </div>
    )}

    {/* Counter + text */}
    <div className="mt-auto py-4 px-4">
      {card.count !== undefined && (
        <h3 className="text-[4rem] lg:text-[6.25rem] font-bold text-black mb-2 tracking-tight leading-none">
          <AnimatedCounter from={0} to={card.count} />
          <span className="text-[3rem] lg:text-[6.25rem]">
            {card.countSuffix}
          </span>
        </h3>
      )}
      {card.title && (
        <h4 className="text-2xl lg:text-3xl text-black font-medium tracking-tight leading-tight">
          {card.title}
        </h4>
      )}
      {card.description && (
        <p className="text-lg text-black leading-tight mt-1">
          {card.description}
        </p>
      )}
    </div>
  </motion.div>
);

const DesktopInstallationsCard = ({ card }: { card: WhyChooseCard }) => (
  <motion.div
    variants={itemVariants}
    className="rounded-[20px] p- relative flex flex-col h-full min-h-[450px] lg:min-h-[500px] overflow-hidden"
    style={{ backgroundColor: card.bgColor }}
  >
    {/* Combined stat text */}
    {card.combinedText && (
      <p className="text-2xl py-5 px-4 lg:text-[2.375rem] text-black font-normal leading-[1.1] tracking-tight relative z-10">
        {card.combinedText}
      </p>
    )}

    {/* Product image */}
    {card.productImage && (
      <div className="relative w-full flex-1 flex items-end justify-center">
        <div className="relative w-full h-full min-h-[200px]">
          <Image
            src={card.productImage}
            alt="Product"
            fill
            className="object-contain object-bottom"
          />
        </div>
      </div>
    )}
  </motion.div>
);

const DesktopYearsCard = ({ card }: { card: WhyChooseCard }) => (
  <motion.div
    variants={itemVariants}
    className="rounded-[20px] p-6 relative overflow-hidden flex flex-col justify-end h-full min-h-[350px] lg:min-h-[500px]"
    style={{ backgroundColor: card.bgColor }}
  >
    {/* Background image */}
    {card.backgroundImage && (
      <div className="absolute inset-0 -right-10 -top-30 z-0">
        <Image
          src={card.backgroundImage}
          alt="Background"
          fill
          className="object-contain object-right-top opacity-50"
        />
      </div>
    )}

    {/* Text overlay */}
    <div className="relative z-10 w-full">
      {card.yearsText && (
        <p className="text-2xl lg:text-[2.375rem] text-black font-normal leading-[1.1]">
          {card.yearsText}
        </p>
      )}
    </div>
  </motion.div>
);

/* ─── Mobile Card Components ───────────────────────────── */

const MobileAwardCard = ({ card }: { card: WhyChooseCard }) => (
  <div
    className="rounded-[24px] p-6 flex flex-col items-start"
    style={{ backgroundColor: card.bgColor }}
  >
    {/* Logo pill */}
    {card.mobileLogo && (
      <div className="bg-[#63B846]/15 rounded-[20px] py-4 px-8 w-full flex items-center justify-center mb-6 max-w-[280px] self-center">
        <Image
          src={card.mobileLogo}
          alt="Logo"
          width={160}
          height={40}
          className="object-contain h-10 w-auto"
        />
      </div>
    )}

    {/* Counter + text */}
    <div className="flex flex-col items-start w-full px-2">
      {(card.mobileCount ?? card.count) !== undefined && (
        <h3 className="text-5xl font-bold text-black mb-1 tracking-tight leading-none">
          <AnimatedCounter from={0} to={(card.mobileCount ?? card.count)!} />
          {card.mobileCountSuffix ?? card.countSuffix}
        </h3>
      )}
      {(card.mobileTitle ?? card.title) && (
        <p className="text-xl font-medium text-black text-left leading-tight">
          {card.mobileTitle ?? card.title}
        </p>
      )}
    </div>
  </div>
);

const MobileInstallationsCard = ({ card }: { card: WhyChooseCard }) => (
  <div
    className="rounded-[24px] p-6 relative flex flex-col overflow-hidden min-h-[380px]"
    style={{ backgroundColor: card.bgColor }}
  >
    {/* Plus button */}
    {card.showPlusButton && (
      <div className="absolute top-4 right-4 z-10">
        <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white text-2xl font-light shadow-md">
          +
        </div>
      </div>
    )}

    {/* Combined stat text */}
    {card.combinedText && (
      <p className="text-[1.25rem] text-black font-semibold leading-snug pr-12 max-w-[85%] mb-4 text-left">
        {card.combinedText}
      </p>
    )}

    {/* Product image */}
    {card.productImage && (
      <div className="relative w-full flex-1 mt-auto flex justify-center items-end">
        <div className="relative w-full h-[220px]">
          <Image
            src={card.productImage}
            alt="Product"
            fill
            className="object-contain object-bottom"
          />
        </div>
      </div>
    )}
  </div>
);

const MobileYearsCard = ({ card }: { card: WhyChooseCard }) => (
  <div
    className="rounded-[24px] overflow-hidden flex flex-col min-h-[360px]"
    style={{ backgroundColor: card.bgColor }}
  >
    {/* Background image at top */}
    {card.backgroundImage && (
      <div className="relative w-full h-[200px]">
        <Image
          src={card.backgroundImage}
          alt="Background"
          fill
          className="object-cover object-center"
        />
      </div>
    )}

    {/* Text at bottom */}
    <div className="p-6 mt-auto">
      {card.yearsText && (
        <p className="text-xl font-medium text-black text-left leading-snug">
          {card.yearsText}
        </p>
      )}
    </div>
  </div>
);

/* ─── Render Maps ──────────────────────────────────────── */

const DESKTOP_RENDERERS: Record<
  WhyChooseCard['variant'],
  React.FC<{ card: WhyChooseCard }>
> = {
  award: DesktopAwardCard,
  installations: DesktopInstallationsCard,
  years: DesktopYearsCard,
};

const MOBILE_RENDERERS: Record<
  WhyChooseCard['variant'],
  React.FC<{ card: WhyChooseCard }>
> = {
  award: MobileAwardCard,
  installations: MobileInstallationsCard,
  years: MobileYearsCard,
};

/* ─── Main Component ───────────────────────────────────── */

const EvWhyChooseUs = ({ data }: EvWhyChooseUsProps) => {
  return (
    <section className="py-10 md:py-24 bg-white overflow-hidden">
      <div className="px-[5%] md:px-[3%]">
        {/* Header */}
        <div className="mb-10 md:mb-15 leading-[1.1] text-center lg:text-left">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-black tracking-tight">
            {data.headerSubtitle}
          </h2>
          <p className="text-[#63B846] font-medium lg:font-light text-[2.25rem] md:text-[3rem] lg:text-[5rem] tracking-tighter">
            {data.headerTitle}
          </p>
        </div>

        {/* Desktop — 3-column grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="hidden lg:grid lg:grid-cols-3 gap-6 auto-rows-fr"
        >
          {data.cards.map((card, index) => {
            const Component = DESKTOP_RENDERERS[card.variant];
            return <Component key={index} card={card} />;
          })}
        </motion.div>

        {/* Mobile — stacked cards */}
        <div className="lg:hidden flex flex-col gap-6">
          {data.cards.map((card, index) => {
            const Component = MOBILE_RENDERERS[card.variant];
            return <Component key={index} card={card} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default EvWhyChooseUs;

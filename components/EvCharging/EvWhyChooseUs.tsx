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

  /** Award card — counter */
  count?: number;
  countSuffix?: string;

  /** Award card — text */
  title?: string;
  description?: string;

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

/* ─── Card Components (unified — breakpoints swap the look) ─── */

const AwardCard = ({ card }: { card: WhyChooseCard }) => (
  <motion.div
    variants={itemVariants}
    className="rounded-[24px] lg:rounded-[20px] p-4 flex flex-col items-start lg:h-full"
    style={{ backgroundColor: card.bgColor }}
  >
    {/* Logo badge — contained pill below lg, full-bleed cover badge with
        overlaid logo at lg+ */}
    {card.logoBg && (
      <div className="relative w-full self-center rounded-[20px] py-4 px-2 mb-6 lg:mb-8 lg:py-0 lg:px-0 lg:aspect-[2/1] lg:rounded-3xl lg:overflow-hidden flex items-center justify-center">
        <Image
          src={card.logoBg}
          alt="Award Background"
          width={800}
          height={400}
          className="w-full h-auto object-contain lg:absolute lg:inset-0 lg:h-full lg:object-cover"
        />
        {card.logo && (
          <Image
            src={card.logo}
            alt="Award Logo"
            fill
            className="hidden lg:block object-contain p-4 z-10"
          />
        )}
      </div>
    )}

    {/* Counter + text */}
    <div className="w-full px-2 lg:px-4 lg:py-4 lg:mt-auto">
      {card.count !== undefined && (
        <h3 className="text-5xl lg:text-[3.125rem] font-bold lg:font-normal text-black mb-1 lg:mb-0 tracking-tight leading-none">
          <AnimatedCounter from={0} to={card.count} />
          <span className="lg:text-[2.125rem]">{card.countSuffix}</span>
        </h3>
      )}
      {card.title && (
        <h4 className="text-xl lg:text-[3.125rem] font-medium text-black text-left leading-tight tracking-tight">
          {card.title}
        </h4>
      )}
      {card.description && (
        <p className="text-base lg:text-2xl text-black leading-[1.2] mt-1 tracking-tight">
          {card.description}
        </p>
      )}
    </div>
  </motion.div>
);

const InstallationsCard = ({ card }: { card: WhyChooseCard }) => (
  <motion.div
    variants={itemVariants}
    className="rounded-[24px] lg:rounded-[20px] relative flex flex-col overflow-hidden min-h-[340px] lg:min-h-[450px] lg:h-full"
    style={{ backgroundColor: card.bgColor }}
  >
    {/* Combined stat text */}
    {card.combinedText && (
      <p className="text-[1.25rem] lg:text-[2.375rem] p-6 pr-12 lg:pr-6 max-w-[85%] lg:max-w-none text-black font-normal leading-[1.2] lg:leading-[1.1] tracking-tight relative z-10">
        {card.combinedText}
      </p>
    )}

    {/* Product image */}
    {card.productImage && (
      <div className="relative w-full flex-1 mt-auto flex items-end justify-center">
        <div className="relative w-full h-[220px] lg:h-full lg:min-h-[200px]">
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

const YearsCard = ({ card }: { card: WhyChooseCard }) => (
  <motion.div
    variants={itemVariants}
    className="rounded-[24px] lg:rounded-[20px] p-6 relative overflow-hidden flex flex-col justify-end min-h-[320px] lg:min-h-[450px] lg:h-full"
    style={{ backgroundColor: card.bgColor }}
  >
    {/* Background image — stacked banner below lg, full-bleed backdrop at lg+
        (the two treatments need different DOM, hence the visibility toggle) */}
    {card.backgroundImage && (
      <>
        <div className="relative w-full h-[200px] md:h-[20dvh] lg:hidden -mx-6 mt-[-24px] mb-6">
          <Image
            src={card.backgroundImage}
            alt="Background"
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 -right-5 top-0 z-0 hidden lg:block">
          <Image
            src={card.backgroundImage}
            alt="Background"
            fill
            className="object-contain object-right-top opacity-90"
          />
        </div>
      </>
    )}

    {/* Text */}
    <div className="relative z-10 w-full">
      {card.yearsText && (
        <p className="text-xl md:text-2xl lg:text-[2.375rem] md:max-w-xl lg:max-w-none font-medium lg:font-normal text-black text-left tracking-tight leading-snug lg:leading-[1.1]">
          {card.yearsText}
        </p>
      )}
    </div>
  </motion.div>
);

/* ─── Render Map ───────────────────────────────────────── */

const CARD_RENDERERS: Record<
  WhyChooseCard['variant'],
  React.FC<{ card: WhyChooseCard }>
> = {
  award: AwardCard,
  installations: InstallationsCard,
  years: YearsCard,
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

        {/* Cards — one grid, one renderer set:
            phones stack · iPad = 2 cols (odd trailing card spans full row)
            · desktop = 3 cols */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr md:[&>*:last-child:nth-child(odd)]:col-span-2"
        >
          {data.cards.map((card, index) => {
            const Component = CARD_RENDERERS[card.variant];
            return <Component key={index} card={card} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default EvWhyChooseUs;

'use client';

import { useEffect, useRef } from 'react';
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

/* ─── Types — data shape updated only (Strapi: title/description/image/counterValue/counterSuffix) ── */

export interface EvWhyChooseUsCard {
  id: string;
  title: string;
  description: string;
  image: string | StaticImageData | null;
  counterValue?: number;
  counterSuffix?: string;
}

export interface EvWhyChooseUsData {
  headerSubtitle: string;
  headerTitle: string;
  cards: EvWhyChooseUsCard[];
}

interface EvWhyChooseUsProps {
  data: EvWhyChooseUsData;
}

/* ─── Card — DESIGN UNCHANGED from old version (AwardCard/InstallationsCard/YearsCard look preserved) ──
   Only the field mapping changed: count→counterValue, countSuffix→counterSuffix, combinedText/yearsText→title/description,
   productImage/backgroundImage/logoBg/logo→image. All classNames, bg, layout, typography kept verbatim. */

const WhyChooseCard = ({ card, index }: { card: EvWhyChooseUsCard; index: number }) => {
  // Preserve the old 3-variant visual treatment via index:
  // 0 = award-style (large counter + tall card), 1 = installations-style (green, combined text),
  // 2+ = years-style (light bg, description-forward)
  const isFirst = index === 0;
  const isSecond = index === 1;

  // bg mirrors old bgColor per variant: award #EEF6EB, installations #A0CF44, years #F0F6EC
  const bgColor = isSecond ? '#A0CF44' : isFirst ? '#EEF6EB' : '#F0F6EC';

  if (isFirst) {
    // AwardCard look — p-4, logo/badge area (if image) + counter + title/description
    return (
      <motion.div
        variants={itemVariants}
        className="rounded-[24px] lg:rounded-[20px] p-4 flex flex-col items-start lg:h-full"
        style={{ backgroundColor: bgColor }}
      >
        {card.image && (
          <div className="relative w-full self-center rounded-[20px] py-4 px-2 mb-6 lg:mb-8 lg:py-0 lg:px-0 lg:aspect-[2/1] lg:rounded-3xl lg:overflow-hidden flex items-center justify-center bg-white/40">
            <Image
              src={card.image}
              alt={card.title}
              width={800}
              height={400}
              className="w-full h-auto object-contain lg:absolute lg:inset-0 lg:h-full lg:object-cover"
            />
          </div>
        )}
        <div className="w-full px-2 lg:px-4 lg:py-4 lg:mt-auto">
          {card.counterValue !== undefined && (
            <h3 className="text-5xl lg:text-[3.125rem] font-bold lg:font-normal text-black mb-1 lg:mb-0 tracking-tight leading-none">
              <AnimatedCounter from={0} to={card.counterValue} />
              <span className="lg:text-[2.125rem]">{card.counterSuffix}</span>
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
  }

  if (isSecond) {
    // InstallationsCard look — large combined text + product image pinned bottom
    return (
      <motion.div
        variants={itemVariants}
        className="rounded-[24px] lg:rounded-[20px] relative flex flex-col overflow-hidden min-h-[340px] lg:min-h-[450px] lg:h-full"
        style={{ backgroundColor: bgColor }}
      >
        {(card.title || card.description) && (
          <p className="text-[1.25rem] lg:text-[2.375rem] p-6 pr-12 lg:pr-6 max-w-[85%] lg:max-w-none text-black font-normal leading-[1.2] lg:leading-[1.1] tracking-tight relative z-10">
            {card.title}
            {card.title && card.description ? ' — ' : ''}
            {card.description}
          </p>
        )}
        {card.counterValue !== undefined && (
          <p className="text-[1.25rem] lg:text-[2.375rem] px-6 text-black font-bold tracking-tight">
            <AnimatedCounter from={0} to={card.counterValue} />
            {card.counterSuffix}
          </p>
        )}
        {card.image && (
          <div className="relative w-full flex-1 mt-auto flex items-end justify-center">
            <div className="relative w-full h-[220px] lg:h-full lg:min-h-[200px]">
              <Image src={card.image} alt={card.title} fill className="object-contain object-bottom" />
            </div>
          </div>
        )}
      </motion.div>
    );
  }

  // YearsCard look — p-6, background image treatment + description-forward text
  return (
    <motion.div
      variants={itemVariants}
      className="rounded-[24px] lg:rounded-[20px] p-6 relative overflow-hidden flex flex-col justify-end min-h-[320px] lg:min-h-[450px] lg:h-full"
      style={{ backgroundColor: bgColor }}
    >
      {card.image && (
        <>
          <div className="relative w-full h-[200px] md:h-[20dvh] lg:hidden -mx-6 mt-[-24px] mb-6">
            <Image src={card.image} alt={card.title} fill className="object-cover object-center" />
          </div>
          <div className="absolute inset-0 -right-5 top-0 z-0 hidden lg:block">
            <Image src={card.image} alt={card.title} fill className="object-contain object-right-top opacity-90" />
          </div>
        </>
      )}
      <div className="relative z-10 w-full">
        {card.counterValue !== undefined && (
          <p className="text-2xl lg:text-[2.375rem] font-bold text-black tracking-tight leading-none mb-2">
            <AnimatedCounter from={0} to={card.counterValue} />
            {card.counterSuffix}
          </p>
        )}
        {card.title && (
          <h4 className="text-xl md:text-2xl lg:text-[2.375rem] md:max-w-xl lg:max-w-none font-medium lg:font-normal text-black text-left tracking-tight leading-snug lg:leading-[1.1]">
            {card.title}
          </h4>
        )}
        {card.description && (
          <p className="text-base lg:text-xl text-black/80 leading-snug mt-2">
            {card.description}
          </p>
        )}
      </div>
    </motion.div>
  );
};

/* ─── Main Component — grid unchanged ───────────────────── */

const EvWhyChooseUs = ({ data }: EvWhyChooseUsProps) => {
  return (
    <section className="py-10 md:py-24 bg-white overflow-hidden">
      <div className="px-[5%] md:px-[3%]">
        {/* Header — unchanged */}
        <div className="mb-10 md:mb-15 leading-[1.1] text-center lg:text-left">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-black tracking-tight">
            {data.headerSubtitle}
          </h2>
          <p className="text-[#63B846] font-medium lg:font-light text-[2.25rem] md:text-[3rem] lg:text-[5rem] tracking-tighter">
            {data.headerTitle}
          </p>
        </div>

        {/* Cards — grid unchanged: 1 col → md:2 → lg:3 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr md:[&>*:last-child:nth-child(odd)]:col-span-2 lg:[&>*:last-child:nth-child(odd)]:col-span-1"
        >
          {data.cards.map((card, index) => (
            <WhyChooseCard key={card.id} card={card} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default EvWhyChooseUs;

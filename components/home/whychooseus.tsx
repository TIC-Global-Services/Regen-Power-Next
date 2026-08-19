"use client";

import React, { useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
  Variants,
} from "framer-motion";

export interface WhyChooseUsRow {
  id: string;
  count: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

export interface WhyChooseUsCard {
  id: string;
  /** Single animated number (omit with stats to render rows instead) */
  count?: number;
  prefix?: string;
  suffix?: string;
  title?: string;
  description?: string;
  /** Inline icon next to the count (e.g. a star) */
  icon?: string | StaticImageData | null;
  /** Full-card background image */
  image?: string | StaticImageData | null;
  /** Overlay logo (contain), shown on top of image */
  logo?: string | StaticImageData | null;
  /** Multi-stat cards (render each row independently) */
  stats?: WhyChooseUsRow[];
}

export interface WhyChooseUsProps {
  subtitle?: string;
  title?: string;
  cards: WhyChooseUsCard[];
  className?: string;
}

/* ─── Animated Counter ─────────────────────────────────────────── */

export const AnimatedCounter = ({ from, to }: { from: number; to: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) =>
    Math.round(latest).toLocaleString()
  );

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration: 2, ease: "easeOut" });
      return controls.stop;
    }
  }, [inView, to, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

/* ─── Animation Variants ───────────────────────────────────────── */

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/* ─── Presentation (hardcoded; CMS supplies only content) ──────── */

// Reproduces the legacy per-card look without CMS-driven style fields.
const cardBackgroundColor = (card: WhyChooseUsCard): string =>
  (card.stats?.length ?? 0) > 0 ? "#A0CF44" : "#EEF6EB";

const cardTextColor = (card: WhyChooseUsCard): string => {
  const isGreen = (card.stats?.length ?? 0) > 0;
  const isImageWithIcon = !!card.image && !!card.icon;
  return isGreen || isImageWithIcon ? "#FFFFFF" : "#000000";
};

/* ─── Single card ────────────────────────────────────────────── */

const StatCard = ({
  card,
  className = "",
  emphasizeTitle = false,
  blurredBgImage = false,
}: {
  card: WhyChooseUsCard;
  className?: string;
  emphasizeTitle?: boolean;
  blurredBgImage?: boolean;
}) => (
  <motion.div
    variants={itemVariants}
    className={`relative rounded-[20px] overflow-hidden flex flex-col p-4 md:p-6 ${className}`}
    style={{
      backgroundColor: cardBackgroundColor(card),
      color: cardTextColor(card),
    }}
  >
    {/* Image + overlay logo (boxed, top) */}
    {card.image && card.logo ? (
      <div className="relative w-full aspect-2/1 rounded-3xl overflow-hidden mb-2 lg:mb-8">
        <Image src={card.image} alt="" fill className="object-cover z-0" />
        <Image src={card.logo} alt="" fill className="object-contain p-4 z-10" />
      </div>
    ) : card.image && blurredBgImage ? (
      /* Blurred bg image — original position: full-card, bottom-right, pushed off the right edge */
      <div className="absolute right-[-30%] bottom-30 w-full h-full opacity-90 z-0">
        <Image
          src={card.image}
          alt="Solar Panels Background"
          fill
          className="object-cover object-right-bottom mix-blend-multiply blur-xs"
        />
      </div>
    ) : card.image ? (
      <Image src={card.image} alt="" fill className="object-cover z-0" />
    ) : null}

    {/* Content */}
    <div className="relative z-20 mt-auto pt-4">
      {card.stats && card.stats.length > 0 ? (
        card.stats.map((row) => (
          <div key={row.id} className="mb-2 last:mb-0">
            <h3 className="text-[3.5rem] lg:text-[5.5rem] leading-none font-black tracking-tighter whitespace-nowrap">
              {row.prefix}
              <AnimatedCounter from={0} to={row.count} />
              {row.suffix}
            </h3>
            <p className="text-xl lg:text-2xl tracking-tight font-normal">
              {row.label}
            </p>
          </div>
        ))
      ) : (
        <>
          {card.icon ? (
            /* Rating card: number + star left, title right (wraps on its \n) */
            <div className="flex flex-col items-start gap-2 md:gap-3">
              <div className="flex  items-center gap-2 md:gap-3">
                {card.count != null && (
                  <span className="text-[3.5rem] lg:text-[5.5rem] font-bold leading-none tracking-tighter whitespace-nowrap text-black">
                    {card.prefix}
                    <AnimatedCounter from={0} to={card.count} />
                    {card.suffix}
                  </span>
                )}
                {/* <Image
                  src={card.icon}
                  alt=""
                  width={30}
                  height={30}
                  className="w-7 h-7 md:w-7 md:h-7"
                /> */}
              </div>
              {card.title && (
                <span className="text-2xl lg:text-4xl text-black leading-[1.2] tracking-tight font-normal whitespace-pre-line">
                  {card.title}
                </span>
              )}
            </div>
          ) : (
            <>
              {(card.count != null || card.title) && (
                <div
                  className={
                    emphasizeTitle
                      ? "flex flex-col"
                      : "flex items-center gap-2 md:gap-3"
                  }
                >
                  {card.count != null && (
                    <span className="text-[3.5rem] lg:text-[5.5rem] font-bold leading-none tracking-tighter whitespace-nowrap">
                      {card.prefix}
                      <AnimatedCounter from={0} to={card.count} />
                      {card.suffix}
                    </span>
                  )}
                  {emphasizeTitle && card.title && (
                    <span className="text-[3.5rem] lg:text-[5.5rem] font-bold leading-none tracking-tighter whitespace-pre-line">
                      {card.title}
                    </span>
                  )}
                </div>
              )}
              {!emphasizeTitle && card.title && (
                <p className="text-2xl lg:text-4xl leading-[1.2] tracking-tight font-normal whitespace-pre-line">
                  {card.title}
                </p>
              )}
            </>
          )}
          {card.description && (
            <p className="text-xl md:text-3xl tracking-tight font-medium leading-[1.2] whitespace-pre-line">
              {card.description}
            </p>
          )}
        </>
      )}
    </div>
  </motion.div>
);

const WhyChooseUs: React.FC<WhyChooseUsProps> = ({
  subtitle,
  title,
  cards,
  className = "",
}) => {
  return (
    <section className={`py-10 md:py-20 bg-white overflow-hidden ${className}`}>
      <div className="px-[8%] md:px-[5%] md:px-[3%]">
        {(subtitle || title) && (
          <div className="flex flex-col justify-center items-center md:justify-start md:items-start mb-5 md:mb-20">
            {subtitle && (
              <span className="text-xl md:text-[2rem] leading-[0.5] font-normal text-center tracking-tight mb-1 block normal-case">
                {subtitle}
              </span>
            )}
            {title && (
              <h1 className="text-4xl md:text-5xl lg:text-[5rem] leading-none text-[#63B846] tracking-tight mt-1">
                {title}
              </h1>
            )}
          </div>
        )}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 lg:auto-rows-fr"
        >
          {/* Award — tall left */}
          {cards[0] && (
            <StatCard card={cards[0]} className="md:h-full md:min-h-[55dvh]" />
          )}

          {/* Installations — tall middle */}
          {cards[1] && (
            <StatCard card={cards[1]} className="md:h-full min-h-[280px]" />
          )}

          {/* Right column — Years (grows) + Rating (fixed) */}
          {cards[2] && cards[3] && (
            <div className="flex flex-col gap-4 lg:gap-6 lg:h-full">
              <StatCard
                card={cards[2]}
                className="flex-grow min-h-[220px] md:min-h-[250px]"
                emphasizeTitle
                blurredBgImage
              />
              <StatCard card={cards[3]} className="h-[140px] md:h-[160px]" />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
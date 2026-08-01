"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Reveal from "@/reuseables/Reveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface VppCardItem {
  title: string;
  subtitle?: string;
  text: string;
}

export interface WhatSigningUpData {
  title?: string;
  subtitle?: string;
  vppCardsLeft?: VppCardItem[];
  vppCardsRight?: VppCardItem[];
}

export interface WhatSigningUpProps {
  data?: WhatSigningUpData;
  title?: string;
  subtitle?: string;
  vppCardsLeft?: VppCardItem[];
  vppCardsRight?: VppCardItem[];
}

const defaultCardsLeft: VppCardItem[] = [
  {
    title: "Synergy",
    subtitle: "(SWIS — Most Of Perth And The South West):",
    text: "Join The Synergy Battery Rewards Program With A Simple 2-Year Agreement And Earn Rewards By Exporting Stored Battery Energy During Activation Events, Typically Held Up To 30 Times A Year Between 3 Pm And 9 Pm On High-Demand Days. Each Event Lasts Only A Few Hours, And You'll Receive $0.70 Per KWh For The Energy You Export. Any Electricity You Draw From The Grid During These Events Is Offset With Energy Credits, Ensuring You're Never Out Of Pocket, With Credits Applied To Your Synergy Bill Each Quarter.",
  },
  {
    title: "Horizon Power",
    subtitle: "(Regional WA Customers):",
    text: "Horizon Power customers sign a 2-year VPP agreement tailored for regional microgrids. Earn premium export rewards up to $380/kWh capacity rebate, helping balance local network demand during peak periods while generating direct quarterly bill credits for your account.",
  },
];

const defaultCardsRight: VppCardItem[] = [
  {
    title: "Alternative VPP Products",
    subtitle: "(Synergy Customers Only):",
    text: "You Can Also Choose An Alternative Virtual Power Plant (VPP) Program Instead Of Synergy Battery Rewards, Provided It Is Offered By Your Battery Supplier, Compatible With Your System, Delivers Value Through Credits Or Payments, And Is Supported By Genuine Grid Market Revenue Streams.",
  },
  {
    title: "Key Program Guarantees",
    subtitle: "(What You Retain & Protect):",
    text: "Participating in a VPP does not sacrifice your home's blackout backup. Your battery always reserves energy for outages, and event dispatches are capped and managed intelligently so you never draw high-peak power unneeded.",
  },
];

const VppCard = ({ card }: { card: VppCardItem }) => (
  <div className="relative overflow-hidden bg-white/10 backdrop-blur-sm border border-neutral-200/80 rounded-2xl lg:rounded-[2rem] p-6 lg:p-8 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.06)] w-[280px] sm:w-[360px] md:w-[460px] lg:w-full lg:max-w-[480px] pointer-events-auto">
    <div className="relative z-10">
      <h3 className="text-xl sm:text-2xl lg:text-3xl font-medium text-neutral-900 leading-tight">
        {card.title}
      </h3>
      {card.subtitle && (
        <h4 className="text-base sm:text-lg lg:text-xl font-medium text-neutral-800 mb-4 leading-tight">
          {card.subtitle}
        </h4>
      )}
      <p className="text-xs sm:text-sm lg:text-base text-neutral-700 leading-[1.2] font-normal">
        {card.text}
      </p>
    </div>
  </div>
);

export default function WhatSigningUp({
  data,
  title: propTitle,
  subtitle: propSubtitle,
  vppCardsLeft: propCardsLeft,
  vppCardsRight: propCardsRight,
}: WhatSigningUpProps) {
  const title =
    data?.title ??
    propTitle ??
    "What Signing Up To A VPP Actually Means";

  const subtitle =
    data?.subtitle ??
    propSubtitle ??
    "VPP Participation Is A Requirement Of The WA Residential Battery Scheme — But It's Also A Revenue Stream. Here's What You're Agreeing To And What You Get In Return.";

  const vppCardsLeft =
    data?.vppCardsLeft ?? propCardsLeft ?? defaultCardsLeft;

  const vppCardsRight =
    data?.vppCardsRight ?? propCardsRight ?? defaultCardsRight;

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const isMobile = window.matchMedia("(max-width: 1024px)").matches;
      const staggerDelay = isMobile ? 0.6 : 0.65;
      const startY = isMobile ? "90vh" : "120vh";
      const endY = isMobile ? "-90vh" : "-120vh";

      const leftCards = gsap.utils.toArray<HTMLElement>(".card-left-vpp");
      const rightCards = gsap.utils.toArray<HTMLElement>(".card-right-vpp");

      // Entry State
      gsap.set(leftCards, { y: startY });
      gsap.set(rightCards, { y: startY });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: isMobile ? "+=3500" : "+=5000",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Left Column Animation
      leftCards.forEach((card, i) => {
        const delay = i * staggerDelay;
        tl.to(
          card,
          {
            y: endY,
            duration: 2,
            ease: "none",
          },
          delay
        );
      });

      // Right Column Animation (Pairs with left)
      rightCards.forEach((card, i) => {
        const delay = i * staggerDelay + (isMobile ? staggerDelay / 2 : 0);
        tl.to(
          card,
          {
            y: endY,
            duration: 2,
            ease: "none",
          },
          delay
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="vpp-meaning" className="bg-white relative">
      <div
        ref={containerRef}
        className="h-screen w-full flex flex-col items-center justify-center overflow-hidden perspective-[900px]"
      >
        {/* Pinned Title Layer */}
        <div className="absolute inset-0 z-0 flex flex-col items-center justify-center pointer-events-none px-4">
          <div className="px-6 py-10 md:px-16 md:py-12 text-center max-w-3xl z-20">
            <Reveal className="mb-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-[#63B846]">
                {title}
              </h2>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-neutral-800 font-medium text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-[1.2]">
                {subtitle}
              </p>
            </Reveal>
          </div>
        </div>

        {/* Cards Layer */}
        <div className="absolute inset-0 z-10 w-full max-w-6xl mx-auto flex justify-between h-full pointer-events-none px-2 md:px-0">
          {/* Left Column Area */}
          <div className="w-full lg:w-1/2 absolute inset-y-0 left-0 h-full">
            {vppCardsLeft.map((card, i) => (
              <div
                key={`vpp-left-${i}`}
                className="card-left-vpp absolute inset-0 flex items-center justify-start lg:justify-end pl-4 sm:pl-8 lg:pl-0 lg:pr-24 lg:-mt-[25vh] pointer-events-none"
              >
                <VppCard card={card} />
              </div>
            ))}
          </div>

          {/* Right Column Area */}
          <div className="w-full lg:w-1/2 absolute inset-y-0 right-0 h-full">
            {vppCardsRight.map((card, i) => (
              <div
                key={`vpp-right-${i}`}
                className="card-right-vpp absolute inset-0 flex items-center justify-end lg:justify-start pr-4 sm:pr-8 lg:pr-0 lg:pl-24 lg:mt-[25vh] pointer-events-none"
              >
                <VppCard card={card} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
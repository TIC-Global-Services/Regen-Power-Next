'use client';

import React from 'react';
import Fade from '@/reuseables/fade';
import Image from 'next/image';

export interface WhyChooseUsCard {
  id: string;
  type:'nested' | 'image' | 'dark' | 'nested-reverse';
  value: string;
  title: string;
  bgImage?: string;
  logoPath?: string;
  iconType?: 'battery' | 'globe' | 'none';
}

export interface WhyChooseUsProps {
  title?: string;
  titleGreen?: string;
  cards?: WhyChooseUsCard[];
}

const WhyChooseUs = ({
  title = "Why",
  titleGreen = "Regen Power",
  cards = [
    {
      id: 'years',
      type: 'nested',
      value: "23",
      title: "Years Established 2003",
      logoPath: "/regen_logo.svg"
    },
    {
      id: 'local',
      type: 'image',
      value: "YES",
      title: "We are Local WA Born\nand Bred Company",
      bgImage: "/fallback.png"
    },
    {
      id: 'installations',
      type: 'dark',
      value: "45K",
      title: "Solar Installations\nNationwide",
      iconType: 'globe'
    },
    {
      id: 'batteries',
      type: 'nested-reverse',
      value: "3k+",
      title: "Number of battery\ninstallations in WA",
      iconType: 'battery'
    }
  ]
}: WhyChooseUsProps) => {

  const renderCard = (card: WhyChooseUsCard) => {
    // Standard function to split text by newline or space to allow custom wrapping
    const renderTitle = (titleText: string) => {
      if (!titleText) return null;
      return titleText.split('\n').map((line, idx) => (
        <span key={idx} className="block">
          {line}
        </span>
      ));
    };

    switch (card.type) {
      case 'nested':
        return (
          <div className="bg-[#EAEAEA] rounded-[12px] p-3 md:p-6 flex flex-col justify-between min-h-[340px] md:min-h-[45dvh] shadow-sm hover:shadow-md transition-all duration-300">
            {/* Top Text Section */}
            <div className="flex items-center gap-4">
              <div className="text-6xl md:text-[4.375rem] font-black text-black leading-none tracking-tight">
                {card.value}
              </div>
              <div className="text-xl md:text-[1.375rem] font-bold text-black leading-tight">
                {renderTitle(card.title)}
              </div>
            </div>
            {/* Bottom Black Box container for Logo */}
            <div className="bg-black rounded-[12px] p-2 flex items-center justify-center h-[25dvh] w-full relative overflow-hidden group">
              <img
                src={card.logoPath || "/regen_logo.svg"}
                alt="Regen Power Logo"
                className="h-10 md:h-12 w-auto object-contain z-10 transition-transform duration-350"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/regen_logo_nav.png';
                }}
              />
            </div>
          </div>
        );

      case 'image':
        return (
          <div className="relative rounded-[12px] overflow-hidden min-h-[340px] md:min-h-[45dvh] shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-start items-center p-3 md:p-6 border border-gray-200">
            {/* Background image with contrast overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src={card.bgImage || "/assets/home/whychooseus/bussiness_operating.png"}
                alt={card.title}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              />
              {/* <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/80 to-white/40 mix-blend-normal" /> */}
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="text-6xl md:text-[4.375rem] font-black text-black leading-none tracking-tight">
                {card.value}
              </div>
              <div className="text-[1.375rem] md:text-[1.375rem] font-bold text-black mt-3 leading-tight max-w-[280px]">
                {renderTitle(card.title)}
              </div>
            </div>
          </div>
        );

      case 'dark':
        return (
          <div className="bg-black rounded-[12px] p-3 md:p-6 flex flex-col justify-between min-h-[340px] md:min-h-[45dvh] shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
            {/* Top Section: Globe Icon aligned to the right */}
            <div className="w-full flex justify-end">
              <div className="relative w-28 h-28 md:w-36 md:h-36 opacity-85 group-hover:opacity-100 transition-opacity duration-300">
                {/* Globe Wireframe SVG */}
                <svg viewBox="0 0 100 100" className="w-full h-full text-zinc-500 group-hover:text-zinc-400 transition-colors duration-300">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  <path d="M10,50 Q50,20 90,50 Q50,80 10,50" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 1" />
                  <path d="M10,50 Q50,35 90,50 Q50,65 10,50" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                  <path d="M50,10 Q20,50 50,90 Q80,50 50,10" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                  <path d="M50,10 Q35,50 50,90 Q65,50 50,10" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 1" />
                  <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="0.5" />
                  <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="0.5" />
                  <circle cx="45" cy="40" r="1.2" fill="currentColor" />
                  <circle cx="48" cy="38" r="0.8" fill="currentColor" />
                  <circle cx="52" cy="42" r="1.5" fill="currentColor" />
                  <circle cx="55" cy="45" r="1.2" fill="currentColor" />
                  <circle cx="58" cy="40" r="0.8" fill="currentColor" />
                  <circle cx="62" cy="44" r="1.2" fill="currentColor" />
                  <circle cx="38" cy="48" r="1.5" fill="currentColor" />
                  <circle cx="34" cy="52" r="1.2" fill="currentColor" />
                  <circle cx="42" cy="55" r="2" fill="currentColor" />
                  <circle cx="46" cy="58" r="0.8" fill="currentColor" />
                  <circle cx="50" cy="62" r="1.5" fill="currentColor" />
                  <circle cx="54" cy="60" r="1.2" fill="currentColor" />
                  <circle cx="60" cy="56" r="0.8" fill="currentColor" />
                  <circle cx="65" cy="52" r="1.5" fill="currentColor" />
                  <circle cx="30" cy="45" r="1.2" fill="currentColor" />
                  <circle cx="35" cy="40" r="0.8" fill="currentColor" />
                  <circle cx="70" cy="48" r="0.8" fill="currentColor" />
                </svg>
              </div>
            </div>

            {/* Bottom Section: Text */}
            <div className="flex flex-col items-start mt-4">
              <div className="text-6xl md:text-[4.375rem] font-black text-white leading-none tracking-tight">
                {card.value}
              </div>
              <div className="text-[1.375rem] font-bold text-white mt-2 leading-tight">
                {renderTitle(card.title)}
              </div>
            </div>
          </div>
        );

      case 'nested-reverse':
        return (
          <div className="bg-[#EAEAEA] rounded-[12px] p-3 md:p-3 flex flex-col justify-between min-h-[340px] md:min-h-[45dvh] shadow-sm hover:shadow-md transition-all duration-300">
            {/* Top Black Box Container for Battery Icon */}
            <div className="bg-black rounded-[12px] p-2 flex items-center justify-center h-[25dvh] w-full relative overflow-hidden group">
              <img
                src={card.logoPath || "/regen_logo.svg"}
                alt="Regen Power Logo"
                className="h-10 md:h-12 w-auto object-contain z-10 transition-transform duration-350"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/regen_logo_nav.png';
                }}
              />
            </div>

            {/* Bottom Text Section */}
            <div className="flex items-center gap-4 mt-4">
              <div className="text-6xl md:text-[4.375rem] font-black text-black leading-none tracking-tight">
                {card.value}
              </div>
              <div className="text-[1.375rem] font-bold text-black leading-none">
                {renderTitle(card.title)}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <section className="bg-white py-16 md:py-24 px-4 md:px-[5%] w-full">
      <Fade>
        <div className="max-w-7xl mx-auto">
          {/* Section Heading */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-black tracking-tight leading-tight">
              {title}{' '}
              <span className="text-[#63B846]">
                {titleGreen}
              </span>
            </h2>
          </div>

          {/* Cards Grid: 2 columns on all devices */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-5xl mx-auto">
            {cards.map((card) => (
              <div key={card.id} className="w-full">
                {renderCard(card)}
              </div>
            ))}
          </div>
        </div>
      </Fade>
    </section>
  );
};

export default WhyChooseUs;

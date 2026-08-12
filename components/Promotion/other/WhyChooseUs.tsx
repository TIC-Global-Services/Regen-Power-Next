'use client';

import React from 'react';
import Fade from '@/reuseables/fade';
import Image from 'next/image';

export interface WhyChooseUsCard {
  id: string;
  type: 'nested' | 'image' | 'dark' | 'battery';
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
      title: "We are Local WA Born and Bred company",
      bgImage: "/assets/home/whychooseus/bussiness_operating.png"
    },
    {
      id: 'installations',
      type: 'dark',
      value: "45K+",
      title: "Solar Installations Nationwide",
      iconType: 'globe'
    },
    {
      id: 'batteries',
      type: 'battery',
      value: "3k+",
      title: "Number of battery installations in WA",
      iconType: 'battery'
    }
  ]
}: WhyChooseUsProps) => {

  const renderCard = (card: WhyChooseUsCard) => {
    switch (card.type) {
      case 'nested':
        return (
          <div className="bg-[#f7f7f7] rounded-[24px] p-6 flex flex-col justify-between border border-gray-100 min-h-[280px] md:min-h-[340px] shadow-sm hover:shadow-md transition-all duration-300">
            <div>
              <div className="text-5xl md:text-6xl font-black text-black leading-none tracking-tight">
                {card.value}
              </div>
              <p className="text-sm md:text-base font-bold text-gray-700 mt-2 max-w-[200px]">
                {card.title}
              </p>
            </div>
            {/* Inner Black Logo Container */}
            <div className="bg-black rounded-[18px] p-6 flex items-center justify-center min-h-[120px] md:min-h-[140px] mt-4 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-zinc-900 to-black pointer-events-none" />
              <img
                src={card.logoPath || "/regen_logo.svg"}
                alt="Regen Power Logo"
                className="h-10 md:h-12 w-auto object-contain z-10 filter brightness-100 group-hover:scale-105 transition-transform duration-350"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/regen_logo_nav.png';
                }}
              />
            </div>
          </div>
        );

      case 'image':
        return (
          <div className="relative rounded-[24px] overflow-hidden min-h-[280px] md:min-h-[340px] shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-end p-6 border border-gray-100">
            {/* Background image with high contrast overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src={card.bgImage || "/assets/home/whychooseus/bussiness_operating.png"}
                alt={card.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              {/* Overlay: semi-transparent white-to-grayish for legible text */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/80 to-white/40 mix-blend-normal" />
            </div>

            <div className="relative z-10">
              <div className="text-5xl md:text-6xl font-black text-black leading-none tracking-tight">
                {card.value}
              </div>
              <p className="text-sm md:text-lg font-bold text-black mt-2 leading-snug">
                {card.title}
              </p>
            </div>
          </div>
        );

      case 'dark':
        return (
          <div className="bg-black rounded-[24px] p-6 flex flex-col justify-between border border-zinc-800 min-h-[280px] md:min-h-[340px] shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
            {/* Tech glowing background effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#63B846]/10 rounded-full blur-[80px] group-hover:bg-[#63B846]/15 transition-all duration-500 pointer-events-none" />
            
            <div className="flex justify-between items-start">
              <div>
                <div className="text-5xl md:text-6xl font-black text-white leading-none tracking-tight">
                  {card.value}
                </div>
                <p className="text-sm md:text-base font-bold text-gray-400 mt-2 max-w-[200px]">
                  {card.title}
                </p>
              </div>
            </div>

            {/* Glowing Globe / Tech Graphics */}
            <div className="w-full flex justify-end mt-4">
              <div className="relative w-20 h-20 md:w-24 md:h-24 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                {/* Custom SVG Globe/Wireframe */}
                <svg viewBox="0 0 100 100" className="w-full h-full text-[#63B846] animate-pulse">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3, 3" />
                  <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <ellipse cx="50" cy="50" rx="40" ry="15" fill="none" stroke="currentColor" strokeWidth="1" />
                  <ellipse cx="50" cy="50" rx="15" ry="40" fill="none" stroke="currentColor" strokeWidth="1" />
                  <path d="M10 50 H90 M50 10 V90" stroke="currentColor" strokeWidth="1" />
                </svg>
              </div>
            </div>
          </div>
        );

      case 'battery':
        return (
          <div className="bg-black rounded-[24px] p-6 flex flex-col justify-between border border-zinc-800 min-h-[280px] md:min-h-[340px] shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
            {/* Tech glowing background effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#63B846]/10 rounded-full blur-[80px] group-hover:bg-[#63B846]/15 transition-all duration-500 pointer-events-none" />

            <div className="flex justify-between items-start">
              <div>
                <div className="text-5xl md:text-6xl font-black text-white leading-none tracking-tight">
                  {card.value}
                </div>
                <p className="text-sm md:text-base font-bold text-gray-400 mt-2 max-w-[200px]">
                  {card.title}
                </p>
              </div>
            </div>

            {/* Glowing Battery Graphic */}
            <div className="w-full flex justify-end mt-4">
              <div className="w-20 h-10 md:w-24 md:h-12 border-3 border-[#63B846] rounded-md p-1 relative flex items-center gap-1 group-hover:scale-105 transition-transform duration-300">
                {/* Battery Cap */}
                <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-1.5 h-4 bg-[#63B846] rounded-r-sm" />
                {/* Battery Inner Glowing Bars */}
                <div className="w-full h-full bg-[#63B846] rounded-sm opacity-90 animate-pulse shadow-[0_0_10px_rgba(99,184,70,0.6)]" />
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

          {/* Cards Grid: 1 col on mobile, 2 cols on tablet and desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
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

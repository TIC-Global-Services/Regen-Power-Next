"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export interface TimelineEvent {
  time: string;
  title: string;
  description: string;
}

export interface BatteryTimelineData {
  topSubtitle: string;
  title: string;
  events: TimelineEvent[];
}

const BatteryTimeline = ({ data }: { data: BatteryTimelineData }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % data.events.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + data.events.length) % data.events.length);
  };

  // Fixed upward motion: old goes up, new comes from down
  const timeVariants = {
    enter: { y: 80, opacity: 0 },
    center: { y: 0, opacity: 1 },
    exit: { y: -80, opacity: 0 },
  };

  const textVariants = {
    enter: { opacity: 0, y: 10 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  const activeEvent = data.events[activeIndex];

  return (
    <section className="bg-white py-16 md:py-24 px-[3%] overflow-hidden">
      <div className="">
        <div className="text-center mb-16">
          <h3 className="text-xl md:text-2xl text-black tracking-tight font-normal">
            {data.topSubtitle}
          </h3>
          <h2 className="text-4xl md:text-5xl lg:text-[4rem] text-[#63B846] font-normal tracking-tight">
            {data.title}
          </h2>
        </div>

        {/* Desktop Timeline Navigation */}
        <div className="relative mb-12 w-full hidden md:block">
          {/* Time labels row */}
          <div className="flex justify-between mb-4">
            {data.events.map((event, idx) => (
              <span
                key={idx}
                className={`text-sm md:text-base px-4 text-center transition-colors ${idx === activeIndex ? 'text-[#63B846] font-medium' : idx < activeIndex ? 'text-[#63B846]/70' : 'text-black/40'}`}
              >
                {event.time}
              </span>
            ))}
          </div>

          {/* Line + dots on the same row */}
          <div className="relative">
            {/* Dashed base line — full */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] border-t-2 border-black/20 border-dashed -translate-y-1/2" />
            {/* Green filled progress line */}
            <div
              className="absolute top-1/2 left-0 h-[3px] bg-[#63B846] -translate-y-1/2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                width: `${data.events.length > 1 ? (activeIndex / (data.events.length - 1)) * 100 : 0}%`
              }}
            />
            {/* Dots — each sits ON the line */}
            <div className="flex justify-between relative">
              {data.events.map((event, idx) => {
                const isActive = idx === activeIndex;
                const isPast = idx < activeIndex;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className="flex items-center justify-center bg-white p-0 group cursor-pointer"
                    aria-label={event.time}
                  >
                    <div className={`w-[10px] h-[10px] rounded-full transition-all duration-300 ${isActive ? 'bg-[#63B846] scale-[1.5]' : isPast ? 'bg-[#63B846]' : 'bg-gray-300 group-hover:bg-gray-400'}`} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Timeline Navigation — full desktop-style strip, scrolls horizontally */}
        <div className="relative mb-4 w-full md:hidden">
          <div className="overflow-hidden">
            <motion.div
              animate={{ x: `calc(-${(activeIndex / Math.max(data.events.length - 1, 1)) * 60}% + 0px)` }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="py-8 pl-8"
              style={{ width: 'calc(160% + 2rem)' }}
            >
              {/* Time labels row */}
              <div className="flex justify-between mb-3">
                {data.events.map((event, idx) => (
                  <span
                    key={idx}
                    className={`text-sm px-2 text-center ${idx === activeIndex ? 'text-[#63B846] font-medium' : idx < activeIndex ? 'text-[#63B846]/70' : 'text-black/40'}`}
                  >
                    {event.time}
                  </span>
                ))}
              </div>

              {/* Line + dots on the same row */}
              <div className="relative">
                {/* Dashed base line — full */}
                <div className="absolute top-1/2 left-0 w-full h-[1px] border-t-2 border-black/20 border-dashed -translate-y-1/2" />
                {/* Green filled progress line */}
                <div
                  className="absolute top-1/2 left-0 h-[3px] bg-[#63B846] -translate-y-1/2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    width: `${data.events.length > 1 ? (activeIndex / (data.events.length - 1)) * 100 : 0}%`
                  }}
                />
                {/* Dots — each sits ON the line */}
                <div className="flex justify-between relative">
                  {data.events.map((event, idx) => {
                    const isActive = idx === activeIndex;
                    const isPast = idx < activeIndex;
                    return (
                      <button
                        key={idx}
                        onClick={() => setActiveIndex(idx)}
                        className="flex items-center justify-center bg-white p-0 group cursor-pointer"
                        aria-label={event.time}
                      >
                        <div className={`w-[10px] h-[10px] rounded-full transition-all duration-300 ${isActive ? 'bg-[#63B846] scale-[1.5]' : isPast ? 'bg-[#63B846]' : 'bg-gray-300 group-hover:bg-gray-400'}`} />
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex flex-col md:grid md:grid-cols-12 items-center md:items-end w-full relative min-h-[300px]">
          {/* Mobile first (after dots), desktop: left column */}
          <div className="flex items-center gap-3 mb-16 w-full justify-end md:justify-start md:col-span-5 md:row-start-1 order-1">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-black flex items-center justify-center hover:bg-black/80 transition-colors cursor-pointer"
              aria-label="Previous event"
            >
              <ArrowLeft className="w-4 h-4 text-[#63B846]" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-black flex items-center justify-center hover:bg-black/80 transition-colors cursor-pointer"
              aria-label="Next event"
            >
              <ArrowRight className="w-4 h-4 text-[#63B846]" />
            </button>
          </div>

          {/* Right Big Time Text with Dot Pattern and Reflection (mobile after arrows) */}
          <div className="flex-1 w-full md:col-span-3 md:col-start-9 md:row-start-2 flex justify-center items-center relative order-2 mt-10 md:translate-x-10">
            {/* Green dotted background — centered behind the text */}
            <div
              className="absolute opacity-[0.15] pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(#63B846 2px, transparent 2px)',
                backgroundSize: '16px 16px',
                width: '450px',
                height: '250px',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 0
              }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                variants={timeVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10"
              >
                <div className="flex flex-col gap-3 items-center md:translate-y-6">
                  <div className="text-[5rem] md:text-[4.5rem] lg:text-[5rem] font-normal text-[#63B846] leading-none whitespace-nowrap tracking-tighter">
                    {activeEvent.time}
                  </div>
                  {/* Reflection */}
                  <div
                    className="text-[5rem] md:text-[4.5rem] lg:text-[5rem] font-normal text-[#63B846] leading-none whitespace-nowrap tracking-tighter select-none"
                    style={{
                      transform: 'scaleY(-1) translateY(20%)',
                      WebkitMaskImage: 'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.5) 100%)',
                      maskImage: 'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.5) 100%)',
                      opacity: 0.25
                    }}
                  >
                    {activeEvent.time}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Title & Description (mobile last, desktop left column) */}
          <div className="relative w-full md:col-span-5 md:row-start-2 order-3 z-10 mt-16 md:mt-0 px-2">
            <div className="relative w-full h-[200px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex flex-col capitalize"
                >
                  <h4 className="text-3xl md:text-[2.5rem] font-normal text-black mb-6 leading-[1] tracking-tight text-center md:text-left">
                    {activeEvent.title}
                  </h4>
                  <p className="text-sm md:text-2xl text-black leading-[1] tracking-tight font-normal text-center md:text-left pl-0 md:pl-8">
                    {activeEvent.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BatteryTimeline;

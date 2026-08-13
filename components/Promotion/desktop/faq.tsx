'use client';

import React, { useState } from 'react';
import Fade from '@/reuseables/fade';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

export interface FaqHighlight {
  question: string;
  answer: string;
  bulletPoints?: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqProps {
  title: string;
  subtitle: string;
  description: string;
  highlightCard: {
    title: string;
    items: FaqHighlight[];
    ctaText?: string;
  };
  faqItems: FaqItem[];
}

const FAQItem = ({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void }) => {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left py-5 cursor-pointer focus:outline-none"
      >
        <span className="text-sm md:text-[1.375rem] font-normal text-black leading-tight pr-4">
          {question}
        </span>
        <span className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[#63B846]">
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="text-xs md:text-base font-normal leading-[1.2] pb-5 whitespace-pre-line">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = ({ data }: { data: FaqProps }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(1);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-16 md:py-20 px-[5%]">
      <Fade duration={5}>
        <div className="">
          {/* Header */}
          <div className="text-center  mb-16">
            <span className="text-lg md:text-[2.125rem] font-bold text-black tracking-tight leading-none block">
              {data.subtitle}
            </span>
            <h2 className="text-3xl md:text-[4.375rem] font-bold text-[#63B846] tracking-tight leading-none mb-6">
              {data.title}
            </h2>
            <p className="text-[#4D4D4D] text-sm md:text-2xl leading-[1.2] tracking-tight max-w-4xl mx-auto">
              {data.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
            {/* Left Highlights Box */}
            <div className="lg:col-span-6 bg-[#EEF6EB] rounded-[16px] p-6 md:p-12 text-black flex flex-col justify-between ">
              <div className="space-y-5 ">
                {data.highlightCard.items.map((item, idx) => (
                  <div key={idx} className="space-y-2 border-b border-black/10 pb-5 last:border-b-0 last:pb-0">
                    <h4 className="font-bold text-sm md:text-[1.625rem] tracking-tight leading-[1.2] text-[#63B846]">
                      {item.question}
                    </h4>
                    {item.bulletPoints ? (
                      <ul className="list-disc pl-4 space-y-1 mt-1 text-xs md:text-xl leading-[1.2] font-normal text-black/80">
                        {item.bulletPoints.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-xs md:text-xl leading-[1.2] font-normal text-black/80">
                        {item.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <h3 className="text-base md:text-[1.625rem] font-bold tracking-tight text-[#63B846]">
                {data.highlightCard.title}
              </h3>
            </div>
              
            {/* Right FAQ List */}
            <div className="lg:col-span-6 border-l border-[#939393] lg:ml-5 pl-5 py-2 flex flex-col justify-center">
              {data.faqItems.map((item, idx) => (
                <FAQItem
                  key={idx}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openIndex === idx}
                  onClick={() => toggleFAQ(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      </Fade>
    </section>
  );
};

export default FAQ;


'use client';

import React from 'react';
import Fade from '@/reuseables/fade';
import Reveal from '@/reuseables/Reveal';

export interface AwardItem {
  id: string;
  image: string;
  title: string;
  description?: string;
}

export interface AwardsProps {
  awards?: AwardItem[];
}

const Awards = ({
  awards = [
    {
      id: 'productreview',
      image: '/awards/award-winner.png',
      title: '6 X ProductReview Award Winner 2021, 22, 23, 24, 25, 26',
    },
    {
      id: 'bestrated',
      image: '/awards/best-rated.png',
      title: 'The Best Rated Installer in WA 2026',
    }
  ]
}: AwardsProps) => {
  return (
    <section className="bg-white py-12 md:py-16 px-4 md:px-[3%] w-full">
      <Fade>
        <div className="max-w-6xl mx-auto">
          {/* Flex row on tablet and desktop, vertical flex on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-3 max-w-4xl mx-auto ">
            {awards.map((award,i) => (
              <Reveal delay={i*0.5} key={i}>
                <div 
                key={award.id} 
                className="flex flex-col h-full items-center text-center group"
              >
                {/* Badge Image Area with glassmorphic backing */}
                <div className="relative h-full w-full flex items-center justify-center bg-[#F2F2F2] rounded-[12px] p-6 sm:p-10 mb-6 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={award.image}
                    alt={award.title}
                    className="max-w-full max-h-full object-contain filter drop-shadow-sm"
                    onError={(e) => {
                      // fallback to standard placeholder if image is missing
                      (e.target as HTMLImageElement).src = '/fallback.png';
                    }}
                  />
                </div>

                {/* Badge Details */}
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug tracking-tight whitespace-pre-line">
                  {award.title}
                </h3>
                
                {award.description && (
                  <p className="text-xs md:text-sm text-gray-500 max-w-sm leading-relaxed">
                    {award.description}
                  </p>
                )}
              </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Fade>
    </section>
  );
};

export default Awards;

'use client';

import React from 'react';
import Fade from '@/reuseables/fade';

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
      image: '/assets/home/realstories/top_panel_installers.png',
      title: '6 X ProductReview Award Winner 2021, 22, 23, 24, 25, 26',
      description: 'Awarded for consistent excellence and outstanding customer satisfaction in residential solar and battery installations.'
    },
    {
      id: 'bestrated',
      image: '/assets/home/realstories/best_rated_batch.png',
      title: 'The Best Rated Installer in WA 2026',
      description: 'Recognized as Perth and Western Australia\'s premier solar systems provider with 4.9+ star community ratings.'
    }
  ]
}: AwardsProps) => {
  return (
    <section className="bg-white py-12 md:py-16 px-4 md:px-[5%] w-full">
      <Fade>
        <div className="max-w-6xl mx-auto">
          {/* Flex row on tablet and desktop, vertical flex on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
            {awards.map((award) => (
              <div 
                key={award.id} 
                className="flex flex-col items-center text-center p-6 md:p-8 bg-[#fdfdfd] border border-gray-100 rounded-[24px] shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                {/* Badge Image Area with glassmorphic backing */}
                <div className="relative w-36 h-36 md:w-44 md:h-44 flex items-center justify-center bg-[#F2F2F2] rounded-[20px] p-4 mb-6 group-hover:scale-105 transition-transform duration-300">
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
                <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-snug tracking-tight max-w-[280px] mb-2">
                  {award.title}
                </h3>
                
                {award.description && (
                  <p className="text-xs md:text-sm text-gray-500 max-w-sm leading-relaxed">
                    {award.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </Fade>
    </section>
  );
};

export default Awards;

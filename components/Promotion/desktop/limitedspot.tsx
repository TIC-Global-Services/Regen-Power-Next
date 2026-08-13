import React from 'react';
import Fade from '@/reuseables/fade';

export interface NestedCard {
  type: 'logo' | 'empty';
  logoPath?: string;
  showBadge?: boolean;
}

export interface LimitedSpotCard {
  type: 'text' | 'image' | 'black' | 'nested';
  value?: string;
  title?: string;
  bgImage?: string;
  nestedCard?: NestedCard;
}

export interface LimitedSpotProps {
  title: string;
  cards: LimitedSpotCard[];
}


const CardItem = ({ card }: { card: LimitedSpotCard }) => {
  if (card.type === 'nested') {
    return (
      <div className="relative rounded-[24px] p-6 md:p-4 flex flex-col justify-between overflow-hidden bg-[#F2F2F2] border border-gray-100 shadow-sm transition-transform duration-300 hover:scale-[1.01] min-h-[300px] md:min-h-[460px] h-full">
        {/* Top Text Part */}
        <div className="flex items-end gap-4 text-black mb-6 mt-2">
          {card.value && (
            <span className="text-5xl md:text-[6.25rem] font-bold tracking-tighter shrink-0 leading-none">
              {card.value}
            </span>
          )}
          {card.title && (
            <h4 className="text-base md:text-[1.875rem] font-bold leading-[1.1] tracking-tight text-left max-w-[250px]">
              {card.title}
            </h4>
          )}
        </div>

        {/* Bottom Nested Card (Black Box) */}
        {card.nestedCard && (
          <div className="relative bg-black rounded-[18px] p-3 h-[30dvh] w-full flex items-center justify-center overflow-hidden">
            {card.nestedCard.type === 'logo' && (
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={card.nestedCard.logoPath || "/regen_logo.svg"}
                  alt="Regen Power Logo"
                  className="h-60 w-80 object-contain"
                />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  if (card.type === 'image') {
    return (
      <div className="relative rounded-[24px] overflow-hidden transition-transform duration-300 hover:scale-[1.01] shadow-sm border border-gray-100/50 min-h-[300px] md:min-h-[460px] h-full flex flex-col justify-start items-center p-6 md:p-8 text-center bg-white">
        <img
          src={card.bgImage || '/wa_born_fallback.svg'}
          alt={card.title || 'Background'}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        
        {/* Card Content centered */}
        <div className="relative z-20 flex flex-col items-center justify-center">
          {card.value && (
            <span className="text-5xl md:text-[6.25rem] font-bold tracking-tighter shrink-0 leading-none text-black mb-4">
              {card.value}
            </span>
          )}
          {card.title && (
            <h4 className="text-xl md:text-[1.875rem] font-bold leading-[1.2] tracking-tight text-black max-w-md">
              {card.title.split('\n').map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </h4>
          )}
        </div>
      </div>
    );
  }

  if (card.type === 'black') {
    return (
      <div className="relative rounded-[24px] p-6 md:p-8 pb-10 flex flex-col justify-end items-start overflow-hidden transition-transform duration-300 hover:scale-[1.01] shadow-sm border border-gray-900 bg-black min-h-[300px] md:min-h-[460px] h-full">
        {/* Card Content bottom-aligned */}
        <div className="relative z-20 flex flex-col items-start text-left">
          {card.value && (
            <span className="text-5xl md:text-[6.25rem] font-bold tracking-tighter shrink-0 leading-none text-white mb-2">
              {card.value}
            </span>
          )}
          {card.title && (
            <h4 className="text-xl md:text-[1.875rem] font-bold leading-[1.2] tracking-tight text-white">
              {card.title.split('\n').map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </h4>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative rounded-[24px] p-6 md:p-8 flex flex-col justify-between overflow-hidden bg-[#F2F2F2] min-h-[300px] md:min-h-[460px] h-full">
      {card.title && <h4>{card.title}</h4>}
    </div>
  );
};

const LimitedSpot = ({ data }: { data: LimitedSpotProps }) => {
  return (
    <section className="bg-white py-16 md:py-24 px-[5%]">
      <Fade>
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-black tracking-tight leading-tight">
              {data?.title}
            </h2>
          </div>

          {/* Grid Layout (2 columns, 4 cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data?.cards?.map((card, idx) => (
              <CardItem key={idx} card={card} />
            ))}
          </div>
        </div>
      </Fade>
    </section>
  );
};

export default LimitedSpot;

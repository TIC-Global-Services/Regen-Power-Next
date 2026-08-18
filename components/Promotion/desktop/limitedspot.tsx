import React from 'react';
import Fade from '@/reuseables/fade';
import Reveal from '@/reuseables/Reveal';

export interface NestedCard {
  type: 'logo' | 'empty' | 'image';
  logoPath?: string;
  imagePath?: string;
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
      <div className="relative rounded-[12px] p-6 md:p-4 flex flex-col justify-between overflow-hidden bg-[#F2F2F2] border border-gray-100 shadow-sm transition-transform duration-300 hover:scale-[1.01] min-h-[300px] md:min-h-[460px] h-full">
        {/* Top Text Part */}
        <div className="flex items-end gap-4 text-black mb-6 mt-2">
          {card.value && (
            <span className="text-5xl md:text-[6.25rem] font-bold tracking-tighter shrink-0 leading-none">
              {card.value}
            </span>
          )}
          {card.title && (
            <h4 className="text-base md:text-[1.875rem] font-bold leading-[1.1] tracking-tight text-left max-w-[250px] whitespace-pre-line">
              {card.title}
            </h4>
          )}
        </div>

        {/* Bottom Nested Card (Black Box) */}
        {card.nestedCard && (
          <div className="relative bg-black rounded-[12px] p-3 lg:h-full w-full flex items-end justify-center overflow-hidden">
            {card.nestedCard.type === 'logo' && (
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={card.nestedCard.logoPath || "/regen_logo.svg"}
                  alt="Regen Power Logo"
                  className="h-60 w-80 object-contain"
                />
              </div>
            )}

            {card.nestedCard.type === 'image' && card.nestedCard.imagePath && (
              <img
                src={card.nestedCard.imagePath}
                alt={card.title || 'Battery installation'}
                className="h-full w-full object-contain absolute top-10"
              />
            )}
          </div>
        )}
      </div>
    );
  }

  if (card.type === 'image') {
    return (
      <div className="relative rounded-[12px] overflow-hidden transition-transform duration-300 hover:scale-[1.01] shadow-sm border border-gray-100/50 min-h-[300px] md:min-h-[460px] h-full flex flex-col justify-start items-center p-6 md:p-8 text-center bg-white">
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
      <div className="relative  rounded-[12px] p-6 md:p-8 pb-10 flex flex-col justify-end items-start overflow-hidden transition-transform duration-300 hover:scale-[1.01] shadow-sm border border-gray-900 bg-black min-h-[300px] md:min-h-[460px] h-full">
        {card.bgImage && (
          <img
            src={card.bgImage}
            alt={card.title || 'Home installation'}
            className="absolute -top-20 left-25 inset-0 w-full h-full object-contain"
          />
        )}
        <div className="absolute inset-0 bg-black/40" />

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
    <div className="relative rounded-[12px] p-6 md:p-8 flex flex-col justify-between overflow-hidden bg-[#F2F2F2] min-h-[300px] md:min-h-[460px] h-full">
      {card.title && <h4>{card.title}</h4>}
    </div>
  );
};

const LimitedSpot = ({ data }: { data: LimitedSpotProps }) => {
  return (
    <section className="bg-white py-16 md:py-20 px-[3%]">
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
              <Reveal key={idx} delay={0.1 * idx}>
                <CardItem card={card} />
              </Reveal>
            ))}
          </div>
        </div>
      </Fade>
    </section>
  );
};

export default LimitedSpot;

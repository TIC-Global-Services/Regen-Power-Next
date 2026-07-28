import React from 'react';

export interface SolutionCard {
  brand: string;
  title: string;
  description: string;
  specs: string[];
  isHighlighted?: boolean;
}

export interface ApartmentSolutionsData {
  title: string;
  subtitle?: string;
  cards: SolutionCard[];
}

export interface ApartmentSolutionsProps {
  data: ApartmentSolutionsData;
}

const ApartmentSolutions: React.FC<ApartmentSolutionsProps> = ({ data }) => {
  if (!data) return null;

  return (
    <section className="w-full bg-white px-[5%] py-16 md:py-24 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-light text-[#63B846] leading-tight tracking-tight mb-4">
            {data.title}
          </h2>
          {data.subtitle && (
            <p className="text-sm md:text-base text-black/70 font-medium max-w-2xl mx-auto">
              {data.subtitle}
            </p>
          )}
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {data.cards.map((card, idx) => {
            const isHigh = card.isHighlighted;
            return (
              <div
                key={idx}
                className={`rounded-[30px] p-8 md:p-10 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 ${
                  isHigh 
                    ? 'bg-[#2E3330] text-white shadow-lg' 
                    : 'bg-[#F2F7EC] text-black shadow-sm'
                }`}
              >
                <div>
                  <span className={`text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full ${
                    isHigh ? 'bg-[#63B846]/20 text-[#63B846]' : 'bg-[#63B846]/10 text-[#63B846]'
                  }`}>
                    {card.brand}
                  </span>
                  
                  <h3 className="text-xl md:text-2xl font-bold mt-4 mb-3 leading-tight">
                    {card.title}
                  </h3>
                  
                  <p className={`text-xs md:text-sm font-normal mb-8 leading-relaxed ${
                    isHigh ? 'text-white/80' : 'text-black/70'
                  }`}>
                    {card.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-[#63B846]">
                    Key Match Details:
                  </h4>
                  <ul className="space-y-3">
                    {card.specs.map((spec, specIdx) => (
                      <li key={specIdx} className="flex items-start text-xs md:text-sm">
                        <span className="text-[#63B846] mr-2 font-bold">•</span>
                        <span className={isHigh ? 'text-white/90' : 'text-black/85'}>
                          {spec}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ApartmentSolutions;

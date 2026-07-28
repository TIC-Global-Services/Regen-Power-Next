import React from 'react';

export interface BrandSpec {
  label: string;
  value: string;
}

export interface BrandCardItem {
  name: string;
  tagline: string;
  specs: BrandSpec[];
}

export interface SevenBrandCardsData {
  title: string;
  brands: BrandCardItem[];
}

export interface SevenBrandCardsProps {
  data: SevenBrandCardsData;
}

const SevenBrandCards: React.FC<SevenBrandCardsProps> = ({ data }) => {
  if (!data) return null;

  return (
    <section className="w-full bg-white px-[5%] py-16 md:py-24 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-[3.125rem] font-light text-[#63B846] leading-tight tracking-tight">
            {data.title}
          </h2>
        </div>

        {/* Dark Bento Box Container */}
        <div className="bg-[#2E3330] rounded-[40px] p-8 md:p-12 lg:p-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            
            {data.brands.map((brand, index) => (
              <div 
                key={index} 
                className="bg-[#3D4440] rounded-[24px] p-6 md:p-8 flex flex-col justify-between border border-[#4B534E] hover:border-[#63B846] transition-colors duration-300"
              >
                <div>
                  {/* Brand Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-[#63B846] mb-1">
                    {brand.name}
                  </h3>
                  
                  {/* Tagline */}
                  <p className="text-xs md:text-sm text-white/60 font-medium mb-6 italic">
                    {brand.tagline}
                  </p>

                  {/* Specs List */}
                  <div className="space-y-3">
                    {brand.specs.map((spec, specIdx) => (
                      <div key={specIdx} className="flex flex-col border-b border-[#4B534E]/60 pb-2 last:border-b-0 last:pb-0">
                        <span className="text-xs text-white/40 uppercase tracking-wider font-semibold">
                          {spec.label}
                        </span>
                        <span className="text-sm md:text-base text-white/95 font-medium mt-0.5">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
};

export default SevenBrandCards;

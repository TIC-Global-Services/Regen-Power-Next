import React from 'react';

export interface WhatChangesCard {
  title: string;
  description: string;
  bullets?: string[];
}

export interface WhatChangesData {
  title: string;
  subtitle: string;
  card1: WhatChangesCard;
  card2: WhatChangesCard;
  card3: WhatChangesCard;
  card4: WhatChangesCard;
}

export interface WhatChangesProps {
  data: WhatChangesData;
}

const WhatChanges: React.FC<WhatChangesProps> = ({ data }) => {
  if (!data) return null;

  const { title, subtitle, card1, card2, card3, card4 } = data;

  return (
    <section className="w-full bg-white px-[5%] py-12 md:py-20 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16 max-w-4xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl lg:text-[3.125rem] font-light text-[#63B846] leading-tight tracking-tight mb-4">
            {title}
          </h2>
          <p className="text-sm md:text-base text-black font-medium leading-[1.2] max-w-3xl">
            {subtitle}
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* Column 1 - Card 1 */}
          <div className="bg-[#EEF6EB] rounded-3xl p-8 md:p-10 flex flex-col justify-start">
            <h3 className="text-xl md:text-2xl font-normal text-black mb-6 leading-tight">
              {card1.title}
            </h3>
            <p className="text-sm md:text-base text-black font-medium leading-relaxed">
              {card1.description}
            </p>
          </div>

          {/* Column 2 - Card 2 */}
          <div className="bg-[#EEF6EB] rounded-3xl p-8 md:p-10 flex flex-col justify-start">
            <h3 className="text-xl md:text-2xl font-normal text-black mb-6 leading-tight">
              {card2.title}
            </h3>
            <p className="text-sm md:text-base text-black font-medium leading-relaxed mb-4">
              {card2.description}
            </p>
            {card2.bullets && card2.bullets.length > 0 && (
              <ul className="flex flex-col gap-3">
                {card2.bullets.map((bullet, index) => (
                  <li key={index} className="flex items-start text-sm md:text-base text-black font-medium leading-snug">
                    <span className="mr-2 mt-1 flex-shrink-0 text-black font-bold">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Column 3 - Card 3 & 4 */}
          <div className="flex flex-col gap-6 justify-between h-full">
            {/* Card 3 */}
            <div className="bg-[#EEF6EB] rounded-3xl p-8 md:p-10 flex flex-col justify-center flex-1">
              <h3 className="text-xl md:text-2xl font-normal text-black mb-4 leading-tight">
                {card3.title}
              </h3>
              <p className="text-sm md:text-base text-black font-medium leading-relaxed">
                {card3.description}
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-[#EEF6EB] rounded-3xl p-8 md:p-10 flex flex-col justify-center flex-1">
              <h3 className="text-xl md:text-2xl font-normal text-black mb-4 leading-tight">
                {card4.title}
              </h3>
              <p className="text-sm md:text-base text-black font-medium leading-relaxed">
                {card4.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatChanges;

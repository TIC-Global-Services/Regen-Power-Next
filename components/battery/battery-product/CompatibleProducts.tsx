import React from 'react';
import { Minus } from 'lucide-react';

export interface CompareFitData {
  topSubtitle: string;
  title: string;
  description?: string;
  leftTitle: string;
  leftItems: React.ReactNode[];
  rightTitle: string;
  rightItems: React.ReactNode[];
}

interface CompatibleProductsProps {
  data: CompareFitData;
}

const CompatibleProducts = ({ data }: CompatibleProductsProps) => {
  return (
    <section className="bg-white py-16 md:py-24 px-[5%]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h3 className="text-xl md:text-[2.125rem] text-black font-normal tracking-tight">
            {data.topSubtitle}
          </h3>
          <h2 className="text-4xl md:text-[5rem] text-[#63B846] font-normal leading-[1] tracking-tight mt-2">
            {data.title}
          </h2>
          {data.description && (
             <p className='text-sm leading-[1.2] md:text-lg tracking-tight mt-4'>{data.description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Left Column */}
          <div className="bg-[#63B846] rounded-[20px] p-8 md:p-12">
            <h4 className="text-xl md:text-2xl font-medium mb-10 text-center text-black">
              {data.leftTitle}
            </h4>
            <ul className="space-y-8">
              {data.leftItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <span className="mt-1 shrink-0">
                    <Minus className="w-5 h-5 text-black" strokeWidth={1.5} />
                  </span>
                  <span className="text-sm md:text-base leading-relaxed text-black/90 font-medium">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column */}
          <div className="bg-[#EEF6EB] rounded-[20px] p-8 md:p-12">
            <h4 className="text-xl md:text-2xl font-medium mb-10 text-center text-black">
              {data.rightTitle}
            </h4>
            <ul className="space-y-8">
              {data.rightItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <span className="mt-1 shrink-0">
                    <Minus className="w-5 h-5 text-black" strokeWidth={1.5} />
                  </span>
                  <span className="text-sm md:text-base leading-relaxed text-black/90 font-medium">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompatibleProducts;

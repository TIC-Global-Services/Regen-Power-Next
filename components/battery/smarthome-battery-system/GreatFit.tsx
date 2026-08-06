import React from 'react';
import { Check, X } from 'lucide-react';

export interface GreatFitData {
  topSubtitle: string;
  title: string;
  description?: string;
  goodFitTitle: string;
  goodFitItems: string[];
  conversationTitle: string;
  conversationItems: string[];
}

interface GreatFitProps {
  data: GreatFitData;
}

const GreatFit = ({ data }: GreatFitProps) => {
  return (
    <section className="bg-white py-16 md:py-24 px-[5%]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h3 className="text-2xl md:text-[2.125rem] leading-none text-black font-norml">
            {data.topSubtitle}
          </h3>
          <h2 className="text-4xl md:text-[5rem] leading-none text-[#63B846] font-normal tracking-tight">
            {data.title}
          </h2>
          {data.description && (
            <p className='text-sm leading-[1.2] md:text-lg tracking-tight mt-1'>{data.description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Left Column (Good Fit) */}
          <div className="bg-[#63B846] rounded-[20px] p-8 md:p-12">
            <h4 className="text-2xl font-medium mb-10 text-center text-black">
              {data.goodFitTitle}
            </h4>
            <ul className="space-y-8">
              {data.goodFitItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <span className="mt-1 shrink-0">
                    <Check className="w-5 h-5 text-black" strokeWidth={1.5} />
                  </span>
                  <span className="text-base leading-[1.2] text-black">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column (Worth a Conversation) */}
          <div className="bg-[#EEF6EB] rounded-[20px] p-8 md:p-12">
            <h4 className="text-2xl font-medium mb-10 text-center text-black">
              {data.conversationTitle}
            </h4>
            <ul className="space-y-8">
              {data.conversationItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <span className="mt-1 shrink-0">
                    <X className="w-5 h-5 text-black" strokeWidth={1.5} />
                  </span>
                  <span className="text-base leading-[1.2] text-black">
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

export default GreatFit;
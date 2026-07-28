import React from 'react';
import Image, { StaticImageData } from 'next/image';

export interface FederalRebateData {
  sectionSubtitle: string;
  sectionTitle: string;
  sectionDescription: string;
  keySpecsTitle: string;
  keySpecsBulletPoints: string[];
  firstImage: StaticImageData | string;
  eligibleCapacityTitle: string;
  eligibleCapacityText: string;
  importantNoteTitle: string;
  importantNoteText: string;
  secondImage: StaticImageData | string;
  combinedSchemeText: string;
  eligibilityTitle: string;
  eligibilityBulletPoints: string[];
}

export interface FederalRebatesProps {
  data?: FederalRebateData[];
}

const FederalRebates: React.FC<FederalRebatesProps> = ({ data = [] }) => {
  if (!data || data.length === 0) return null;

  return (
    <>
      {data.map((item, index) => (
        <section key={index} className="w-full bg-white px-[5%] py-12 md:py-20">
          {/* Header Section */}
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center mb-12 md:mb-10">
            <h3 className="text-lg md:text-xl font-medium text-black tracking-tight">
              {item.sectionSubtitle}
            </h3>
            <h2 className="text-3xl md:text-4xl lg:text-[3.125rem] font-light text-[#63B846] leading-tight tracking-tight mb-2">
              {item.sectionTitle}
            </h2>
            <p className="text-sm md:text-base text-black font-medium leading-[1.2] max-w-3xl">
              {item.sectionDescription}
            </p>
          </div>

          {/* Grid Layout Container */}
          <div className="flex flex-col gap-6">
            
            {/* Top Row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
              
              {/* Key Specs Card (Span 5) */}
              <div className="md:col-span-5 bg-[#EEF6EB] rounded-3xl p-8 flex flex-col justify-center">
                <h4 className="text-xl md:text-2xl font-normal text-black mb-6">
                  {item.keySpecsTitle}
                </h4>
                <ul className="flex flex-col">
                  {item.keySpecsBulletPoints.map((spec, i) => (
                    <li key={i} className="flex items-start text-sm md:text-base text-black font-medium leading-snug">
                      <span className="mr-2 mt-0.5">•</span>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Top Image (Span 3) */}
              <div className="md:col-span-3 relative rounded-3xl overflow-hidden">
                <Image
                  src={item.firstImage}
                  alt={item.eligibleCapacityTitle}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Eligible Capacity Card (Span 4) */}
              <div className="md:col-span-4 bg-[#EEF6EB] rounded-3xl p-10 flex flex-col justify-center">
                <h4 className="text-lg md:text-xl font-normal text-black mb-3">
                  {item.eligibleCapacityTitle}
                </h4>
                <p className="text-sm md:text-base text-black font-medium mb-6 leading-snug">
                  {item.eligibleCapacityText}
                </p>
                
                <h4 className="text-lg md:text-xl font-normal text-black mb-3">
                  {item.importantNoteTitle}
                </h4>
                <p className="text-sm md:text-base text-black font-medium leading-snug">
                  {item.importantNoteText}
                </p>
              </div>

            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
              
              {/* Bottom Image (Span 3) */}
              <div className="md:col-span-3 relative rounded-3xl overflow-hidden">
                <Image
                  src={item.secondImage}
                  alt={item.eligibilityTitle}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Combined WA Scheme Card (Span 5) */}
              <div className="md:col-span-4 bg-[#EEF6EB] rounded-3xl p-8 flex flex-col justify-center">
                <p className="text-sm md:text-[1.375rem] text-black font-medium leading-[1.2] tracking-tight">
                  {item.combinedSchemeText}
                </p>
              </div>

              {/* Eligibility Card (Span 4) */}
              <div className="md:col-span-5 bg-[#EEF6EB] rounded-3xl p-8 flex flex-col justify-center">
                <h4 className="text-xl md:text-2xl font-normal text-black mb-6">
                  {item.eligibilityTitle}
                </h4>
                <ul className="flex flex-col">
                  {item.eligibilityBulletPoints.map((eligibilityItem, i) => (
                    <li key={i} className="flex items-start text-sm md:text-base text-black font-medium leading-[1.1]">
                      <span className="mr-2 mt-0.5">•</span>
                      <span>{eligibilityItem}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>
        </section>
      ))}
    </>
  );
};

export default FederalRebates;
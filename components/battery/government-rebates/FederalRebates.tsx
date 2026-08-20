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
        <section key={index} className="w-full bg-white px-[5%] md:px-[3%] py-12 md:py-20">
          {/* Header Section */}
          <div className="text-left md:text-center mb-12 md:mb-10">
            <h3 className="text-base md:text-xl font-medium text-black tracking-tight leading-tight">
              {item.sectionSubtitle}
            </h3>
            <h2 className="text-[2.5rem] md:text-4xl lg:text-[3.125rem] font-light text-[#63B846] leading-tight tracking-tight">
              {item.sectionTitle}
            </h2>
            <p className="text-base md:text-xl text-black font-medium leading-[1.2] max-w-4xl mx-auto">
              {item.sectionDescription}
            </p>
          </div>

          {/* Mobile + iPad: alternating stack (phones, single col) / 2-col grid (iPad) */}
          <div className="lg:hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">

              {/* Card 1 — Key Specs (text) — row 1 col 1 */}
              <div className="md:col-start-1 md:row-start-1 bg-[#EEF6EB] rounded-3xl p-8 flex flex-col justify-center tracking-tight">
                <h4 className="text-xl md:text-2xl font-normal text-black mb-6">
                  {item.keySpecsTitle}
                </h4>
                <ul className="flex flex-col">
                  {item.keySpecsBulletPoints.map((spec, i) => (
                    <li key={i} className="flex items-start text-lg text-black font-medium leading-snug">
                      <span className="mr-2 mt-0.5">•</span>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card 2 — Image 1 — row 1 col 2 */}
              <div className="md:col-start-2 md:row-start-1 relative rounded-3xl overflow-hidden h-[280px] md:h-auto min-h-[280px]">
                <Image
                  src={item.firstImage}
                  alt={item.eligibleCapacityTitle}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Card 3 — Eligible Capacity + Note (text) — row 2 col 2 */}
              <div className="md:col-start-2 md:row-start-2 bg-[#EEF6EB] rounded-3xl p-10 flex flex-col justify-center tracking-tight leading-[1]">
                <h4 className="text-xl md:text-2xl font-normal text-black mb-3">
                  {item.eligibleCapacityTitle}
                </h4>
                <p className="text-base text-black font-medium mb-6 leading-[1.2]">
                  {item.eligibleCapacityText}
                </p>

                <h4 className="text-base md:text-2xl font-normal text-black mb-3">
                  {item.importantNoteTitle}
                </h4>
                <p className="text-base text-black font-medium leading-[1.2]">
                  {item.importantNoteText}
                </p>
              </div>

              {/* Card 4 — Image 2 — row 2 col 1 */}
              <div className="md:col-start-1 md:row-start-2 relative rounded-3xl overflow-hidden h-[280px] md:h-auto min-h-[280px]">
                <Image
                  src={item.secondImage}
                  alt={item.eligibilityTitle}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Card 5 — Combined Scheme (text) — row 3 col 1 */}
              <div className="md:col-start-1 md:row-start-3 bg-[#EEF6EB] rounded-3xl p-8 flex flex-col justify-center">
                <p className="text-base md:text-[1.375rem] text-black font-medium leading-[1.2] tracking-tight">
                  {item.combinedSchemeText}
                </p>
              </div>

              {/* Card 6 — Eligibility (text) — row 3 col 2 */}
              <div className="md:col-start-2 md:row-start-3 bg-[#EEF6EB] rounded-3xl p-8 py-15 flex flex-col justify-center tracking-tight leading-[1]">
                <h4 className="text-xl md:text-2xl font-normal text-black mb-6">
                  {item.eligibilityTitle}
                </h4>
                <ul className="flex flex-col max-w-sm">
                  {item.eligibilityBulletPoints.map((eligibilityItem, i) => (
                    <li key={i} className="flex items-start text-lg text-black font-medium leading-[1.1]">
                      <span className="mr-2 mt-0.5">•</span>
                      <span>{eligibilityItem}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

          {/* Desktop (lg+): original 12-column arrangement — unchanged */}
          <div className="hidden lg:flex lg:flex-col gap-4">
            {/* Top Row */}
            <div className="grid lg:grid-cols-12 gap-4 items-stretch">

              {/* Key Specs Card (Span 5) */}
              <div className="lg:col-span-5 bg-[#EEF6EB] rounded-3xl p-8 flex flex-col justify-center tracking-tight">
                <h4 className="text-xl md:text-2xl font-normal text-black mb-6">
                  {item.keySpecsTitle}
                </h4>
                <ul className="flex flex-col">
                  {item.keySpecsBulletPoints.map((spec, i) => (
                    <li key={i} className="flex items-start text-lg text-black font-medium leading-snug">
                      <span className="mr-2 mt-0.5">•</span>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Top Image (Span 3) */}
              <div className="lg:col-span-3 relative rounded-3xl overflow-hidden">
                <Image
                  src={item.firstImage}
                  alt={item.eligibleCapacityTitle}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Eligible Capacity Card (Span 4) */}
              <div className="lg:col-span-4 bg-[#EEF6EB] rounded-3xl p-10 flex flex-col justify-center tracking-tight leading-[1]">
                <h4 className="text-xl md:text-2xl font-normal text-black mb-3">
                  {item.eligibleCapacityTitle}
                </h4>
                <p className="text-base text-black font-medium mb-6 leading-[1.2]">
                  {item.eligibleCapacityText}
                </p>

                <h4 className="text-base md:text-2xl font-normal text-black mb-3">
                  {item.importantNoteTitle}
                </h4>
                <p className="text-base text-black font-medium leading-[1.2]">
                  {item.importantNoteText}
                </p>
              </div>

            </div>

            {/* Bottom Row */}
            <div className="grid lg:grid-cols-12 gap-4 items-stretch">

              {/* Bottom Image (Span 3) */}
              <div className="lg:col-span-3 relative rounded-3xl overflow-hidden">
                <Image
                  src={item.secondImage}
                  alt={item.eligibilityTitle}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Combined WA Scheme Card (Span 4) */}
              <div className="lg:col-span-4 bg-[#EEF6EB] rounded-3xl p-8 flex flex-col justify-center">
                <p className="text-base md:text-[1.375rem] text-black font-medium leading-[1.2] tracking-tight">
                  {item.combinedSchemeText}
                </p>
              </div>

              {/* Eligibility Card (Span 5) */}
              <div className="lg:col-span-5 bg-[#EEF6EB] rounded-3xl p-8 py-15 flex flex-col justify-center tracking-tight leading-[1]">
                <h4 className="text-xl md:text-2xl font-normal text-black mb-6">
                  {item.eligibilityTitle}
                </h4>
                <ul className="flex flex-col max-w-sm">
                  {item.eligibilityBulletPoints.map((eligibilityItem, i) => (
                    <li key={i} className="flex items-start text-lg text-black font-medium leading-[1.1]">
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
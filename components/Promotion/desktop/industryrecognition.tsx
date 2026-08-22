import React from 'react';
import Fade from '@/reuseables/fade';

export interface AwardItem {
  name: string;
  image: string;
}

export interface RecognitionSection {
  title: string;
  awards: AwardItem[];
}

interface IndustryRecognitionProps {
  recognitions: RecognitionSection[];
  /** single = one full-width recognition (e.g. SunWiz); grid = multiple recognitions side-by-side (e.g. SolarQuotes + Google) */
  variant?: 'single' | 'grid';
}

const RecognitionCard = ({
  award,
  bordered = false,
  firstInRow = false,
}: {
  award: AwardItem;
  bordered?: boolean;
  firstInRow?: boolean;
}) => (
  <div
    className={`w-full sm:w-[280px] flex items-center justify-center transition-all duration-300 ${
      bordered
        ? `p-4 min-h-[180px] border-t border-[#00000033] ${firstInRow ? 'border-r border-[#00000033]' : ''}`
        : 'p-6 min-h-[160px]'
    }`}
  >
    <div className="relative w-full h-full flex items-center justify-center">
      <img
        src={award.image}
        alt={award.name}
        className="max-h-full max-w-full object-contain filter transition-transform duration-300 hover:scale-105"
      />
    </div>
  </div>
);

const RecognitionBlock = ({
  section,
  bordered = false,
  titleDivider = false,
  divider = false,
  className = '',
}: {
  section: RecognitionSection;
  bordered?: boolean;
  titleDivider?: boolean;
  divider?: boolean;
  className?: string;
}) => (
  <div
    className={`flex flex-col items-center text-center ${className} ${
      divider
        ? 'border-b border-[#00000033] pb-10 md:pb-0 md:border-b-0 md:border-r'
        : ''
    }`}
  >
    <span className="text-xl md:text-[3.125rem] font-bold text-black tracking-tight leading-none block">
      {section.title}
    </span>
    {titleDivider ? (
      <div className="h-px w-36 md:w-72 bg-[#00000033] mt-8 mb-8" />
    ) : (
      <div className="mb-8" />
    )}
    <div className="flex flex-wrap justify-center gap-8 md:gap-0 w-full">
      {section.awards.map((award, idx) => (
        <RecognitionCard
          key={idx}
          award={award}
          bordered={bordered}
          firstInRow={bordered && idx === 0}
        />
      ))}
    </div>
  </div>
);

const IndustryRecognition = ({
  recognitions,
  variant = 'single',
}: IndustryRecognitionProps) => {
  if (!recognitions || recognitions.length === 0) return null;

  return (
    <section className="bg-white py-16 md:py-20 px-[5%] md:px-[3%]">
      <Fade duration={5}>
        <div className="max-w-7xl mx-auto">
          {variant === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 w-full">
              {recognitions.map((sec, idx) => (
                <RecognitionBlock
                  key={idx}
                  section={sec}
                  titleDivider
                  divider={idx < recognitions.length - 1}
                  className="px-6 md:px-8"
                />
              ))}
            </div>
          ) : (
            <RecognitionBlock section={recognitions[0]} bordered />
          )}
        </div>
      </Fade>
    </section>
  );
};

export default IndustryRecognition;
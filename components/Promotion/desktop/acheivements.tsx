import React from 'react';
import Fade from '@/reuseables/fade';

export interface AwardItem {
  name: string;
  image: string;
}

export type AchievementLogo = AwardItem;

export interface RecognitionSection {
  title: string;
  awards: AwardItem[];
}

export interface AcheivementsProps {
  title?: string;
  subtitle?: string;
  description?: string;
  awards?: AwardItem[];
  badges?: AwardItem[];
  recognitions?: RecognitionSection[];
}

interface ComponentProps {
  data?: AcheivementsProps;
  title?: string;
  subtitle?: string;
  description?: string;
  awards?: AwardItem[];
  badges?: AwardItem[];
  recognitions?: RecognitionSection[];
}

const COLS = 3;

const Acheivements: React.FC<ComponentProps> = (props) => {
  const data = props.data;
  const title = props.title ?? data?.title ?? '';
  const subtitle = props.subtitle ?? data?.subtitle;
  const description = props.description ?? data?.description;
  const awards = props.awards ?? data?.awards ?? props.badges ?? data?.badges ?? [];
  const recognitions = props.recognitions ?? data?.recognitions ?? [];

  // Split awards into rows of COLS items each, so border classes never
  // "leak" across a row boundary (e.g. a trailing partial last row).
  const rows: AwardItem[][] = [];
  for (let i = 0; i < awards.length; i += COLS) {
    rows.push(awards.slice(i, i + COLS));
  }

  return (
    <section className="bg-white py-16 md:py-20 px-[5%]">
      <Fade>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          {(title || subtitle || description) && (
            <div className="text-center mb-16">
              {title && (
                <span className="text-lg md:text-[2rem] font-bold text-black tracking-tight leading-none block">
                  {title}
                </span>
              )}
              {subtitle && (
                <h2 className="text-4xl md:text-[5rem] font-bold text-[#63B846] tracking-tighter leading-none mb-4">
                  {subtitle}
                </h2>
              )}
              {description && (
                <p className="text-[#4D4D4D] text-sm md:text-[1.375rem] leading-tight font-medium max-w-5xl mx-auto">
                  {description}
                </p>
              )}
            </div>
          )}

          {/* Grid of awards, row by row */}
          <div className="flex flex-col max-w-6xl mx-auto">
            {rows.map((row, rowIdx) => (
              <div
                key={rowIdx}
                className={`flex justify-center ${rowIdx > 0 ? 'border-t border-0 border-gray-200' : ''}`}
              >
                {row.map((badge, colIdx) => {
                  const isFirstInRow = colIdx === 0;
                  const isLastInRow = colIdx === row.length - 1;
                  const isTopRow = rowIdx === 0;
                  const isBottomRow = rowIdx === rows.length - 1;

                  const cellClasses = [
                    'w-full md:w-1/3 flex items-center justify-center p-8 min-h-[220px] transition-all duration-300',
                    // small screens: add bottom border between rows, but not on last row
                    !isBottomRow ? 'border-b border-gray-200' : 'border-b-0',
                    // md+: start with a border on all sides, then remove outer edges
                    'md:border md:border-gray-200',
                    isFirstInRow ? 'md:border-l-0' : '',
                    isLastInRow ? 'md:border-r-0' : '',
                    isTopRow ? 'md:border-t-0' : '',
                    isBottomRow ? 'md:border-b-0' : '',
                  ]
                    .filter(Boolean)
                    .join(' ');

                  return (
                    <div key={colIdx} className={cellClasses}>
                      <div className="relative w-full h-[120px] flex items-center justify-center">
                        <img
                          src={badge.image}
                          alt={badge.name}
                          className="max-h-full max-w-full object-contain filter transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Separated Recognitions Section */}
          {recognitions && recognitions.length > 0 && (
            <div className="mt-5 border-gray-200 max-w-6xl mx-auto flex flex-col gap-16">
              {/* Row 1: First recognition (SunWiz Industry Recognition) */}
              {recognitions[0] && (
                <div className="flex flex-col items-center text-center">
                  <span className="text-xl md:text-[3.125rem] font-bold text-black tracking-tight leading-none block mb-8">
                    {recognitions[0].title}
                  </span>
                  <div className="flex flex-wrap justify-center gap-8 md:gap-0 w-full">
                    {recognitions[0].awards.map((award, idx) => (
                      <div
                        key={idx}
                        className={`w-full sm:w-[280px] flex items-center justify-center p-6 min-h-[160px] border-[#00000033]  border-t ${idx==0 ?"border-r":""} transition-all duration-300 `}
                      >
                        <div className="relative w-full h-full flex items-center justify-center">
                          <img
                            src={award.image}
                            alt={award.name}
                            className="max-h-full max-w-full object-contain filter transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Row 2: Remaining recognitions (Awarded by SolarQuotes & Google Rating) */}
              {recognitions.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-3 w-full">
                  {recognitions.slice(1).map((sec, secIdx) => (
                    <div key={secIdx} className="flex flex-col items-center text-center">
                      <span className="text-xl md:text-[3.125rem] font-bold text-black tracking-tight leading-none block mb-8">
                        {sec.title}
                      </span>
                      <div className="flex flex-wrap justify-center gap-8 w-full">
                        {sec.awards.map((award, idx) => (
                          <div
                            key={idx}
                            className={`w-full sm:w-[280px] flex items-center justify-center p-6 min-h-[160px] border-[#00000033] transition-all duration-300 `}
                          >
                            <div className="relative w-full h-full flex items-center justify-center">
                              <img
                                src={award.image}
                                alt={award.name}
                                className="max-h-full max-w-full object-contain filter transition-transform duration-300 hover:scale-105"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </Fade>
    </section>
  );
};

export default Acheivements;
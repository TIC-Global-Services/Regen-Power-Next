import React from 'react';
import Fade from '@/reuseables/fade';

export interface AwardItem {
  name: string;
  image: string;
}

export type AchievementLogo = AwardItem;

export interface AcheivementsProps {
  title?: string;
  subtitle?: string;
  description?: string;
  awards?: AwardItem[];
  badges?: AwardItem[];
}

interface ComponentProps {
  data?: AcheivementsProps;
  title?: string;
  subtitle?: string;
  description?: string;
  awards?: AwardItem[];
  badges?: AwardItem[];
}

const COLS = 3;

const Acheivements: React.FC<ComponentProps> = (props) => {
  const data = props.data;
  const title = props.title ?? data?.title ?? '';
  const subtitle = props.subtitle ?? data?.subtitle;
  const description = props.description ?? data?.description;
  const awards = props.awards ?? data?.awards ?? props.badges ?? data?.badges ?? [];

  // Split awards into rows of COLS items each, so border classes never
  // "leak" across a row boundary (e.g. a trailing partial last row).
  const rows: AwardItem[][] = [];
  for (let i = 0; i < awards.length; i += COLS) {
    rows.push(awards.slice(i, i + COLS));
  }

  return (
    <section className="bg-white py-16 md:py-20 px-[5%] md:px-[3%]">
      <Fade duration={5}>
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
          <div className="flex flex-col">
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
                    'w-full  flex items-center justify-center p-6 min-h-[220px] transition-all duration-300',
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
                      <div className="relative w-full h-[180px] flex items-center justify-center">
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
        </div>
      </Fade>
    </section>
  );
};

export default Acheivements;
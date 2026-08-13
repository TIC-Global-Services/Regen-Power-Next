import React from 'react';
import Fade from '@/reuseables/fade';

export interface AchievementLogo {
  name: string;
  image: string;
}

export interface AcheivementsProps {
  title: string;
  subtitle: string;
  description: string;
  badges: AchievementLogo[];
}

const COLS = 3;

const Acheivements = ({ data }: { data: AcheivementsProps }) => {
  // Split badges into rows of COLS items each, so border classes never
  // "leak" across a row boundary (e.g. a trailing partial last row).
  const rows: AchievementLogo[][] = [];
  for (let i = 0; i < data.badges.length; i += COLS) {
    rows.push(data.badges.slice(i, i + COLS));
  }

  return (
    <section className="bg-white py-16 md:py-24 px-[5%]">
      <Fade>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-lg md:text-[2rem] font-bold text-black tracking-tight leading-none block">
              {data.title}
            </span>
            <h2 className="text-4xl md:text-[5rem] font-bold text-[#63B846] tracking-tighter leading-none mb-4">
              {data.subtitle}
            </h2>
            <p className="text-[#4D4D4D] text-sm md:text-[1.375rem] leading-tight font-medium max-w-5xl mx-auto">
              {data.description}
            </p>
          </div>

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

                  return (
                  <div
                    key={colIdx}
                    className={`w-full md:w-1/3 flex items-center justify-center p-8 min-h-[220px] transition-all duration-300 border-gray-200 group
                      ${!isFirstInRow ? 'md:border-1 border-l-0 border-r-0' : 'border-b-0 border-r-1 border-l-1'}
                      ${isLastInRow ? 'md:border-r- border-b-0 border-t-0' : 'border-0'}
                    `}
                  >
                    <div className="relative w-full h-[120px] flex items-center justify-center">
                      <img
                        src={badge.image}
                        alt={badge.name}
                        className="max-h-full max-w-full object-contain filter transition-transform duration-300"
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
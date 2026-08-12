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

const Acheivements = ({ data }: { data: AcheivementsProps }) => {
  return (
    <section className="bg-white py-16 md:py-24 px-[5%]">
      <Fade>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center  mb-16">
            <span className="text-lg md:text-[2rem] font-bold text-black tracking-tight leading-none block">
              {data.title}
            </span>
            <h2 className="text-4xl md:text-[5rem] font-extrabold text-[#63B846] tracking-tighter leading-none mb-6">
              {data.subtitle}
            </h2>
            <p className="text-[#4D4D4D] text-sm md:text-[1.375rem] leading-tight font-medium max-w-5xl mx-auto">
              {data.description}
            </p>
          </div>

          {/* Grid of awards */}
          <div className="flex flex-wrap justify-center items-center max-w-6xl mx-auto">
            {data.badges.map((badge, idx) => {
              const r = Math.floor(idx / 3);
              const c = idx % 3;
              const totalRows = Math.ceil(data.badges.length / 3);
              const isLastRow = r === totalRows - 1;

              return (
                <div
                  key={idx}
                  className={`w-full md:w-1/3 flex items-center justify-center p-8 min-h-[220px] transition-all duration-300 border-gray-200 group
                    ${r > 0 ? "border-t" : ""}
                    ${!isLastRow && c > 0 ? "md:border-l" : ""}
                    ${isLastRow ? "md:border-l md:border-r" : ""}
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
        </div>
      </Fade>
    </section>
  );
};

export default Acheivements;

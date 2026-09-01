import React from "react";
import Fade from "@/reuseables/fade";
import Marquee from "@/reuseables/Marquee";

export interface BadgeLogo {
  name: string;
  logoPath?: string;
}

export interface HighEnergyProps {
  title: string;
  bullets: string[];
  badges: BadgeLogo[];
}

const HighEnergy = ({ data }: { data: HighEnergyProps }) => {
  const { title, bullets = [], badges = [] } = data || {};

  // Extract first line and second line if it contains a question mark or colon
  let titlePart1 = "High Energy Bills?";
  let titlePart2 = "Here’s Why It’s Time To Add A Battery With Us:";

  if (title) {
    const parts = title.split("?");
    if (parts.length > 1) {
      titlePart1 = parts[0].trim() + "?";
      titlePart2 = parts.slice(1).join("?").trim();
    } else {
      titlePart1 = title;
      titlePart2 = "";
    }
  }

  return (
    <section className="bg-white py-16 md:py-10 overflow-hidden border-t border-gray-100">
      <Fade duration={5}>
        <div className="px-[5%] md:px-[3%] mb-12">
          {/* Centered Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-[3.125rem] font-bold text-black tracking-tight leading-tight mb-2">
              {titlePart1}
            </h2>
            {titlePart2 && (
              <h3 className="text-2xl md:text-3xl lg:text-[3.125rem] font-bold text-[#63B846] tracking-tight leading-none">
                {titlePart2}
              </h3>
            )}
          </div>

          {/* Checklist Grid (2 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
            <div className="flex flex-col gap-2">
              {bullets
                .slice(0, 6)
                .map((bullet, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <span className="text-black font-bold text-lg leading-none mt-1">
                      •
                    </span>

                    <p className="text-sm md:text-[1.625rem] leading-[1] font-medium">
                      {bullet}
                    </p>
                  </div>
                ))}
            </div>

            <div className="flex flex-col gap-2">
              {bullets
                .slice(6, 10)
                .map((bullet, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <span className="text-black font-bold text-lg leading-none mt-1">
                      •
                    </span>

                    <p className="text-sm md:text-[1.625rem] leading-[1] font-medium">
                      {bullet}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className="px-[5%] md:px-[3%]"><div className="h-[1px] bg-[#00000033] my-10"></div></div>


        {/* Badges Marquee using Reusable Marquee */}
        {badges.length > 0 && (
          <div className="py-4">
            <Marquee speed={30} gap={24} repeat={4} pauseOnHover={false}>
              {badges
                .filter((b) => !!b.logoPath)
                .map((badge, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-[#00000033] px-8 py-6 h-[30dvh] shrink-0 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <img
                    src={badge.logoPath!}
                    alt={badge.name}
                    className="max-h-full max-w-full object-cover h-full"
                  />
                </div>
              ))}
            </Marquee>
          </div>
        )}
      </Fade>
    </section>
  );
};

export default HighEnergy;

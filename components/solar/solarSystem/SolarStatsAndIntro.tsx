import React from "react";
import Marquee from "@/reuseables/Marquee";
import EditorialTextSection from "@/reuseables/EditorialTextSection";
import type { ResolvedSolarStatsAndIntro } from "@/lib/strapi/resolvers/solar";

interface SolarStatsAndIntroProps {
  resolved: ResolvedSolarStatsAndIntro;
}

const SpacerIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 11 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="stroke-black shrink-0 mx-2"
  >
    <path d="M9.27282 4.18688C7.91735 5.54235 5.59314 5.41345 5.59314 5.41345C5.59314 5.41345 5.46423 3.08532 6.8197 1.72985C8.17517 0.374386 10.5033 0.503292 10.5033 0.503292C10.5033 0.503292 10.6283 2.83142 9.27282 4.18688Z" />
    <path d="M4.18689 1.73379C5.54236 3.08926 5.41345 5.41738 5.41345 5.41738C5.41345 5.41738 3.08923 5.54629 1.72985 4.19082C0.374386 2.83535 0.503292 0.511134 0.503292 0.511134C0.503292 0.511134 2.83142 0.378322 4.18689 1.73379Z" />
    <path d="M1.7335 6.8197C3.08897 5.46423 5.41319 5.59314 5.41319 5.59314C5.41319 5.59314 5.54209 7.92126 4.18662 9.27673C2.83116 10.6322 0.503031 10.5033 0.503031 10.5033C0.503031 10.5033 0.378031 8.17517 1.7335 6.8197Z" />
    <path d="M6.81579 9.27282C5.46032 7.91735 5.58923 5.58923 5.58923 5.58923C5.58923 5.58923 7.91735 5.46032 9.27282 6.81579C10.6283 8.17126 10.4994 10.4994 10.4994 10.4994C10.4994 10.4994 8.17517 10.6283 6.81579 9.27282Z" />
  </svg>
);

const SolarStatsAndIntro: React.FC<SolarStatsAndIntroProps> = ({ resolved }) => {
  return (
    <section className="bg-white overflow-hidden py-10 md:py-16">
      {resolved.tickerTexts.length > 0 && (
        <div className="relative w-full bg-white py-4 overflow-hidden select-none">
          <Marquee speed={30} gap={32} pauseOnHover={false}>
            {resolved.tickerTexts.map((item, index) => (
              <React.Fragment key={index}>
                <div className="flex items-center gap-3 text-black text-xl md:text-3xl font-normal tracking-tight">
                  <span className="text-[#63B846] font-normal">
                    {item.split(" ")[0]}
                  </span>
                  <span className="text-black font-normal">
                    {item.split(" ").slice(1).join(" ")}
                  </span>
                  <SpacerIcon />
                </div>

              </React.Fragment>
            ))}
          </Marquee>
        </div>
      )}

      <EditorialTextSection
        subtitle={resolved.subtitle}
        title={resolved.title}
        paragraphs={resolved.paragraphs}
        align="left"
        className="mt-0 md:mt-12 px-[3%]"
        subtitleClass="text-xl md:text-2xl text-black capitalize"
        titleClass="text-[3.125rem] md:text-[5rem] mb-4"
        paragraphsClass="text-left"
        revealEffect
      />
    </section>
  );
};

export default SolarStatsAndIntro;

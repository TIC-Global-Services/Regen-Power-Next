import React from "react";
import Image from "next/image";
import Reveal from "@/reuseables/Reveal";
import Fade from "@/reuseables/fade";
import SectionHeader from "@/reuseables/SectionHeader";
import type { ResolvedSolarWhyRegenPower } from "@/lib/strapi/resolvers/solar";

interface WhyRegenPowerProps {
  resolved: ResolvedSolarWhyRegenPower;
}

const CheckIcon = () => (
  <svg
    aria-hidden
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mt-0.5 h-5 w-5 shrink-0 md:h-6 md:w-6"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="m8 12.5 2.8 2.8L16 9.5" />
  </svg>
);

const WhyRegenPower: React.FC<WhyRegenPowerProps> = ({ resolved }) => {
  const { stats, awards, paragraphs } = resolved;

  return (
    <section className="py-16 lg:py-24 bg-white border-t border-gray-50">
      <div className="px-[5%] lg:px-[3%] mx-auto">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeader
              badge={resolved.badge}
              title={resolved.title}
              align="left"
              titleClass="text-[2.5rem] lg:text-[4rem]"
            />
            {paragraphs.length > 0 && (
              <Fade delay={0.2}>
                <div className="mt-6 max-w-xl space-y-4">
                  {paragraphs.map((p, index) => (
                    <p
                      key={index}
                      className={`text-base leading-snug tracking-tight md:text-lg ${
                        p.isSecondary ? "text-black/70" : "text-black"
                      }`}
                    >
                      {p.text}
                    </p>
                  ))}
                </div>
              </Fade>
            )}
          </div>

          {awards.length > 0 && (
            <Reveal>
              <aside className="rounded-[20px] bg-[#63B846] p-6 text-white md:p-10">
                {resolved.awardsTitle && (
                  <h3 className="mb-5 text-2xl font-normal leading-tight tracking-tight md:text-[2rem]">
                    {resolved.awardsTitle}
                  </h3>
                )}
                <ul className="space-y-4">
                  {awards.map((award, index) => (
                    <li key={index} className="flex gap-3">
                      <CheckIcon />
                      <span className="text-base leading-snug tracking-tight md:text-lg">
                        {award}
                      </span>
                    </li>
                  ))}
                </ul>
              </aside>
            </Reveal>
          )}
        </div>

        {stats.length > 0 && (
          <div className="mt-12 grid grid-cols-2 gap-3 md:gap-5 lg:mt-16 lg:grid-cols-3">
            {stats.map((stat, index) => (
              <Reveal key={index} delay={index * 0.05} className="h-full">
                <div className="flex h-full min-h-[9.5rem] flex-col justify-between gap-4 rounded-[20px] bg-[#F1F8EC] p-5 md:min-h-[13rem] md:p-8">
                  {stat.logo ? (
                    <div className="relative h-12 w-full max-w-[9rem] md:h-16">
                      <Image
                        src={stat.logo.src}
                        alt={stat.logo.alt || stat.value}
                        fill
                        sizes="144px"
                        className="object-contain object-left"
                      />
                    </div>
                  ) : (
                    <p className="text-[2rem] font-normal leading-none tracking-tighter text-[#63B846] md:text-[3.5rem]">
                      {stat.value}
                    </p>
                  )}
                  <p className="text-sm leading-tight tracking-tight text-black/80 md:text-lg">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default WhyRegenPower;

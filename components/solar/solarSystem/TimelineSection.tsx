import React from "react";
import Image from "next/image";
import Reveal from "@/reuseables/Reveal";
import CtaButton from "@/reuseables/CtaButton";
import SectionHeader from "@/reuseables/SectionHeader";
import MissingImage from "@/reuseables/MissingImage";
import type { ResolvedSolarTimeline } from "@/lib/strapi/resolvers/solar";

interface TimelineSectionProps {
  resolved: ResolvedSolarTimeline;
}

const TimelineSection: React.FC<TimelineSectionProps> = ({ resolved }) => {
  const { steps } = resolved;

  return (
    <section className="py-10 lg:py-24 bg-white border-t border-gray-50">
      <div className="px-[5%] lg:px-[3%] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Intro + image — stays in view while the steps scroll on desktop */}
          <div className="flex flex-col gap-8 lg:sticky lg:top-28">
            <div>
              <SectionHeader
                badge={resolved.badge}
                subtitle={resolved.subtitle}
                title={resolved.title}
                description={resolved.description}
                titleClass="text-[3.125rem] lg:text-[5rem]"
                subtitleClass="font-normal text-xl lg:text-[2.125rem]"
                descClass="text-base"
                align="left"
              />

              <Reveal className="mt-8">
                <CtaButton
                  href={resolved.ctaLink}
                  text={resolved.ctaText ?? "Start With A Free Consultation"}
                  textColor="text-black"
                />
              </Reveal>
            </div>

            <div className="relative w-full aspect-[4/3] lg:aspect-[16/10] rounded-[20px] overflow-hidden shadow-md">
              {resolved.image ? (
                <Image
                  src={resolved.image.src}
                  alt={resolved.image.alt}
                  fill
                  className="object-cover"
                />
              ) : (
                <MissingImage type="bgimage" label="Timeline image" aspect="aspect-[4/3]" />
              )}
            </div>
          </div>

          {/* Steps */}
          <ol className="relative md:pt-24">
            {steps.map((step, index) => (
              <li key={index} className="relative pl-16 md:pl-20  pb-10 last:pb-0">
                {index < steps.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute left-[21.5px] top-12 bottom-0 w-px bg-[#63B846]/30 md:left-[27.5px] md:top-16"
                  />
                )}
                <span className="absolute left-0 top-0 flex h-11 w-11 items-center justify-center rounded-full bg-[#63B846] text-base font-medium text-white md:h-14 md:w-14 md:text-xl">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Reveal>
                  <h3 className="text-2xl lg:text-[2rem] font-normal leading-tight tracking-tight text-black">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-base md:text-lg leading-snug tracking-tight text-black/80">
                    {step.description}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;

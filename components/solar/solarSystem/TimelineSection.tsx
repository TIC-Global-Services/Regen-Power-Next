import React from "react";
import Image from "next/image";
import Reveal from "@/reuseables/Reveal";
import Fade from "@/reuseables/fade";
import CtaButton from "@/reuseables/CtaButton";
import SectionHeader from "@/reuseables/SectionHeader";
import MissingImage from "@/reuseables/MissingImage";
import type { ResolvedSolarTimeline } from "@/lib/strapi/resolvers/solar";

interface TimelineSectionProps {
  resolved: ResolvedSolarTimeline;
}

const TimelineSection: React.FC<TimelineSectionProps> = ({ resolved }) => {
  return (
    <section className="py-10 md:py-24 bg-white border-t border-gray-50 min-h-screen">
      <div className="px-[5%] md:px-[3%] mx-auto">
        <div className="lg:sticky lg:top-28 md:hidden justify-center mb-5">
          <div className="relative w-full aspect-[4/5]  max-w-[660px] rounded-[20px] overflow-hidden shadow-md">
            {resolved.image ? (
              <Image
                src={resolved.image.src}
                alt={resolved.image.alt}
                fill
                className="object-cover"
              />
            ) : (
              <MissingImage
                type="bgimage"
                label="Timeline image"
                aspect="aspect-[4/6]"
              />
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="flex flex-col justify-between h-full">
            <div>
              <SectionHeader
                subtitle={resolved.subtitle}
                title={resolved.title}
                description={resolved.description}
                titleClass='text-[3.125rem] md:text-[5rem]'
                subtitleClass='font-normal text-xl md:text-[2.125rem]'

                align="left"
              />

              <Reveal className="mt-8">
                <CtaButton
                  href="#quote-form"
                  text="Start With A Free Consultation"
                  textColor="text-black"
                />
              </Reveal>
            </div>

            <Fade delay={0.3}>
              <div className="mt-10 lg:mt-10">
                <h3 className="text-2xl md:text-[2rem] font-normal text-black mb-3 tracking-tight">
                  {resolved.consultationTitle}
                </h3>
                <p className="text-base md:text-xl leading-[1] tracking-tight max-w-md">
                  {resolved.consultationText}
                </p>
              </div>
            </Fade>
          </div>

          <div className="lg:sticky lg:top-20 md:flex justify-center hidden">
            <div className="relative w-full aspect-[6/7]  max-w-[660px] rounded-[20px] overflow-hidden shadow-md">
              {resolved.image ? (
                <Image
                  src={resolved.image.src}
                  alt={resolved.image.alt}
                  fill
                  className="object-cover"
                />
              ) : (
                <MissingImage
                  type="bgimage"
                  label="Timeline image"
                  aspect="aspect-[4/6]"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;

import React from "react";
import Image from "next/image";
import SectionHeader from "@/reuseables/SectionHeader";
import Reveal from "@/reuseables/Reveal";
import MissingImage from "@/reuseables/MissingImage";
import type { ResolvedSolarSpecsRowCards } from "@/lib/strapi/resolvers/solar";

interface SpecsRowCardsProps {
  resolved: ResolvedSolarSpecsRowCards;
}

const SpecsRowCards: React.FC<SpecsRowCardsProps> = ({ resolved }) => {
  const specs = resolved.specs.filter(
    (s) => s.title || s.value || s.description
  );

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="px-[5%] mx-auto">
        <SectionHeader
          subtitle={resolved.subtitle}
          title={resolved.title}
          description={resolved.description}
          align="left"
          descClass="max-w-2xl text-base leading-none"
          className="mb-16"
        />

        {specs.length === 0 ? (
          <MissingImage label="Specs rows" aspect="aspect-[3/1]" />
        ) : (
          <div className="flex flex-col border-t border-gray-300">
            {specs.map((spec, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className={`${idx !== specs.length - 1 ?'border-b':'' } border-gray-300 py-8`}>
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                    <div className="lg:w-[280px] shrink-0">
                      <h3 className="text-2xl md:text-[2.5rem] text-black leading-tight capitalize">
                        {spec.title}
                      </h3>
                    </div>

                    <div className="flex-grow max-w-md">
                      <span className="text-xl md:text-2xl text-black block mb-1 md:mb-3 font-[var(--font-aeonik)]">
                        {spec.value}
                      </span>
                      <p className="text-sm md:text-base leading-tight">
                        {spec.description}
                      </p>
                    </div>

                    <div className="w-full lg:w-[280px] shrink-0 flex lg:justify-end items-center">
                      <div className="w-full h-[20dvh] md:w-[280px] md:h-[120px] rounded-[20px] overflow-hidden">
                        {spec.image ? (
                          <Image
                            src={spec.image.src}
                            alt={spec.image.alt}
                            width={280}
                            height={120}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <MissingImage
                            type="bgimage"
                            label="Spec image"
                            aspect="aspect-auto h-full"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SpecsRowCards;

import React from "react";
import Image from "next/image";
import Reveal from "@/reuseables/Reveal";
import Fade from "@/reuseables/fade";
import SectionHeader from "@/reuseables/SectionHeader";
import MissingImage from "@/reuseables/MissingImage";
import type { ResolvedBrandsHybridSpecialty } from "@/lib/strapi/resolvers/brands";

interface HybridSpecialtySectionProps {
  resolved: ResolvedBrandsHybridSpecialty;
}

const HybridSpecialtySection: React.FC<HybridSpecialtySectionProps> = ({
  resolved,
}) => {
  const imgUrl = resolved.image?.src;

  return (
    <section className="py-16 md:py-24 bg-white border-t border-gray-50">
      <div className="px-[5%] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="flex flex-col justify-center text-left">
            <SectionHeader
              subtitle={resolved.subtitle ?? ""}
              title={resolved.title ?? ""}
              align="left"
              subtitleClass="text-base md:text-2xl font-medium normal-case"
              titleClass="text-4xl md:text-5xl lg:text-[4.5rem] font-normal leading-none tracking-tight mb-6 text-[#63B846]"
            />
            <Fade delay={0.2}>
              <p className="text-sm md:text-xl leading-tight">
                {resolved.description ?? ""}
              </p>
            </Fade>
          </div>

          <Reveal className="relative w-full aspect-[5/5] rounded-[14px] overflow-hidden">
            {imgUrl ? (
              <img
                src={imgUrl}
                alt={resolved.title ?? "Hybrid Inverters"}
                className="object-cover w-full h-full"
              />
            ) : (
              <img
                src={'/fallback.png'}
                alt={resolved.title ?? "Hybrid Inverters"}
                className="object-cover w-full h-full"
              />
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default HybridSpecialtySection;

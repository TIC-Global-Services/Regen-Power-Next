import React from "react";
import Image from "next/image";
import Reveal from "@/reuseables/Reveal";
import CtaButton from "@/reuseables/CtaButton";
import SectionHeader from "@/reuseables/SectionHeader";
import MissingImage from "@/reuseables/MissingImage";
import type { ResolvedSolarBrandsGrid } from "@/lib/strapi/resolvers/solar";

interface SolarBrandsGridProps {
  resolved: ResolvedSolarBrandsGrid;
}

const SolarBrandsGrid: React.FC<SolarBrandsGridProps> = ({ resolved }) => {
  const brands = resolved.brands;

  return (
    <section className="py-16 md:py-24 bg-white border-t border-gray-100">
      <div className="px-[5%] mx-auto">
        <SectionHeader
          subtitle={resolved.subtitle}
          title={resolved.title}
          description={resolved.description}
          align="center"
          subtitleClass="font-normal text-[1.875rem] leading-[1.1]"
          className="mx-auto mb-12"
        />

        {resolved.ctaText && (
          <div className="text-center">
            <Reveal delay={0.3} className="inline-block">
              <CtaButton
                href={resolved.ctaHref || "#quote-form"}
                text={resolved.ctaText}
                textColor="text-black"
              />
            </Reveal>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 mt-12 bg-white">
          {brands.map((brand, index) => {
            const showBorderBottomMobile = index < brands.length - 1;
            const showBorderRightDesktop = (index + 1) % 3 !== 0;
            const showBorderBottomDesktop = index < 3;

            return (
              <Reveal
                key={index}
                delay={index * 0.1}
                className={`flex items-center justify-center p-8 md:p-12 hover:bg-gray-50 transition-colors h-[180px] md:h-[220px] relative
                  ${showBorderBottomMobile ? "border-b border-gray-100" : "border-b-0"}
                  ${showBorderBottomDesktop ? "md:border-b border-gray-100" : "md:border-b-0"}
                  ${showBorderRightDesktop ? "md:border-r border-gray-100" : "md:border-r-0"}
                `}
              >
                <div className="relative w-full h-[60px] md:h-[80px]">
                  {brand.logo ? (
                    <Image
                      src={brand.logo.src}
                      alt={brand.logo.alt}
                      fill
                      className="object-contain"
                    />
                  ) : (
                    <MissingImage
                      label={brand.name || "Brand logo"}
                      aspect="aspect-[3/1]"
                      className="h-full"
                    />
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SolarBrandsGrid;

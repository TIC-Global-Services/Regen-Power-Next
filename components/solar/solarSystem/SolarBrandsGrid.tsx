import React from "react";
import Reveal from "@/reuseables/Reveal";
import CtaButton from "@/reuseables/CtaButton";
import SectionHeader from "@/reuseables/SectionHeader";
import MissingImage from "@/reuseables/MissingImage";
import Marquee from "@/reuseables/Marquee";
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
          titleClass="text-[3.125rem] md:text-[5rem]"
          subtitleClass="font-normal text-xl md:text-[2.125rem]"
          descClass="max-w-2xl "
          className="mb-12"
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

        {/* Mobile: Marquee */}
        <div className="md:hidden mt-12">
          <Marquee speed={25} gap={40} pauseOnHover={false}>
            {brands.map((brand, index) => (
              <div key={index} className="flex items-center justify-center w-[120px] h-[60px] shrink-0">
                {brand.logo ? (
                  <div className="relative w-full h-full">
                    <img
                      src={brand.logo.src}
                      alt={brand.logo.alt}
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <MissingImage
                    label={brand.name || "Brand logo"}
                    type="logo"
                    aspect="aspect-[3/1]"
                    className="h-full"
                  />
                )}
              </div>
            ))}
          </Marquee>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid md:grid-cols-3 mt-12 bg-white">
          {brands.map((brand, index) => {
            const showBorderRightDesktop = (index + 1) % 3 !== 0;
            const showBorderBottomDesktop = index < 3;

            return (
              <Reveal
                key={index}
                delay={index * 0.1}
                className={`flex items-center justify-center p-8 md:p-12 hover:bg-gray-50 transition-colors h-[180px] md:h-[220px] relative
                  ${showBorderBottomDesktop ? "md:border-b border-[#00000033]" : "md:border-b-0"}
                  ${showBorderRightDesktop ? "md:border-r border-[#00000033]" : "md:border-r-0"}
                `}
              >
                <div className="relative w-full h-[60px] md:h-[80px]">
                  {brand.logo ? (
                    <img
                      src={brand.logo.src}
                      alt={brand.logo.alt}
                      className="absolute inset-0 w-full h-full object-contain"
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

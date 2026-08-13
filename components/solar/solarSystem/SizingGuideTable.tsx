import React from "react";
import Image from "next/image";
import Reveal from "@/reuseables/Reveal";
import CtaButton from "@/reuseables/CtaButton";
import SectionHeader from "@/reuseables/SectionHeader";
import MissingImage from "@/reuseables/MissingImage";
import SpecTable from "@/reuseables/SpecTable";
import type { ResolvedSolarSizingGuideTable } from "@/lib/strapi/resolvers/solar";

interface SizingGuideTableProps {
  resolved: ResolvedSolarSizingGuideTable;
}

const SizingGuideTable: React.FC<SizingGuideTableProps> = ({ resolved }) => {
  const columns = resolved.columns;
  const rows = resolved.rows;
  const sizingCards = resolved.sizingCards;

  return (
    <section className="py-16 md:py-24 bg-white border-t border-gray-50">
      <div className="px-[5%] mx-auto">
        <SectionHeader
          subtitle={resolved.subtitle}
          title={resolved.title}
          description={resolved.description}
          align="left"
          className="mb-8"
          subtitleClass="text-base md:text-xl lg:text-2xl text-black mb-2 capitalize"
          titleClass="text-4xl md:text-[5.5rem] font-normal leading-tight tracking-tight text-[#63B846]"
          descClass="text-xl leading-tight max-w-5xl"
        />

        <div className="text-center">
          <Reveal delay={0.3} className="inline-block">
            <CtaButton
              href="#quote-form"
              text="Get A Sizing Recommendation For My Home"
              textColor="text-black"
            />
          </Reveal>
        </div>

        {rows.length > 0 ? (
          <SpecTable
            labelColumnTitle={resolved.labelColumnTitle}
            columns={columns}
            rows={rows}
          />
        ) : (
          <MissingImage label="Sizing table rows" aspect="aspect-[3/1] my-12 max-w-4xl mx-auto" />
        )}

        {sizingCards.length > 0 ? (
          <>
            {/* Mobile: Slider */}
            <div className="flex overflow-x-auto md:hidden gap-4 snap-x snap-mandatory pl-[5%] -mr-[5%] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-4">
              {sizingCards.map((card, idx) => (
                <Reveal
                  key={idx}
                  delay={idx * 0.15}
                  className="relative flex flex-col justify-end rounded-[24px] overflow-hidden group min-h-[380px] w-[75vw] shrink-0 snap-start"
                >
                  <div className="absolute inset-0 z-0">
                    {card.image ? (
                      <Image
                        src={card.image.src}
                        alt={card.image.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <MissingImage
                      type="bgimage"
                        label="Sizing card image"
                        aspect="aspect-auto h-full"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  </div>

                  <div className="relative z-10 w-full bg-black/5 backdrop-blur-md p-5 mt-auto text-left">
                    <h4 className="text-white text-xl leading-tight mb-2">
                      {card.title}
                    </h4>
                    <p className="text-base text-white leading-tight font-light">
                      {card.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Desktop: Grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sizingCards.map((card, idx) => (
                <Reveal
                  key={idx}
                  delay={idx * 0.15}
                  className="relative flex flex-col justify-end rounded-[24px] overflow-hidden group min-h-[48dvh]"
                >
                  <div className="absolute inset-0 z-0">
                    {card.image ? (
                      <Image
                        src={card.image.src}
                        alt={card.image.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <MissingImage
                        type="bgimage"
                        label="Sizing card image"
                        aspect="aspect-auto h-full"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  </div>

                  <div className="relative z-10 w-full bg-black/5 backdrop-blur-md p-5 mt-auto text-left">
                    <h4 className="text-white text-xl leading-tight mb-2">
                      {card.title}
                    </h4>
                    <p className="text-base text-white leading-tight font-light">
                      {card.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </>
        ) : (
          <MissingImage type="bgimage" label="Sizing cards" aspect="aspect-[3/1]" />
        )}
      </div>
    </section>
  );
};

export default SizingGuideTable;

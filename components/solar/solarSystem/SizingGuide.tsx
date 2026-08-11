import React from "react";
import Image from "next/image";
import Reveal from "@/reuseables/Reveal";
import CtaButton from "@/reuseables/CtaButton";
import SectionHeader from "@/reuseables/SectionHeader";
import MissingImage from "@/reuseables/MissingImage";
import type { ResolvedSolarSizingGuide } from "@/lib/strapi/resolvers/solar";

interface SizingGuideProps {
  resolved: ResolvedSolarSizingGuide;
}

const SizingGuide: React.FC<SizingGuideProps> = ({ resolved }) => {
  const tableRows = resolved.tableRows;
  const sizingCards = resolved.sizingCards;

  return (
    <section className="py-16 md:py-24 bg-white border-t border-gray-50">
      <div className="px-[5%] mx-auto">
        <SectionHeader
          subtitle={resolved.subtitle}
          title={resolved.title}
          description={resolved.description}
          align="center"
          descClass="max-w-3xl"
          className="mx-auto mb-8"
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

        {tableRows.length > 0 ? (
          <div className="overflow-x-auto rounded-[24px] mt-12 mb-16 max-w-4xl mx-auto overflow-hidden">
            <table className="w-full border-collapse text-center bg-white">
              <thead>
                <tr className="bg-[#A0CF44] text-black font-[var(--font-aeonik)]">
                  <th className="p-5 text-lg md:text-2xl font-normal border-r border-b border-black w-1/4">Daily use</th>
                  <th className="p-5 text-lg md:text-2xl font-normal border-r border-b border-black w-1/4">Recommended size</th>
                  <th className="p-5 text-lg md:text-2xl font-normal border-r border-b border-black w-1/4">Typical household</th>
                  <th className="p-5 text-lg md:text-2xl font-normal border-b border-black w-1/4">Phase required</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, idx) => {
                  const isLastRow = idx === tableRows.length - 1;
                  return (
                    <tr key={idx} className="bg-[#EEF6EB]">
                      <td className={`p-5 text-xl text-black border-r border-black ${isLastRow ? "" : "border-b"}`}>{row.dailyUse}</td>
                      <td className={`p-5 text-xl text-black border-r border-black ${isLastRow ? "" : "border-b"}`}>{row.recommendedSize}</td>
                      <td className={`p-5 text-xl text-black font-light border-r border-black ${isLastRow ? "" : "border-b"}`}>{row.typicalHousehold}</td>
                      <td className={`p-5 text-xl text-black font-light ${isLastRow ? "" : "border-b border-black"}`}>{row.phaseRequired}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
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

export default SizingGuide;

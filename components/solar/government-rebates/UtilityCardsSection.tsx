import React from "react";
import Image from "next/image";
import SectionHeader from "@/reuseables/SectionHeader";
import type { ResolvedRebatesUtilityCards } from "@/lib/strapi/resolvers/rebates";

interface Props {
  resolved: ResolvedRebatesUtilityCards;
}

export default function UtilityCardsSection({ resolved }: Props) {
  return (
    <section className="bg-white px-[5%] py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          badge={resolved.badge}
          subtitle={resolved.subtitle}
          title={resolved.title}
          description={resolved.description}
          align="left"
          className="md:items-center md:text-center mb-12 md:mx-auto"
          subtitleClass="text-xl md:text-xl lg:text-2xl normal-case mb-2 block text-black font-medium"
          titleClass="text-[2.5rem] md:text-[3.75rem] font-light leading-none text-[#63B846] mb-4"
          descClass="max-w-2xl text-base md:text-xl text-black tracking-tight font-light leading-tight"
        />

        <div className="flex flex-col md:flex-row flex-wrap justify-center items-center md:items-stretch gap-6">
          {resolved.cards.map((card, idx) => {
            const logo = card.logo;

            return (
              <article
                key={idx}
                className="w-full max-w-[360px] flex flex-col justify-between rounded-[24px] bg-[#F1F8EC] p-8 md:p-10 min-h-[380px] shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-16 w-full flex items-center justify-start mb-8">
                  {logo ? (
                    <img
                      src={logo.src}
                      alt={logo.alt || card.name}
                      className="object-contain max-h-full max-w-[180px]"
                    />
                  ) : (
                    <span className="text-xl font-bold text-black">{card.name}</span>
                  )}
                </div>

                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm text-gray-500 font-normal">Per KWh</dt>
                    <dd className="text-[1.25rem] font-medium text-black mt-0.5">{card.perKwh}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500 font-normal">Cap</dt>
                    <dd className="text-[1.25rem] font-medium text-black mt-0.5">{card.cap}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500 font-normal">Maximum Rebate</dt>
                    <dd className="text-[1.25rem] font-medium text-black mt-0.5">{card.maximumRebate}</dd>
                  </div>
                </dl>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

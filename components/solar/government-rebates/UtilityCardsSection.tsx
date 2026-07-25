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
          title={resolved.title}
          description={resolved.description}
          align="center"
          className="mb-12"
          titleClass="text-5xl md:text-[3.75rem] font-light leading-none"
          descClass="mx-auto max-w-2xl text-base md:text-xl text-black tracking-tight"
        />

        <div className="flex flex-wrap justify-center gap-6">
          {resolved.cards.map((card, idx) => {
            const logo = card.logo;

            return (
              <article
                key={idx}
                className="w-[350px] h-[420px] rounded-[20px] bg-[#F1F8EC] p-10"
              >
                {logo && (
                  <div className="relative h-24 w-full">
                    <Image src={logo.src} alt={logo.alt} fill className="object-contain" />
                  </div>
                )}

                <dl className="space-y-6">
                  <div>
                    <dt className="text-2xl tracking-tight text-black md:text-3xl">Per kWh</dt>
                    <dd className="mt-1 text-base text-black md:text-2xl">{card.perKwh}</dd>
                  </div>
                  <div>
                    <dt className="text-2xl tracking-tight text-black md:text-3xl">Cap</dt>
                    <dd className="mt-1 text-base text-black md:text-2xl">{card.cap}</dd>
                  </div>
                  <div>
                    <dt className="text-2xl tracking-tight text-black md:text-3xl">Maximum Rebate</dt>
                    <dd className="mt-1 text-base text-black md:text-2xl">{card.maximumRebate}</dd>
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

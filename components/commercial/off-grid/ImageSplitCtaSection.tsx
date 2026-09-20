import React from "react";
import Image from "next/image";
import Fade from "@/reuseables/fade";
import Reveal from "@/reuseables/Reveal";
import CtaButton from "@/reuseables/CtaButton";
import type { ResolvedCommercialOffGridImageSplitCta } from "@/lib/strapi/resolvers/commercial";

interface Props {
  resolved: ResolvedCommercialOffGridImageSplitCta;
}

export default function ImageSplitCtaSection({ resolved }: Props) {
  return (
    <Fade>
      <section className="bg-white overflow-hidden w-full relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-[auto_1fr] min-h-[50vh] lg:min-h-screen">
          <div className="order-1 px-[5%] md:px-[3%] pt-10 pb-7 md:pt-14 md:pb-10 lg:pt-24 lg:pb-6 lg:pr-[3%] flex flex-col justify-start">
            <Reveal>
              <div className="leading-[0.85]">
                {resolved.title && (
                  <h2 className="text-2xl md:text-4xl font-medium text-black tracking-tight mb-2">
                    {resolved.title}
                  </h2>
                )}
                <p className="text-[#63B846] font-light text-[3rem] md:text-[4.5rem] lg:text-[6rem] tracking-tighter">
                  {resolved.subtitle}
                </p>
              </div>
            </Reveal>
          </div>

          {resolved.image && (
            <Reveal
              delay={0.2}
              className="order-2 lg:order-none lg:col-start-2 lg:row-start-1 lg:row-span-2 h-full w-full"
            >
              <div className="relative w-full h-full aspect-[4/3] md:aspect-[16/9] lg:aspect-auto overflow-hidden">
                <div className="absolute inset-x-[5%] top-0 bottom-0 md:inset-x-[3%] lg:inset-x-0">
                  <div className="relative w-full h-full overflow-hidden rounded-[20px] lg:rounded-none">
                    <Image
                      src={resolved.image}
                      alt={resolved.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          )}

          <div className="order-3 px-[5%] md:px-[3%] py-10 lg:pt-6 lg:pb-24 lg:pr-[3%] flex flex-col justify-end">
            <Reveal>
              <div className="flex flex-col gap-6 mt-0 lg:mt-5">
                <p className="text-[15px] md:text-lg text-black leading-[1.2] tracking-tight max-w-none lg:max-w-[540px] whitespace-pre-line">
                  {resolved.description}
                </p>
                {resolved.ctaText && resolved.ctaHref && (
                  <CtaButton
                    href={resolved.ctaHref}
                    text={resolved.ctaText}
                    className="capitalize self-start"
                  />
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </Fade>
  );
}

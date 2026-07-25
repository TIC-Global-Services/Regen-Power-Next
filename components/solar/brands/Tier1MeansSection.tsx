import React from "react";
import Image from "next/image";
import Reveal from "@/reuseables/Reveal";
import Fade from "@/reuseables/fade";
import SectionHeader from "@/reuseables/SectionHeader";
import MissingImage from "@/reuseables/MissingImage";
import type { ResolvedBrandsTier1Means } from "@/lib/strapi/resolvers/brands";

interface Tier1MeansSectionProps {
  resolved: ResolvedBrandsTier1Means;
}

const Tier1MeansSection: React.FC<Tier1MeansSectionProps> = ({ resolved }) => {
  const imgUrl = resolved.image?.src;
  const isImageLeft = (resolved.imagePosition ?? "left") === "left";

  const titleParts = (resolved.title ?? "").split(/\s*\u2014\s*/);
  const firstPart = titleParts[0] ?? "";
  const secondPart = titleParts.length > 1 ? titleParts.slice(1).join(" \u2014 ") : "";

  return (
    <section className="bg-white border-t border-gray-50 min-h-screen flex items-stretch">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch w-full min-h-screen">
        <Reveal
          className={`relative w-full min-h-[350px] lg:h-screen overflow-hidden ${isImageLeft ? "lg:order-first" : "lg:order-last"}`}
        >
          {imgUrl ? (
            <Image
              src={imgUrl}
              alt="Tier-1 Solar Panels"
              fill
              className="object-cover"
              priority
            />
          ) : (
            <MissingImage
              label="Tier-1 image"
              aspect="aspect-auto h-full"
            />
          )}
        </Reveal>

        <div
          className={`flex flex-col py-16 lg:py-24 px-8 md:px-16 ${isImageLeft ? "lg:pl-12 lg:pr-20" : "lg:pl-20 lg:pr-12"} text-left h-full lg:h-screen lg:min-h-screen justify-between`}
        >
          <div>
            <SectionHeader
              subtitle={resolved.subtitle ?? ""}
              subtitleClass="text-base md:text-xl lg:text-2xl normal-case mb-4 block text-black font-medium"
              title={
                <>
                  <span className="text-[#63B846]">{firstPart}</span>
                  {secondPart && (
                    <>
                      <br />
                      <span className="text-black">{secondPart}</span>
                    </>
                  )}
                </>
              }
              titleClass="text-4xl md:text-5xl lg:text-[3.125rem] font-normal leading-none tracking-tight mb-6"
              align="left"
            />
          </div>

          <div className="mt-12 lg:mt-24">
            <Fade delay={0.2}>
              <div className="text-sm md:text-xl leading-tight">
                {resolved.description ?? ""}
              </div>
            </Fade>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tier1MeansSection;

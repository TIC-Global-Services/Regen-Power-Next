import React from "react";
import Image from "next/image";
import CtaButton from "@/reuseables/CtaButton";
import type { ResolvedRebatesLoanBenefits } from "@/lib/strapi/resolvers/rebates";

interface Props {
  resolved: ResolvedRebatesLoanBenefits;
}

export default function LoanBenefitsSection({ resolved }: Props) {
  const bgImg = resolved.bgImage;

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {bgImg ? (
          <Image
            src={bgImg.src}
            alt={bgImg.alt}
            fill
            className="object-cover object-bottom"
          />
        ) : (
          <div className="absolute inset-0 bg-gray-900" />
        )}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 w-full px-[5%] mt-15">
        <div className="mx-auto text-center flex flex-col items-center">
          {resolved.badge && (
            <span className="mb-4 inline-flex rounded-full bg-[#E5DDD8] px-5 py-2 text-xs font-medium uppercase tracking-wide text-black">
              {resolved.badge}
            </span>
          )}

          <h2 className="text-2xl md:text-3xl lg:text-[1.750rem] tracking-tighter leading-tight text-white">
            {resolved.subtitle && (
              <>{resolved.subtitle}<br /></>
            )}
            {resolved.title && (
              <span className="text-[#63B846] font-medium text-4xl md:text-[3.75rem] tracking-tighter">
                {resolved.title}
              </span>
            )}
          </h2>

          {resolved.description && (
            <p className="text-sm md:text-xl leading-snug tracking-tight mt-3 mb-5 text-white/90 max-w-3xl">
              {resolved.description}
            </p>
          )}

          <div className="mt-12 flex flex-wrap justify-center items-center gap-4 max-w-5xl mx-auto">
            {resolved.benefits.map((benefit, idx) => (
              <article
                key={idx}
                className="w-[240px] h-[20dvh] rounded-[8px] border border-white/20 bg-white/12 p-4 backdrop-blur-md flex flex-col text-left"
              >
                <h3 className="text-[1.375rem] tracking-tight text-white">{benefit.title}</h3>
                <p className="text-sm leading-tight text-white">{benefit.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import CtaButton from "@/reuseables/CtaButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import type { ResolvedRebatesLoanBenefits } from "@/lib/strapi/resolvers/rebates";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface Props {
  resolved: ResolvedRebatesLoanBenefits;
}

export default function LoanBenefitsSection({ resolved }: Props) {
  const bgImg = resolved.bgImage;

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {bgImg ? (
          <img
            src={bgImg.src}
            alt={bgImg.alt}
            className="w-full h-full absolute inset-0 object-cover object-bottom"
          />
        ) : (
          <div className="absolute inset-0 bg-gray-900" />
        )}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 w-full px-[5%] md:px-[3%] mt-15">
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
            <p className="text-sm md:text-xl leading-tight tracking-tight mt-3 mb-5 text-white/90 max-w-4xl">
              {resolved.description}
            </p>
          )}

          {/* Desktop: grid of benefits */}
          <div className="hidden md:flex flex-wrap justify-center items-center gap-4 max-w-5xl mx-auto mt-12">
            {resolved.benefits.map((benefit, idx) => (
              <article
                key={idx}
                className="w-[240px] h-[180px] rounded-[8px] border border-white/20 bg-white/12 p-4 backdrop-blur-md flex flex-col justify-center text-left"
              >
                <h3 className="text-[1.375rem] tracking-tight text-white font-medium">{benefit.title}</h3>
                <p className="text-sm leading-tight text-white">{benefit.description}</p>
              </article>
            ))}
          </div>

          {/* Mobile: Autoplay Swiper slider */}
          <div className="block md:hidden w-full relative mt-8 -mx-[5vw]">
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={16}
              slidesPerView={1.25}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              loop={resolved.benefits.length > 1}
              pagination={{ clickable: true }}
              className="w-full px-[5vw] !pb-12"
              style={{
                "--swiper-pagination-color": "#63B846",
                "--swiper-pagination-bullet-inactive-color": "#ffffff",
                "--swiper-pagination-bullet-inactive-opacity": "0.4",
              } as React.CSSProperties}
            >
              {resolved.benefits.map((benefit, idx) => (
                <SwiperSlide key={idx} className="h-auto flex pb-2">
                  <article
                    className="w-full rounded-[8px] border border-white/20 bg-white/12 p-5 backdrop-blur-md flex flex-col justify-center text-left min-h-[180px]"
                  >
                    <h3 className="text-[1.25rem] tracking-tight text-white mb-2 font-medium">{benefit.title}</h3>
                    <p className="text-sm leading-snug text-white/90">{benefit.description}</p>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}

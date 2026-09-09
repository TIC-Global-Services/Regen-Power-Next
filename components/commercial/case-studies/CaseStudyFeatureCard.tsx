"use client";

import React from "react";
import Image from "next/image";

interface Props {
  image?: string | null;
  alt?: string;
  badge?: string;
}

export default function CaseStudyFeatureCard({ image, alt = "Project overview", badge }: Props) {
  return (
    <section className="px-[5%] md:px-[3%] pb-16 md:pb-16">
      <div className="relative w-full h-[240px] sm:h-[340px] md:h-[420px]  rounded-[20px] overflow-hidden bg-[#EEF5EA] border border-[#DCE8D8]">
        {image && image !== "/portfolio_hero.png" ? (
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="object-cover object-center filter brightness-[0.98] transition-transform duration-700 hover:scale-[1.02]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#EEF5EA] via-[#E4EFE0] to-[#D9E9D2]">
            <div className="text-center p-8">
              <span className="inline-block text-xs uppercase tracking-widest text-[#4d7a17] font-semibold px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-sm mb-3">
                {badge || "Regen Commercial Engineering"}
              </span>
              <p className="text-xl md:text-2xl font-light text-neutral-800 tracking-tight max-w-lg mx-auto">
                Engineered for maximum reliability, durability, and commercial return on investment.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

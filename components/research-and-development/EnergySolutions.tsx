import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { ResolvedEnergySolutionsSection } from '@/lib/strapi/resolvers/research';

interface Props {
  resolved: ResolvedEnergySolutionsSection;
}

const EnergySolutions = ({ resolved }: Props) => {
  return (
    <section className="w-full px-[5%] py-12 md:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 md:mb-12">
          <p className="text-2xl md:text-3xl font-light tracking-tight text-black mb-1">
            {resolved.subtitle}
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-[#63B846]">
            {resolved.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {resolved.items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="group relative block rounded-2xl overflow-hidden aspect-[3/4] md:aspect-[4/5]"
            >
              <Image
                src={item.image?.src ?? ''}
                alt={item.image?.alt ?? item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-white">
                <h3 className="text-lg md:text-xl font-medium tracking-tight leading-tight mb-2">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm leading-snug tracking-tight text-white/85 max-w-full">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnergySolutions;

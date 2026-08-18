import React from 'react';
import Image from 'next/image';
import SectionHeader from './SectionHeader';
import type { ResolvedSharedCategorySection } from '@/lib/strapi/resolvers/shared';

interface Props {
  resolved: ResolvedSharedCategorySection;
}

export default function CategorySection({ resolved }: Props) {
  return (
    <section className="py-16 md:py-24 bg-white px-[3%]">
      <SectionHeader
        subtitle={resolved.subtitle}
        title={resolved.title}
        align="center"
      />
      <div className="space-y-16 mt-12">
        {resolved.categories.map((cat, catIdx) => (
          <div key={catIdx}>
            <h3 className="text-2xl md:text-3xl font-medium text-black mb-6">{cat.label}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cat.items.map((item, itemIdx) => (
                <div key={itemIdx} className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                  {item.image && (
                    <div className="relative w-full aspect-[16/10]">
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                    </div>
                  )}
                  <div className="p-5">
                    <h4 className="text-lg font-medium text-black">{item.title}</h4>
                    {item.description && (
                      <p className="mt-2 text-sm text-black/70">{item.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

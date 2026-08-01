'use client';

import React from 'react';
import type { PortfolioItem } from '@/utils/portfolio.model';
import { PortfolioCard, FeaturedPortfolioCard } from './PortfolioCard';

export interface PortfolioGridProps {
  items: PortfolioItem[];
}

const PortfolioGrid: React.FC<PortfolioGridProps> = ({ items }) => {
  if (items.length === 0) {
    return (
      <section className="w-full px-[5%] py-8 md:py-12">
        <div className="max-w-7xl mx-auto text-center py-16">
          <p className="text-base text-black/60 tracking-tight">
            No projects match the current filters.
          </p>
        </div>
      </section>
    );
  }

  const [featured, ...rest] = items;

  return (
    <section className="w-full px-[5%] py-8 md:py-12">
      <div className="max-w-7xl mx-auto">
        {/* First row: 1 featured (2-col span) + up to 2 regular cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          <FeaturedPortfolioCard
            image={featured.image}
            imageAlt={featured.title}
            title={featured.title}
            description={featured.categories.join(' · ')}
            href={featured.link}
          />
          {rest.slice(0, 2).map((item) => (
            <PortfolioCard
              key={item.id}
              image={item.image}
              imageAlt={item.title}
              title={item.title}
              href={item.link}
            />
          ))}
        </div>

        {/* Remaining rows */}
        {rest.length > 2 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mt-5 md:mt-6">
            {rest.slice(2).map((item) => (
              <PortfolioCard
                key={item.id}
                image={item.image}
                imageAlt={item.title}
                title={item.title}
                href={item.link}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioGrid;

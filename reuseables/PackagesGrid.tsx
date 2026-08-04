import React from 'react';
import Reveal from '@/reuseables/Reveal';
import SectionHeader from '@/reuseables/SectionHeader';

interface PackageItem {
  label: string;
  value: string;
}

interface Package {
  title: string;
  desc: string;
  bgClass: string;
  items: PackageItem[];
}

interface PackagesGridProps {
  subtitle: string;
  title: string;
  description?: string;
  packages: Package[];
  className?: string;
}

const PackagesGrid: React.FC<PackagesGridProps> = ({
  subtitle,
  title,
  description,
  packages,
  className = ''
}) => {
  return (
    <section className={`py-10 md:py-20 bg-white border-t border-gray-50 ${className}`}>
      <div className="px-[5%] mx-auto">

        {/* Header Section */}
        <SectionHeader
          subtitle={subtitle}
          title={title}
          description={description}
          align="center"
          className="mx-auto mb-16"
        />

        {/* 3-Column Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-start max-w-7xl mx-auto">
          {packages.map((pkg, idx) => (
            <Reveal
              key={idx}
              delay={idx * 0.1}
              className={`rounded-[20px] p-8 md:p-10 flex flex-col justify-start shadow-sm transition-all duration-300 hover:shadow-lg w-full max-w-[434px] min-h-[380px] lg:h-[540px] overflow-hidden mx-auto
                ${pkg.bgClass}
              `}
            >
              {/* Title & Desc */}
              <div className="mb-6">
                <h3 className="text-3xl md:text-[2.125rem] font-bold mb-1 tracking-tight">
                  {pkg.title}
                </h3>
                <p className={`text-sm md:text-base leading-tight text-black max-w-xs`}>
                  {pkg.desc}
                </p>
              </div>

              {/* Items List */}
              <div className="space-y-2 flex-grow">
                {pkg.items.map((item, itemIdx) => (
                  <div key={itemIdx}>
                    <h4 className="text-xl font-bold text-black mb-0.5">
                      {item.label}
                    </h4>
                    <p className="text-sm md:text-base leading-snug text-black/80 font-normal">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PackagesGrid;

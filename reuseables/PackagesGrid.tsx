import React from 'react';
import Reveal from '@/reuseables/Reveal';
import SectionHeader from '@/reuseables/SectionHeader';
import CtaButton from '@/reuseables/CtaButton';

interface PackageItem {
  label: string;
  value: string;
}

interface Package {
  title: string;
  desc: string;
  bgClass: string;
  items: PackageItem[];
  ctaText?: string;
  ctaHref?: string;
}

interface PackagesGridProps {
  subtitle: string;
  title: string;
  description?: string;
  packages: Package[];
  notes?: string[];
  className?: string;
}

const PackagesGrid: React.FC<PackagesGridProps> = ({
  subtitle,
  title,
  description,
  packages,
  notes,
  className = ''
}) => {
  return (
    <section className={`py-10 md:py-10 bg-white border-t border-gray-50 ${className}`}>
      <div className="px-[5%] md:px-[3%] mx-auto">

        {/* Header Section */}
        <SectionHeader
          subtitle={subtitle}
          title={title}
          description={description}
          align="left"
          subtitleClass="text-base md:text-2xl font-light text-black tracking-tight"
          titleClass="text-[2.5rem] md:text-6xl lg:text-[4.5rem] text-[#63B846] font-normal leading-none"
          className="mb-16 lg:hidden"
        />
        <SectionHeader
          subtitle={subtitle}
          title={title}
          description={description}
          align="center"
          descClass='mx-auto md:text-base'
          subtitleClass="text-base md:text-[1.75rem] font-light text-black tracking-tight"
          titleClass="text-[2.5rem] md:text-6xl text-[#63B846] font-normal leading-none"
          className="mb-16 hidden lg:block"
        />

        {/* 3-Column Card Layout */}
        <div className="grid grid-cols-1 w-full lg:grid-cols-3 gap-4 lg:justify-center lg:items-stretch">
          {packages.map((pkg, idx) => {
            const isHighlight = pkg.bgClass.includes('A0CF44');
            return (
            <Reveal
              key={idx}
              delay={idx * 0.1}
              className={`rounded-[20px] p-8 md:p-10 flex flex-col justify-between transition-all duration-300 hover:brightness-95 w-full h-full min-h-[380px] overflow-hidden mx-auto
                ${pkg.bgClass || 'bg-[#EEF6EB]'}
              `}
            >
              {/* Title & Desc */}
              <div className="mb-6">
                <h3 className="text-3xl md:text-[2.5rem] mb-3 tracking-tight">
                  {pkg.title}
                </h3>
                <p className={`text-sm md:text-base leading-tight text-black`}>
                  {pkg.desc}
                </p>
              </div>

              {/* Items List */}
              <div className="space-y-2">
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

              {pkg.ctaText && pkg.ctaHref && (
                <CtaButton
                  href={pkg.ctaHref}
                  text={pkg.ctaText}
                  className="mt-6 capitalize self-start"
                  iconBgClass="bg-black"
                  iconTextColor="text-white"
                  {...(isHighlight
                    ? { bgClass: 'bg-white', borderClass: 'border border-white', hoverClass: 'hover:bg-white/90' }
                    : {})}
                />
              )}

            </Reveal>
            );
          })}
        </div>

        {notes && notes.length > 0 && (
          <div className="mt-12 md:mt-16 max-w-6xl mx-auto space-y-4">
            {notes.map((note, idx) => (
              <p
                key={idx}
                className="text-center text-sm md:text-lg leading-relaxed text-black/70 font-light tracking-tight"
              >
                {note}
              </p>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default PackagesGrid;

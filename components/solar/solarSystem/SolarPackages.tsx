import React from "react";
import Reveal from "@/reuseables/Reveal";
import SectionHeader from "@/reuseables/SectionHeader";
import type { ResolvedSolarPackages } from "@/lib/strapi/resolvers/solar";

interface SolarPackagesProps {
  resolved: ResolvedSolarPackages;
}

const SolarPackages: React.FC<SolarPackagesProps> = ({ resolved }) => {
  const packages = resolved.packages.map((p) => ({
    title: p.title,
    desc: p.description,
    bgClass: p.bgClass,
    items: p.items,
  }));

  return (
    <section className="py-10 md:py-20 bg-white border-t border-gray-50">
      <div className="px-[5%] md:px-[3%] mx-auto">

        {/* Header Section */}
        <SectionHeader
          subtitle={resolved.subtitle}
          title={resolved.title}
          description={resolved.description}
          align="center"
          titleClass="text-[3.125rem] md:text-[5rem]"
          subtitleClass="font-normal text-xl md:text-[2.125rem]"
          descClass="max-w-5xl"
          className="mx-auto mb-16 hidden md:block"
        />
        <SectionHeader
          subtitle={resolved.subtitle}
          title={resolved.title}
          description={resolved.description}
          align="left"
          titleClass="text-[3.125rem] md:text-[5rem]"
          subtitleClass="font-normal text-xl md:text-[2.125rem]"
          descClass="max-w-5xl"
          className="mx-auto mb-16 md:hidden"
        />

        {/* Card Layout: 2-col on desktop, stacked on mobile */}
        <div className="md:grid grid-cols-1 lg:grid-cols-3 gap-4 justify-center items-start">
          {packages.map((pkg, idx) => (
            <Reveal
              key={idx}
              delay={idx * 0.1}
              className={`rounded-[20px] p-8 md:p-10 flex flex-col justify-start shadow-sm transition-all duration-300 hover:shadow-lg w-full h-full lg:max-h-[540px] mb-4 md:mb-0 overflow-hidden mx-auto
                ${pkg.bgClass}
              `}
            >
              {/* Title & Desc */}
              <div className="mb-6">
                <h3 className="text-3xl md:text-[2.125rem] font-bold mb-1 tracking-tight">
                  {pkg.title}
                </h3>
                <p className="text-sm md:text-base leading-tight text-black max-w-xs">
                  {pkg.desc}
                </p>
              </div>

              {/* Items List */}
              <div className="space-y-2 flex-grow">
                {pkg.items.map((item, itemIdx) => (
                  <div key={itemIdx}>
                    <h4 className="text-xl font-bold text-black mb-2">
                      {item.label}
                    </h4>
                    <p className="text-sm md:text-base leading-tight text-black font-normal">
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

export default SolarPackages;

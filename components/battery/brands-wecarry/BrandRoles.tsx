import React from 'react';
import Image, { StaticImageData } from 'next/image';

export interface BrandRolesData {
  title: string;
  subtitle?: string;
  description: string;
  image: string | StaticImageData;
  bulletTitle: string;
  bulletDescription: string;
  highlightText: string;
}

export interface BrandRolesProps {
  data: BrandRolesData;
}

const BrandRoles: React.FC<BrandRolesProps> = ({ data }) => {
  if (!data) return null;

  return (
    <section className="w-full bg-[#F7FBF5] px-[5%] py-16 md:py-24 font-sans border-t border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left Column: Image */}
          <div className="lg:col-span-6 relative w-full h-[320px] md:h-[450px] lg:h-[550px] rounded-[30px] overflow-hidden">
            <Image
              src={data.image}
              alt={data.title}
              fill
              className="object-cover"
              sizes="(max-w-1024px) 100vw, 50vw"
            />
          </div>

          {/* Right Column: Text Content */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {data.subtitle && (
              <p className="text-[#63B846] text-lg md:text-xl font-semibold mb-2 tracking-tight uppercase">
                {data.subtitle}
              </p>
            )}
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-light text-black mb-6 leading-tight tracking-tight">
              {data.title}
            </h2>
            <p className="text-sm md:text-base text-black/80 font-normal leading-relaxed mb-6">
              {data.description}
            </p>

            {/* Sub-item Details */}
            <div className="mb-8">
              <h3 className="text-xl md:text-2xl font-semibold text-black mb-3">
                {data.bulletTitle}
              </h3>
              <p className="text-sm md:text-base text-black/80 font-normal leading-relaxed">
                {data.bulletDescription}
              </p>
            </div>

            {/* Highlight Box at the Bottom */}
            <div className="bg-[#EEF6EB] border-l-4 border-[#63B846] rounded-r-2xl p-6">
              <p className="text-sm md:text-base text-[#63B846] font-semibold leading-relaxed">
                {data.highlightText}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BrandRoles;

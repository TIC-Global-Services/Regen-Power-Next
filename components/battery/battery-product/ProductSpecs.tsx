import React from 'react';
import Image, { StaticImageData } from 'next/image';

export interface SpecRow {
  label: string;
  value: string;
}

export interface ProductSpecsData {
  topSubtitle: string;
  title: string;
  description?: string;
  image: StaticImageData | string;
  specs: SpecRow[];
}

const ProductSpecs = ({ data }: { data: ProductSpecsData }) => {
  return (
    <section className="bg-white py-16 md:py-24 px-[5%]">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
        {/* Left - Image */}
        <div className="w-full lg:w-1/2">
          <div className="relative w-full min-h-[400px] lg:min-h-[600px] rounded-[20px] overflow-hidden bg-gray-100">
            <Image
              src={data.image}
              alt={data.title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Right - Specs */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <h3 className="text-xl md:text-2xl text-black font-normal mb-1 tracking-tight">
            {data.topSubtitle}
          </h3>
          <h2 className="text-4xl md:text-[4rem] text-[#63B846] font-normal leading-[1] mb-4 tracking-tight">
            {data.title}
          </h2>
          {data.description && (
            <p className="text-base md:text-lg text-black/80 font-normal mb-8 leading-[1.2]">
              {data.description}
            </p>
          )}

          {/* Specs Table */}
          <div className="w-full">
            {data.specs.map((spec, idx) => (
              <div
                key={idx}
                className={`flex justify-between items-center py-4 ${idx !== data.specs.length - 1 ? 'border-b border-gray-200' : ''
                  }`}
              >
                <span className="text-sm md:text-base text-black/60 font-normal">{spec.label}</span>
                <span className="text-sm md:text-base text-black font-medium text-right">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSpecs;

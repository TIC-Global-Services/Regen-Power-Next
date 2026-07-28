import React from 'react';
import Image, { StaticImageData } from 'next/image';

export interface NarrowCategory {
  title: string;
  items: string[];
}

export interface NarrowListsData {
  title: string;
  description: string;
  image: string | StaticImageData;
  categories: NarrowCategory[];
}

export interface NarrowListsProps {
  data: NarrowListsData;
}

const NarrowLists: React.FC<NarrowListsProps> = ({ data }) => {
  if (!data) return null;

  return (
    <section className="w-full bg-[#F7FBF5] px-[5%] py-16 md:py-24 font-sans border-t border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left Column: Image */}
          <div className="lg:col-span-5 relative w-full h-[350px] md:h-[500px] lg:h-[600px] rounded-[30px] overflow-hidden shadow-sm">
            <Image
              src={data.image}
              alt={data.title}
              fill
              className="object-cover"
              sizes="(max-w-1024px) 100vw, 40vw"
            />
          </div>

          {/* Right Column: Recommendations */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-light text-black mb-6 leading-tight tracking-tight">
              {data.title}
            </h2>
            <p className="text-sm md:text-base text-black/85 font-normal leading-relaxed mb-8 max-w-2xl">
              {data.description}
            </p>

            {/* Categories */}
            <div className="space-y-6">
              {data.categories.map((category, index) => (
                <div key={index} className="border-l-4 border-[#63B846] pl-6 py-1">
                  <h3 className="text-lg md:text-xl font-bold text-black mb-2">
                    {category.title}
                  </h3>
                  <ul className="space-y-2">
                    {category.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start text-sm md:text-base text-black/80 font-medium">
                        <span className="text-[#63B846] mr-2 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default NarrowLists;

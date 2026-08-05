import React from 'react';
import Image, { StaticImageData } from 'next/image';
import Fade from '@/reuseables/fade';
import SectionHeader from '@/reuseables/SectionHeader';

export interface LogoItem {
  name: string;
  image: StaticImageData | string;
}

export interface PartnersData {
  subtitle: string;
  title: React.ReactNode;
  partnersTitle: string;
  partners: LogoItem[];
  membershipsTitle: string;
  memberships: LogoItem[];
}

interface PartnersProps {
  data: PartnersData;
}

const Partners = ({ data }: PartnersProps) => {
  return (
    <section className="py-16 md:py-20 bg-white overflow-hidden">
      <div className="px-[5%]">
        {/* Section Header */}
        <SectionHeader
          subtitle={data.subtitle}
          title={data.title}
          align="center"
          subtitleClass="text-xl md:text-[2rem] text-black leading-[0.5] font-normal traking-tight"
          titleClass="text-[3.125rem] md:text-4xl lg:text-[5rem] font-light text-[#63B846] leading-none md:leading-tight tracking-tight"
          className="mb-16 md:mb-20 mx-auto"
        />
        <Fade>
          <div className="max-w-3xl mx-auto">
            {/* Partners Sub-section */}
            <div className="md:mb-16 mb-5">
              <h3 className="text-xl md:text-4xl font-light text-black text-center mb-4 md:mb-8 tracking-tight">
                {data.partnersTitle}
              </h3>
              <div className="grid grid-cols-6 border-b border-gray-200">
                {data.partners.map((partner, index) => (
                  <div
                    key={index}
                    className={`col-span-3 flex items-center justify-center p-0 md:p-8 hover:-translate-y-0.5 transition-all duration-300 ${index > 0 ? "border-l border-gray-200" : ""
                      }`}
                  >
                    <div className="relative h-[20dvh] md:h-40 w-[12dvh] md:w-40">
                      <Image
                        src={partner.image}
                        alt={partner.name}
                        fill
                        className="md:object-cover object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Memberships Sub-section */}
            <div>
              <h3 className="text-xl md:text-4xl font-light text-black text-center mb-4 md:mb-8 tracking-tight">
                {data.membershipsTitle}
              </h3>
              <div className="grid grid-cols-6 border-b border-gray-200">
                {data.memberships.map((membership, index) => (
                  <div
                    key={index}
                    className={`col-span-2 flex items-center justify-center p-3 md:p-8 hover:-translate-y-0.5 transition-all duration-300 ${index > 0 ? "border-l border-gray-200" : ""
                      }`}
                  >
                    <div className="relative h-[12dvh] md:h-40 w-[16dvh] md:w-40">
                      <Image
                        src={membership.image}
                        alt={membership.name}
                        fill
                        className="md:object-cover object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Fade>
      </div>

    </section>
  );
};

export default Partners;

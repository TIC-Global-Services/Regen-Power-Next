import React from 'react';
import Image, { StaticImageData } from 'next/image';

export interface CertificationItem {
  title: string;
}

export interface WhyOurInstallerData {
  title: string;
  subtitle: string;
  certifications: CertificationItem[];
  whyMattersTitle: string;
  whyMattersDescription: string;
  image: StaticImageData | string;
  imageAlt?: string;
}

const WhyOurInstaller: React.FC<{ data: WhyOurInstallerData }> = ({ data }) => {
  if (!data) return null;

  return (
    <section className="bg-white border-t border-gray-50 flex items-stretch w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch w-full">
        
        {/* Text Column */}
        <div className="flex flex-col justify-center py-16 lg:py-24 px-8 md:px-16 lg:pl-[8%] lg:pr-12 text-left">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl lg:text-[3.125rem] font-normal leading-none tracking-tight mb-2 text-[#63B846] whitespace-pre-line">
              {data.title}
            </h2>
            
            <p className="text-sm md:text-xl leading-[1.2] text-gray-800 font-light mb-10">
              {data.subtitle}
            </p>

            <ul className="mb-10 text-gray-700 font-light text-sm md:text-[1.375rem] leading-[1.3] list-none max-w-lg">
              {data.certifications.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="mr-2 text-black font-normal">•</span>
                  <span>
                    <strong className="font-normal tracking-tight text-black">{item.title}</strong>
                   
                  </span>
                </li>
              ))}
            </ul>

            <div className="border-t border-gray-100 pt-8 mt-8">
              <h4 className="text-xl md:text-3xl font-normal text-black mb-3">
                {data.whyMattersTitle}
              </h4>
              <p className=" font-light text-base md:text-xl leading-[1.2]">
                {data.whyMattersDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Image Column */}
        <div className="relative w-full min-h-[350px] lg:h-screen overflow-hidden">
          <Image
            src={data.image}
            alt={data.imageAlt || 'Why Our Installer Certifications Matter'}
            fill
            className="object-cover"
            priority
          />
        </div>

      </div>
    </section>
  );
};

export default WhyOurInstaller;
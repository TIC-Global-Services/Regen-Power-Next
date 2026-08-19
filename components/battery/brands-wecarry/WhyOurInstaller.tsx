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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0 items-stretch w-full">
        
        {/* Text Column */}
        <div className="flex flex-col justify-between pt-4 pb-16 lg:py-10 px-5 md:px-10 lg:pl-12 lg:pr-20 text-left order-2 lg:order-1">
          {/* Top block: title + subtitle */}
          <div className="max-w-2xl">
            <h2 className="text-[2.5rem] md:text-5xl lg:text-[3.125rem] font-normal leading-none tracking-tight mb-2 text-[#63B846] whitespace-pre-line">
              {data.title}
            </h2>

            <p className="text-base md:text-xl leading-[1.2] font-light">
              {data.subtitle}
            </p>
          </div>

          {/* Middle block: certifications */}
          <ul className="font-light text-base md:text-[1.375rem] leading-[1.3] list-none max-w-lg">
            {data.certifications.map((item, idx) => (
              <li key={idx} className="flex items-start">
                <span className="mr-2 text-black font-normal">•</span>
                <span>
                  <strong className="font-normal tracking-tight text-black">{item.title}</strong>
                </span>
              </li>
            ))}
          </ul>

          {/* Bottom block: why it matters */}
          <div className="max-w-2xl">
            <h4 className="text-2xl md:text-3xl font-normal text-black mb-3">
              {data.whyMattersTitle}
            </h4>
            <p className="font-light text-base md:text-xl leading-[1.2]">
              {data.whyMattersDescription}
            </p>
          </div>
        </div>

        {/* Image Column */}
        <div className="relative h-[450px] lg:h-screen overflow-hidden rounded-[20px] lg:rounded-none order-1 lg:order-2 px-5 md:px-16 lg:px-0">
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
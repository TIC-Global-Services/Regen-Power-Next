import React from 'react';
import { type StaticImageData } from 'next/image';
import Reveal from '@/reuseables/Reveal';
import Fade from '@/reuseables/fade';
import SectionHeader from '@/reuseables/SectionHeader';

export interface FullscreenSplitSectionProps {
  subtitle: string;
  title: React.ReactNode;
  description: React.ReactNode;
  image: StaticImageData | string;
  imageAlt?: string;
  imagePosition?: 'left' | 'right';
  textArrangement?: 'split' | 'center';
  badge?: string;
}

const  FullscreenSplitSection: React.FC<FullscreenSplitSectionProps> = ({
  subtitle,
  title,
  description,
  image,
  imageAlt = "Feature Image",
  imagePosition = 'left',
  textArrangement = 'split',
  badge
}) => {
  const isImageLeft = imagePosition === 'left';
  const isSplit = textArrangement === 'split';
  const imgSrc = (typeof image === 'object' && image !== null && 'src' in image ? image.src : image) || '/fallback.png';

  return (
    <section className="min-h-screen flex items-stretch overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch w-full min-h-screen">

        {/* Image Column */}
        <Reveal
          className={`w-full pt-6 px-5 md:px-16 lg:px-0 lg:py-0 min-h-[350px] lg:h-screen ${
            isImageLeft ? 'lg:order-first' : 'lg:order-last'
          }`}
        >
          <div className="relative w-full h-full min-h-[350px] rounded-[24px] lg:rounded-none overflow-hidden bg-gray-50">
            <img
              src={imgSrc}
              alt={imageAlt}
              className="object-cover w-full h-full absolute inset-0"
            />
          </div>
        </Reveal>

        {/* Text Column */}
        <div
          className={`flex flex-col pt-4 pb-16 lg:py-24 px-5 md:px-10 ${isImageLeft ? 'lg:pl-12 lg:pr-20' : 'lg:pl-20 lg:pr-12'
            } text-left h-full lg:h-screen lg:min-h-screen ${isSplit ? 'justify-between' : 'justify-center'
            }`}
        >
          {isSplit ? (
            <>
              <div>
                {badge && (
                  <span className="mb-6 inline-flex rounded-full bg-[#E5DDD8] px-5 py-2 text-xs font-medium uppercase tracking-wide text-black">
                    {badge}
                  </span>
                )}
                <SectionHeader
                  subtitle={subtitle}
                  title={title}
                  align="left"
                  subtitleClass="text-xl md:text-xl lg:text-2xl normal-case mb-4 block text-black font-medium"
                  titleClass="text-[2.5rem] md:text-5xl lg:text-[3.125rem] font-normal leading-none tracking-tight mb-2 text-[#63B846]"
                />
              </div>

              <div className="mt-2 lg:mt-24">
                <Fade delay={0.2}>
                  <div className="text-base md:text-xl leading-tight">
                    {description}
                  </div>
                </Fade>
              </div>
            </>
          ) : (
            <div>
              {badge && (
                <span className="mb-6 inline-flex rounded-full bg-[#E5DDD8] px-5 py-2 text-xs font-medium uppercase tracking-wide text-black">
                  {badge}
                </span>
              )}
              <SectionHeader
                subtitle={subtitle}
                title={title}
                align="left"
                subtitleClass="text-base md:text-xl lg:text-2xl font-medium normal-case"
                titleClass="text-4xl md:text-5xl lg:text-[4.5rem] font-normal leading-none tracking-tight mb-6 text-[#63B846]"
              />
              <div className="mt-6">
                <Fade delay={0.2}>
                  <p className="text-sm md:text-xl leading-tight text-gray-800 font-light">
                    {description}
                  </p>
                </Fade>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default FullscreenSplitSection;

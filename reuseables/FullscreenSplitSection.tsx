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

  /* ---- Per-section customisation hooks (appended to defaults) ---- */
  /** Root <section> */
  className?: string;
  /** Grid wrapper */
  gridClassName?: string;
  /** Image column (Reveal wrapper) */
  imageColumnClassName?: string;
  /** Image container div */
  imageClassName?: string;
  /** The <img> element itself */
  imageImgClassName?: string;
  /** Text column */
  textColumnClassName?: string;
  /** SectionHeader subtitle */
  subtitleClass?: string;
  /** SectionHeader title */
  titleClass?: string;
  /** Description text */
  descriptionClass?: string;
  /** Badge pill */
  badgeClassName?: string;
}

const FullscreenSplitSection: React.FC<FullscreenSplitSectionProps> = ({
  subtitle,
  title,
  description,
  image,
  imageAlt = "Feature Image",
  imagePosition = 'left',
  textArrangement = 'split',
  badge,
  className = '',
  gridClassName = '',
  imageColumnClassName = '',
  imageClassName = '',
  imageImgClassName = '',
  textColumnClassName = '',
  subtitleClass = '',
  titleClass = '',
  descriptionClass = '',
  badgeClassName = '',
}) => {
  const isImageLeft = imagePosition === 'left';
  const isSplit = textArrangement === 'split';
  const imgSrc = (typeof image === 'object' && image !== null && 'src' in image ? image.src : image) || '/fallback.png';

  return (
    <section className={`min-h-screen flex items-stretch overflow-hidden ${className}`}>
      <div className={`grid grid-cols-1 lg:grid-cols-2 items-stretch w-full min-h-screen ${gridClassName}`}>

        {/* Image Column */}
        <Reveal
          className={`w-full pt-6 px-5 md:px-16 lg:px-0 lg:py-0 h-[450px] lg:h-screen ${
            isImageLeft ? 'lg:order-first' : 'lg:order-last'
          } ${imageColumnClassName}`}
        >
          <div className={`relative w-full h-full min-h-[350px] rounded-[20px] lg:rounded-none overflow-hidden bg-gray-50 ${imageClassName}`}>
            <img
              src={imgSrc}
              alt={imageAlt}
              className={`object-cover w-full h-full absolute inset-0 ${imageImgClassName}`}
            />
          </div>
        </Reveal>

        {/* Text Column */}
        <div
          className={`flex flex-col pt-4 pb-16 lg:py-24 px-5 md:px-10 ${isImageLeft ? 'lg:pl-12 lg:pr-15' : 'lg:pl-15 lg:pr-12'
            } text-left h-full lg:h-screen lg:min-h-screen ${isSplit ? 'justify-between' : 'justify-center'
            } ${textColumnClassName}`}
        >
          {isSplit ? (
            <>
              <div>
                {badge && (
                  <span className={`mb-2 inline-flex rounded-full bg-[#E5DDD8] px-5 py-2 text-xs font-medium uppercase tracking-wide text-black ${badgeClassName}`}>
                    {badge}
                  </span>
                )}
                <SectionHeader
                  subtitle={subtitle}
                  title={title}
                  align="left"
                  subtitleClass={`text-xl md:text-xl lg:text-2xl capitalize block text-black font-medium ${subtitleClass}`}
                  titleClass={`text-[2.5rem] md:text-5xl lg:text-[3.125rem] font-normal leading-tight tracking-tight mb-2 text-[#63B846] ${titleClass}`}
                />
              </div>

              <div className="mt-2 lg:mt-24">
                <Fade delay={0.2}>
                  <div className={`text-base md:text-2xl tracking-tight leading-tight ${descriptionClass}`}>
                    {description}
                  </div>
                </Fade>
              </div>
            </>
          ) : (
            <div>
              {badge && (
                <span className={`mb-6 inline-flex rounded-full bg-[#E5DDD8] px-5 py-2 text-xs font-medium uppercase tracking-wide text-black ${badgeClassName}`}>
                  {badge}
                </span>
              )}
              <SectionHeader
                subtitle={subtitle}
                title={title}
                align="left"
                subtitleClass={`text-base md:text-[2.125rem] font-medium normal-case ${subtitleClass}`}
                titleClass={`text-4xl md:text-5xl lg:text-[4.5rem] font-normal leading-none tracking-tight mb-6 text-[#63B846] ${titleClass}`}
              />
              <div className="mt-6 max-w-xl">
                <Fade delay={0.2}>
                  <p className={`text-sm md:text-xl tracking-tight leading-tight ${descriptionClass}`}>
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

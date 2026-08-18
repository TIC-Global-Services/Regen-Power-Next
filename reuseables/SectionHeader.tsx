import React from 'react';
import Reveal from '@/reuseables/Reveal';
import Fade from '@/reuseables/fade';

interface SectionHeaderProps {
  subtitle?: string;
  title: string | React.ReactNode;
  description?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  subtitleClass?: string;
  titleClass?: string;
  descClass?: string;
  badge?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  subtitle,
  title,
  description,
  align = 'center',
  className = '',
  subtitleClass = '',
  titleClass = '',
  descClass = '',
  badge
}) => {
  const alignClass = align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center mx-auto';
  const containerAlign = align === 'left' ? 'items-start' : align === 'right' ? 'items-end' : 'items-center';

  return (
    <div className={`w-full flex flex-col capitalize ${containerAlign} ${alignClass} ${className}`}>
      <Reveal>
        {badge && (
          <span className="mb-2 inline-flex rounded-full bg-[#E1D9D4] px-5 py-2 text-xs font-normal uppercase tracking-tight  text-black">
            {badge}
          </span>
        )}
        {subtitle && (
          <p className={`${subtitleClass ?? 'text-lg md:text-2xl'} leading-[1] tracking-tight font-normal block`}>
            {subtitle}
          </p>
        )}
        <h2 className={`${titleClass || 'text-3xl md:text-[5rem]'} text-[#63B846] tracking-tight leading-[1] font-normal mb-4`}>
          {title}
        </h2>
      </Reveal>
      {description && (
        <Fade delay={0.2}>
          <p className={` ${descClass} text-base leading-tight tracking-tight max-w-3xl `}>
            {description}
          </p>
        </Fade>
      )}
    </div>
  );
};

export default SectionHeader;

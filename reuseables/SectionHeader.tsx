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

const hasSizeClass = (cls: string) => {
  return cls.split(' ').some(c => {
    const clean = c.replace(/^(sm|md|lg|xl|2xl):/, '');
    return clean.startsWith('text-') && !clean.match(/^text-(black|white|gray|red|blue|green|yellow|slate|zinc|neutral|stone|orange|amber|lime|emerald|teal|cyan|sky|indigo|violet|purple|fuchsia|pink|rose|inherit|current|transparent|\[#)/);
  });
};

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

  const defaultSubtitleSize = hasSizeClass(subtitleClass) ? '' : 'text-lg md:text-[2.125rem]';
  const defaultTitleSize = hasSizeClass(titleClass) ? '' : 'text-3xl md:text-4xl lg:text-[5rem]';

  return (
    <div className={`w-full flex flex-col ${containerAlign} ${alignClass} ${className}`}>
      <Reveal>
        {badge && (
          <span className="mb-2 inline-flex rounded-full bg-[#E5DDD8] px-5 py-2 text-xs font-medium uppercase tracking-wide text-black">
            {badge}
          </span>
        )}
        {subtitle && (
          <p className={`${defaultSubtitleSize} text-xl md:text-[2.125rem]  tracking-tight font-normal block ${subtitleClass}`}>
            {subtitle}
          </p>
        )}
        <h2 className={`${defaultTitleSize} text-[3.125rem] md:text-[5rem] text-[#63B846] tracking-tight leading-[1.2] font-normal ${titleClass}`}>
          {title}
        </h2>
      </Reveal>
      {description && (
        <Fade delay={0.2}>
          <p className={`text-lg leading-tight  tracking-tight mt-4  ${descClass}`}>
            {description}
          </p>
        </Fade>
      )}
    </div>
  );
};

export default SectionHeader;

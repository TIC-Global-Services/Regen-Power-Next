import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, LucideIcon } from 'lucide-react';

interface CtaButtonProps {
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  text: string;
  textColor?: string | 'text-white' | 'text-black';
  bgClass?: string;
  borderClass?: string;
  hoverClass?: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  icon?: LucideIcon;
  iconBgClass?: string;
  iconTextColor?: string;
  disabled?: boolean;
  /**
   * Controls the button label size. Replaces the default `text-sm md:text-base`.
   * Pass responsive variants as a single string, e.g. `"text-xs md:text-sm"`.
   */
  textClass?: string;
  /** Additive utility classes appended after the label size (e.g. `whitespace-normal`). */
  buttonTextClass?: string;
}

const CtaButton: React.FC<CtaButtonProps> = ({
  href,
  type = 'button',
  text,
  textColor = 'text-black',
  bgClass = 'bg-[#63B84666] backdrop-blur-md',
  borderClass = 'border border-[#63B846]',
  hoverClass = 'hover:bg-[#63B846] hover:text-black',
  className = 'capitalize',
  onClick,
  icon: Icon = ArrowUpRight,
  iconBgClass = 'bg-[#63B846]',
  iconTextColor = 'text-black',
  disabled = false,
  textClass = 'text-sm ',
  buttonTextClass = '',
}) => {
  const content = (
    <>
      <span className={`pl-4 ${textClass} tracking-tight whitespace-nowrap min-w-0 flex-1 ${buttonTextClass}`}>
        {text}
      </span>
      {/* Icon chip: turns black w/ white glyph when the button is hovered */}
      <div className={`${iconBgClass} ${iconTextColor} group-hover:bg-black group-hover:text-white p-2 rounded-full shrink-0 group-hover:scale-110 transition-all duration-300 flex items-center justify-center`}>
        <Icon size={16} strokeWidth={2.5} />
      </div>
    </>
  );

  const combinedClasses = `inline-flex items-center gap-3 ${bgClass} ${borderClass} ${textColor} px-1.5 py-2 md:py-1.5 rounded-full ${hoverClass} transition-all duration-300 group ${className} ${disabled ? 'opacity-50 pointer-events-none' : ''}`;

  // Protocol links (tel:, mailto:) must bypass the Next.js client-side router
  // and render as plain anchors so the OS handles them natively.
  if (href && /^(tel:|mailto:)/i.test(href)) {
    return (
      <a href={href} onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>} className={combinedClasses}>
        {content}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick as React.MouseEventHandler<HTMLButtonElement>} className={combinedClasses}>
      {content}
    </button>
  );
};

export default CtaButton;

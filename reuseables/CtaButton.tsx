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
}

const CtaButton: React.FC<CtaButtonProps> = ({
  href,
  type = 'button',
  text,
  textColor = 'text-black',
  bgClass = 'bg-[#63B84666] backdrop-blur-md',
  borderClass = 'border border-[#63B846]',
  hoverClass = 'hover:bg-[#8dc63f] hover:text-white',
  className = '',
  onClick,
  icon: Icon = ArrowUpRight,
}) => {
  const content = (
    <>
      <span className="pl-4 text-sm md:text-base tracking-tight whitespace-nowrap">
        {text}
      </span>
      <div className="bg-[#63B846] text-black p-2 rounded-full group-hover:scale-105 group-hover:rotate-45 group-hover:bg-[#63B846]/80 transition-all duration-300 flex items-center justify-center">
        <Icon size={16} strokeWidth={2.5} />
      </div>
    </>
  );

  const combinedClasses = `inline-flex items-center gap-3 ${bgClass} ${borderClass} ${textColor} px-1.5 py-1.5 rounded-full ${hoverClass} transition-all duration-300 group ${className}`;

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

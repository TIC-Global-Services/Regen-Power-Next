'use client';

import React from 'react'
import CtaButton from './CtaButton'
import { ArrowUpRight, Phone } from 'lucide-react'

const PromotionNav = () => {
  const handleScrollToSection = (id: string) => {
    const elements = document.querySelectorAll(`#${id}`);
    const visibleElement = Array.from(elements).find(el => (el as HTMLElement).offsetParent !== null);
    if (visibleElement) {
      visibleElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const handleScrollToQuote = () => handleScrollToSection('quote-form-section');
  return (
    <div className='absolute top-0 left-0 right-0 z-50 w-full py-6 px-[5%] md:px-[3%]'>
      <nav className='flex justify-between items-center max-w-7xl mx-auto'>
        <div className='h-10 md:flex items-center hidden '>
          <img src='/regen_logo_nav.png' className='h-10 w-auto object-contain' alt="Regen Power" />
        </div>
        <div className='h-10 items-center md:hidden '>
          <img src='/regen_logo_footer.png' className='h-10 w-auto object-contain' alt="Regen Power" />
        </div>
        <div className='flex gap-4 items-center'>
          <div className='lg:flex gap-2 hidden'>
            <CtaButton text='About Us' textColor='text-white' bgClass='bg-white/10 backdrop-blur-md border border-white/30' hoverClass='hover:bg-white hover:text-black' textClass="text-xs md:text-sm" onClick={() => handleScrollToSection('about-us')} />
            <CtaButton text='Battery Packages' textColor='text-white' bgClass='bg-white/10 backdrop-blur-md border border-white/30' hoverClass='hover:bg-white hover:text-black' textClass="text-xs md:text-sm" onClick={() => handleScrollToSection('battery-packages')} />
            <CtaButton text='Free Quote' textColor='text-white' onClick={handleScrollToQuote} />
            <CtaButton text='Call 08-9456-3491' textColor='text-white' textClass="text-xs md:text-sm" href="tel:0894563491" icon={Phone} />
          </div>
          <div className='lg:hidden'>
            <div className='flex items-center gap-1.5 md:gap-2'>
              <button
                type="button"
                onClick={() => handleScrollToSection('why-regen-power-mobile')}
                className="
    inline-flex items-center gap-1
    bg-[#63B84666] backdrop-blur-md
    border border-[#63B846]
    text-white
    pl-2.5 pr-1 py-1.5
    rounded-full
    hover:bg-[#8dc63f]
    hover:text-white
    transition-all duration-300
    group
  "
              >
                <span className="text-xs tracking-tight whitespace-nowrap">
                  Explore Packages
                </span>

                <div
                  className="
      bg-[#63B846]
      text-black
      p-1.5
      rounded-full
      shrink-0
      group-hover:scale-105
      transition-all duration-300
      flex items-center justify-center
    "
                >
                  <ArrowUpRight size={14} strokeWidth={2.5} />
                </div>
              </button>

              <a
                href="tel:0894563491"
                aria-label="Call Regen Power on 08-9456-3491"
                className="
    inline-flex items-center gap-1
    bg-[#63B84666] backdrop-blur-md
    border border-[#63B846]
    text-white
    pl-2.5 pr-1 py-1.5
    rounded-full
    hover:bg-[#8dc63f]
    hover:text-white
    transition-all duration-300
    group
  "
              >
                <span className="text-xs tracking-tight whitespace-nowrap">
                  Call
                </span>

                <div
                  className="
      bg-[#63B846]
      text-black
      p-1.5
      rounded-full
      shrink-0
      group-hover:scale-105
      transition-all duration-300
      flex items-center justify-center
    "
                >
                  <Phone size={14} strokeWidth={2.5} />
                </div>
              </a>
            </div>
          </div>

        </div>
      </nav>
    </div>
  )
}

export default PromotionNav
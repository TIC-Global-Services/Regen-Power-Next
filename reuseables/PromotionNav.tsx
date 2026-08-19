import React from 'react'
import CtaButton from './CtaButton'
import { ArrowUpRight, CalculatorIcon } from 'lucide-react'

const PromotionNav = () => {
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
          <div className='md:flex gap-2 hidden'>
            <CtaButton text='Free Quote' textColor='text-white' />
            <CtaButton text='Call 08-9456-3491' textColor='text-white' textClass="text-xs md:text-sm" />
          </div>
          <div className='md:hidden'>

            <button
              type="button"
              className="
    inline-flex items-center gap-3
    bg-[#63B84666] backdrop-blur-md
    border border-[#63B846]
    text-white
    px-1 py-1.5 md:py-1.5
    rounded-full
    hover:bg-[#8dc63f]
    hover:text-white
    transition-all duration-300
    group
    capitalize
  "
            >
              <span className="pl-4 text-sm tracking-tight whitespace-nowrap">
                Call 08-9456-3491
              </span>

              <div
                className="
      bg-[#63B846]
      text-black
      p-2
      rounded-full
      shrink-0
      group-hover:scale-105
      group-hover:rotate-45
      group-hover:opacity-90
      transition-all duration-300
      flex items-center justify-center
    "
              >
                <ArrowUpRight size={16} strokeWidth={2.5} />
              </div>
            </button>
          </div>

        </div>
      </nav>
    </div>
  )
}

export default PromotionNav
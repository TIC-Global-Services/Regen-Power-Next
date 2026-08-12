import React from 'react'
import CtaButton from './CtaButton'

const PromotionNav = () => {
  return (
    <div className='absolute top-0 left-0 right-0 z-50 w-full py-6 px-[5%]'>
        <nav className='flex justify-between items-center max-w-7xl mx-auto'>
            <div className='h-10 flex items-center'>
                <img src='/regen_logo_nav.png' className='h-10 w-auto object-contain' alt="Regen Power" />
            </div>
            <div className='flex gap-4 items-center'>
                <div className='md:block hidden'> <CtaButton text='Free Quote' textColor='text-white' /></div>
                 <CtaButton text='Call 08-9456-3491' textColor='text-white' />
            </div>
        </nav>
    </div>
  )
}

export default PromotionNav
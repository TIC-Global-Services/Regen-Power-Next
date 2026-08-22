'use client';

import React, { useState } from 'react';
import Fade from '@/reuseables/fade';
import CtaButton from '@/reuseables/CtaButton';
import { Calculator } from 'lucide-react';

export interface BatteryPackageRebate {
  label: string;
  amount: number;
}

export interface BatteryPackageItem {
  name?: string;
  capacity?: string;
  originalPrice: number;
  rebates?: BatteryPackageRebate[];
  stateRebate?: number;
  federalRebate?: number;
  finalPrice: number;
  installationText?: string;
  pricingNote?: string;
  isFullyInstalled?: boolean;
  priceNote?: string;
  image?: string;
}

export interface BatteryPackageSection {
  title: string;
  centerImage?: {
    url: string;
    alt: string;
  };
  packages: BatteryPackageItem[];
}

const formatPrice = (value: number) => `$${value.toLocaleString()}`;

const MinusCircle = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-red-500 shrink-0"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const BatteryPackageCard = ({ pkg }: { pkg: BatteryPackageItem }) => {
  const title = pkg.capacity || pkg.name || 'Battery';
  const rebates =
    pkg.rebates && pkg.rebates.length > 0
      ? pkg.rebates
      : [
        { label: 'State Rebate', amount: pkg.stateRebate ?? 0 },
        { label: 'Federal Rebate', amount: pkg.federalRebate ?? 0 },
      ].filter((rebate) => rebate.amount > 0);

  const installationText = pkg.installationText || (pkg.isFullyInstalled ? 'Fully Installed' : '');
  const pricingNote = pkg.pricingNote || pkg.priceNote || 'Price is after the battery rebate';

  return (
    <div className="bg-[#EEF6EB] rounded-[10px] px-4 py-8 flex flex-col h-full justify-between border border-gray-100 transition-all duration-300">
      <div>
        <h3 className="text-[1.8rem] md:text-[2.5rem] font-bold text-black tracking-tight leading-none text-center pb-3 border-b-[1px] border-black">
          {title}
        </h3>

        <div className="mt-4 text-center">
          <span className="text-4xl md:text-[3.125rem] font-bold text-black">
            {formatPrice(pkg.originalPrice)}
          </span>
        </div>

        <div className="flex flex-col mt-10 ">
          {rebates.map((rebate, idx) => (
            <div
              key={`${rebate.label}-${idx}`}
              className="flex items-center justify-center text-[1.375rem] text-black"
            >
              <MinusCircle size={18} />
              <span className="ml-2">
                {rebate.label}: <span className="font-normal">{formatPrice(rebate.amount)}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center border-t border-gray-100 pt-4 mt-8">
        <span className="text-xl font-bold block">Final Pricing</span>
        <span className="text-3xl md:text-[3.75rem] font-bold text-[#63B846] block mb-1 leading-none">
          {formatPrice(pkg.finalPrice)}
        </span>
        <span className="text-lg font-normal block leading-none mt-5">{installationText}</span>
        <p className="text-lg font-bold leading-none">{pricingNote}</p>
      </div>
    </div>
  );
};

const BatteryPackage = ({ data }: { data: BatteryPackageSection }) => {
  const { title, centerImage, packages } = data;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const centerImageSource = centerImage?.url || packages[0]?.image || '/sig_energy.png';
  const centerImageAlt = centerImage?.alt || 'Battery system';

  const currentPkg = packages[currentIndex] ?? packages[0];
  const nextPkg = packages[(currentIndex + 1) % packages.length];

  const handleScrollToQuote = () => {
    const elements = document.querySelectorAll('#quote-form-section');
    const visibleElement = Array.from(elements).find(
      (el) => (el as HTMLElement).offsetParent !== null
    );
    if (visibleElement) visibleElement.scrollIntoView({ behavior: 'smooth' });
  };

  const goToPackage = (nextIndex: number) => {
    if (isFading || nextIndex === currentIndex || !packages[nextIndex]) return;
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex(nextIndex);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsFading(false));
      });
    }, 200);
  };

  const handleNext = () => goToPackage((currentIndex + 1) % packages.length);

  if (!packages || packages.length === 0) return null;

  return (
    <section id="battery-packages" className="bg-white px-[5%] md:px-[3%] py-16 md:py-20">
      <Fade duration={5}>
        <div className="">
          <h2 className="mb-12 text-center text-[2.6rem] md:text-[4rem] tracking-tight font-bold text-[#63B846] leading-none">
            {title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-6 md:gap-6 items-center">
            {/* Current package card (cycles via slider) */}
            <div
              className={`transition-opacity duration-200 ${
                isFading ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <BatteryPackageCard pkg={currentPkg} />
            </div>

            {/* Center image */}
            <div className="hidden bg-[#EEF6EB] h-full rounded-[10px] md:flex items-center justify-center py-8">
              <img
                src={centerImageSource}
                alt={centerImageAlt}
                className="h-full w-auto object-contain"
              />
            </div>

            {/* Explore / controls panel */}
            <div className="bg-[#EEF6EB] rounded-[10px] border border-gray-100 p-6 md:p-8 flex flex-col items-center text-center gap-5 h-full justify-center">
              <span className="text-xl md:text-[1.875rem] font-bold text-black leading-none">
                Explore More Packages
              </span>
              <p className="text-sm md:text-base text-black/70">
                Next up: {nextPkg.name} at {formatPrice(nextPkg.finalPrice)}
              </p>

              {/* Pagination indicator */}
              <div className="flex items-center justify-center gap-2">
                {packages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToPackage(idx)}
                    aria-label={`Go to package ${idx + 1}`}
                    aria-current={idx === currentIndex}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === currentIndex
                        ? 'w-8 bg-[#63B846]'
                        : 'w-2.5 bg-black/20 hover:bg-black/40'
                    }`}
                  />
                ))}
              </div>

              <CtaButton
                text="Explore More Packages & Get Quote"
                onClick={handleNext}
                className="justify-center"
                buttonTextClass="whitespace-normal"
              />
              <CtaButton
                text="Get a Free Quote"
                bgClass="bg-[#BEE5B2] border-0"
                hoverClass="hover:bg-[#A9D89D]"
                textColor="text-black font-semibold"
                icon={Calculator}
                onClick={handleScrollToQuote}
                className="justify-center"
                buttonTextClass="whitespace-normal"
              />
            </div>
          </div>
        </div>
      </Fade>
    </section>
  );
};

export default BatteryPackage;
'use client';

import React from 'react';
import Fade from '@/reuseables/fade';
import Image from 'next/image';
import { Check, MinusCircle } from 'lucide-react';

export interface RebateItem {
  label: string;
  amount: number;
}

export interface BatteryPackage {
  id: string;
  capacity: string;
  originalPrice: number;
  finalPrice: number;
  rebates: RebateItem[];
  schemeText: string;
  priceNote: string;
}

export interface BatteryPricingProps {
  backgroundImage?: string;
  batteryImage?: string;
  packages?: BatteryPackage[];
}

const BatteryPricing = ({
  backgroundImage = "/fallback.png",
  batteryImage = "/sig_energy.png",
  packages = [
    {
      id: '8.3kwh',
      capacity: "8.3kWh Battery",
      originalPrice: 14404,
      finalPrice: 10990,
      rebates: [
        { label: "State Rebate", amount: 1209 },
        { label: "Federal Rebate", amount: 2205 }
      ],
      schemeText: "Up to $10,000 Interest Free Finance available under modern scheme",
      priceNote: "Fully installed. Price is after the battery rebate."
    },
    {
      id: '16.6kwh',
      capacity: "16.6kWh Battery",
      originalPrice: 18245,
      finalPrice: 12990,
      rebates: [
        { label: "State Rebate", amount: 1300 },
        { label: "Federal Rebate", amount: 3955 }
      ],
      schemeText: "Interest-free loan of up to $10k for 10 years available from WA state scheme",
      priceNote: "Fully installed. Price is after the battery rebate."
    }
  ]
}: BatteryPricingProps) => {

  const formatCurrency = (val: number) => `$${val.toLocaleString()}`;

  return (
    <section
      className="relative w-full py-16 md:py-24 px-4 md:px-[5%] overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(30, 41, 59, 0.75), rgba(15, 23, 42, 0.85)), url('${backgroundImage}')`
      }}
    >
      <Fade>
        <div className="max-w-7xl mx-auto z-10 relative">
          
          {/* Main Grid: stacks on mobile, 3-column layout on tablet/desktop */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-4 max-w-6xl mx-auto">
            
            {/* Left Card (Package 1) */}
            {packages[0] && (
              <div className="w-full lg:w-[35%] bg-white rounded-[24px] p-6 md:p-8 flex flex-col justify-between shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 min-h-[500px]">
                <div>
                  <h3 className="text-2xl md:text-3xl font-black text-black text-center pb-4 border-b border-gray-100 uppercase tracking-tight">
                    {packages[0].capacity}
                  </h3>
                  
                  <div className="my-6 text-center">
                    <span className="text-sm font-semibold text-gray-400 block line-through">
                      Original {formatCurrency(packages[0].originalPrice)}
                    </span>
                  </div>

                  {/* Rebates list */}
                  <div className="space-y-3 my-6">
                    {packages[0].rebates.map((rebate, index) => (
                      <div key={index} className="flex items-center gap-3 text-sm md:text-base text-gray-600 font-medium">
                        <MinusCircle size={16} className="text-red-500 shrink-0" />
                        <span>
                          {rebate.label}: <strong className="text-black">{formatCurrency(rebate.amount)}</strong>
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Scheme info with a badge style */}
                  <div className="bg-[#EEF6EB] rounded-[16px] p-4 text-center border border-[#63B846]/20 my-6">
                    <p className="text-xs md:text-sm font-bold text-gray-800 leading-snug">
                      {packages[0].schemeText}
                    </p>
                  </div>
                </div>

                {/* Bottom section with final pricing */}
                <div className="pt-4 border-t border-gray-100 text-center">
                  <span className="text-xs font-semibold text-gray-400 block tracking-wide uppercase">Final Pricing</span>
                  <span className="text-3xl md:text-4xl lg:text-5xl font-black text-[#63B846] block my-1">
                    {formatCurrency(packages[0].finalPrice)}
                  </span>
                  <p className="text-xs font-semibold text-gray-500 leading-normal">
                    {packages[0].priceNote}
                  </p>
                </div>
              </div>
            )}

            {/* Middle Column (Battery Image) - Shown in center on desktop, stacked on mobile */}
            <div className="w-full lg:w-[28%] flex flex-col items-center justify-center my-4 lg:my-0 group">
              <div className="relative w-48 h-64 md:w-56 md:h-80 lg:w-full lg:h-[400px]">
                <img
                  src={batteryImage}
                  alt="Solar Battery System"
                  className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(255,255,255,0.15)] group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/fallback.png';
                  }}
                />
              </div>
            </div>

            {/* Right Card (Package 2) */}
            {packages[1] && (
              <div className="w-full lg:w-[35%] bg-white rounded-[24px] p-6 md:p-8 flex flex-col justify-between shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 min-h-[500px]">
                <div>
                  <h3 className="text-2xl md:text-3xl font-black text-black text-center pb-4 border-b border-gray-100 uppercase tracking-tight">
                    {packages[1].capacity}
                  </h3>
                  
                  <div className="my-6 text-center">
                    <span className="text-sm font-semibold text-gray-400 block line-through">
                      Original {formatCurrency(packages[1].originalPrice)}
                    </span>
                  </div>

                  {/* Rebates list */}
                  <div className="space-y-3 my-6">
                    {packages[1].rebates.map((rebate, index) => (
                      <div key={index} className="flex items-center gap-3 text-sm md:text-base text-gray-600 font-medium">
                        <MinusCircle size={16} className="text-red-500 shrink-0" />
                        <span>
                          {rebate.label}: <strong className="text-black">{formatCurrency(rebate.amount)}</strong>
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Scheme info with a badge style */}
                  <div className="bg-[#EEF6EB] rounded-[16px] p-4 text-center border border-[#63B846]/20 my-6">
                    <p className="text-xs md:text-sm font-bold text-gray-800 leading-snug">
                      {packages[1].schemeText}
                    </p>
                  </div>
                </div>

                {/* Bottom section with final pricing */}
                <div className="pt-4 border-t border-gray-100 text-center">
                  <span className="text-xs font-semibold text-gray-400 block tracking-wide uppercase">Final Pricing</span>
                  <span className="text-3xl md:text-4xl lg:text-5xl font-black text-[#63B846] block my-1">
                    {formatCurrency(packages[1].finalPrice)}
                  </span>
                  <p className="text-xs font-semibold text-gray-500 leading-normal">
                    {packages[1].priceNote}
                  </p>
                </div>
              </div>
            )}

          </div>

        </div>
      </Fade>
    </section>
  );
};

export default BatteryPricing;

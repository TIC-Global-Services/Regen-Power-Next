'use client';

import React from 'react';
import Image from 'next/image';
import Fade from '@/reuseables/fade';
import Reveal from '@/reuseables/Reveal';

import evInstall4 from '@/assets/evcharging/ev-charging-installation-4.png';
import homeBattery from '@/assets/evcharging/battery_bost.png';
import oneApp from '@/assets/evcharging/one_app.png';

const UnderOneRoof = () => {
  return (
    <section className="py-16 md:py-20 bg-[#EEF6EB] overflow-hidden">
      <div className="px-[5%]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column — Heading and Intro */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Reveal>
              <div className="flex flex-col gap-2">
                <span className="text-sm md:text-[2.125rem] font-normal text-black tracking-tight">
                  Solar, Battery, EV Charger
                </span>
                <h2 className="text-[#63B846] font-light text-[3rem] md:text-[4rem] lg:text-[5rem] tracking-tighter leading-[1]">
                  Under One <br /> Roof
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-base leading-snug max-w-xl font-normal">
                Most Installers Will Sell You An EV Charger. We&apos;ll Connect It To The Solar We Put On Your Roof, The Battery In Your Garage, And The App You Already Use. One Install Team, One Warranty Conversation, One Ecosystem That Pays For Itself.
              </p>
            </Reveal>
          </div>

          {/* Right Column — Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: Solar Surplus Diversion */}
            <Reveal delay={0.1} className="md:col-span-2">
              <div className="bg-white rounded-[20px] p-8 md:p-10 relative overflow-hidden flex flex-col  justify-between items-stretch min-h-[40dvh]   group hover:shadow-md transition-all duration-300 gap-6">
                {/* Left: Content */}
                <div className="flex flex-col gap-3 justify-center md:w-[85%] relative z-10">
                  <h3 className="text-xl md:text-2xl font-medium text-black tracking-tight leading-snug">
                    Solar Surplus Diversion
                  </h3>
                  <p className="text-lg text-black leading-[1.2] tracking-tight">
                    Spare Solar Generation Flows Straight To Your EV Instead Of Being Exported At Low Feed-In Tariffs. Round-Trip Energy Efficiency Improves By 15–20%.
                  </p>
                </div>
                
                {/* Right: Image */}
                <div className="relative w-full md:w-[40%] h-40 md:h-auto rounded-[16px] overflow-hidden pointer-events-none self-stretch">
                  <Image
                    src={evInstall4}
                    alt="Solar Panels"
                    fill
                    className="object-cover group-hover:scale-102 transition-transform duration-700"
                  />
                </div>
              </div>
            </Reveal>

            {/* Card 2: Battery Boost */}
            <Reveal delay={0.2}>
              <div className="bg-white rounded-[20px] p-8 md:p-10 relative overflow-hidden flex flex-col justify-between min-h-[380px]  hover:shadow-md transition-shadow duration-300">
                <div className="flex flex-col gap-3">
                  <h3 className="text-xl md:text-2xl font-medium text-black tracking-tight leading-snug">
                    Battery Boost
                  </h3>
                  <p className="text-sm text-black/60 leading-[1.2]">
                    When The Sun Goes Down, Your Battery Keeps Charging The Car. When The Grid Goes Down, Your Car Keeps Your Home Running.
                  </p>
                </div>

                {/* Battery Render Image */}
                {/* <div className="relative w-full h-36  pointer-events-none"> */}
                  <Image
                    src={homeBattery}
                    alt="Battery storage system"
                    fill
                    className="object-contain absolute -bottom-30 translate-y-30 pointer-events-none"
                  />
                {/* </div> */}
              </div>
            </Reveal>

            {/* Card 3: One App */}
            <Reveal delay={0.3}>
              <div className="bg-white rounded-[20px] p-8 md:px-10 relative overflow-hidden flex flex-col justify-between min-h-[380px]  hover:shadow-md transition-shadow duration-300">
                <div className="flex flex-col gap-3">
                  <h3 className="text-xl md:text-2xl font-medium text-black tracking-tight leading-snug">
                    One App
                  </h3>
                  <p className="text-sm text-black/60 leading-[1.2]">
                    Live Monitoring Of Generation, Storage, And EV Charging In A Single Dashboard, Tesla, Sigen, Solar.Web, Or SEMS Depending On The Brand You Choose.
                  </p>
                </div>

                {/* Phone App Mockup Image with centered logo */}
                <div className="relative w-full h-[15dvh] mt-6 overflow-hidden pointer-events-none">
                  <div className="absolute inset-x-0 bottom-0 flex justify-center">
                    <div className="relative w-36 h-90 translate-y-50">
                      <Image
                        src={oneApp}
                        alt="Phone app dashboard mockup"
                        fill
                        className="object-cover"
                      />
                      {/* Logo centered on the phone screen */}
                      <div className="absolute inset-0 flex items-center justify-center -translate-y-6">
                        <div className="relative w-20 h-8">
                          <Image
                            src="/regen_logo_nav.png"
                            alt="Regen Logo"
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UnderOneRoof;

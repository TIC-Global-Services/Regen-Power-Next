'use client';

import React from 'react';
import Image from 'next/image';
import Fade from '@/reuseables/fade';
import Reveal from '@/reuseables/Reveal';

import wallConnectorHero from '@/assets/evcharging/wall_connector_hero.png';

const specs = [
  'Up To 22kW (Three-Phase)',
  '7.3m Tethered Type 2 Cable',
  'IP55 — Indoor Or Outdoor',
  '4-Year Warranty',
];

const WallConnector = () => {
  return (
    <Fade>
      <section className="bg-white overflow-hidden max-h-screen">
        <div className="">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left Side — Text Content */}
            <Reveal>
              <div className="flex flex-col gap-8 md:gap-10 pl-[5%]">
                {/* Title */}
                <div className="leading-[0.85]">
                  <h2 className="text-2xl md:text-3xl font-medium text-black tracking-tight">
                    Tesla Wall Connector
                  </h2>
                  <p className="text-[#63B846] font-light text-[3rem] md:text-[4rem] lg:text-[5.5rem] tracking-tighter">
                    Gen 3
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm md:text-lg text-black leading-[1.2] max-w-[540px]">
                  We&apos;re A Tesla Certified Partner. So When We Install Tesla, You&apos;re Buying
                  It From The Source. The Tesla Wall Connector Gen 3 Is The Most Popular Home
                  EV Charger In Australia — And For Good Reason. It Charges At Up To 22kW On
                  Three-Phase Power, Comes With A 7.3-Metre Tethered Type 2 Cable That Fits
                  Every Modern EV In Australia, And Pairs To The Tesla App For Live Monitoring
                  And Over-The-Air Firmware Updates. Because It Uses A Standard Type 2
                  Connector, It&apos;ll Charge A Tesla Model 3, Model Y, BYD Atto 3, Hyundai
                  Ioniq 5, Kia EV6, MG4, Polestar 2, BMW iX, Mercedes EQ — Basically Every
                  EV Sold In Australia Today, And The Ones Arriving Next Year Too.
                </p>

                {/* Specs */}
                <div className="flex flex-col gap-1.5">
                  {specs.map((spec, index) => (
                    <p
                      key={index}
                      className="text-sm md:text-base font-semibold text-black tracking-tight"
                    >
                      {spec}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Right Side — Image */}
            <Reveal delay={0.2}>
              <div className="relative w-full aspect-[4/5] md:aspect-[3/4]  overflow-hidden">
                <Image
                  src={wallConnectorHero}
                  alt="Tesla Wall Connector Gen 3 installed on a home exterior with a Tesla charging"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </Fade>
  );
};

export default WallConnector;
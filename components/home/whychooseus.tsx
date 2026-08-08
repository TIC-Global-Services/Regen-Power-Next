"use client";

import React, { useEffect, useRef } from 'react';
import Image, { StaticImageData } from 'next/image';
import { motion, useInView, useMotionValue, useTransform, animate, Variants } from 'framer-motion';
import SectionHeader from "@/reuseables/SectionHeader";

export interface WhyChooseUsData {
  subtitle: string;
  title: string;
  awardWinnerCount: number;
  awardWinnerTitle: string;
  awardWinnerBg: StaticImageData | string;
  awardWinnerLogo: StaticImageData | string;
  batteryInstallationsCount: number;
  batteryInstallationsLabel: string;
  solarInstallationsCount: number;
  solarInstallationsLabel: string;
  yearsInBusinessCount: number;
  yearsInBusinessDescription: string;
  yearsInBusinessBg: StaticImageData | string;
  ratingScore: number;
  ratingPlatformLabel: string;
  ratingBg: StaticImageData | string;
}

interface WhyChooseUsProps {
  data: WhyChooseUsData;
}

const AnimatedCounter = ({ from, to }: { from: number; to: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration: 2, ease: "easeOut" });
      return controls.stop;
    }
  }, [inView, to, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const WhyChooseUs = ({ data }: WhyChooseUsProps) => {
  return (
    <section className="py-10 md:py-20 bg-white overflow-hidden">
      <div className="px-[8%] md:px-[5%]">
        {/* <SectionHeader
          subtitle={data.subtitle}
          title={data.title}
          align="left"
          subtitleClass="text-2xl md:text-3xl lg:text-3xl font-medium text-black tracking-tight normal-case mb-1"
          titleClass="text-[#63B846] font-light text-[2.5rem] md:text-[3rem] lg:text-[5rem] tracking-tighter leading-none"
          className="mb-10 md:mb-15 lg:-space-y-4"
        /> */}
        <div className='flex flex-col justify-center items-center md:justify-start md:items-start mb-5 md:mb-20'>
          <span className="text-xl md:text-[2rem] leading-[0.5] font-normal text-center  tracking-tight mb-1 block normal-case">{data.subtitle}</span>
          <h1 className="text-4xl md:text-5xl lg:text-[5rem] leading-none text-[#63B846] tracking-tight mt-1">{data.title}</h1>
        </div>

        {/* Grid Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 auto-rows-auto lg:auto-rows-fr"
        >

          {/* Left Card - Award Winner */}
          <motion.div variants={itemVariants} className="bg-[#EEF6EB] rounded-[20px] p-4 flex flex-col md:h-full md:min-h-[55dvh]">
            <div className="w-full relative aspect-2/1 rounded-3xl overflow-hidden mb-2 lg:mb-8 flex items-center justify-center">
              <Image
                src={data.awardWinnerBg}
                alt="Product Review Awards Logo Background"
                fill
                className="object-cover z-0"
              />
              <Image
                src={data.awardWinnerLogo}
                alt="Product Review Logo"
                fill
                className="object-contain p-4 z-10 relative"
              />
            </div>
            <div className="mt-auto py-4 px-4">
              <h3 className="text-[4rem] lg:text-[6.250rem] font-bold text-black mb-2 tracking-tight leading-none">
                <AnimatedCounter from={0} to={data.awardWinnerCount} /><span className="text-[3rem] lg:text-[6.250rem]">×</span>
              </h3>
              <p className="text-2xl lg:text-4xl text-black leading-[1.2] font-normal whitespace-pre-line">
                {data.awardWinnerTitle}
              </p>
            </div>
          </motion.div>

          {/* Middle Card - Installations */}
          <motion.div
            variants={itemVariants}
            className="bg-[#A0CF44] rounded-[20px] p-6 md:p-8 relative flex flex-col justify-end min-h-[280px] md:h-full overflow-hidden"
          >

            {/* 1. Main White Corner Box (Houses the Button) */}
            <div className="absolute top-0 right-0 w-[60px] h-[62px] md:w-[96px] md:h-[98px] bg-white rounded-bl-[20px] z-10 flex items-center justify-center">
              {/* Floating Plus Button */}
              <button className="w-10 h-10 md:w-18 md:h-18 z-100 bg-black rounded-full flex items-center justify-center text-white text-3xl md:text-6xl pb-1 md:pb-3 font-light shadow-lg hover:scale-105 transition-transform">
                +
              </button>
            </div>

            {/* 2. Top-Left Inverse Curve Mask */}
            <div className="absolute top-0 right-[60px] md:right-[96px] w-5 h-12 bg-transparent z-1 rounded-tr-[20px] shadow-[16px_-16px_0_16px_#ffffff]" />

            {/* 3. Bottom-Right Inverse Curve Mask */}
            <div className="absolute top-[62px] md:top-[98px] right-0 w-4 h-6 bg-transparent z-10 rounded-tr-[20px] shadow-[16px_-16px_0_16px_#ffffff]" />

            {/* Stats Layout */}
            <div className="relative z-0 flex flex-col mt-8 md:mt-16">
              <div>
                <h3 className="text-[3.5rem] lg:text-[5.5rem] leading-none font-black text-black tracking-tighter">
                  <AnimatedCounter from={0} to={data.batteryInstallationsCount} />+
                </h3>
                <p className="text-xl lg:text-2xl text-black font-normal">
                  {data.batteryInstallationsLabel}
                </p>
              </div>

              <div>
                <h3 className="text-[3.5rem] lg:text-[5.5rem] leading-none font-black text-black tracking-tighter">
                  <AnimatedCounter from={0} to={data.solarInstallationsCount} />+
                </h3>
                <p className="text-xl lg:text-2xl text-black font-normal">
                  {data.solarInstallationsLabel}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Stacked Cards */}
          <div className="flex flex-col gap-4 lg:gap-6 h-full">

            {/* Top Right Card - Years */}
            <motion.div variants={itemVariants} className="bg-[#f0f6ec] rounded-[20px] p-6 relative overflow-hidden flex-grow flex flex-col justify-end min-h-[220px] md:min-h-[250px]">
              <div className="absolute right-[-20%] bottom-30 w-full h-full opacity-90 z-0">
                <Image
                  src={data.yearsInBusinessBg}
                  alt="Solar Panels Background"
                  fill
                  className="object-cover object-right-bottom mix-blend-multiply blur-sm"
                />
              </div>
              <div className="relative z-10 w-full">
                <h3 className="text-[3.5rem] lg:text-[5rem] font-bold text-black leading-none  tracking-tight">
                  <AnimatedCounter from={0} to={data.yearsInBusinessCount} /><br />Years
                </h3>
                <p className="text-xl md:text-3xl text-black font-medium leading-[1.2]">
                  {data.yearsInBusinessDescription}
                </p>
              </div>
            </motion.div>

            {/* Bottom Right Card - Rating */}
            <motion.div variants={itemVariants} className="rounded-[20px] md:rounded-[32px] relative overflow-hidden h-[140px] md:h-[160px] p-5 md:p-8 flex items-center justify-center">
              <Image
                src={data.ratingBg}
                alt="Green sphere background"
                fill
                className="object-cover z-0"
              />
              <div className="relative z-10 flex items-center gap-3 md:gap-4">
                <h3 className="text-[4rem] md:text-[6.250rem] font-bold text-white flex items-center gap-2 md:gap-3 leading-none tracking-tighter">
                  <AnimatedCounter from={0} to={data.ratingScore} /> <span className="text-[2.5rem] font-extrabold"><Image src={'/star.svg'} height={50} width={50} alt="Star" className="w-[50px] h-[50px] md:w-[80px] md:h-[80px]" /></span>
                </h3>
                <p className="text-white text-lg md:text-4xl tracking-tight font-medium leading-[1.2]">
                  {data.ratingPlatformLabel}
                </p>
              </div>
            </motion.div>

          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, useMotionValue, useTransform, animate, Variants } from 'framer-motion';

interface EvWhyChooseUsData {
  subtitle: string;
  title: string;
  awardWinnerCount: number;
  awardWinnerTitle: string;
  awardWinnerBg: string;
  awardWinnerLogo: string;
  batteryInstallationsCount: number;
  batteryInstallationsLabel: string;
  solarInstallationsCount: number;
  solarInstallationsLabel: string;
  yearsInBusinessCount: number;
  yearsInBusinessDescription: string;
  yearsInBusinessBg: string;
}

interface EvWhyChooseUsProps {
  data: EvWhyChooseUsData;
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
  }, [to, count, inView]);
  return <motion.span ref={ref}>{rounded}</motion.span>;
};

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const EvWhyChooseUs = ({ data }: EvWhyChooseUsProps) => {
  return (
    <section className="py-10 md:py-24 bg-white overflow-hidden">
      <div className="px-[5%]">
        <div className="mb-10 md:mb-15 leading-[0.8]">
          <h2 className="text-2xl md:text-3xl lg:text-3xl font-medium text-black tracking-tight">
            {data.subtitle}
          </h2>
          <p className="text-[#63B846] font-light text-[2.5rem] md:text-[3rem] lg:text-[5rem] tracking-tighter">
            {data.title}
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-fr"
        >
          <motion.div variants={itemVariants} className="bg-[#EEF6EB] rounded-[20px] p-4 flex flex-col h-full md:min-h-[40dvh]">
            <div className="w-full relative aspect-2/1 rounded-3xl overflow-hidden mb-4 lg:mb-8 flex items-center justify-center">
              {data.awardWinnerBg && (
                <Image src={data.awardWinnerBg} alt="" fill className="object-cover z-0" />
              )}
              {data.awardWinnerLogo && (
                <Image src={data.awardWinnerLogo} alt="Award Logo" fill className="object-contain p-4 z-10 relative" />
              )}
            </div>
            <div className="mt-auto py-4 px-4">
              <h3 className="text-[4rem] lg:text-[6.250rem] font-bold text-black mb-2 tracking-tight leading-none">
                <AnimatedCounter from={0} to={data.awardWinnerCount} /><span className="text-[3rem] lg:text-[6.250rem]">×</span>
              </h3>
              <p className="text-2xl text-black leading-tight font-normal">
                {data.awardWinnerTitle}
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-[#A0CF44] rounded-[20px] p-8 relative flex flex-col justify-end h-full min-h-[450px] lg:min-h-[500px] overflow-hidden">
            <div className="absolute top-0 right-0 w-[96px] h-[98px] bg-white rounded-bl-[20px] z-10 flex items-center justify-center">
              <button className="w-18 h-18 z-100 bg-black rounded-full flex items-center justify-center text-white text-6xl pb-3 font-light shadow-lg hover:scale-105 transition-transform">
                +
              </button>
            </div>
            <div className="absolute top-0 right-[96px] w-5 h-12 bg-transparent z-1 rounded-tr-[20px] shadow-[16px_-16px_0_16px_#ffffff]" />
            <div className="absolute top-[98px] right-0 w-4 h-6 bg-transparent z-10 rounded-tr-[20px] shadow-[16px_-16px_0_16px_#ffffff]" />
            <div className="relative z-0 flex flex-col mt-16">
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

          <motion.div variants={itemVariants} className="bg-[#f0f6ec] rounded-[20px] p-6 relative overflow-hidden flex flex-col justify-end h-full min-h-[350px] lg:min-h-[500px]">
            {data.yearsInBusinessBg && (
              <div className="absolute right-[-20%] bottom-30 w-full h-full opacity-90 z-0">
                <Image src={data.yearsInBusinessBg} alt="" fill className="object-cover object-right-bottom mix-blend-multiply blur-sm" />
              </div>
            )}
            <div className="relative z-10 w-full">
              <h3 className="text-[3.5rem] lg:text-[5rem] font-bold text-black leading-none tracking-tight">
                <AnimatedCounter from={0} to={data.yearsInBusinessCount} /><br />Years
              </h3>
              <p className="text-2xl text-black font-medium leading-snug">
                {data.yearsInBusinessDescription}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default EvWhyChooseUs;

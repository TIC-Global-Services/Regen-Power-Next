'use client';

import React, { useState } from 'react';
import Fade from '@/reuseables/fade';
import Image from 'next/image';
import CtaButton from '@/reuseables/CtaButton';
import { Play, Calculator } from 'lucide-react';

export interface FreeQuotationProps {
  title: string;
  noticeText: string;
  videoThumbnail: string;
  videoUrl?: string;
  buttonText: string;
}

const FreeQuotation = ({ data }: { data: FreeQuotationProps }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your submission! We will contact you shortly.');
  };

  // Split title: "Get an Obligation Free Quotation" -> "Get An Obligation" and "Free Quotation"
  const titleText = data.title || "Get an Obligation Free Quotation";
  const freeQuotationIndex = titleText.toLowerCase().indexOf("free quotation");
  let mainTitle = titleText;
  let subTitle = "";
  if (freeQuotationIndex !== -1) {
    mainTitle = titleText.substring(0, freeQuotationIndex).trim();
    subTitle = titleText.substring(freeQuotationIndex).trim();
  }

  // Capitalize Title Case
  // const formattedMainTitle = mainTitle
  //   .split(' ')
  //   .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  //   .join(' ');

  // const formattedSubTitle = subTitle
  //   .split(' ')
  //   .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  //   .join(' ');

  // Split noticeText into sentences
  const sentences = (data.noticeText || "").split('.').map(s => s.trim()).filter(Boolean);
  const firstSentence = sentences[0] ? sentences[0] + '.' : '';
  const secondSentence = sentences[1] ? sentences[1] + '.' : '';
  const finalSecondSentence = secondSentence.replace(/\b or \b/gi, ' Or ');

  // Helper to clean Next.js asset public path
  const getCleanThumbnail = (path: string) => {
    if (!path) return "/solar_house_render.png";
    if (path.startsWith("/public/")) {
      return path.replace("/public/", "/");
    }
    return path;
  };

  return (
    <section className="bg-white py-16 md:py-20 px-[5%]">
      <Fade>
        <div className="">
          {/* Header section with split title and notice text */}
          <div className="text-center mb-10">
            <span className="block text-xl md:text-[2.125rem] font-bold text-black tracking-tight leading-none">
              {mainTitle}
            </span>
            <h2 className="text-5xl md:text-[5rem] font-bold text-[#63B846] tracking-tight leading-none">
              {subTitle}
            </h2>
            <div className="text-[#4D4D4D] text-sm md:text-2xl space-y-1 leading-[1.1] mt-5 whitespace-pre-line">
              <p>{firstSentence}</p>
              <p className="text-[#4D4D4D] text-2xl font-bold w-full whitespace-pre-line">{finalSecondSentence}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-5 items-center">
            {/* Left side: Video Thumbnail */}
            <div className="lg:col-span-7 lg:border-r lg:border-black lg:pr-5 h-full">
              <div
                className="relative rounded-[10px] overflow-hidden aspect-[16/10] bg-[#EEF6EB] group cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
                onClick={() => setIsPlaying(true)}
              >
                {!isPlaying ? (
                  <>
                    <Image
                      src={getCleanThumbnail(data.videoThumbnail)}
                      alt="Regen Power Video Thumbnail"
                      fill
                      className="object-cover group-hover:scale-102 transition-transform duration-500 opacity-95"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-transparent group-hover:bg-black/5 transition-colors">
                      <div className="w-16 h-16 rounded-full border border-black/60 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 bg-white/20 backdrop-blur-[2px]">
                        <Play size={24} className="text-black/70 fill-none ml-1 stroke-[1.5]" />
                      </div>
                    </div>
                  </>
                ) : (
                  <iframe
                    className="w-full h-full"
                    src={data.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"}
                    title="Regen Power Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
            </div>

            {/* Right side: Contact Form */}
            <div className="lg:col-span-5 lg:pl-4">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col border-b border-gray-300 focus-within:border-[#63B846] pb-2 transition-colors duration-300">
                    <label className="text-gray-900 text-sm md:text-base font-semibold mb-1">First Name*</label>
                    <input
                      type="text"
                      required
                      className="w-full bg-transparent text-gray-800 focus:outline-none py-1 text-sm md:text-base text-black"
                    />
                  </div>
                  <div className="flex flex-col border-b border-gray-300 focus-within:border-[#63B846] pb-2 transition-colors duration-300">
                    <label className="text-gray-900 text-sm md:text-base font-semibold mb-1">Last Name*</label>
                    <input
                      type="text"
                      required
                      className="w-full bg-transparent text-gray-800 focus:outline-none py-1 text-sm md:text-base text-black"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col border-b border-gray-300 focus-within:border-[#63B846] pb-2 transition-colors duration-300">
                    <label className="text-gray-900 text-sm md:text-base font-semibold mb-1">Email*</label>
                    <input
                      type="email"
                      required
                      className="w-full bg-transparent text-gray-800 focus:outline-none py-1 text-sm md:text-base text-black"
                    />
                  </div>
                  <div className="flex flex-col border-b border-gray-300 focus-within:border-[#63B846] pb-2 transition-colors duration-300">
                    <label className="text-gray-900 text-sm md:text-base font-semibold mb-1">Phone Number*</label>
                    <input
                      type="tel"
                      required
                      className="w-full bg-transparent text-gray-800 focus:outline-none py-1 text-sm md:text-base text-black"
                    />
                  </div>
                </div>

                <div className="flex flex-col border-b border-gray-300 focus-within:border-[#63B846] pb-2 transition-colors duration-300">
                  <label className="text-gray-900 text-sm md:text-base font-semibold mb-1">Installation Address*</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-transparent text-gray-800 focus:outline-none py-1 text-sm md:text-base text-black"
                  />
                </div>

                <div className="flex flex-col border-b border-gray-300 focus-within:border-[#63B846] pb-2 transition-colors duration-300">
                  <label className="text-gray-900 text-sm md:text-base font-semibold mb-1">Message</label>
                  <textarea
                    rows={1}
                    className="w-full bg-transparent text-gray-800 focus:outline-none py-1 text-sm md:text-base text-black resize-none"
                  />
                </div>

                <div className="flex justify-center pt-4">
                  <CtaButton
                    type="submit"
                    text={data.buttonText}
                    icon={Calculator}
                    bgClass="bg-[#BEE5B2] border-0"
                    hoverClass="hover:bg-[#A9D89D]"
                    textColor="text-black font-semibold"
                    iconBgClass="bg-[#63B846]"
                    iconTextColor="text-white"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </Fade>
    </section>
  );
};

export default FreeQuotation;


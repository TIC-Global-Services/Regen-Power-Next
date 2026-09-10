'use client';

import React, { useState } from 'react';
import Fade from '@/reuseables/fade';
import Image from 'next/image';
import { Play } from 'lucide-react';
import HubspotForm from '@/reuseables/HubspotForm';

export interface FreeQuotationProps {
  title: string;
  noticeText: string;
  videoThumbnail: string;
  videoUrl?: string;
  buttonText: string;
}

// Default form (used by /solar-system-perth when no formId override is passed).
const DEFAULT_HUBSPOT_FORM_ID = '5ca75069-69da-4015-b63c-2fff558ff814';

const FreeQuotation = ({ data, formId }: { data: FreeQuotationProps; formId?: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);

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
    <section className="bg-white py-16 md:py-20 px-[5%] md:px-[3%]">
      <Fade duration={5}>
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
                className="relative rounded-[10px] overflow-hidden aspect-[16/9] bg-[#EEF6EB] group cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
                onClick={() => setIsPlaying(true)}
              >
                {!isPlaying ? (
                  <>
                    <img
                      src={getCleanThumbnail(data.videoThumbnail)}
                      alt="Regen Power Video Thumbnail"
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 opacity-95"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-transparent group-hover:bg-black/5 transition-colors">
                      <div className="w-16 h-16 rounded-full border border-black/60 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 bg-white/20 backdrop-blur-[2px]">
                        <Play size={24} className="text-black/70 fill-none ml-1 stroke-[1.5]" />
                      </div>
                    </div>
                  </>
                ) : (
                  // <div>
                  <iframe
                    src={"https://player.vimeo.com/video/810074456?h=62919e7375"}
                    className='object-cover h-full w-full'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                    allowFullScreen
                    title='Regen Power Video'
                  />
                  //  </div>
                )}
              </div>
            </div>

            {/* Right side: HubSpot Contact Form */}
            <div className="lg:col-span-5 lg:pl-4">
              <HubspotForm
                formId={formId || DEFAULT_HUBSPOT_FORM_ID}
                targetId="hubspot-free-quotation-form"
                minHeight={480}
              />
            </div>
          </div>
        </div>
      </Fade>
    </section>
  );
};

export default FreeQuotation;


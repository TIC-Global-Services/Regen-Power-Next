'use client';

import React from 'react';
import Fade from '@/reuseables/fade';
import CtaButton from '@/reuseables/CtaButton';
import { Calculator } from 'lucide-react';

export interface ContactData {
  title: string;
  value: string;
}

export interface SocialItem {
  name: string;
  link: string;
}

export interface ContactDetailsInfo {
  title: string;
  description: string;
  data: ContactData[];
  socials: SocialItem[];
}

export interface ReadyToBeginProps {
  title: string;
  noticeText: string;
  contactDetails: ContactDetailsInfo;
  buttonText: string;
}

const ReadyToBegin = ({ data }: { data: ReadyToBeginProps }) => {
  const {
    title = "Ready to Begin? Get A Free Quote.",
    noticeText = "",
    contactDetails,
    buttonText = "Get Your Free Quote"
  } = data || {};

  const {
    title: contactTitle = "Contact Us",
    description: contactIntro = "",
    data: infoItems = [],
    socials = []
  } = contactDetails || {};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for requesting a quote! We will review your details and get back to you shortly.');
  };

  // Split title: "Ready to Begin? Get A Free Quote." -> "Ready to Begin?" and "Get A Free Quote."
  const freeQuoteIndex = title.toLowerCase().indexOf("get a free quote");
  let mainTitle = title;
  let subTitle = "";
  if (freeQuoteIndex !== -1) {
    mainTitle = title.substring(0, freeQuoteIndex).trim();
    subTitle = title.substring(freeQuoteIndex).trim();
  }

  // Capitalize Title Case helper
  const formatTitle = (str: string) => {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formattedMainTitle = formatTitle(mainTitle);
  const formattedSubTitle = formatTitle(subTitle);

  // Split noticeText into sentences
  const sentences = noticeText.split('.').map(s => s.trim()).filter(Boolean);
  const firstSentence = sentences[0] ? sentences[0] + '.' : '';
  const secondSentence = sentences[1] ? sentences[1] + '.' : '';
  const finalSecondSentence = secondSentence.replace(/\b or \b/gi, ' Or ');

  // Interleave helper: left column gets item 0 (e.g. Address), right column gets item 1 & 2 (e.g. Email/Phone)
  const leftItem = infoItems[0];
  const rightItems = infoItems.slice(1);

  // Link format helper
  const renderValueLink = (item: ContactData) => {
    const titleLower = item.title.toLowerCase();
    if (titleLower.includes('mail')) {
      return (
        <a 
          href={`mailto:${item.value}`} 
          className="block text-black text-sm md:text-[1.375rem] leading-relaxed font-normal hover:text-[#63B846] transition-colors border-b border-b-[#00000029] pb-2"
        >
          {item.value}
        </a>
      );
    }
    if (titleLower.includes('phone') || titleLower.includes('tel')) {
      return (
        <a 
          href={`tel:${item.value.replace(/\s+/g, '')}`} 
          className="block text-black text-sm md:text-[1.375rem] leading-relaxed font-normal hover:text-[#63B846] transition-colors"
        >
          {item.value}
        </a>
      );
    }
    return (
      <p className="text-black text-sm lg:text-[1.375rem] leading-relaxed font-normal">
        {item.value}
      </p>
    );
  };

  return (
    <section className="bg-white py-16 md:py-20 px-[5%] border-t border-gray-100">
      <Fade duration={5}>
        <div>
          {/* Header section with split title and notice text */}
          <div className="text-center max-w-5xl mx-auto mb-10">
            <span className="block text-xl md:text-[2.125rem] font-bold text-black tracking-tight leading-none">
              {formattedMainTitle}
            </span>
            <h2 className="text-5xl md:text-[5rem] font-bold text-[#63B846] tracking-tight leading-none mb-2">
              {formattedSubTitle}
            </h2>
            <div className="text-[#4D4D4D] text-sm md:text-2xl space-y-1 leading-[1.2] mt-5 whitespace-pre-line">
              <p>{firstSentence}</p>
              <p className="text-[#4D4D4D] text-2xl font-bold w-full">{finalSecondSentence}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-12 items-stretch mt-16">
            {/* Left side: Contact Details Card */}
            <div className="lg:col-span-7 xl:border-r xl:border-[#00000033] xl:pr-12 h-full w-full flex flex-col justify-between">
              <div className="bg-[#EEF6EB] rounded-[24px] p-8 flex flex-col justify-between h-full border border-gray-50">
                <div className="flex-1">
                  <h3 className="text-[#63B846] text-2xl md:text-3xl font-bold mb-4 text-center">
                    {contactTitle}
                  </h3>
                  <p className="text-sm md:text-xl leading-[1.2] mb-8 text-center">
                    {contactIntro}
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-left md:divide-x  md:divide-black/20">
                    {/* Left Column (Address) */}
                    {leftItem && (
                      <div className="space-y-2">
                        <span className="block text-[#63B846] font-bold text-2xl">{leftItem.title}</span>
                        <p className="text-black text-sm md:text-[1.375rem] leading-[1.2] font-normal">
                          {leftItem.value}
                        </p>
                      </div>
                    )}

                    {/* Right Column (Email & Phone) */}
                    <div className="space-y-4 lg:pl-6">
                      {rightItems.map((item, idx) => (
                        <div key={idx} className="space-y-1">
                          <span className="block text-[#63B846] font-bold text-2xl">{item.title}</span>
                          {renderValueLink(item)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Social Links Row */}
                {socials.length > 0 && (
                  <div className="border-t border-t-1 border-[#939393] pt-6 mt-8">
                    <div className="flex justify-around items-center divide-x divide-[#939393] text-[#63B846] font-bold text-base md:text-2xl">
                      {socials.map((social, idx) => (
                        <a
                          key={idx}
                          href={social.link}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 text-center hover:opacity-80 transition-opacity  tracking-tight capitalize"
                        >
                          {social.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right side: Contact Form */}
            <div className="lg:col-span-5 lg:pl-4 flex flex-col justify-center">
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
                    text={buttonText}
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

export default ReadyToBegin;

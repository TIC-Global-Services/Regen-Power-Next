'use client';

import React from 'react';
import Fade from '@/reuseables/fade';
import { MapPin, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

export interface ContactItem {
  type: 'address' | 'email' | 'phone';
  label: string;
  value: string;
}

export interface SocialLink {
  name: string;
  url: string;
}

export interface ContactInfoProps {
  title?: string;
  description?: string;
  items?: ContactItem[];
  socials?: SocialLink[];
}

const ContactInfo = ({
  title = "Contact Us",
  description = "Give us a call today and one of our friendly and knowledgeable energy consultants will be able to assist you with your enquiry.",
  items = [
    {
      type: 'address',
      label: "Address",
      value: "4/90 Catalano Circuit, Canning Vale, WA 6155"
    },
    {
      type: 'email',
      label: "E-Mail",
      value: "sales@regenpower.com"
    },
    {
      type: 'phone',
      label: "Telephone",
      value: "08-9456-3491"
    }
  ],
  socials = [
    { name: "Instagram", url: "https://instagram.com/regenpower" },
    { name: "LinkedIn", url: "https://linkedin.com/company/regenpower" },
    { name: "Facebook", url: "https://facebook.com/regenpower" },
    { name: "Twitter", url: "https://twitter.com/regenpower" }
  ]
}: ContactInfoProps) => {

  const renderIcon = (type: 'Instagram' | 'LinkedIn' | 'Facebook' | 'Twitter') => {
    switch (type) {
      case 'Instagram':
        return <img src={'/instagram_logo.svg'} className="text-[#63B846] shrink-0" height={30} width={30} />;
      case 'LinkedIn':
        return <img src={'/linkedin_logo.svg'} className="text-[#63B846] shrink-0" height={30} width={30} />;
      case 'Facebook':
        return <img src={'/facebook_logo.svg'} className="text-[#63B846] shrink-0" height={30} width={30} />;
      case 'Twitter':
        return <img src={'/twitter_logo.svg'} className="text-[#63B846] shrink-0" height={30} width={30} />;
    }
  };

  const renderLink = (item: ContactItem) => {
    if (item.type === 'email') {
      return (
        <a
          href={`mailto:${item.value}`}
          className="text-lg md:text-lg text-gray-800 hover:text-[#63B846] font-normal transition-colors duration-200"
        >
          {item.value}
        </a>
      );
    }
    if (item.type === 'phone') {
      return (
        <a
          href={`tel:${item.value.replace(/[^0-9]/g, '')}`}
          className="text-lg md:text-lg text-gray-800 hover:text-[#63B846] font-normal transition-colors duration-200"
        >
          {item.value}
        </a>
      );
    }
    return <span className="text-lg md:text-lg text-gray-800 font-normal whitespace-pre-line">{item.value}</span>;
  };

  return (
    <section className="bg-white py-16 md:py-24 px-4 md:px-[5%] md:px-[3%] w-full border-t border-gray-100">
      <Fade duration={5}>
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-[#63B846] tracking-tight leading-tight mb-4">
              {title}
            </h2>
            {description && (
              <p className="text-xl md:text-2xl leading-[1.2] font-medium">
                {description}
              </p>
            )}
          </div>
            <div className='h-[1.5px] bg-[#00000033] mb-5 w-[80%] mx-auto'></div>
          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3  gap-8 md:gap-6 border-b border-gray-100 pb-4 mb-4 max-w-4xl mx-auto">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center"
              >
                {/* Icon Circle */}
                {/* <div className="w-12 h-12 rounded-full bg-[#EEF6EB] flex items-center justify-center mb-4">
                  {renderIcon(item.type)}
                </div> */}
                {/* Label */}
                <span className="text-2xl font-bold text-[#63B846] mb-1.5">
                  {item.label}
                </span>
                {/* Value / Link */}
                <div className="md:max-w-[240px] leading-none">
                  {renderLink(item)}
                </div>
              </div>
            ))}
          </div>
             <div className='h-[1.5px] bg-[#00000033] mb-10 w-[80%] mx-auto'></div>
          {/* Social Media Links Row */}
          {socials.length > 0 && (
            <div className="flex flex-wrap justify-center items-center gap-y-4 lg:gap-10 text-sm md:text-base font-bold">
              {socials.map((social, idx) => (
                <Link
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[#63B846] transition-colors duration-200 capitalize tracking-tight text-2xl px-6 border-r border-[#00000033] last:border-none lg:px-0 lg:border-none"
                >
                  {/* Logo on mobile/tablet, name on desktop */}
                  <span className="block lg:hidden">
                    {renderIcon(social.name as 'Instagram' | 'LinkedIn' | 'Facebook' | 'Twitter')}
                  </span>
                  <span className="hidden lg:block">
                    {social.name}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </Fade>
    </section>
  );
};

export default ContactInfo;

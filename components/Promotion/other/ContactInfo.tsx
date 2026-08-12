'use client';

import React from 'react';
import Fade from '@/reuseables/fade';
import { MapPin, Mail, Phone } from 'lucide-react';

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

  const renderIcon = (type: 'address' | 'email' | 'phone') => {
    switch (type) {
      case 'address':
        return <MapPin className="text-[#63B846] shrink-0" size={24} />;
      case 'email':
        return <Mail className="text-[#63B846] shrink-0" size={24} />;
      case 'phone':
        return <Phone className="text-[#63B846] shrink-0" size={24} />;
    }
  };

  const renderLink = (item: ContactItem) => {
    if (item.type === 'email') {
      return (
        <a 
          href={`mailto:${item.value}`}
          className="text-base md:text-lg text-gray-800 hover:text-[#63B846] font-semibold transition-colors duration-200"
        >
          {item.value}
        </a>
      );
    }
    if (item.type === 'phone') {
      return (
        <a 
          href={`tel:${item.value.replace(/[^0-9]/g, '')}`}
          className="text-base md:text-lg text-gray-800 hover:text-[#63B846] font-semibold transition-colors duration-200"
        >
          {item.value}
        </a>
      );
    }
    return <span className="text-base md:text-lg text-gray-800 font-semibold">{item.value}</span>;
  };

  return (
    <section className="bg-white py-16 md:py-24 px-4 md:px-[5%] w-full border-t border-gray-100">
      <Fade>
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-[#63B846] tracking-tight leading-tight mb-4">
              {title}
            </h2>
            {description && (
              <p className="text-sm md:text-base text-gray-500 leading-relaxed font-medium">
                {description}
              </p>
            )}
          </div>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 border-b border-gray-100 pb-12 mb-8 max-w-4xl mx-auto">
            {items.map((item, idx) => (
              <div 
                key={idx} 
                className="flex flex-col items-center text-center p-6 bg-[#fdfdfd] border border-gray-100/60 rounded-[20px] shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {/* Icon Circle */}
                <div className="w-12 h-12 rounded-full bg-[#EEF6EB] flex items-center justify-center mb-4">
                  {renderIcon(item.type)}
                </div>
                {/* Label */}
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">
                  {item.label}
                </span>
                {/* Value / Link */}
                <div className="max-w-[240px] leading-relaxed">
                  {renderLink(item)}
                </div>
              </div>
            ))}
          </div>

          {/* Social Media Links Row */}
          {socials.length > 0 && (
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 text-sm md:text-base font-bold">
              {socials.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-[#63B846] transition-colors duration-200 capitalize tracking-tight"
                >
                  {social.name}
                </a>
              ))}
            </div>
          )}
        </div>
      </Fade>
    </section>
  );
};

export default ContactInfo;

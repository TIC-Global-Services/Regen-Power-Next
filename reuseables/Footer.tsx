import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {  DiscAlbum, Link2Icon, Mail,  } from 'lucide-react';

const quickLinks = [
  { name: 'Solar Solutions', href: '#' },
  { name: 'Battery Storage', href: '#' },
  { name: 'EV Charging', href: '#' },
  { name: 'Commercial Solar', href: '#' },
  { name: 'About Us', href: '#' },
  { name: 'Contact', href: '#' },
  { name: 'Blog', href: '#' },
  { name: 'Customer Reviews', href: '#' },
];

const waHeadOffice = {
  address: 'Head Office: Address TBC',
  phone: '1800 073 436',
  directLine: '08 9456 3491',
  email: 'Sales@Regenpower.com',
  hours: 'Mon – Fri 8:00am – 5:00pm AWST',
};

const otherStateOffices = [
  { state: 'South Australia', phone: '08 8311 1403', email: 'Sales.Sa@Regenpower.com' },
  { state: 'New South Wales', phone: '02 8077 4232', email: 'Sales.Nsw@Regenpower.com' },
  { state: 'Queensland', phone: '07 3036 7421', email: 'Sales.Qld@Regenpower.com' },
  { state: 'Victoria', phone: '03 8676 8807', email: 'Sales.Vic@Regenpower.com' },
];

const socialLinks = [
  { icon: Link2Icon, href: '#' },
  { icon: Mail, href: '#' },
  { icon: DiscAlbum, href: '#' },
];

const Footer = () => {
  return (
    <footer 
      className="relative w-full bg-[#0a0a0a] text-white pt-16 pb-8 px-4 md:px-8 lg:px-[5%] bg-cover bg-center"
      style={{ backgroundImage: "url('/footer_bg.svg')" }}
    >
      <div className="">
        {/* Logo Section */}
        <div className="flex justify-center mb-16">
          <Image 
            src="/regen_logo_footer.png" 
            alt="Regen Power Logo" 
            width={300} 
            height={100} 
            className="h-auto w-[250px] object-contain"
          />
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Quick Links */}
          <div>
            <h3 className="text-[#8dc63f] text-xl mb-6 font-medium">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* WA Head Office */}
          <div>
            <h3 className="text-[#8dc63f] text-xl mb-6 font-medium">WA Head Office</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>{waHeadOffice.address}</p>
              <p>Phone: {waHeadOffice.phone}</p>
              <p>Direct Line: {waHeadOffice.directLine}</p>
              <p>Email: <a href={`mailto:${waHeadOffice.email}`} className="hover:text-white transition-colors">{waHeadOffice.email}</a></p>
              <p>Hours: {waHeadOffice.hours}</p>
            </div>
          </div>

          {/* Other State Offices */}
          <div>
            <h3 className="text-[#8dc63f] text-xl mb-6 font-medium">Other State Offices</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 text-sm text-gray-300">
              {otherStateOffices.map((office, index) => (
                <div key={index} className="flex flex-col">
                  <p className="mb-1 text-gray-100">{office.state}</p>
                  <p>{office.phone}</p>
                  <a href={`mailto:${office.email}`} className="hover:text-white transition-colors break-all">{office.email}</a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-800 pt-8 text-xs text-gray-400 gap-6">
          <p className="text-center md:text-left">
            Copyright © 2026 <span className="text-[#8dc63f]">Regen Power</span> Pty Ltd. All rights reserved.
          </p>
          
          <div className="flex gap-4">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <Link key={index} href={social.href} className="border border-gray-600 rounded p-1.5 hover:bg-gray-800 hover:text-white transition-all">
                  <Icon size={16} strokeWidth={1.5} />
                </Link>
              );
            })}
          </div>

          <p className="text-center md:text-right">
            Designed & Developed by <span className="text-[#8dc63f]">TIC Global services</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
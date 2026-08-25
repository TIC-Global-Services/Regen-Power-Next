import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone } from 'lucide-react';

const quickLinks = [
  { name: 'Solar', href: '/solar' },
  { name: 'Battery Storage', href: '/battery-storage' },
  { name: 'EV Charging', href: '/ev-charging' },
  { name: 'Commercial systems', href: '/commercial-systems' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Blog', href: '/blog' },
  { name: 'Customer Reviews', href: '/reviews' },
];

const waHeadOffice = {
  address: 'Head Office: 4/90 Catalano Circuit, Canning Vale WA 6155',
  phone: '1800 073 436',
  directLine: '08 9456 3491',
  email: 'sales@regenpower.com',
  hours: 'Mon – Fri 8:00am – 5:00pm AWST',
};

const otherStateOffices = [
  {
    state: 'South Australia',
    address: 'Level 2, 70 Hindmarsh Square, Adelaide SA 5000',
    phone: '08 8311 1403',
    email: 'sales.sa@regenpower.com',
  },
  {
    state: 'New South Wales',
    address: 'Level 17, 123 Pitt St, Sydney NSW 2000',
    phone: '02 8077 4232',
    email: 'sales.nsw@regenpower.com',
  },
  {
    state: 'Queensland',
    address: '15 Burke Street, Woolloongabba QLD 4102',
    phone: '07 3036 7421',
    email: 'sales.qld@regenpower.com',
  },
  {
    state: 'Victoria',
    address: 'Level 23, Collins Square Tower Five, 727 Collins St, Melbourne VIC 3008',
    phone: '03 8676 8807',
    email: 'sales.vic@regenpower.com',
  },
];

const socialLinks = [
  { name: 'Facebook', icon: '/facebook_logo.svg', href: 'https://www.facebook.com/regenpowerperth' },
  { name: 'Instagram', icon: '/instagram_logo.svg', href: 'https://www.instagram.com/regenpowerperth/' },
  { name: 'LinkedIn', icon: '/linkedin_logo.svg', href: 'https://www.linkedin.com/company/regen-power' },
  { name: 'Twitter / X', icon: '/twitter_logo.svg', href: 'https://twitter.com/RegenPower2003' },
];

const Footer = () => {
  return (
    <footer
      className="relative w-full bg-[#0a0a0a] text-white pt-16 pb-8 px-4 md:px-8 lg:px-[5%] md:px-[3%] bg-cover bg-center "
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

        {/* Highlighted Contact Number */}
        <div className="flex justify-center mb-12">
          <a
            href="tel:0894563491"
            className="inline-flex items-center justify-center gap-2 max-w-full text-sm md:text-lg text-gray-200 border border-[#8dc63f]/40 rounded-full px-4 py-2.5 md:px-6 hover:bg-white/5 transition-colors"
          >
            <Phone size={18} className="shrink-0 text-[#8dc63f]" />
            <span className="text-center">
              Need help? Call our expert team on{' '}
              <span className="text-[#8dc63f] font-medium whitespace-nowrap">08 9456 3491</span>
            </span>
          </a>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 text-center md:text-left">
          {/* Quick Links */}
          <div>
            <h3 className="text-[#8dc63f] text-xl mb-6 font-medium">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300 flex flex-col items-center md:items-start">
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
            <div className="space-y-2 text-sm text-gray-300 flex flex-col items-center md:items-start">
              <p>{waHeadOffice.address}</p>
              <p>Phone: <a href="tel:1800073436" className="hover:text-white transition-colors">{waHeadOffice.phone}</a></p>
              <p>Direct Line: <a href="tel:0894563491" className="hover:text-white transition-colors">{waHeadOffice.directLine}</a></p>
              <p>Email: <a href={`mailto:${waHeadOffice.email}`} className="hover:text-white transition-colors">{waHeadOffice.email}</a></p>
              <p>Hours: {waHeadOffice.hours}</p>
            </div>
          </div>

          {/* Other State Offices */}
          <div>
            <h3 className="text-[#8dc63f] text-xl mb-6 font-medium">Other State Offices</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 text-sm text-gray-300 text-center sm:text-left">
              {otherStateOffices.map((office, index) => (
                <div key={index} className="flex flex-col items-center sm:items-start">
                  <p className="mb-1 text-gray-100">{office.state}</p>
                  <p>{office.address}</p>
                  <a href={`tel:${office.phone.replace(/\s/g, '')}`} className="hover:text-white transition-colors">{office.phone}</a>
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

          <div className="flex gap-4 justify-center md:justify-start">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                title={social.name}
                className="border border-gray-600 rounded p-1.5 hover:bg-gray-800 transition-all"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={social.icon} alt={social.name} width={16} height={16} />
              </a>
            ))}
            <a
              href={`mailto:${waHeadOffice.email}`}
              aria-label="Email"
              title="Email"
              className="border border-gray-600 rounded p-1.5 hover:bg-gray-800 hover:text-white transition-all"
            >
              <Mail size={16} strokeWidth={1.5} />
            </a>
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
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Plus } from 'lucide-react';
import gsap from 'gsap';
import CtaButton from './CtaButton';

const navItems = [
  {
    name: 'Solar System',
    href: '/solar',
    subItems: [
      { name: 'Solar System', href: '/solar' },
      { name: 'Brand we carry', href: '/solar/brands' },
      { name: 'Solar Deals', href: '/solar/deals' },
      { name: 'Government rebates', href: '/solar/government-rebates' },
      { name: 'Faq', href: '/solar/faq' },
    ],
  },
  {
    name: 'Battery Storage',
    href: '/battery-storage',
    subItems: [
      { name: 'Battery Storage', href: '/battery-storage' },
      { name: 'Battery Product', href: '/battery-product' },
      { name: 'Smart home battery system', href: '/smart-home-battery-system' },
      { name: 'government rebates', href: '/government-rebates' },
      { name: 'Brands we carry', href: '/brands-we-carry' },
    ],
  },
  { name: 'EV Charging', href: '/ev-charging' },
  {
    name: 'Commercial & Off Grid',
    href: '/commercial-off-grid',
    subItems: [
      { name: 'Commercial & Off Grid', href: '/commercial-off-grid' },
      { name: 'Commercial Systems & Case Studies', href: '/commercial-systems' },
      { name: 'Off-Grid Solutions', href: '/off-grid-solutions' },
      { name: 'Research & Development', href: '/research-and-development' },
      { name: 'Portfolio', href: '/portfolio' },
    ]
  },
  { name: 'About Us', href: '#' },
  { name: 'Reviews', href: '/reviews' },
  { name: 'Press&Media', href: '/press-media' },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedMobileItem, setExpandedMobileItem] = useState<number | null>(null);

  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const menuLinksRef = useRef<HTMLUListElement | null>(null);
  const plusIconRef = useRef<HTMLDivElement | null>(null);
  const lastScrollY = useRef(0);

  // Close navigation menus on route change
  useEffect(() => {
    setHoveredIndex(null);
    setExpandedMobileItem(null);
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
      closeMenu();
    }
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      // Don't hide navbar if mobile menu is open
      if (currentY > lastScrollY.current && currentY > 80 && !isMobileMenuOpen) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (overlayRef.current) {
      gsap.set(overlayRef.current, {
        clipPath: "circle(0% at 90% 10%)",
        visibility: "hidden",
        opacity: 0,
      });
    }

    if (menuLinksRef.current) {
      gsap.set(menuLinksRef.current.children, { opacity: 0, y: 30 });
    }
  }, []);

  const openMenu = useCallback(() => {
    if (!overlayRef.current || !plusIconRef.current || !menuLinksRef.current) return;

    gsap.set(overlayRef.current, { visibility: "visible", opacity: 1 });

    gsap.to(plusIconRef.current, {
      rotation: 45,
      scale: 1.1,
      duration: 0.4,
      ease: "power2.out"
    });

    gsap.to(overlayRef.current, {
      clipPath: "circle(150% at 90% 10%)",
      duration: 0.6,
      ease: "power3.inOut",
    });

    gsap.to(menuLinksRef.current.children, {
      opacity: 1,
      y: 0,
      stagger: 0.05,
      delay: 0.3,
      duration: 0.4,
      ease: "power2.out"
    });
  }, []);

  const closeMenu = useCallback(() => {
    if (!overlayRef.current || !plusIconRef.current || !menuLinksRef.current) return;

    gsap.to(plusIconRef.current, {
      rotation: 0,
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });

    gsap.to(menuLinksRef.current.children, {
      opacity: 0,
      y: 20,
      stagger: 0.03,
      duration: 0.3,
      ease: "power2.in"
    });

    gsap.to(overlayRef.current, {
      clipPath: "circle(0% at 90% 10%)",
      duration: 0.5,
      delay: 0.2,
      ease: "power3.inOut",
      onComplete: () => {
        gsap.set(overlayRef.current, {
          visibility: "hidden",
          opacity: 0,
        });
        setExpandedMobileItem(null);
      },
    });
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMobileMenuOpen((p) => {
      const nextState = !p;
      if (nextState) {
        openMenu();
      } else {
        closeMenu();
      }
      return nextState;
    });
  }, [openMenu, closeMenu]);


  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full py-6 px-4 md:px-8 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="px-[3%] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 z-50">
          <Image
            src="/regen_logo_nav.png"
            alt="Regen Power"
            width={180}
            height={60}
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center bg-[#63B84666] backdrop-blur-md rounded-full px-2 py-1.5 shadow-sm border border-[#63B846]">
          <ul className="flex items-center text-sm font-medium text-white">
            {navItems.map((item, index) => {
              const isHovered = hoveredIndex === index;
              return (
                <li
                  key={index}
                  className="relative px-3 py-2"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 hover:text-[#8dc63f] transition-colors text-white"
                    onClick={() => setHoveredIndex(null)}
                  >
                    {item.name}
                    {item.subItems && (
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-300 ${isHovered ? 'rotate-180' : ''}`}
                      />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {item.subItems && (
                    <div
                      className={`absolute left-0 top-full pt-4 transition-all duration-300 transform ${
                        isHovered
                          ? 'opacity-100 visible translate-y-0'
                          : 'opacity-0 invisible translate-y-2'
                      }`}
                    >
                      <div className="bg-white rounded-xl shadow-xl overflow-hidden min-w-[200px] border border-gray-100 p-2">
                        <ul className="flex flex-col">
                          {item.subItems.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <Link
                                href={subItem.href}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#8dc63f]/10 hover:text-[#8dc63f] rounded-lg transition-colors"
                                onClick={() => setHoveredIndex(null)}
                              >
                                {subItem.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Contact Us Button (Desktop) — uniform green hover + arrow animation */}
        <div className="hidden lg:flex">
          <CtaButton
            href="/contact"
            text="Contact Us"
            textColor="text-white"
            iconTextColor="text-white"
          />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden z-50 text-[#8dc63f] bg-white p-2 rounded-full shadow-md hover:scale-105 transition-transform"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <div ref={plusIconRef}>
            <Plus size={24} strokeWidth={2.5} />
          </div>
        </button>

        {/* Mobile Navigation GSAP Overlay */}
        <div
          ref={overlayRef}
          className="fixed inset-0 bg-[#0a0a0a]/95 backdrop-blur-2xl z-40 lg:hidden flex flex-col pt-28 px-8"
        >
          <ul ref={menuLinksRef} className="flex flex-col gap-6 overflow-y-auto pb-20">
            {navItems.map((item, index) => {
              const hasSubItems = !!item.subItems;
              const isExpanded = expandedMobileItem === index;
              return (
                <li key={index} className="flex flex-col gap-1">
                  <div className="flex justify-between items-center w-full">
                    <Link
                      href={item.href}
                      className="text-3xl font-medium text-white hover:text-[#8dc63f] transition-colors flex-1 py-1"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        closeMenu();
                      }}
                    >
                      {item.name}
                    </Link>
                    {hasSubItems && (
                      <button
                        className="p-3 -mr-3 text-white/60 hover:text-[#8dc63f] transition-colors focus:outline-none cursor-pointer"
                        onClick={() => setExpandedMobileItem(isExpanded ? null : index)}
                        aria-label="Toggle submenu"
                      >
                        <ChevronDown
                          size={28}
                          className={`transition-transform duration-300 ${isExpanded ? 'rotate-180 text-[#8dc63f]' : ''}`}
                        />
                      </button>
                    )}
                  </div>

                  {/* Mobile Submenu Accordion */}
                  {hasSubItems && (
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isExpanded ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <ul className="flex flex-col gap-3 pl-4 border-l border-white/10">
                          {item.subItems?.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <Link
                                href={subItem.href}
                                className="text-gray-400 py-1 block text-xl hover:text-white transition-colors"
                                onClick={() => {
                                  setIsMobileMenuOpen(false);
                                  closeMenu();
                                }}
                              >
                                {subItem.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
            <li className="mt-8">
              <CtaButton
                href="/contact"
                text="Contact Us"
                textColor="text-white"
                bgClass="bg-[#8dc63f]"
                borderClass="border border-[#7ebd35]"
                hoverClass="hover:bg-[#7ebd35]"
                className="w-full justify-between"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  closeMenu();
                }}
              />
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
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
      { name: 'Smart Home Battery System', href: '/smart-home-battery-system' },
      { name: 'Government Rebates', href: '/government-rebates' },
      { name: 'Brands We Carry', href: '/brands-we-carry' },
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
  { name: 'Press & Media', 
    href: '/press-media',
    subItems :[
      { name: 'Blogs', href: '/blog' },
      { name: 'Press Releases', href: '/press-media' },
      ]
   },
   { name: 'Contact Us', href: '/contact' },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedMobileItem, setExpandedMobileItem] = useState<number | null>(null);

  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const menuLinksRef = useRef<HTMLUListElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const menuBtnRef = useRef<HTMLButtonElement | null>(null);
  const revealOriginRef = useRef({ x: 95, y: 5 });
  const isMobileMenuOpenRef = useRef(false);

  // Scroll lock while the mobile menu is open (html + body for iOS reliability),
  // with an unmount cleanup so a mid-open unmount never leaves the page locked.
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Initial hidden state — the overlay ALSO carries this in inline styles so it is
  // invisible before JS runs (no first-paint flash), matching the Doss pattern.
  useEffect(() => {
    if (overlayRef.current) {
      gsap.set(overlayRef.current, {
        clipPath: "circle(0% at 95% 5%)",
        visibility: "hidden",
        opacity: 0,
      });
    }

    if (menuLinksRef.current) {
      gsap.set(menuLinksRef.current.children, { opacity: 0, y: 30 });
    }
    if (ctaRef.current) {
      gsap.set(ctaRef.current, { opacity: 0, y: 30 });
    }
  }, []);

  const openMenu = useCallback(() => {
    if (!overlayRef.current || !menuLinksRef.current) return;

    // Anchor the circular reveal to the toggle button's actual position, like Doss.
    const btn = menuBtnRef.current;
    if (btn) {
      const r = btn.getBoundingClientRect();
      revealOriginRef.current = {
        x: Math.min(95, Math.max(5, ((r.left + r.width / 2) / window.innerWidth) * 100)),
        y: Math.min(95, Math.max(5, ((r.top + r.height / 2) / window.innerHeight) * 100)),
      };
    }

    const { x, y } = revealOriginRef.current;

    gsap.set(overlayRef.current, { visibility: "visible", opacity: 1 });

    gsap.fromTo(overlayRef.current,
      { clipPath: `circle(0% at ${x}% ${y}%)` },
      { clipPath: `circle(150% at ${x}% ${y}%)`, duration: 0.6, ease: "power3.inOut" }
    );

    gsap.fromTo(
      menuLinksRef.current.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.05, delay: 0.3, duration: 0.4, ease: "power2.out" }
    );
    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.4, delay: 0.45, ease: "power2.out" }
      );
    }
  }, []);

  const closeMenu = useCallback(() => {
    if (!overlayRef.current || !menuLinksRef.current) return;

    gsap.to(menuLinksRef.current.children, {
      opacity: 0,
      y: 20,
      stagger: 0.03,
      duration: 0.3,
      ease: "power2.in"
    });
    if (ctaRef.current) {
      gsap.to(ctaRef.current, { opacity: 0, y: 20, duration: 0.3, ease: "power2.in" });
    }

    const { x, y } = revealOriginRef.current;

    gsap.to(overlayRef.current, {
      clipPath: `circle(0% at ${x}% ${y}%)`,
      duration: 0.4,
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

  const closeMenuAndHide = useCallback(() => {
    setIsMobileMenuOpen(false);
    closeMenu();
  }, [closeMenu]);

  const toggleMenu = useCallback(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
      closeMenu();
    } else {
      setIsMobileMenuOpen(true);
      openMenu();
    }
  }, [isMobileMenuOpen, openMenu, closeMenu]);

  // Keep the open-state mirrored in a ref so the route-change effect below only
// depends on pathname — depending on isMobileMenuOpen directly would make the
// effect re-run the instant the menu opens and immediately close it again.
  useEffect(() => {
    isMobileMenuOpenRef.current = isMobileMenuOpen;
  }, [isMobileMenuOpen]);

  // Close navigation menus on route change
  useEffect(() => {
    setHoveredIndex(null);
    setExpandedMobileItem(null);
    if (isMobileMenuOpenRef.current) {
      setIsMobileMenuOpen(false);
      closeMenu();
    }
  }, [pathname, closeMenu]);

  // Close on Escape while the menu is open
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMobileMenuOpen, closeMenu]);

  // Sync header chrome with the 3D hero pin: fades out during the scrub so the
  // full-bleed image breathes edge-to-edge, fades back at the very end.
  // Hero writes document.documentElement.dataset.heroChrome = "visible"|"hidden".
  useEffect(() => {
    const header = document.querySelector("header[data-hero-chrome]") as HTMLElement | null;
    if (!header) return;
    const obs = new MutationObserver(() => {
      const v = document.documentElement.dataset.heroChrome ?? "visible";
      header.dataset.heroChrome = v;
    });
    // Initialize from current value (hero may have mounted first)
    header.dataset.heroChrome = document.documentElement.dataset.heroChrome ?? "visible";
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-hero-chrome"] });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* Fixed header — NOTE: the hide-on-scroll uses a transform (translate-y).
          A transform on an ancestor makes it the containing block for any
          position:fixed descendant (shrinking it to that ancestor's box), so the
          mobile overlay is rendered as a SIBLING below, outside this <header>. */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full py-6 px-4 md:px-6 transition-all duration-500 data-[hero-chrome=hidden]:pointer-events-none data-[hero-chrome=hidden]:-translate-y-4 data-[hero-chrome=hidden]:opacity-0" data-hero-chrome="visible">
        <div className="px-[5%] md:px-[3%] flex items-center justify-between">
        {/* Logo — swap to the white variant while the dark overlay is open */}
        <Link href="/" className="flex-shrink-0 z-50">
          <Image
            src={isMobileMenuOpen ? "/regen_logo_footer.png" : "/regen_logo_nav.png"}
            alt="Regen Power"
            width={180}
            height={60}
            className="h-14 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center bg-[#63B84666] backdrop-blur-md rounded-full px-2 py-1.5 shadow-sm border border-[#63B846]">
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
                      className={`absolute left-0 top-full pt-4 transition-all duration-300 transform ${isHovered
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

        {/* Speak to Us Button (Desktop) — opens device dialer */}
        <div className="hidden xl:flex">
          <CtaButton
            href="tel:+61894563491"
            text="Speak to Us"
            textColor="text-white"
            iconTextColor="text-white"
          />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          ref={menuBtnRef}
          className="xl:hidden z-50 text-[#8dc63f] bg-white h-10 w-10 flex items-center justify-center rounded-full shadow-md hover:scale-105 transition-transform"
          onClick={toggleMenu}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Toggle menu'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-nav-overlay"
        >
          {/* Doss-style hamburger: three bars collapse into a single line when open */}
          <div className="relative flex h-[12px] w-5 flex-col items-center justify-between">
            <div
              className={`absolute left-0 h-[2px] w-5 bg-[#8dc63f] transition-all duration-300 ease-in-out ${
                isMobileMenuOpen ? 'top-[5px]' : 'top-0'
              }`}
            />
            <div className="absolute left-0 top-[5px] h-[2px] w-5 bg-[#8dc63f] transition-all duration-300 ease-in-out" />
            <div
              className={`absolute left-0 h-[2px] w-5 bg-[#8dc63f] transition-all duration-300 ease-in-out ${
                isMobileMenuOpen ? 'top-[5px]' : 'top-[10px]'
              }`}
            />
          </div>
        </button>
        </div>
      </header>

      {/* Mobile Navigation overlay */}
      <div
        id="mobile-nav-overlay"
        ref={overlayRef}
        aria-hidden={!isMobileMenuOpen}
        className="fixed inset-0 z-40 bg-[#63B84666] backdrop-blur-xl xl:hidden overflow-y-auto"
          style={{
            clipPath: "circle(0% at 95% 5%)",
            visibility: "hidden",
            opacity: 0,
          }}
        >
          <div className="flex min-h-full flex-col justify-center px-6 py-28">
            <ul ref={menuLinksRef} className="flex w-full flex-col gap-4">
              {navItems.map((item, index) => {
                const hasSubItems = !!item.subItems;
                const isExpanded = expandedMobileItem === index;
                return (
                  <li key={index} className="w-full flex flex-col gap-1">
                    <div className="flex items-center w-full">
                      <Link
                        href={item.href}
                        className="text-xl font-medium text-white hover:text-[#8dc63f] transition-colors py-2"
                        onClick={closeMenuAndHide}
                      >
                        {item.name}
                      </Link>
                      {hasSubItems && (
                        <button
                          className="ml-1 p-1.5 text-white/60 hover:text-[#8dc63f] transition-colors focus:outline-none cursor-pointer"
                          onClick={() => setExpandedMobileItem(isExpanded ? null : index)}
                          aria-expanded={isExpanded}
                          aria-controls={`mobile-submenu-${index}`}
                          aria-label={`Toggle ${item.name} submenu`}
                        >
                          <ChevronDown
                            size={22}
                            className={`transition-transform duration-300 ${isExpanded ? 'rotate-180 text-[#8dc63f]' : ''}`}
                          />
                        </button>
                      )}
                    </div>

                    {/* Mobile Submenu Accordion */}
                    {hasSubItems && (
                      <div
                        id={`mobile-submenu-${index}`}
                        className={`grid w-full transition-all duration-300 ease-in-out ${
                          isExpanded ? 'grid-rows-[1fr] opacity-100 mt-1' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="my-2 h-px w-10 bg-white/25" />
                          <ul className="flex flex-col items-start gap-1 pl-4 pb-2 border-l border-white/10">
                            {item.subItems?.map((subItem, subIndex) => (
                              <li key={subIndex}>
                                <Link
                                  href={subItem.href}
                                  className="text-white/80 py-1 block text-base hover:text-white transition-colors"
                                  onClick={closeMenuAndHide}
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

            {/* CTA — opens device dialer */}
            <div ref={ctaRef} className="mt-10 w-full max-w-md mx-auto flex justify-center">
              <CtaButton
                href="tel:+61894563491"
                text="Speak to Us"
                textColor="text-white"
                bgClass="bg-[#8dc63f]"
                borderClass="border border-[#7ebd35]"
                hoverClass="hover:bg-[#7ebd35]"
                className="w-40 justify-between"
                onClick={closeMenuAndHide}
              />
            </div>
          </div>
        </div>
    </>
  );
};

export default Navbar;
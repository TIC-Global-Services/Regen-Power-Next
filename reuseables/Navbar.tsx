'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Phone } from 'lucide-react';
import gsap from 'gsap';
import CtaButton from './CtaButton';
import type { ResolvedNavbar, ResolvedNavItem } from '@/lib/strapi/resolvers/navbar';

type NavItem = ResolvedNavItem;

const linkProps = (newTab: boolean) =>
  newTab ? ({ target: '_blank', rel: 'noopener noreferrer' } as const) : {};

const Navbar = ({ data }: { data: ResolvedNavbar }) => {
  const navItems = data.items;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedMobileItem, setExpandedMobileItem] = useState<number | null>(null);

  const pathname = usePathname();
  const normalizedPathname = (pathname ?? '').split('?')[0].split('#')[0].replace(/\/$/, '') || '/';
  const isActive = useCallback((href: string) => {
    const h = href.replace(/\/$/, '') || '/';
    return normalizedPathname === h || normalizedPathname.startsWith(h + '/');
  }, [normalizedPathname]);
  const isGroupActive = useCallback((item: NavItem) => isActive(item.href) || !!item.subItems?.some((s) => isActive(s.href)), [isActive]);
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

  return (
    <>
      {/* Fixed header — keep it free of transforms: a transform on an ancestor
          makes it the containing block for any position:fixed descendant
          (shrinking it to that ancestor's box), so the mobile overlay is
          rendered as a SIBLING below, outside this <header>. */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full py-6 transition-all duration-500">
        <div className="px-[5%] md:px-[3%] flex items-center justify-between">
        {/* Logo — swap to the white variant while the dark overlay is open */}
        <Link href={data.logoHref} className="flex-shrink-0 z-50">
          <Image
            src={isMobileMenuOpen ? data.logoLightSrc : data.logoSrc}
            alt={data.logoAlt}
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
              const groupActive = isGroupActive(item);
              return (
                <li
                  key={index}
                  className="relative px-3 py-2"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <Link
                    href={item.href}
                    {...linkProps(item.newTab)}
                    aria-current={groupActive ? 'page' : undefined}
                    className={`flex items-center gap-1 transition-colors ${groupActive ? 'text-black' : 'text-white hover:text-[#8dc63f]'}`}
                    onClick={() => setHoveredIndex(null)}
                  >
                    {item.name}
                    {item.subItems && (
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-300 ${isHovered ? 'rotate-180' : ''} ${groupActive ? 'text-black' : ''}`}
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
                          {item.subItems.map((subItem, subIndex) => {
                            const subActive = isActive(subItem.href);
                            return (
                              <li key={subIndex}>
                                <Link
                                  href={subItem.href}
                                  {...linkProps(subItem.newTab)}
                                  aria-current={subActive ? 'page' : undefined}
                                  className={`block px-4 py-2 text-sm rounded-lg transition-colors ${subActive ? 'bg-[#8dc63f] text-white' : 'text-gray-700 hover:bg-[#8dc63f]/10 hover:text-[#8dc63f]'}`}
                                  onClick={() => setHoveredIndex(null)}
                                >
                                  {subItem.name}
                                </Link>
                              </li>
                            );
                          })}
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
        {data.cta && (
          <div className="hidden xl:flex">
            <CtaButton
              href={data.cta.href}
              text={data.cta.text}
              icon={Phone}
              iconPosition="left"
              textColor="text-white"
              iconTextColor="text-white"
            />
          </div>
        )}

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
                const groupActive = isGroupActive(item);
                const isExpanded = expandedMobileItem === index;
                return (
                  <li key={index} className="w-full flex flex-col gap-1">
                    <div className="flex items-center w-full">
                      <Link
                        href={item.href}
                        {...linkProps(item.newTab)}
                        aria-current={groupActive ? 'page' : undefined}
                        className={`text-xl font-medium transition-colors py-2 ${groupActive ? 'text-black' : 'text-white hover:text-[#8dc63f]'}`}
                        onClick={closeMenuAndHide}
                      >
                        {item.name}
                      </Link>
                      {hasSubItems && (
                        <button
                          className={`ml-1 p-1.5 transition-colors focus:outline-none cursor-pointer ${groupActive ? 'text-black/70' : 'text-white/60 hover:text-[#8dc63f]'}`}
                          onClick={() => setExpandedMobileItem(isExpanded ? null : index)}
                          aria-expanded={isExpanded}
                          aria-controls={`mobile-submenu-${index}`}
                          aria-label={`Toggle ${item.name} submenu`}
                        >
                          <ChevronDown
                            size={22}
                            className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''} ${groupActive ? 'text-black' : isExpanded ? 'text-[#8dc63f]' : ''}`}
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
                            {item.subItems?.map((subItem, subIndex) => {
                              const subActive = isActive(subItem.href);
                              return (
                                <li key={subIndex}>
                                  <Link
                                    href={subItem.href}
                                    {...linkProps(subItem.newTab)}
                                    aria-current={subActive ? 'page' : undefined}
                                    className={`py-1 block text-base transition-colors ${subActive ? 'text-black font-semibold' : 'text-white/80 hover:text-white'}`}
                                    onClick={closeMenuAndHide}
                                  >
                                    {subItem.name}
                                  </Link>
                                </li>
                              );
                            })}
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
              {data.cta && (
              <CtaButton
                href={data.cta.href}
                text={data.cta.text}
                icon={Phone}
                iconPosition="left"
                textColor="text-white"
                bgClass="bg-[#8dc63f]"
                borderClass="border border-[#7ebd35]"
                hoverClass="hover:bg-[#7ebd35]"
                className="w-40 justify-between"
                onClick={closeMenuAndHide}
              />
              )}
            </div>
          </div>
        </div>
    </>
  );
};

export default Navbar;
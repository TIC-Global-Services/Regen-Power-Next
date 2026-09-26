import { strapiImageData } from "../media";
import type { NavbarData } from "../schemas/navbar";

export const NAVBAR_MAX_ITEMS = 8;
export const NAVBAR_MAX_SUB_ITEMS = 10;

const FALLBACK_LOGO = "/regen_logo_nav.png";
const FALLBACK_LOGO_LIGHT = "/regen_logo_footer.png";

export interface ResolvedNavSubItem {
  name: string;
  href: string;
  newTab: boolean;
}

export interface ResolvedNavItem {
  name: string;
  href: string;
  newTab: boolean;
  subItems?: ResolvedNavSubItem[];
}

export interface ResolvedNavbar {
  logoSrc: string;
  logoLightSrc: string;
  logoAlt: string;
  logoHref: string;
  items: ResolvedNavItem[];
  cta: { text: string; href: string } | null;
}

const FALLBACK_CTA = { text: "Speak to Us", href: "tel:+61894563491" };

const sub = (name: string, href: string): ResolvedNavSubItem => ({ name, href, newTab: false });

// Static fallback used when Strapi is unreachable or the entry is empty — matches the old hardcoded Navbar exactly.
export function fallbackNavbar(): ResolvedNavbar {
  return {
    logoSrc: FALLBACK_LOGO,
    logoLightSrc: FALLBACK_LOGO_LIGHT,
    logoAlt: "Regen Power",
    logoHref: "/",
    cta: { ...FALLBACK_CTA },
    items: [
      {
        name: "Solar System",
        href: "/solar/solar-system",
        newTab: false,
        subItems: [
          sub("Solar System", "/solar/solar-system"),
          sub("Brand we carry", "/solar/brands"),
          sub("Solar Deals", "/solar/deals"),
          sub("Government rebates", "/solar/government-rebates"),
          sub("Faq", "/solar/faq"),
        ],
      },
      {
        name: "Battery Storage",
        href: "/battery/battery-storage",
        newTab: false,
        subItems: [
          sub("Battery Storage", "/battery/battery-storage"),
          sub("Battery Product", "/battery/battery-product"),
          sub("Smart Home Battery System", "/battery/smart-home-battery-system"),
          sub("Government Rebates", "/battery/government-rebates"),
          sub("Brands We Carry", "/battery/brands-we-carry"),
        ],
      },
      { name: "EV Charging", href: "/ev-charging", newTab: false },
      {
        name: "Commercial & Off Grid",
        href: "/commercial/commercial-off-grid",
        newTab: false,
        subItems: [
          sub("Commercial & Off Grid", "/commercial/commercial-off-grid"),
          sub("Commercial Systems & Case Studies", "/commercial/case-studies"),
          sub("Off-Grid Solutions", "/commercial/off-grid-solutions"),
          sub("Research & Development", "/commercial/research-and-development"),
          sub("Portfolio", "/commercial/portfolio"),
        ],
      },
      { name: "About Us", href: "/about", newTab: false },
      { name: "Reviews", href: "/reviews", newTab: false },
      {
        name: "Press & Media",
        href: "/press-media",
        newTab: false,
        subItems: [sub("Blogs", "/blog"), sub("Press Releases", "/press-media")],
      },
      { name: "Contact Us", href: "/contact", newTab: false },
    ],
  };
}

export function resolveNavbar(data: NavbarData | null | undefined): ResolvedNavbar | null {
  if (!data) return null;
  const fallback = fallbackNavbar();

  const items: ResolvedNavItem[] =
    data.items && data.items.length > 0
      ? data.items.slice(0, NAVBAR_MAX_ITEMS).map((item) => {
          const subs = (item.subItems ?? []).slice(0, NAVBAR_MAX_SUB_ITEMS);
          return {
            name: item.label,
            href: item.href,
            newTab: !!item.openInNewTab,
            ...(subs.length > 0
              ? {
                  subItems: subs.map((s) => ({
                    name: s.label,
                    href: s.href,
                    newTab: !!s.openInNewTab,
                  })),
                }
              : {}),
          };
        })
      : fallback.items;

  const showCta = data.showCta ?? true;
  const cta = showCta
    ? {
        text: data.ctaText || FALLBACK_CTA.text,
        href: data.ctaHref || FALLBACK_CTA.href,
      }
    : null;

  return {
    logoSrc: (data.logo && strapiImageData(data.logo)?.src) || fallback.logoSrc,
    logoLightSrc: (data.logoLight && strapiImageData(data.logoLight)?.src) || fallback.logoLightSrc,
    logoAlt: data.logoAlt || fallback.logoAlt,
    logoHref: data.logoHref || fallback.logoHref,
    items,
    cta,
  };
}

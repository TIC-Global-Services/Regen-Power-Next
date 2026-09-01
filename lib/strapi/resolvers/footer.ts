import { strapiImageData } from "../media";
import type {
  FooterData,
  FooterQuickLinkData,
  FooterStateOfficeData,
  FooterSocialLinkData,
} from "../schemas/footer";

const FALLBACK_LOGO = "/regen_logo_footer.png";
const FALLBACK_BG = "/footer_bg.svg";

const FALLBACK_QUICK_LINKS: FooterQuickLinkData[] = [
  { id: 1, label: "Solar", href: "/solar" },
  { id: 2, label: "Battery Storage", href: "/battery/battery-storage" },
  { id: 3, label: "EV Charging", href: "/ev-charging" },
  { id: 4, label: "Commercial systems", href: "/commercial/case-studies" },
  { id: 5, label: "About Us", href: "/about" },
  { id: 6, label: "Contact", href: "/contact" },
  { id: 7, label: "Blog", href: "/blog" },
  { id: 8, label: "Customer Reviews", href: "/reviews" },
];

const FALLBACK_SOCIALS: { label: string; href: string; iconSrc: string | null }[] = [
  { label: "Facebook", href: "https://www.facebook.com/regenpowerperth", iconSrc: "/facebook_logo.svg" },
  { label: "Instagram", href: "https://www.instagram.com/regenpowerperth/", iconSrc: "/instagram_logo.svg" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/regen-power", iconSrc: "/linkedin_logo.svg" },
  { label: "Twitter / X", href: "https://twitter.com/RegenPower2003", iconSrc: "/twitter_logo.svg" },
];

export interface ResolvedFooterLink {
  label: string;
  href: string;
}

export interface ResolvedFooterOffice {
  address: string;
  phone: string | null;
  directLine: string | null;
  email: string | null;
  hours: string | null;
}

export interface ResolvedFooterStateOffice {
  state: string;
  address: string;
  phone: string | null;
  email: string | null;
}

export interface ResolvedFooterSocialLink {
  label: string;
  href: string;
  iconSrc: string | null;
}

export interface ResolvedFooter {
  logoSrc: string;
  logoAlt: string;
  backgroundSrc: string | null;
  helpText: string;
  helpPhoneLabel: string;
  helpPhoneHref: string;
  quickLinksTitle: string;
  quickLinks: ResolvedFooterLink[];
  headOfficeTitle: string;
  headOffice: ResolvedFooterOffice | null;
  stateOfficesTitle: string;
  stateOffices: ResolvedFooterStateOffice[];
  socialLinks: ResolvedFooterSocialLink[];
  copyrightText: string;
  creditLabel: string;
  creditName: string;
  creditHref: string | null;
}

export function resolveFooter(data: FooterData | null | undefined): ResolvedFooter | null {
  if (!data) return null;

  const logoSrc = data.logo
    ? (strapiImageData(data.logo)?.src ?? FALLBACK_LOGO)
    : FALLBACK_LOGO;
  const logoAlt = data.logo?.alternativeText ?? "Regen Power Logo";
  const backgroundSrc = data.backgroundImage
    ? (strapiImageData(data.backgroundImage)?.src ?? null)
    : null;

  const quickLinks: ResolvedFooterLink[] =
    data.quickLinks && data.quickLinks.length > 0
      ? data.quickLinks.map((l) => ({ label: l.label, href: l.href }))
      : FALLBACK_QUICK_LINKS.map((l) => ({ label: l.label, href: l.href }));

  const headOffice: ResolvedFooterOffice | null = data.headOffice
    ? {
        address: data.headOffice.address,
        phone: data.headOffice.phone,
        directLine: data.headOffice.directLine,
        email: data.headOffice.email,
        hours: data.headOffice.hours,
      }
    : null;

  const stateOffices: ResolvedFooterStateOffice[] = (data.stateOffices ?? []).map((o) => ({
    state: o.state,
    address: o.address,
    phone: o.phone,
    email: o.email,
  }));

  const socialLinks: ResolvedFooterSocialLink[] =
    data.socialLinks && data.socialLinks.length > 0
      ? data.socialLinks.map((s) => ({
          label: s.label,
          href: s.href,
          iconSrc: s.icon ? (strapiImageData(s.icon)?.src ?? null) : null,
        }))
      : FALLBACK_SOCIALS.map((s) => ({ label: s.label, href: s.href, iconSrc: s.iconSrc }));

  return {
    logoSrc,
    logoAlt,
    backgroundSrc,
    helpText: data.helpText ?? "Need help? Call our expert team on",
    helpPhoneLabel: data.helpPhoneLabel ?? "08 9456 3491",
    helpPhoneHref: data.helpPhoneHref ?? "0894563491",
    quickLinksTitle: data.quickLinksTitle ?? "Quick Links",
    quickLinks,
    headOfficeTitle: data.headOfficeTitle ?? "WA Head Office",
    headOffice,
    stateOfficesTitle: data.stateOfficesTitle ?? "Other State Offices",
    stateOffices,
    socialLinks,
    copyrightText: data.copyrightText ?? "Copyright © 2026 Regen Power Pty Ltd. All rights reserved.",
    creditLabel: data.creditLabel ?? "Designed & Developed by",
    creditName: data.creditName ?? "TIC Global services",
    creditHref: data.creditHref ?? null,
  };
}

// Static fallback used when Strapi is unreachable — matches the old hardcoded Footer exactly.
export function fallbackFooter(): ResolvedFooter {
  return {
    logoSrc: FALLBACK_LOGO,
    logoAlt: "Regen Power Logo",
    backgroundSrc: FALLBACK_BG,
    helpText: "Need help? Call our expert team on",
    helpPhoneLabel: "08 9456 3491",
    helpPhoneHref: "0894563491",
    quickLinksTitle: "Quick Links",
    quickLinks: FALLBACK_QUICK_LINKS.map((l) => ({ label: l.label, href: l.href })),
    headOfficeTitle: "WA Head Office",
    headOffice: {
      address: "Head Office: 4/90 Catalano Circuit, Canning Vale WA 6155",
      phone: "1800 073 436",
      directLine: "08 9456 3491",
      email: "sales@regenpower.com",
      hours: "Mon – Fri 8:00am – 5:00pm AWST",
    },
    stateOfficesTitle: "Other State Offices",
    stateOffices: [
      { state: "South Australia", address: "Level 2, 70 Hindmarsh Square, Adelaide SA 5000", phone: "08 8311 1403", email: "sales.sa@regenpower.com" },
      { state: "New South Wales", address: "Level 17, 123 Pitt St, Sydney NSW 2000", phone: "02 8077 4232", email: "sales.nsw@regenpower.com" },
      { state: "Queensland", address: "15 Burke Street, Woolloongabba QLD 4102", phone: "07 3036 7421", email: "sales.qld@regenpower.com" },
      { state: "Victoria", address: "Level 23, Collins Square Tower Five, 727 Collins St, Melbourne VIC 3008", phone: "03 8676 8807", email: "sales.vic@regenpower.com" },
    ],
    socialLinks: FALLBACK_SOCIALS.map((s) => ({ label: s.label, href: s.href, iconSrc: s.iconSrc })),
    copyrightText: "Copyright © 2026 Regen Power Pty Ltd. All rights reserved.",
    creditLabel: "Designed & Developed by",
    creditName: "TIC Global services",
    creditHref: null,
  };
}

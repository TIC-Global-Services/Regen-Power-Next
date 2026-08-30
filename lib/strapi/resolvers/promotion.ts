import { strapiImageData, strapiImage } from "../media";
import type { StrapiImageData } from "../media";
import type {
  PromotionHeroData,
  PromotionLimitedSpotsData,
  PromotionTrustRegenData,
  PromotionFreeQuotationData,
  PromotionBatteryRebatesData,
  PromotionTrustedBrandsData,
  PromotionHighEnergyData,
  PromotionBatteryPackageData,
  PromotionReadyToBeginData,
  PromotionSolarFinancingData,
  PromotionAboutRegenData,
  PromotionFindOutWhyData,
  PromotionAchievementsData,
  PromotionIndustryRecognitionData,
  PromotionFaqSectionData,
  PromotionAwardsSectionData,
  PromotionBatteryPricingData,
  PromotionContactInfoData,
} from "../schemas/promotion";

// ─── helpers ────────────────────────────────────────────────────────────────

const src = (media: { url?: string } | null | undefined): string =>
  media ? strapiImageData(media as never)?.src ?? "" : "";

const srcOrUndefined = (
  media: { url?: string } | null | undefined
): string | undefined => {
  const s = src(media);
  return s || undefined;
};

const text = (v: unknown, fallback = ""): string => {
  if (v == null) return fallback;
  if (typeof v === "string") return v;
  if (typeof v === "object" && v !== null && "text" in v) {
    return String((v as { text: string }).text);
  }
  return fallback;
};

const textArray = (v: unknown): string[] => {
  if (!Array.isArray(v)) return [];
  return v.map((item) => text(item)).filter(Boolean);
};

const bulletPointsToStrings = (v: unknown): string[] | undefined => {
  if (!Array.isArray(v)) return undefined;
  const out = v.map((item) => text(item)).filter(Boolean);
  return out.length ? out : undefined;
};

// ─── Hero (unified desktop + mobile) ─────────────────────────────────────

export interface ResolvedPromotionHero {
  // desktop shape
  backgroundImage: string | undefined;
  batteryImage: string | undefined;
  title: string;
  subtitle: string;
  mobileTitle: string;
  mobileSubtitle: string;
  packages: {
    capacity: string;
    originalPrice: number;
    finalPrice: number;
    stateRebate: number;
    federalRebate: number;
    isFullyInstalled: boolean;
    priceNote: string;
    image: string | undefined;
  }[];
  sidebar: {
    title: string;
    subtitle: string;
    paragraphs: string[];
    ctaText: string;
    ctaLink: string;
  };
  // mobile extras derived from same hero
  highlight: { prefix: string; value: string; suffix: string } | undefined;
  description: string;
  cta: { label: string; href: string } | undefined;
}

export function resolvePromotionHero(
  data: PromotionHeroData | null | undefined
): ResolvedPromotionHero | null {
  if (!data) return null;
  const heroTitle = data.title ?? "";
  // If Strapi has no hero we treat as missing so caller can fall back
  if (!heroTitle && !data.subtitle && !(data.packages ?? []).length) return null;
  return {
    backgroundImage: srcOrUndefined(data.backgroundImage),
    batteryImage: srcOrUndefined(data.batteryImage),
    title: heroTitle,
    subtitle: data.subtitle ?? "",
    mobileTitle: (data as { mobileTitle?: string | null }).mobileTitle ?? "",
    mobileSubtitle: (data as { mobileSubtitle?: string | null }).mobileSubtitle ?? "",
    packages: (data.packages ?? []).map((p) => ({
      capacity: p.capacity ?? p.name ?? "",
      originalPrice: p.originalPrice ?? 0,
      finalPrice: p.finalPrice ?? 0,
      stateRebate: p.stateRebate ?? 0,
      federalRebate: p.federalRebate ?? 0,
      isFullyInstalled: p.isFullyInstalled ?? true,
      priceNote: p.priceNote ?? p.pricingNote ?? "",
      image: srcOrUndefined(p.image),
    })),
    sidebar: {
      title: text(data.sidebar?.title),
      subtitle: text(data.sidebar?.subtitle),
      paragraphs: (() => {
        const raw = data.sidebar?.paragraphs;
        if (!raw) return [];
        if (Array.isArray(raw)) return raw.map((x) => text(x)).filter(Boolean);
        return [];
      })(),
      ctaText: text(data.sidebar?.ctaText),
      ctaLink: text(data.sidebar?.ctaLink),
    },
    highlight:
      data.highlightValue || data.highlightPrefix
        ? {
            prefix: text(data.highlightPrefix),
            value: text(data.highlightValue),
            suffix: text(data.highlightSuffix),
          }
        : undefined,
    description: text(data.description),
    cta:
      data.ctaLabel || data.sidebar?.ctaText
        ? {
            label: text(data.ctaLabel) || text(data.sidebar?.ctaText),
            href: text(data.ctaLink) || text(data.sidebar?.ctaLink) || "#quote-form-section-mobile",
          }
        : undefined,
  };
}

// ─── Limited Spots (desktop LimitedSpot + mobile WhyChooseUs share card) ───

export interface ResolvedPromotionLimitedSpotCard {
  type: string;
  value: string;
  title: string;
  bgImage: string | undefined;
  icon: string | undefined;
  logoPath: string | undefined;
  imagePath: string | undefined;
  showBadge: boolean;
  nestedCard:
    | { type: string; logoPath: string | undefined; imagePath: string | undefined; showBadge: boolean }
    | null;
}

export interface ResolvedPromotionLimitedSpots {
  title: string;
  titleGreen: string;
  cards: ResolvedPromotionLimitedSpotCard[];
  ctaText: string;
  ctaLink: string;
}

export function resolvePromotionLimitedSpots(
  data: PromotionLimitedSpotsData | null | undefined
): ResolvedPromotionLimitedSpots | null {
  if (!data) return null;
  if (!(data.cards ?? []).length && !data.title && !data.titleGreen) return null;
  return {
    title: data.title ?? "",
    titleGreen: data.titleGreen ?? "",
    cards: (data.cards ?? []).map((c) => ({
      type: c.type ?? "nested",
      value: c.value ?? "",
      title: c.title ?? "",
      bgImage: srcOrUndefined(c.bgImage),
      icon: srcOrUndefined(c.icon),
      logoPath: srcOrUndefined((c as { logoPath?: { url?: string } }).logoPath),
      imagePath: srcOrUndefined((c as { imagePath?: { url?: string } }).imagePath),
      showBadge: c.showBadge ?? false,
      nestedCard: c.nestedCard
        ? {
            type: c.nestedCard.type ?? "logo",
            logoPath: srcOrUndefined(c.nestedCard.logo),
            imagePath: srcOrUndefined(c.nestedCard.image),
            showBadge: c.nestedCard.showBadge ?? false,
          }
        : null,
    })),
    ctaText: data.ctaText ?? "",
    ctaLink: data.ctaLink ?? "",
  };
}

// ─── Trust Regen ──────────────────────────────────────────────────────────

export interface ResolvedPromotionTrustRegen {
  title: string;
  subtitle: string;
  features: { title: string; description: string; icon: string | undefined }[];
}

export function resolvePromotionTrustRegen(
  data: PromotionTrustRegenData | null | undefined
): ResolvedPromotionTrustRegen | null {
  if (!data) return null;
  return {
    title: data.title ?? "",
    subtitle: data.subtitle ?? "",
    features: (data.features ?? []).map((f) => ({
      title: f.title ?? "",
      description: f.description ?? "",
      icon: srcOrUndefined(f.icon),
    })),
  };
}

// ─── Free Quotation ───────────────────────────────────────────────────────

export interface ResolvedPromotionFreeQuotation {
  title: string;
  noticeText: string;
  noticeHighlight: string;
  videoThumbnail: string | undefined;
  videoUrl: string | undefined;
  buttonText: string;
  buttonLink: string;
}

export function resolvePromotionFreeQuotation(
  data: PromotionFreeQuotationData | null | undefined
): ResolvedPromotionFreeQuotation | null {
  if (!data) return null;
  return {
    title: data.title ?? "",
    noticeText: data.noticeText ?? "",
    noticeHighlight: data.noticeHighlight ?? "",
    videoThumbnail: srcOrUndefined(data.videoThumbnail),
    videoUrl: data.videoUrl ?? undefined,
    buttonText: data.buttonText ?? "",
    buttonLink: data.buttonLink ?? "",
  };
}

// ─── Battery Rebates (RebateRow[][] slider) ───────────────────────────────

export interface ResolvedPromotionBatteryRebates {
  title: string;
  subtitle: string;
  bgImage: string | undefined;
  data: { title: string; description: string }[][];
}

export function resolvePromotionBatteryRebates(
  data: PromotionBatteryRebatesData | null | undefined
): ResolvedPromotionBatteryRebates | null {
  if (!data) return null;
  const panels = (data.panels ?? []).map((panel) =>
    (panel.rows ?? []).map((r) => ({
      title: r.title ?? "",
      description: r.description ?? "",
    }))
  );
  return {
    title: data.title ?? "",
    subtitle: data.subtitle ?? "",
    bgImage: srcOrUndefined(data.bgImage),
    data: panels.length ? panels : [],
  };
}

// ─── Trusted Brands ───────────────────────────────────────────────────────

export interface ResolvedPromotionTrustedBrands {
  title: string;
  subtitle: string;
  description: string;
  titleGreen: string;
  brands: { name: string; logo: string | undefined }[];
  batteries: { name: string; image: string | undefined; logo: string | undefined }[];
}

export function resolvePromotionTrustedBrands(
  data: PromotionTrustedBrandsData | null | undefined
): ResolvedPromotionTrustedBrands | null {
  if (!data) return null;
  return {
    title: data.title ?? "",
    subtitle: data.subtitle ?? "",
    description: data.description ?? "",
    titleGreen: data.titleGreen ?? "",
    brands: (data.brands ?? []).map((b) => ({
      name: b.name ?? "",
      logo: srcOrUndefined(b.logo),
    })),
    batteries: (data.batteries ?? []).map((b) => ({
      name: b.name ?? "",
      image: srcOrUndefined(b.image),
      logo: srcOrUndefined(b.logo),
    })),
  };
}

// ─── High Energy ──────────────────────────────────────────────────────────

export interface ResolvedPromotionHighEnergy {
  title: string;
  bullets: string[];
  badges: { name: string; logoPath: string | undefined }[];
}

export function resolvePromotionHighEnergy(
  data: PromotionHighEnergyData | null | undefined
): ResolvedPromotionHighEnergy | null {
  if (!data) return null;
  // bullets may be string[] or {text:string}[]
  const bullets = (() => {
    const raw = (data as { bullets?: unknown }).bullets;
    if (!raw) return [];
    if (Array.isArray(raw)) return raw.map((x) => text(x)).filter(Boolean);
    return [];
  })();
  return {
    title: data.title ?? "",
    bullets,
    badges: (data.badges ?? []).map((b) => ({
      name: b.name ?? "",
      logoPath: srcOrUndefined(b.logo ?? (b as { logoPath?: { url?: string } }).logoPath),
    })),
  };
}

// ─── Battery Package ──────────────────────────────────────────────────────

export interface ResolvedPromotionBatteryPackage {
  title: string;
  centerImage: { url: string | undefined; alt: string } | undefined;
  packages: {
    name: string;
    originalPrice: number;
    finalPrice: number;
    rebates: { label: string; amount: number }[];
    installationText: string;
    pricingNote: string;
    image: string | undefined;
  }[];
}

export function resolvePromotionBatteryPackage(
  data: PromotionBatteryPackageData | null | undefined
): ResolvedPromotionBatteryPackage | null {
  if (!data) return null;
  const centerSrc = srcOrUndefined(data.centerImage);
  return {
    title: data.title ?? "",
    centerImage: centerSrc
      ? { url: centerSrc, alt: data.centerImageAlt ?? "Battery storage system" }
      : undefined,
    packages: (data.packages ?? []).map((p) => ({
      name: p.name ?? "",
      originalPrice: p.originalPrice ?? 0,
      finalPrice: p.finalPrice ?? 0,
      rebates: (p.rebates ?? []).map((r) => ({ label: r.label ?? "", amount: r.amount ?? 0 })),
      installationText: p.installationText ?? "",
      pricingNote: p.pricingNote ?? "",
      image: srcOrUndefined(p.image),
    })),
  };
}

// ─── Ready To Begin ───────────────────────────────────────────────────────

export interface ResolvedPromotionContactData {
  title: string;
  value: string;
}
export interface ResolvedPromotionSocialItem {
  name: string;
  link: string;
  url: string;
}
export interface ResolvedPromotionContactDetails {
  title: string;
  description: string;
  data: ResolvedPromotionContactData[];
  socials: ResolvedPromotionSocialItem[];
}
export interface ResolvedPromotionReadyToBegin {
  title: string;
  noticeText: string;
  noticeHighlight: string;
  contactDetails: ResolvedPromotionContactDetails | null;
  buttonText: string;
  buttonLink: string;
}

export function resolvePromotionReadyToBegin(
  data: PromotionReadyToBeginData | null | undefined
): ResolvedPromotionReadyToBegin | null {
  if (!data) return null;
  return {
    title: data.title ?? "",
    noticeText: data.noticeText ?? "",
    noticeHighlight: data.noticeHighlight ?? "",
    contactDetails: data.contactDetails
      ? {
          title: data.contactDetails.title ?? "",
          description: data.contactDetails.description ?? "",
          data: (data.contactDetails.data ?? []).map((d) => ({
            title: d.title ?? "",
            value: d.value ?? "",
          })),
          socials: (data.contactDetails.socials ?? []).map((s) => ({
            name: s.name ?? "",
            link: s.link ?? (s as { url?: string }).url ?? "",
            url: s.link ?? (s as { url?: string }).url ?? "",
          })),
        }
      : null,
    buttonText: data.buttonText ?? "",
    buttonLink: data.buttonLink ?? "",
  };
}

// ─── Solar Financing ──────────────────────────────────────────────────────

export interface ResolvedPromotionSolarFinancing {
  title: string;
  subtitle: string;
  leftBoxTitle: string;
  leftBoxText: string;
  leftBoxIcon: string;
  bgImage: string | undefined;
  gridItems: { title: string; description: string; icon: string | undefined }[];
}

export function resolvePromotionSolarFinancing(
  data: PromotionSolarFinancingData | null | undefined
): ResolvedPromotionSolarFinancing | null {
  if (!data) return null;
  return {
    title: data.title ?? "",
    subtitle: data.subtitle ?? "",
    leftBoxTitle: data.leftBoxTitle ?? "",
    leftBoxText: data.leftBoxText ?? "",
    leftBoxIcon: data.leftBoxIcon ?? "",
    bgImage: srcOrUndefined(data.bgImage),
    gridItems: (data.gridItems ?? []).map((g) => ({
      title: g.title ?? "",
      description: g.description ?? "",
      icon: srcOrUndefined(g.icon),
    })),
  };
}

// ─── About Regen ──────────────────────────────────────────────────────────

export interface ResolvedPromotionAboutRegen {
  title: string;
  subtitle: string;
  paragraphs: string;
  image: string | undefined;
  videoUrl: string | undefined;
}

export function resolvePromotionAboutRegen(
  data: PromotionAboutRegenData | null | undefined
): ResolvedPromotionAboutRegen | null {
  if (!data) return null;
  return {
    title: data.title ?? "",
    subtitle: data.subtitle ?? "",
    paragraphs: data.paragraphs ?? "",
    image: srcOrUndefined(data.image),
    videoUrl: data.videoUrl ?? undefined,
  };
}

// ─── Find Out Why ─────────────────────────────────────────────────────────

export interface ResolvedPromotionFindOutWhy {
  title: string;
  subtitle: string;
  description: string;
  awards: { image: string | undefined; description: string; name: string }[];
  reviews: { author: string; review: string; rating: number }[];
}

export function resolvePromotionFindOutWhy(
  data: PromotionFindOutWhyData | null | undefined
): ResolvedPromotionFindOutWhy | null {
  if (!data) return null;
  return {
    title: data.title ?? "",
    subtitle: data.subtitle ?? "",
    description: data.description ?? "",
    awards: (data.awards ?? []).map((a) => ({
      image: srcOrUndefined(a.image),
      description: a.description ?? a.name ?? "",
      name: a.name ?? "",
    })),
    reviews: (data.reviews ?? []).map((r) => ({
      author: r.author ?? "",
      review: r.review ?? "",
      rating: r.rating ?? 5,
    })),
  };
}

// ─── Achievements + Industry Recognition ──────────────────────────────────

export interface ResolvedPromotionRecognitionSection {
  title: string;
  awards: { name: string; image: string | undefined }[];
}
export interface ResolvedPromotionAchievements {
  title: string;
  subtitle: string;
  description: string;
  awards: { name: string; image: string | undefined }[];
  recognitions: ResolvedPromotionRecognitionSection[];
}

export function resolvePromotionAchievements(
  data: PromotionAchievementsData | null | undefined
): ResolvedPromotionAchievements | null {
  if (!data) return null;
  return {
    title: data.title ?? "",
    subtitle: data.subtitle ?? "",
    description: data.description ?? "",
    awards: (data.awards ?? []).map((a) => ({
      name: a.name ?? "",
      image: srcOrUndefined(a.image),
    })),
    recognitions: (data.recognitions ?? []).map((r) => ({
      title: r.title ?? "",
      awards: (r.awards ?? []).map((a) => ({
        name: a.name ?? "",
        image: srcOrUndefined(a.image),
      })),
    })),
  };
}

export function resolvePromotionIndustryRecognition(
  data: PromotionIndustryRecognitionData | null | undefined
): ResolvedPromotionIndustryRecognition | null {
  if (!data) return null;
  return {
    recognitions: (data.recognitions ?? []).map((r) => ({
      title: r.title ?? "",
      awards: (r.awards ?? []).map((a) => ({
        name: a.name ?? "",
        image: srcOrUndefined(a.image),
      })),
    })),
    variant: (data.variant as "single" | "grid" | null) ?? "single",
  };
}

export interface ResolvedPromotionIndustryRecognition {
  recognitions: ResolvedPromotionRecognitionSection[];
  variant: "single" | "grid";
}

// ─── FAQ ──────────────────────────────────────────────────────────────────

export interface ResolvedPromotionFaqHighlight {
  question: string;
  answer: string;
  bulletPoints: string[] | undefined;
}
export interface ResolvedPromotionFaqHighlightCard {
  title: string;
  bgImage: string | undefined;
  items: ResolvedPromotionFaqHighlight[];
  ctaText: string;
  ctaLink: string;
}
export interface ResolvedPromotionFaqSection {
  title: string;
  subtitle: string;
  description: string;
  highlightCard: ResolvedPromotionFaqHighlightCard | null;
  faqItems: { question: string; answer: string; bulletPoints: string[] | undefined }[];
}

export function resolvePromotionFaqSection(
  data: PromotionFaqSectionData | null | undefined
): ResolvedPromotionFaqSection | null {
  if (!data) return null;
  return {
    title: data.title ?? "",
    subtitle: data.subtitle ?? "",
    description: data.description ?? "",
    highlightCard: data.highlightCard
      ? {
          title: data.highlightCard.title ?? "",
          bgImage: srcOrUndefined(data.highlightCard.bgImage),
          items: (data.highlightCard.items ?? []).map((it) => ({
            question: it.question ?? "",
            answer: it.answer ?? "",
            bulletPoints: bulletPointsToStrings(it.bulletPoints),
          })),
          ctaText: data.highlightCard.ctaText ?? "",
          ctaLink: data.highlightCard.ctaLink ?? "",
        }
      : null,
    faqItems: (data.faqItems ?? []).map((f) => ({
      question: f.question,
      answer: f.answer,
      bulletPoints: bulletPointsToStrings(f.bulletPoints),
    })),
  };
}

// ─── Mobile-only fallbacks (explicit Strapi sections if editor creates them) ─

export interface ResolvedPromotionAwardsSection {
  awards: { id?: string; name: string; image: string | undefined; title: string }[];
}
export function resolvePromotionAwardsSection(
  data: PromotionAwardsSectionData | null | undefined
): ResolvedPromotionAwardsSection | null {
  if (!data) return null;
  return {
    awards: (data.awards ?? []).map((a, idx) => ({
      id: String(a.id ?? idx),
      name: a.name ?? "",
      image: srcOrUndefined(a.image),
      title: a.description ?? a.name ?? "",
    })),
  };
}

// ─── Derived helpers: build mobile shapes from canonical data ─────────────
// These let editors edit pricing/brands once and have both breakpoints update.

export function deriveMobileAwards(
  findOutWhy: ResolvedPromotionFindOutWhy | null,
  achievements: ResolvedPromotionAchievements | null,
  awardsSection: ResolvedPromotionAwardsSection | null
): { id: string; image: string; title: string }[] | null {
  if (awardsSection?.awards.length) {
    return awardsSection.awards.map((a) => ({
      id: a.id ?? a.name,
      image: a.image ?? "",
      title: a.title,
    }));
  }
  // fallback: derive from findOutWhy awards
  if (findOutWhy?.awards.length) {
    return findOutWhy.awards.slice(0, 2).map((a, i) => ({
      id: String(i),
      image: a.image ?? "",
      title: a.description,
    }));
  }
  return null;
}

export function deriveMobileContactInfo(
  readyToBegin: ResolvedPromotionReadyToBegin | null,
  contactInfo: PromotionContactInfoData | null | undefined
): { title: string; description: string; items: { type: string; label: string; value: string }[]; socials: { name: string; url: string }[] } | null {
  if (contactInfo?.title || contactInfo?.description || contactInfo?.items?.length || contactInfo?.socials?.length) {
    return {
      title: contactInfo.title ?? "",
      description: contactInfo.description ?? "",
      items: (contactInfo.items ?? []).map((it) => ({
        type: it.title?.toLowerCase().includes("mail") ? "email" : it.title?.toLowerCase().includes("phone") || it.title?.toLowerCase().includes("tel") ? "phone" : "address",
        label: it.title ?? "",
        value: it.value ?? "",
      })),
      socials: (contactInfo.socials ?? []).map((s) => ({ name: s.name ?? "", url: s.link ?? "" })),
    };
  }
  if (!readyToBegin?.contactDetails) return null;
  const cd = readyToBegin.contactDetails;
  return {
    title: cd.title,
    description: cd.description,
    items: cd.data.map((d) => ({
      type: d.title.toLowerCase().includes("mail") ? "email" : d.title.toLowerCase().includes("phone") || d.title.toLowerCase().includes("tel") ? "phone" : "address",
      label: d.title,
      value: d.value,
    })),
    socials: cd.socials.map((s) => ({ name: s.name, url: s.link })),
  };
}

export function deriveMobileBatteryPricing(
  batteryPackage: ResolvedPromotionBatteryPackage | null,
  batteryPricing: PromotionBatteryPricingData | null | undefined,
  backgroundImage: string | undefined
): { backgroundImage: string | undefined; centerImage: string | undefined; items: { title: string; sections: unknown[] }[] } | null {
  if (batteryPricing?.items?.length) {
    return {
      backgroundImage: srcOrUndefined(batteryPricing.backgroundImage) ?? backgroundImage,
      centerImage: srcOrUndefined(batteryPricing.centerImage),
      items: (batteryPricing.items as { title: string | null; sections: unknown }[]).map((it) => ({
        title: it.title ?? "",
        sections: Array.isArray(it.sections) ? (it.sections as unknown[]) : [],
      })),
    };
  }
  if (!batteryPackage?.packages.length) return null;
  return {
    backgroundImage,
    centerImage: batteryPackage.centerImage?.url,
    items: batteryPackage.packages.map((pkg) => ({
      title: pkg.name,
      sections: [
        { type: "price", value: `$${pkg.originalPrice.toLocaleString()}` },
        {
          type: "list",
          items: pkg.rebates.map((r) => ({ label: r.label, value: r.amount })),
        },
        { type: "info", value: "Up to $10K loan \n0% interest for 10 years \navailable under rebate scheme" },
        { type: "highlight", title: "Final Pricing", value: `$${pkg.finalPrice.toLocaleString()}` },
        { type: "text", value: pkg.installationText || "Fully Installed", items: [{ label: pkg.pricingNote }] },
      ],
    })),
  };
}

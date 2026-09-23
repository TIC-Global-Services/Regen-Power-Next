import { strapiImageData } from "../media";
import type { ContactHeroData, ContactFormSectionData, ContactLocationsMapData } from "../schemas/contact";

export interface ResolvedContactHero {
  subtitle: string;
  mainTitle: string;
  description: string;
  ctaText: string;
  ctaLink?: string;
  backgroundImage: string;
}
export function resolveContactHero(
  data: ContactHeroData | undefined
): ResolvedContactHero | null {
  if (!data) return null;
  const img = data.backgroundImage ? strapiImageData(data.backgroundImage) : null;
  return {
    subtitle: data.subtitle ?? "",
    mainTitle: data.mainTitle ?? "",
    description: data.description ?? "",
    ctaText: data.ctaText ?? "Get Your Free Quote",
    ...(data.ctaLink ? { ctaLink: data.ctaLink } : {}),
    backgroundImage: img?.src ?? "",
  };
}

export interface ResolvedContactFormSection {
  title: string;
  description: string;
}
export function resolveContactFormSection(
  data: ContactFormSectionData | undefined
): ResolvedContactFormSection | null {
  if (!data) return null;
  return {
    title: data.title ?? "",
    description: data.description ?? "",
  };
}

export interface ResolvedOfficeLocation {
  name: string;
  lat: number;
  lng: number;
  address?: string;
  phone?: string;
  email?: string;
  mapsUrl?: string;
  labelPosition?: "top" | "right" | "bottom" | "left";
}
export interface ResolvedContactLocationsMap {
  subtitle: string;
  title: string;
  locations: ResolvedOfficeLocation[];
}
export function resolveContactLocationsMap(
  data: ContactLocationsMapData | undefined
): ResolvedContactLocationsMap | null {
  if (!data) return null;
  return {
    subtitle: data.subtitle ?? "",
    title: data.title ?? "",
    locations: (data.locations ?? []).map((loc) => ({
      name: loc.name,
      lat: loc.lat,
      lng: loc.lng,
      ...(loc.address ? { address: loc.address } : {}),
      ...(loc.phone ? { phone: loc.phone } : {}),
      ...(loc.email ? { email: loc.email } : {}),
      ...(loc.mapsUrl ? { mapsUrl: loc.mapsUrl } : {}),
      ...(loc.labelPosition ? { labelPosition: loc.labelPosition } : {}),
    })),
  };
}

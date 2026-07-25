import { getStrapiURL } from "./client";

export interface StrapiMediaFormat {
  url: string;
  width: number;
  height: number;
  mime: string;
  ext: string;
  size: number;
}

export interface StrapiMedia {
  id: number;
  documentId: string;
  url: string;
  width: number;
  height: number;
  alternativeText: string | null;
  caption: string | null;
  mime: string;
  ext: string;
  size: number;
  formats?: Record<string, StrapiMediaFormat>;
  name?: string;
  hash?: string;
  provider?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string | null;
}

export function strapiImage(
  media: StrapiMedia | null | undefined | { url?: string | null }
): string {
  const url = media?.url;
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${getStrapiURL()}${url.startsWith("/") ? "" : "/"}${url}`;
}

export interface StrapiImageData {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export function strapiImageData(
  media: StrapiMedia | null | undefined
): StrapiImageData | null {
  const url = media?.url;
  if (!url) return null;
  const src = url.startsWith("http://") || url.startsWith("https://")
    ? url
    : `${getStrapiURL()}${url.startsWith("/") ? "" : "/"}${url}`;
  return {
    src,
    width: media.width,
    height: media.height,
    alt: media.alternativeText ?? "",
  };
}

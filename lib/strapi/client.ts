const STRAPI_URL =
  process.env.STRAPI_URL || "https://regen-strapi-production.up.railway.app";

export function getStrapiURL(): string {
  return STRAPI_URL.replace(/\/$/, "");
}

export interface StrapiError {
  status: number;
  name: string;
  message: string;
  details?: Record<string, unknown>;
}

export class StrapiFetchError extends Error {
  status: number;
  details?: StrapiError;
  constructor(message: string, status: number, details?: StrapiError) {
    super(message);
    this.name = "StrapiFetchError";
    this.status = status;
    this.details = details;
  }
}

export async function strapiFetch<T>(
  path: string,
  init?: RequestInit & { next?: { revalidate?: number; tags?: string[] } },
): Promise<T> {
  const url = `${getStrapiURL()}/api${path}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.headers || {}),
    },
    next: { revalidate: 60, ...(init?.next || {}) },
  });

  if (!res.ok) {
    let details: StrapiError | undefined;
    try {
      const body = await res.json();
      details = body?.error;
    } catch {
      /* ignore */
    }

    console.warn(`Strapi ${res.status} for ${path} - using empty response`);

    return {
      data: { sections: [] },
      meta: {},
    } as T;
  }

  return res.json() as Promise<T>;
}

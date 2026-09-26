import { getStrapiURL } from "../strapi/client";
import { FALLBACK_REDIRECTS } from "./fallback";
import type { RedirectRule, StrapiRedirectEntry } from "./types";

const TTL_MS = 60_000;
const RETRY_MS = 10_000;
const FETCH_TIMEOUT_MS = 2_000;
const PAGE_SIZE = 100;
const MAX_PAGES = 10;

type RedirectMap = Map<string, RedirectRule>;

// fetch() caching options have no effect inside Proxy, so keep our own
// per-instance cache: stale-while-revalidate, with the local list as the
// last resort when Strapi has never answered.
let cache: { map: RedirectMap; expires: number } | null = null;
let inflight: Promise<void> | null = null;

export function normalizePath(path: string): string {
  const p = path.split("?")[0].split("#")[0].toLowerCase();
  return p.length > 1 ? p.replace(/\/+$/, "") || "/" : p;
}

const isValidDestination = (d: string) => d.startsWith("/") || /^https?:\/\//i.test(d);

function buildMap(rules: RedirectRule[]): RedirectMap {
  const map: RedirectMap = new Map();
  for (const rule of rules) {
    const source = rule.source?.trim();
    const destination = rule.destination?.trim();
    if (!source || !destination || !source.startsWith("/") || !isValidDestination(destination)) continue;
    const key = normalizePath(source);
    if (destination.startsWith("/") && normalizePath(destination) === key) continue;
    if (!map.has(key)) map.set(key, { source, destination, permanent: rule.permanent });
  }
  return map;
}

async function fetchStrapiRules(): Promise<RedirectRule[]> {
  const base = getStrapiURL();
  const rules: RedirectRule[] = [];

  for (let page = 1; page <= MAX_PAGES; page++) {
    const qs = [
      "fields[0]=source",
      "fields[1]=destination",
      "fields[2]=permanent",
      "filters[enabled][$eq]=true",
      `pagination[page]=${page}`,
      `pagination[pageSize]=${PAGE_SIZE}`,
    ].join("&");

    const res = await fetch(`${base}/api/redirects?${qs}`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!res.ok) throw new Error(`redirects fetch failed: ${res.status}`);

    const json = (await res.json()) as {
      data?: StrapiRedirectEntry[];
      meta?: { pagination?: { pageCount?: number } };
    };
    if (!Array.isArray(json.data)) throw new Error("redirects fetch: unexpected shape");

    for (const e of json.data) {
      if (e.source && e.destination) {
        rules.push({ source: e.source, destination: e.destination, permanent: e.permanent ?? true });
      }
    }

    if (page >= (json.meta?.pagination?.pageCount ?? 1)) break;
  }

  return rules;
}

function refresh(): Promise<void> {
  if (!inflight) {
    inflight = fetchStrapiRules()
      .then((rules) => {
        cache = { map: buildMap(rules), expires: Date.now() + TTL_MS };
      })
      .catch(() => {
        cache = {
          map: cache?.map ?? buildMap(FALLBACK_REDIRECTS),
          expires: Date.now() + RETRY_MS,
        };
      })
      .finally(() => {
        inflight = null;
      });
  }
  return inflight;
}

async function getRedirectMap(): Promise<RedirectMap> {
  if (!cache) {
    await refresh();
  } else if (cache.expires <= Date.now()) {
    void refresh();
  }
  return cache?.map ?? buildMap(FALLBACK_REDIRECTS);
}

export async function findRedirect(pathname: string): Promise<RedirectRule | null> {
  const map = await getRedirectMap();
  return map.get(normalizePath(pathname)) ?? null;
}

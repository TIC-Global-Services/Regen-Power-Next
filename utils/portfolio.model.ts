export interface PortfolioItem {
  id: number;
  title: string;
  slug?: string;
  /** Detail-page route, e.g. "/portfolio/<slug>" */
  link: string;
  image: string;
  categories: string[];   // display labels e.g. ["Storage"]
  filters: string[];      // machine slugs e.g. ["storage", "3-10-kw"]
  suburb: string | null;
  state: string | null;   // WA, NSW, VIC, QLD, SA, TAS, NT, ACT
  postcode: string | null;
  description?: string;   // short summary (from the portfolio-project collection)
}

export interface PortfolioFilterOption {
  label: string;
  slug: string;
}

/* ─── Full category list (kept for reference / backwards compat) ─── */

export const PORTFOLIO_CATEGORY_FILTERS: PortfolioFilterOption[] = [
  { label: 'All',           slug: '*' },
  { label: 'EV Charger',    slug: 'ev-charger' },
  { label: '3 - 10kW',      slug: '3-10-kw' },
  { label: '10 - 30 kW',    slug: '10-30-kw' },
  { label: '30 - 50 kW',    slug: '30-50-kw' },
  { label: '50 - 90 kW',    slug: '50-90-kw' },
  { label: '100kW',         slug: '100-kw' },
  { label: 'International', slug: 'international' },
  { label: 'Off Grid',      slug: 'off-grid' },
  { label: 'Solar Farms',   slug: 'solar-farms' },
  { label: 'Storage',       slug: 'storage' },
];

/* ─── Dropdown-specific filter groups ─── */

/** "By Industry" dropdown — non-size category types */
export const PORTFOLIO_INDUSTRY_FILTERS: PortfolioFilterOption[] = [
  { label: 'Storage',       slug: 'storage' },
  { label: 'EV Charger',    slug: 'ev-charger' },
  { label: 'Off Grid',      slug: 'off-grid' },
  { label: 'International', slug: 'international' },
  { label: 'Solar Farms',   slug: 'solar-farms' },
];

/** "By System Size" dropdown — kW-based categories */
export const PORTFOLIO_SIZE_FILTERS: PortfolioFilterOption[] = [
  { label: '3 - 10kW',    slug: '3-10-kw' },
  { label: '10 - 30 kW',  slug: '10-30-kw' },
  { label: '30 - 50 kW',  slug: '30-50-kw' },
  { label: '50 - 90 kW',  slug: '50-90-kw' },
  { label: '100kW',       slug: '100-kw' },
];

/** "By Location" dropdown — Australian states */
export const PORTFOLIO_LOCATION_FILTERS: PortfolioFilterOption[] = [
  { label: 'Western Australia', slug: 'WA' },
  { label: 'New South Wales',   slug: 'NSW' },
  { label: 'Victoria',          slug: 'VIC' },
  { label: 'Queensland',        slug: 'QLD' },
  { label: 'South Australia',   slug: 'SA' },
  { label: 'Tasmania',          slug: 'TAS' },
  { label: 'Northern Territory', slug: 'NT' },
  { label: 'ACT',               slug: 'ACT' },
];

/* ─── Deep-link query-param matching (e.g. ?size=10-30kw from a CTA elsewhere on the site) ─── */

/** Extract a numeric [min, max] range from a size string in any format: "10-30kw", "10-30-kw", "100kw", "100-kw". */
function parseKwRange(value: string): { min: number; max: number } | null {
  const nums = value.match(/\d+/g)?.map(Number) ?? [];
  if (nums.length >= 2) return { min: nums[0], max: nums[1] };
  if (nums.length === 1) return { min: nums[0], max: Infinity };
  return null;
}

/**
 * Resolve a raw `?size=` query value (which may not exactly match one of our slugs,
 * e.g. business-tier CTAs use "10-30kw" / "30-100kw" / "100kw" rather than the
 * portfolio dropdown's finer 5-bucket slugs) into every bucket slug whose range overlaps it.
 */
export function resolveSizeSlugsFromQuery(raw: string): string[] {
  const queryRange = parseKwRange(raw);
  if (!queryRange) return [];
  return PORTFOLIO_SIZE_FILTERS.filter((f) => {
    const bucket = parseKwRange(f.slug);
    return !!bucket && bucket.max > queryRange.min && bucket.min < queryRange.max;
  }).map((f) => f.slug);
}

/** Human-readable label for a raw size query value, used when it spans more than one dropdown bucket. */
export function formatSizeQueryLabel(raw: string): string {
  const nums = raw.match(/\d+/g)?.map(Number) ?? [];
  if (nums.length >= 2) return `${nums[0]} - ${nums[1]} kW`;
  if (nums.length === 1) return `${nums[0]}kW+`;
  return raw;
}

/** Case/punctuation-insensitive exact match of a raw query value against a filter option's slug or label. */
export function resolveExactSlug(raw: string, options: PortfolioFilterOption[]): string | null {
  const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
  const target = normalize(raw);
  const match = options.find((o) => normalize(o.slug) === target || normalize(o.label) === target);
  return match?.slug ?? null;
}

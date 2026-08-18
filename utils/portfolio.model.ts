export interface PortfolioItem {
  id: number;
  title: string;
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

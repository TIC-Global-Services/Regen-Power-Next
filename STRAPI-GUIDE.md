# Strapi + Supabase Setup Guide — Regen Power Next

## Overview

**Architecture:** Next.js 16 (App Router) → Strapi 5 (Headless CMS) → Supabase (PostgreSQL + Auth + Storage)

```
┌──────────────────────┐       REST/GraphQL       ┌──────────────────────┐       ┌──────────────────────┐
│  Next.js Frontend    │ ◄─────────────────────── │  Strapi 5 CMS        │ ─────► │  Supabase             │
│  (Server Components) │                           │  (Node.js)           │        │  PostgreSQL           │
│  Vercel              │                           │  Railway / Render    │        │  + Auth + Storage     │
└──────────────────────┘                           └──────────────────────┘        └──────────────────────┘
```

---

## Step 1 — Set Up Supabase (Database)

### 1.1 Create a Supabase project

1. Go to [https://supabase.com](https://supabase.com) and sign in (or sign up)
2. Click **New project**
3. Fill in:
   - **Name:** `regen-power-cms`
   - **Database Password:** Generate a strong password — save it
   - **Region:** Choose the closest to your users (e.g. `Sydney` for Australia)
4. Click **Create new project** (takes ~1–2 minutes)

### 1.2 Get your PostgreSQL connection string

1. In the Supabase dashboard, go to **Project Settings → Database**
2. Under **Connection string**, copy the **URI** (starts with `postgresql://`)
3. It looks like:
   ```
   postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:6543/postgres
   ```
   > **Note:** Use port `6543` (Supabase's connection pooler) for Strapi.

### 1.3 (Optional) Enable Row-Level Security for Strapi

Strapi manages its own schema and auth, so you don't need to set up Supabase Auth for Strapi. But if you want Supabase Storage for Strapi media:

1. Go to **Storage** in Supabase dashboard
2. Create a bucket called `strapi-media`
3. Set it to **public** (Strapi generates unique URLs)

---

## Step 2 — Set Up Strapi with Supabase PostgreSQL

### 2.1 Create the Strapi project

```bash
# From the monorepo root or wherever you want the CMS
npx create-strapi-app@latest regen-cms \
  --dbclient=postgres \
  --dbhost=db.xxxxx.supabase.co \
  --dbport=6543 \
  --dbname=postgres \
  --dbuser=postgres \
  --dbpassword=YOUR_SUPABASE_DB_PASSWORD
```

> Replace `db.xxxxx.supabase.co` with your actual Supabase host from Step 1.2.

### 2.2 Verify connection

```bash
cd regen-cms
npm run develop
```

If the connection works, you'll see:
```
Starting your application...
Your application is running at http://localhost:1337
```

Open http://localhost:1337/admin and create your admin account.

### 2.3 Environment variables for production

When deploying, set these in your hosting platform (Railway / Render):

| Variable | Value | Source |
|----------|-------|--------|
| `DATABASE_URL` | `postgresql://postgres:...@db.xxxxx.supabase.co:6543/postgres` | Supabase settings |
| `DATABASE_CLIENT` | `postgres` | |
| `JWT_SECRET` | (random string) | `openssl rand -base64 32` |
| `ADMIN_JWT_SECRET` | (random string) | `openssl rand -base64 32` |
| `APP_KEYS` | `key1,key2,key3,key4` | `openssl rand -base64 32` (repeat 4×) |
| `API_TOKEN_SALT` | (random string) | `openssl rand -base64 32` |
| `STRAPI_URL` | `https://your-strapi-app.com` | Your deployed URL |

> **Supabase connection pooler** — Always use `:6543` (pooled) not `:5432` (direct) for serverless/containerized Strapi deployments. The pooler handles connection limits better.

---

## Step 3 — Full Content Model Reference

Below is every content type and component you need to build in Strapi. Build them in the admin panel at **Content-Type Builder**.

### Phase 1 — Navigation & Footer (Foundation)

#### 1. Component: `nav.sub-nav-item` (category: `navigation`)

| Field | Type | Notes |
|-------|------|-------|
| `label` | Text (short) | Display text |
| `href` | Text (short) | Link path |

#### 2. Collection Type: `NavItem`

| Field | Type | Notes |
|-------|------|-------|
| `label` | Text (short) | Display text |
| `href` | Text (short) | Link path |
| `order` | Number (integer) | Sort order |
| `subItems` | Component (repeatable) | `nav.sub-nav-item` |

#### 3. Component: `footer.quick-link` (category: `footer`)

| Field | Type |
|-------|------|
| `label` | Text (short) |
| `href` | Text (short) |

#### 4. Component: `footer.address` (category: `footer`)

| Field | Type |
|-------|------|
| `line1` | Text (short) |
| `line2` | Text (short) (optional) |
| `phone` | Text (short) |
| `directLine` | Text (short) (optional) |
| `email` | Email |
| `hours` | Text (short) |

#### 5. Component: `footer.state-office` (category: `footer`)

| Field | Type |
|-------|------|
| `state` | Text (short) |
| `phone` | Text (short) |
| `email` | Email |

#### 6. Component: `footer.social-link` (category: `footer`)

| Field | Type | Notes |
|-------|------|-------|
| `platform` | Enumeration | `facebook, twitter, instagram, linkedin, youtube, link, email, disc` |
| `href` | Text (short) | URL |
| `icon` | Media (single) | Optional custom icon |

#### 7. Single Type: `Footer`

| Field | Type | Notes |
|-------|------|-------|
| `quickLinks` | Component (repeatable) | `footer.quick-link` |
| `headOffice` | Component | `footer.address` |
| `stateOffices` | Component (repeatable) | `footer.state-office` |
| `socialLinks` | Component (repeatable) | `footer.social-link` |
| `copyright` | Text (short) | e.g. `© 2025 Regen Power. All rights reserved.` |

---

### Phase 2 — Home Page Content

#### 8. Component: `home.badge` (category: `home`)

| Field | Type |
|-------|------|
| `name` | Text (short) |
| `logo` | Media (single) |
| `altText` | Text (short) |

#### 9. Collection Type: `Review`

| Field | Type | Notes |
|-------|------|-------|
| `author` | Text (short) | |
| `location` | Text (short) | |
| `systemTitle` | Text (short) | e.g. "10kW Solar + Battery System" |
| `quote` | Rich text (blocks) | |
| `rating` | Number (decimal) | Min 1, Max 5 |
| `source` | Enumeration | `google, productreview, other` |
| `publishedAt` | Date | |

#### 10. Component: `home.partner-logo` (category: `home`)

| Field | Type |
|-------|------|
| `name` | Text (short) |
| `logo` | Media (single) |

#### 11. Single Type: `Partners`

| Field | Type | Notes |
|-------|------|-------|
| `title` | Text (short) | Section heading |
| `partners` | Component (repeatable) | `home.partner-logo` |
| `memberships` | Component (repeatable) | `home.partner-logo` |

#### 12. Component: `home.award` (category: `home`)

| Field | Type |
|-------|------|
| `name` | Text (short) |
| `logo` | Media (single) |

#### 13. Collection Type: `Award`

| Field | Type |
|-------|------|
| `name` | Text (short) |
| `logo` | Media (single) |
| `order` | Number (integer) |

#### 14. Component: `home.stat` (category: `home`)

| Field | Type | Notes |
|-------|------|-------|
| `label` | Text (short) | e.g. "Solar Installations" |
| `value` | Text (short) | e.g. "45,000+" |
| `suffix` | Text (short) (optional) | e.g. "+", "×", "Years" |
| `icon` | Media (single) (optional) | |

#### 15. Single Type: `WhyChooseUs`

> **Migrated to a generic stat-cards grid.** The legacy flat fields (`awardWinnerCount`,
> `batteryInstallationsCount`, etc.) still exist and are auto-mapped into cards as a
> backward-compat bridge in `resolveHomeWhyChooseUs` (`lib/strapi/resolvers/home.ts`).
> New content should use `cards`; once Strapi is migrated, legacy fields can be dropped.

| Field | Type | Notes |
|-------|------|-------|
| `title` | Text (short) | Section heading |
| `subtitle` | Text (short) | Section eyebrow |
| `cards` | Component (repeatable) | `home.stat-card` |

#### 15a. Component: `home.stat-card` (category: `home`)

| Field | Type | Notes |
|-------|------|-------|
| `count` | Number (integer) (optional) | Animated number (omit when using `stats`) |
| `prefix` | Text (short) (optional) | Text before the count, e.g. "$" |
| `suffix` | Text (short) (optional) | Text after the count, e.g. "+", "×", "%" |
| `title` | Text (short) (optional) | Heading (supports `\n`) |
| `description` | Text (long) (optional) | Extra paragraph |
| `icon` | Media (single) (optional) | Inline icon next to the count (e.g. star) |
| `image` | Media (single) (optional) | Full-card background (or boxed top image when `logo` set) |
| `logo` | Media (single) (optional) | Overlay logo (contain) on top of `image` |
| `bgColor` | Text (short) (optional) | Hex background, default `#EEF6EB` |
| `textColor` | Text (short) (optional) | Hex text color, default `#000000` |
| `column` | Enumeration (optional) | Desktop column (1-3); omit for auto-flow |
| `span` | Enumeration (optional) | Desktop column span (1-3) |
| `stats` | Component (repeatable) (optional) | `home.stat` rows for multi-stat cards |

> `home.stat` rows use `label` + `value` (see §14) — e.g. `"45,000+"` / `"Solar Installations"`.
> Layout: generic `reuseables/StatCardsGrid.tsx`; renders any number of cards, fully CMS driven.
> **After migrating Strapi to `cards`:** uncomment the three `cards` populate lines in
> `lib/strapi/populate/home.ts` (until then they 400 — the field doesn't exist in Strapi yet).

#### 16. Component: `home.expertise-item` (category: `home`)

| Field | Type |
|-------|------|
| `title` | Text (short) |
| `description` | Rich text (blocks) |
| `icon` | Media (single) (optional) |

#### 17. Collection Type: `Expertise`

| Field | Type |
|-------|------|
| `title` | Text (short) |
| `description` | Rich text (blocks) |
| `icon` | Media (single) (optional) |
| `order` | Number (integer) |

#### 18. Single Type: `HeroSection`

| Field | Type | Notes |
|-------|------|-------|
| `headline` | Text (short) | Main heading |
| `subheadline` | Text (short) | Subtitle |
| `description` | Rich text (blocks) | |
| `backgroundImage` | Media (single) | Hero background |
| `ctaLabel` | Text (short) | Button text |
| `ctaHref` | Text (short) | Button link |
| `trustBadges` | Component (repeatable) | `home.badge` |

---

### Phase 3 — Solar Page Content

#### 19. Collection Type: `Stat` (solar stats)

| Field | Type |
|-------|------|
| `label` | Text (short) |
| `value` | Text (short) |
| `order` | Number (integer) |

#### 20. Collection Type: `ProcessStep`

| Field | Type | Notes |
|-------|------|-------|
| `stepNumber` | Number (integer) | Display order |
| `title` | Text (short) | |
| `description` | Rich text (blocks) | |
| `image` | Media (single) | |

#### 21. Component: `solar.package-feature` (category: `solar`)

| Field | Type |
|-------|------|
| `label` | Text (short) |
| `value` | Text (short) |

#### 22. Collection Type: `Package`

| Field | Type | Notes |
|-------|------|-------|
| `title` | Text (short) | |
| `description` | Rich text (blocks) | |
| `features` | Component (repeatable) | `solar.package-feature` |
| `colorTheme` | Enumeration | `light, green, dark` |
| `badge` | Text (short) (optional) | e.g. "Most Popular" |
| `order` | Number (integer) | |

#### 23. Component: `solar.info-card` (category: `solar`)

| Field | Type |
|-------|------|
| `label` | Text (short) |
| `text` | Rich text (blocks) |

#### 24. Collection Type: `InverterType`

| Field | Type | Notes |
|-------|------|-------|
| `name` | Text (short) | e.g. "String Inverter" |
| `slug` | UID (from name) | |
| `title` | Text (short) | Short display name |
| `description` | Rich text (blocks) | |
| `backgroundImage` | Media (single) | |
| `infoCards` | Component (repeatable) | `solar.info-card` |
| `order` | Number (integer) | |

#### 25. Component: `solar.sizing-row` (category: `solar`)

| Field | Type |
|-------|------|
| `dailyUse` | Text (short) |
| `recommendedSize` | Text (short) |
| `typicalHousehold` | Text (short) |
| `phaseRequired` | Text (short) |

#### 26. Component: `solar.sizing-card` (category: `solar`)

| Field | Type |
|-------|------|
| `title` | Text (short) |
| `description` | Rich text (blocks) |
| `image` | Media (single) (optional) |

#### 27. Single Type: `SizingGuide`

| Field | Type |
|-------|------|
| `title` | Text (short) |
| `description` | Rich text (blocks) |
| `tableRows` | Component (repeatable) | `solar.sizing-row` |
| `cards` | Component (repeatable) | `solar.sizing-card` |

#### 28. Component: `solar.customization-item` (category: `solar`)

| Field | Type |
|-------|------|
| `title` | Text (short) |
| `description` | Rich text (blocks) |
| `icon` | Media (single) (optional) |

#### 29. Collection Type: `EngineeringCustomization`

| Field | Type |
|-------|------|
| `title` | Text (short) |
| `description` | Rich text (blocks) |
| `icon` | Media (single) (optional) |
| `order` | Number (integer) |

---

### Phase 4 — Sub-pages (Brands, Deals, FAQ, Rebates)

#### 30. Collection Type: `SolarBrand`

| Field | Type | Notes |
|-------|------|-------|
| `name` | Text (short) | e.g. "Jinko Solar" |
| `slug` | UID (from name) | |
| `origin` | Text (short) (optional) | e.g. "China · Global" |
| `panelSeries` | Text (short) (optional) | e.g. "Tiger Neo Series" |
| `description` | Rich text (blocks) | Brand story |
| `logo` | Media (single) | |
| `isDark` | Boolean | Dark card theme |
| `order` | Number (integer) | |

#### 31. Collection Type: `BrandSpec`

| Field | Type | Notes |
|-------|------|-------|
| `brandName` | Text (short) | |
| `efficiency` | Text (short) | e.g. "22.3%" |
| `tempCoeff` | Text (short) | e.g. "-0.29%/°C" |
| `degradation` | Text (short) | e.g. "0.40%/yr" |
| `warranty` | Text (short) | |
| `order` | Number (integer) | |

#### 32. Collection Type: `FAQ` (categorized)

| Field | Type | Notes |
|-------|------|-------|
| `question` | Text (short) | |
| `answer` | Rich text (blocks) | |
| `category` | Text (short) | e.g. "general", "brands", "solar" |
| `order` | Number (integer) | |

#### 33. Component: `solar.deal-highlight` (category: `solar`)

| Field | Type |
|-------|------|
| `label` | Text (short) |
| `value` | Text (short) |

#### 34. Collection Type: `Deal`

| Field | Type | Notes |
|-------|------|-------|
| `title` | Text (short) | |
| `description` | Rich text (blocks) | |
| `highlights` | Component (repeatable) | `solar.deal-highlight` |
| `ctaLabel` | Text (short) (optional) | |
| `ctaHref` | Text (short) (optional) | |
| `validUntil` | Date (optional) | |
| `isActive` | Boolean | Default true |
| `order` | Number (integer) | |

#### 35. Component: `solar.payment-option` (category: `solar`)

| Field | Type |
|-------|------|
| `title` | Text (short) |
| `description` | Rich text (blocks) |
| `icon` | Media (single) (optional) |

#### 36. Collection Type: `PaymentOption`

| Field | Type |
|-------|------|
| `title` | Text (short) |
| `description` | Rich text (blocks) |
| `icon` | Media (single) (optional) |
| `order` | Number (integer) |

---

### Phase 5 — Shared / Reusable

#### 37. Component: `shared.feature-item` (category: `shared`)

| Field | Type |
|-------|------|
| `title` | Text (short) |
| `description` | Rich text (blocks) |
| `icon` | Media (single) (optional) |

#### 38. Single Type: `FeatureExplorer`

| Field | Type |
|-------|------|
| `title` | Text (short) |
| `items` | Component (repeatable) | `shared.feature-item` |

#### 39. Component: `shared.plan-feature` (category: `shared`)

| Field | Type |
|-------|------|
| `label` | Text (short) |
| `included` | Boolean |

#### 40. Collection Type: `Plan`

| Field | Type |
|-------|------|
| `name` | Text (short) |
| `price` | Text (short) |
| `description` | Rich text (blocks) |
| `features` | Component (repeatable) | `shared.plan-feature` |
| `ctaLabel` | Text (short) |
| `ctaHref` | Text (short) |
| `isPopular` | Boolean |
| `order` | Number (integer) |

#### 41. Component: `shared.card` (category: `shared`)

| Field | Type |
|-------|------|
| `title` | Text (short) |
| `subtitle` | Text (short) (optional) |
| `middleTitle` | Text (short) (optional) |
| `description` | Rich text (blocks) |
| `isDark` | Boolean (optional) |
| `image` | Media (single) (optional) |
| `order` | Number (integer) |

#### 42. Single Type: `CallToAction`

| Field | Type | Notes |
|-------|------|-------|
| `headline` | Text (short) | |
| `subheadline` | Text (short) (optional) | |
| `description` | Rich text (blocks) | |
| `ctaLabel` | Text (short) | |
| `ctaHref` | Text (short) | |
| `backgroundImage` | Media (single) (optional) | |

#### 43. Component: `shared.intro-paragraph` (category: `shared`)

| Field | Type | Notes |
|-------|------|-------|
| `text` | Rich text (blocks) | |
| `isSecondary` | Boolean | Styling variant |

#### 44. Single Type: `TickerSection`

| Field | Type |
|-------|------|
| `items` | Component (repeatable) — component with single `text` field |

---

## Step 4 — Build Components in Strapi Admin

### 4.1 Overview of the workflow

All content building happens in the **Strapi Admin Panel** at `http://localhost:1337/admin`.

There are two builders:

| Builder | What it creates | Located in sidebar |
|---------|----------------|-------------------|
| **Content-Type Builder** | Collection Types, Single Types, Components | Content-Type Builder → |
| **Content Manager** | Actual entries/data | Content Manager → |

**Workflow for each piece of content:**
1. Build the **Component** first (if needed for repeatable groups)
2. Build the **Collection Type** or **Single Type**
3. Add fields, set types, save
4. Populate entries in **Content Manager**

### 4.2 Creating a Component

Components are reusable field groups. You attach them to Collection/Single types as **Repeatable** or **Single** component fields.

**Steps:**
1. Go to **Content-Type Builder**
2. Scroll to **Components** section, click **Create new component**
3. Fill in:
   - **Name:** e.g. `SubNavItem`
   - **Category:** choose from list (or type new: `navigation`, `footer`, `home`, `solar`, `shared`)
4. Click **Continue**
5. Add fields one by one:
   - Click **Add another field**
   - Choose the field type (Text, Rich Text, Number, Media, etc.)
   - Fill in **Name** (used as API key) and **Display name** (admin label)
   - Configure type-specific options (e.g. max length for text)
6. Click **Save** — Strapi restarts automatically

**Field types you'll use:**

| Field Type | When to use |
|-----------|-------------|
| Text (short) | Titles, names, URLs, labels, phone numbers |
| Text (long) | Short descriptions |
| Rich text (blocks) | Paragraphs, long-form content |
| Number (integer) | Sort order, step numbers |
| Number (decimal) | Ratings, percentages |
| Boolean | toggles (isDark, isActive, isPopular) |
| Email | Email addresses |
| Enumeration | Fixed options (source, platform, colorTheme) |
| Date | Dates, expiry dates |
| Media (single/multiple) | Images, icons, logos |
| UID | Auto-generated slug from another field |
| Component | Reusable field groups |
| Dynamic Zone | Flexible layouts (optional, advanced) |

### 4.3 Creating a Collection Type

**Steps:**
1. Go to **Content-Type Builder**
2. Click **Create new collection type**
3. Enter **Display name** (e.g. `Review` — Strapi auto-generates the API slug as `reviews`)
4. Click **Continue**
5. Add fields following the model in Step 3
6. Click **Save**

**Important field settings:**
- For **UID** fields: set the **Attached field** to `name` (or whatever the source field is)
- For **Media** fields: set "Allowed types" (images only, all files, etc.)
- For **Enumeration** fields: enter options comma-separated (e.g. `google, productreview, other`)
- For **Number** fields: set min/max where applicable (e.g. rating min 1, max 5)

### 4.4 Creating a Single Type

Same as Collection Type, but:
1. Click **Create single type** instead
2. No need for UIDs or order fields (only one entry exists)
3. Open **Content Manager → Single Types** to edit the single entry

### 4.5 Adding Component Fields

When adding a field of type **Component**:
1. Select **Component** from field types
2. Choose **Use existing component** and pick from the list
3. Choose **Repeatable** (array of items) or **Single** (just one)
4. Name the field

### 4.6 Recommended Content Entry Order

After all types are created, populate them in this order:

| Order | Content | Location |
|-------|---------|----------|
| 1 | Nav items | NavItem collection |
| 2 | Footer data | Footer single type |
| 3 | Hero section | HeroSection single type |
| 4 | WhyChooseUs stats | WhyChooseUs single type |
| 5 | Reviews + Badges | Review collection |
| 6 | Awards | Award collection |
| 7 | Partners logos | Partners single type |
| 8 | Expertise items | Expertise collection |
| 9 | Solar stats | Stat collection |
| 10 | Process steps | ProcessStep collection |
| 11 | Solar packages | Package collection |
| 12 | Inverter types | InverterType collection |
| 13 | Sizing guide | SizingGuide single type |
| 14 | Engineering customizations | EngineeringCustomization collection |
| 15 | Solar brands | SolarBrand collection |
| 16 | Brand specs | BrandSpec collection |
| 17 | FAQ entries | FAQ collection |
| 18 | Deals | Deal collection |
| 19 | Payment options | PaymentOption collection |
| 20 | Feature explorer | FeatureExplorer single type |
| 21 | Call to action | CallToAction single type |
| 22 | Ticker section | TickerSection single type |
| 23 | Plans | Plan collection |

### 4.7 Uploading Media

1. Go to **Media Library** in the sidebar
2. Upload all images from `@/assets/` in the Next.js project
3. Organize into folders (optional): `home`, `solar`, `brands`, `icons`
4. When creating content entries, select media from the library

---

## Step 5 — Configure API Permissions

In Strapi Admin → **Settings → Users & Permissions Plugin → Roles → Public**:

Enable `find` and `findOne` for every content type you want publicly accessible:

| Content Type | find | findOne |
|-------------|------|---------|
| NavItem | ✔ | |
| Review | ✔ | |
| Award | ✔ | |
| Expertise | ✔ | |
| ProcessStep | ✔ | |
| Package | ✔ | |
| InverterType | ✔ | |
| SolarBrand | ✔ | |
| BrandSpec | ✔ | |
| FAQ | ✔ | |
| Deal | ✔ | |
| PaymentOption | ✔ | |
| EngineeringCustomization | ✔ | |
| Plan | ✔ | |

| Single Type | find |
|-------------|------|
| Footer | ✔ |
| WhyChooseUs | ✔ |
| Partners | ✔ |
| HeroSection | ✔ |
| SizingGuide | ✔ |
| FeatureExplorer | ✔ |
| CallToAction | ✔ |
| TickerSection | ✔ |

> **Tip:** For Single Types, the API path is `/api/<single-type-name>` (no `find` vs `findOne` distinction — just enable `find`).

---

## Step 6 — Seed Content from Codebase

Use the Content Manager to copy hardcoded data from these source files into Strapi:

| Data | Source File | Strapi Location |
|------|-------------|-----------------|
| Nav links | `reuseables/Navbar.tsx` lines 10-34 | NavItem collection |
| Footer links + offices + social | `reuseables/Footer.tsx` | Footer single type |
| Reviews + badges | `components/home/realStories.tsx` | Review collection |
| Stats + counters | `reuseables/StatCardsGrid.tsx` (generic) | WhyChooseUs single type (`cards`) |
| Partners + memberships | `components/home/partners.tsx` | Partners single type |
| Awards logos | `components/home/awardandrecognations.tsx` | Award collection |
| Expertise items | `components/home/expertise.tsx` | Expertise collection |
| Solar ticker stats | `components/solar/SolarStatsAndIntro.tsx` | Stat collection |
| Process steps | `components/solar/SolarProcessFlow.tsx` | ProcessStep collection |
| Solar packages | `components/solar/SolarPackages.tsx` | Package collection |
| Inverter types | `components/solar/InverterSlider.tsx` | InverterType collection |
| Sizing table + cards | `components/solar/SizingGuide.tsx` | SizingGuide single type |
| Engineering customizations | `components/solar/EngineeringCustomizations.tsx` | EngineeringCustomization collection |
| Brand grid + cards | `components/solar/brands/SixBrandsGrid.tsx` | SolarBrand collection |
| Brand specs | `components/solar/brands/SpecsTable.tsx` | BrandSpec collection |
| FAQ questions | `reuseables/faq.tsx` + `components/solar/brands/FAQ.tsx` | FAQ collection |
| Deals + promos | `components/solar/deals/DealsGrid.tsx` | Deal collection |
| Payment options | `components/solar/deals/WaysToPay.tsx` | PaymentOption collection |

**Images:** Upload each image from `@/assets/` to Strapi's Media Library, then reference it in the content entry.

---

## Step 7 — Add Environment Variables to Next.js

Create `.env.local` in the Next.js project root:

```bash
# .env.local
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your-api-token-here
```

> **Generate API Token:** Strapi Admin → Settings → API Tokens → Create new token (full access or custom scoped with `find` + `findOne` on all content types).

---

## Step 8 — Create Strapi Fetch Utility

Create `utils/strapi.ts`:

```typescript
const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";

export async function fetchStrapi<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const url = `${STRAPI_URL}/api${path}`;
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(process.env.STRAPI_API_TOKEN
        ? { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` }
        : {}),
    },
    ...options,
    next: { revalidate: 60, ...(options?.next as object) },
  });

  if (!res.ok) throw new Error(`Strapi fetch error: ${res.status}`);
  return res.json();
}
```

### Populate helper for relations/media

Strapi requires explicit `populate` params to include related data:

```typescript
// Fetch with populated relations
const footer = await fetchStrapi("/footer?populate[quickLinks]=true&populate[headOffice]=true&populate[stateOffices]=true&populate[socialLinks]=true");

// Shorthand for deep populate (Strapi 5)
const footer = await fetchStrapi("/footer?populate=*");
```

---

## Step 9 — Convert Pages to Server Components

For each page, swap hardcoded data with Strapi fetch calls.

### Pattern for Server Component pages:

```typescript
// app/solar/page.tsx — now a Server Component (no "use client")
import { fetchStrapi } from "@/utils/strapi";

interface SolarPageData {
  stats: Stat[];
  processSteps: ProcessStep[];
  packages: Package[];
  // ...
}

export default async function SolarPage() {
  const [stats, processSteps, packages] = await Promise.all([
    fetchStrapi<Stat[]>("/stats"),
    fetchStrapi<ProcessStep[]>("/process-steps?populate=image"),
    fetchStrapi<Package[]>("/packages?populate=features"),
  ]);

  return (
    <>
      <SolarStatsAndIntro stats={stats} />
      <SolarProcessFlow steps={processSteps} />
      <SolarPackages packages={packages} />
    </>
  );
}
```

### Pattern for passing data to Client Components:

```typescript
// Server parent fetches data
const faq = await fetchStrapi("/faqs?populate=*");

// Pass as props to client interactive shell
return <FAQ items={faq} />;
```

The client component (`"use client"`) only handles interactivity — no data logic.

### Pages to convert (in order):

| Page | Route | Priority |
|------|-------|----------|
| Home | `/` | High |
| Solar | `/solar` | High |
| Solar Brands | `/solar/brands` | Medium |
| Solar Deals | `/solar/deals` | Medium |
| EV Charging | `/ev-charging` | Low |

---

## Step 10 — Set Up API Route for Form Submissions

Create `app/api/leads/route.ts`:

```typescript
import { NextResponse } from "next/server";

const STRAPI_URL = process.env.STRAPI_URL;
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

export async function POST(request: Request) {
  const body = await request.json();

  const res = await fetch(`${STRAPI_URL}/api/leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    },
    body: JSON.stringify({ data: body }),
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to submit lead" },
      { status: 500 }
    );
  }

  return NextResponse.json(await res.json());
}
```

Then create a `Lead` collection type in Strapi with at least: `name`, `email`, `phone`, `message` (rich text), `source` (enumeration — form page).

Update `LeadCaptureForm.tsx` and `batteryQuote.tsx` to POST to `/api/leads` instead of logging to console.

---

## Step 11 — Deploy

### Deploy Strapi

**Recommended:** Railway, Render, or DigitalOcean App Platform.

| Service | Approx cost | Notes |
|---------|-------------|-------|
| Railway | $5-10/mo | Simple deploy from GitHub |
| Render | $7-15/mo | Managed PostgreSQL add-on |
| DigitalOcean | $12-24/mo | More control, needs DB setup |
| Fly.io | $5-15/mo | Good for global regions |

Required environment variables (see Step 2.3 for values):
- `DATABASE_URL` (Supabase pooled connection `:6543`)
- `DATABASE_CLIENT=postgres`
- `JWT_SECRET`, `ADMIN_JWT_SECRET`, `APP_KEYS`, `API_TOKEN_SALT`

### Deploy Next.js

Keep deploying to Vercel as before. Add `STRAPI_URL` and `STRAPI_API_TOKEN` as environment variables.

### Supabase connection notes

| Environment | Supabase DB port | Notes |
|------------|-----------------|-------|
| Local dev | `6543` (pooled) | Strapi `npm run develop` |
| Railway / Render | `6543` (pooled) | Containerized deployments |
| Direct connection | `5432` | Only for long-running VPS |

---

## Step 12 — Set Up Build Cache Strategy

Since Strapi content is dynamic, configure ISR or fetch-on-build:

### Option A: ISR (Incremental Static Regeneration)

```typescript
// In page components, add revalidation
export const revalidate = 60; // seconds
```

Strapi can trigger revalidation via a webhook:
- Strapi Admin → Settings → Webhooks
- URL: `https://your-nextjs-site.com/api/revalidate`
- Trigger on: `entry.publish`, `entry.update`, `entry.delete`

### Option B: SSG with build-time fetch

Use `generateStaticParams` or fetch at build time if content changes infrequently.

### Option C: Dynamic SSR

Remove revalidation for always-fresh content (leads, dynamic offers).

---

## Step 13 — Supabase as Strapi Media Storage (Optional)

By default, Strapi stores uploaded files on the local filesystem. For production, point Strapi to Supabase Storage:

### Install the provider

```bash
cd regen-cms
npm install @strapi/provider-upload-aws-s3
```

### Create a Supabase S3-compatible bucket

1. In Supabase → Storage → Create bucket → `strapi-media` → Public
2. Go to **Project Settings → API** and note your `anon` and `service_role` keys
3. Go to **Project Settings → Storage** to find S3 credentials

### Configure Strapi upload provider

Create `config/plugins.ts` in your Strapi project:

```typescript
export default {
  upload: {
    config: {
      provider: "aws-s3",
      providerOptions: {
        endpoint: "https://<project>.supabase.co/storage/v1/s3",
        region: "ap-southeast-2", // your region
        credentials: {
          accessKeyId: process.env.SUPABASE_S3_ACCESS_KEY,
          secretAccessKey: process.env.SUPABASE_S3_SECRET_KEY,
        },
        params: {
          Bucket: "strapi-media",
        },
        forcePathStyle: true, // required for Supabase S3
      },
    },
  },
};
```

> You'll need to generate S3 access keys in Supabase under **Project Settings → Storage → S3 Access Keys**.

This step is optional — you can also use Strapi's default local upload with a persistent volume in production.

---

## Recommended Work Sequence

| Step | What | Effort |
|------|------|--------|
| 1 | Set up Supabase project | 10 min |
| 2 | Create Strapi project with Supabase PG | 15 min |
| 3 | Build all 44 Components + Types in admin | 3-4 hours |
| 4 | Seed content from codebase | 3-5 hours |
| 5 | Create API token + configure permissions | 10 min |
| 6 | Create `utils/strapi.ts` fetch helper | 10 min |
| 7 | Convert Navbar + Footer → Strapi fetch | 30 min |
| 8 | Convert Home page components | 1-2 hours |
| 9 | Convert Solar page components | 2-3 hours |
| 10 | Convert sub-pages (brands, deals, faq) | 3-4 hours |
| 11 | Set up form submission API route | 30 min |
| 12 | Remove unused inline data files | 30 min |
| 13 | Deploy Strapi to Railway/Render | 1 hour |
| 14 | Configure Supabase Storage for media | 30 min |
| 15 | Set up webhooks + revalidation | 30 min |

**Total estimated time: 18-28 hours** (spread across 1-2 weeks)

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `utils/strapi.ts` | Fetch utility for Strapi API |
| `app/api/leads/route.ts` | Form submission endpoint |
| `.env.local` | Strapi URL + API token |
| `config/plugins.ts` | (Strapi project) S3/Supabase storage config |

---

## Strapi Admin Cheat Sheet

| Task | Path |
|------|------|
| Build components & types | Content-Type Builder → |
| Edit content entries | Content Manager → |
| Upload images | Media Library |
| Set Public permissions | Settings → Users & Permissions → Roles → Public |
| Create API token | Settings → API Tokens |
| Set up webhooks | Settings → Webhooks |
| Invite admin users | Settings → Users (Administrator) |

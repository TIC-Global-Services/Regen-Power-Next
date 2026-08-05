"""
Full scraper for https://regenpower.com/portfolio/

Phase 1: walks the portfolio archive pages (1..N) and collects each project's
         title, link, image, category filters.
Phase 2: visits each project's individual detail page and extracts the spec
         block (Location, Battery size, Brand, Model, Task, Size, System size,
         Panels, Panel Model, Inverter, Inverter Model, Total Energy Yield
         Till Date, CO2 Saving Till Date, Date) using a generic "label: value"
         text scan, since Elementor detail pages don't have consistent CSS
         classes for these fields.

Usage:
    pip install requests beautifulsoup4 lxml
    python scrape_portfolio.py --pages 40 --delay 1.5 --out portfolio_data.json --ts-out portfolio-data.ts
    python scrape_portfolio.py --details-only --in portfolio_data.json --out portfolio_data.json --ts-out portfolio-data.ts

Notes:
    - regenpower.com's robots.txt disallows automated crawling of /portfolio/.
      This script is for personal/educational use on data you're authorized
      to collect. Keep --delay reasonable.
    - The detail-page extractor is GENERIC and best-effort. It was NOT built
      against real detail-page HTML (I don't have access to fetch that page).
      If it comes back with empty `details` for items that clearly do have
      specs on the live site, send me the saved HTML of one detail page and
      I'll tighten the selectors/regex to match exactly.
    - Detail scraping means one HTTP request per project (~450 requests).
      Use --resume to pick up where you left off if it gets interrupted.
"""

import argparse
import json
import os
import re
import sys
import time
from collections import Counter
from typing import Optional

import requests
from bs4 import BeautifulSoup

BASE_URL = "https://regenpower.com/portfolio/"
PAGE_URL = "https://regenpower.com/portfolio/page/{n}/"
HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/124.0 Safari/537.36"
    )
}

STATES = ["WA", "NSW", "VIC", "QLD", "SA", "TAS", "NT", "ACT"]

# Known spec field labels to look for on detail pages.
# Order matters a little (longer/more specific labels first) to avoid
# "Inverter" matching before "Inverter Model" etc.
SPEC_FIELDS = [
    "Total Energy Yield Till Date",
    "CO2 Saving Till Date",
    "Panel Model",
    "Inverter Model",
    "Battery size",
    "Battery Size",
    "System size",
    "System Size",
    "Location",
    "Brand",
    "Model",
    "Task",
    "Size",
    "Panels",
    "Inverter",
    "Date",
]


# ---------------------------------------------------------------------------
# Phase 1: archive list parsing (unchanged logic from before)
# ---------------------------------------------------------------------------

def postcode_to_state(pc: Optional[str]) -> Optional[str]:
    if not pc or len(pc) != 4 or not pc.isdigit():
        return None
    n = int(pc)
    if 800 <= n <= 999:
        return "NT"
    if 200 <= n <= 299 or n == 2600:
        return "ACT"
    if 1000 <= n <= 2599 or 2619 <= n <= 2899 or 2921 <= n <= 2999:
        return "NSW"
    if 2600 <= n <= 2618 or 2900 <= n <= 2920:
        return "ACT"
    if 3000 <= n <= 3999 or 8000 <= n <= 8999:
        return "VIC"
    if 4000 <= n <= 4999 or 9000 <= n <= 9999:
        return "QLD"
    if 5000 <= n <= 5999:
        return "SA"
    if 6000 <= n <= 6999:
        return "WA"
    if 7000 <= n <= 7999:
        return "TAS"
    return None


def extract_location(title: str):
    postcode_match = re.search(r"\b(\d{4})\b", title)
    postcode = postcode_match.group(1) if postcode_match else None

    state = None
    for s in STATES:
        if re.search(r"\b" + s + r"\b", title):
            state = s
            break
    if not state and postcode:
        state = postcode_to_state(postcode)

    suburb = None
    cleaned = title.replace(postcode, "").strip() if postcode else title

    m = re.search(
        r"([A-Za-z][A-Za-z'\-]*(?:\s[A-Za-z][A-Za-z'\-]*){0,3}),?\s*"
        r"(WA|NSW|VIC|QLD|SA|TAS|NT|ACT)\b",
        cleaned,
        re.IGNORECASE,
    )
    if m:
        suburb = re.sub(r"^(at|the|installation)\s+", "", m.group(1).strip(), flags=re.IGNORECASE)
    elif postcode:
        m2 = re.search(
            r"([A-Za-z][A-Za-z'\-]*(?:\s[A-Za-z][A-Za-z'\-]*){0,3}),?\s*" + postcode,
            title,
            re.IGNORECASE,
        )
        if m2:
            suburb = re.sub(r"^(at|the|installation)\s+", "", m2.group(1).strip(), flags=re.IGNORECASE)
            words = suburb.split()
            if len(words) > 4:
                suburb = " ".join(words[-3:])

    return suburb, state, postcode


def slugify(title: str) -> str:
    s = title.lower().strip()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return s.strip("-")


def parse_archive_page(html: str):
    soup = BeautifulSoup(html, "lxml")
    items = []

    for art in soup.select("article.vp-portfolio__item-wrap"):
        post_id = None
        for c in art.get("class", []):
            if c.startswith("post-"):
                post_id = c.replace("post-", "")
                break
        if not post_id:
            continue

        link_tag = art.select_one("figcaption a")
        href = link_tag["href"] if link_tag else None

        title_tag = art.select_one("h2.vp-portfolio__item-meta-title")
        title = title_tag.get_text(strip=True) if title_tag else None

        filt_attr = art.get("data-vp-filter") or ""
        filters = [x.strip() for x in filt_attr.split(",") if x.strip()]

        img_tag = art.select_one(".vp-portfolio__item-img img")
        image = None
        if img_tag:
            image = img_tag.get("data-src") or img_tag.get("src")
            if image and image.startswith("data:"):
                image = img_tag.get("data-src")

        suburb, state, postcode = extract_location(title or "")

        items.append(
            {
                "id": int(post_id),
                "title": title,
                "slug": slugify(title or ""),
                "link": href,
                "image": image,
                "filters": filters,
                "suburb": suburb,
                "state": state,
                "postcode": postcode,
                "details": [],  # filled in by phase 2
            }
        )

    has_next = soup.select_one(".vp-pagination__item-next a") is not None
    return items, has_next


# ---------------------------------------------------------------------------
# Phase 2: detail page spec extraction
# ---------------------------------------------------------------------------

def extract_details(html: str) -> dict:
    """
    Generic best-effort extractor: scans all visible text on the detail page
    for lines/segments matching "<KnownField>: <value>" and returns a dict
    of whatever it finds. Fields not present on a given page are simply
    omitted (matches the `?` optional fields in your desired shape).
    """
    soup = BeautifulSoup(html, "lxml")

    for tag in soup(["script", "style", "noscript"]):
        tag.decompose()

    # Elementor icon-list widgets often render as:
    #   <span class="elementor-icon-list-text">Location: Cook Ave, Hillarys, WA 6025</span>
    candidates = soup.select(
        ".elementor-icon-list-text, .elementor-widget-text-editor p, li, td, span, div"
    )

    text_blocks = []
    for el in candidates:
        txt = el.get_text(" ", strip=True)
        if txt and 0 < len(txt) < 200:
            text_blocks.append(txt)

    full_text = soup.get_text("\n", strip=True)
    text_blocks.extend([l.strip() for l in full_text.split("\n") if l.strip()])

    found = {}
    for field in SPEC_FIELDS:
        if field in found:
            continue
        pattern = re.compile(r"^\s*" + re.escape(field) + r"\s*[:\-]\s*(.+)$", re.IGNORECASE)
        for block in text_blocks:
            m = pattern.match(block)
            if m:
                value = m.group(1).strip()
                if 0 < len(value) <= 150:
                    found[field] = value
                    break

    return found


def fetch(session: requests.Session, url: str, retries: int = 3, backoff: float = 2.0) -> Optional[str]:
    for attempt in range(1, retries + 1):
        try:
            resp = session.get(url, headers=HEADERS, timeout=20)
            if resp.status_code == 200:
                return resp.text
            print(f"  [warn] {url} -> HTTP {resp.status_code}", file=sys.stderr)
        except requests.RequestException as e:
            print(f"  [warn] {url} -> {e}", file=sys.stderr)
        if attempt < retries:
            time.sleep(backoff * attempt)
    return None


# ---------------------------------------------------------------------------
# Orchestration
# ---------------------------------------------------------------------------

def scrape_archive(max_pages: int, delay: float):
    session = requests.Session()
    all_items = []
    seen_ids = set()

    for page_num in range(1, max_pages + 1):
        url = BASE_URL if page_num == 1 else PAGE_URL.format(n=page_num)
        print(f"Fetching archive page {page_num}: {url}")

        html = fetch(session, url)
        if html is None:
            print(f"  [error] giving up on page {page_num}", file=sys.stderr)
            continue

        items, has_next = parse_archive_page(html)
        new_count = 0
        for it in items:
            if it["id"] not in seen_ids:
                seen_ids.add(it["id"])
                all_items.append(it)
                new_count += 1

        print(f"  -> {len(items)} items on page, {new_count} new (total: {len(all_items)})")

        if not items:
            print("  [info] no items found, stopping early")
            break

        time.sleep(delay)

    return all_items


def scrape_details_for_items(items: list, delay: float, resume: bool):
    session = requests.Session()
    total = len(items)

    for i, item in enumerate(items, start=1):
        if resume and item.get("details"):
            continue

        link = item.get("link")
        if not link:
            continue

        print(f"[{i}/{total}] Fetching detail page: {link}")
        html = fetch(session, link)
        if html is None:
            print(f"  [error] failed to fetch, skipping", file=sys.stderr)
            continue

        spec_dict = extract_details(html)
        item["details"] = [spec_dict] if spec_dict else []

        print(f"  -> found {len(spec_dict)} spec fields: {list(spec_dict.keys())}")
        time.sleep(delay)

    return items


def to_ts(items, out_path: str):
    def esc(v):
        return "null" if v is None else json.dumps(v, ensure_ascii=False)

    lines = [
        "export interface PortfolioDetail {",
        "  Location?: string;",
        "  ['Battery size']?: string;",
        "  Brand?: string;",
        "  Model?: string;",
        "  Task?: string;",
        "  Size?: string;",
        "  ['System size']?: string;",
        "  Panels?: string;",
        "  ['Panel Model']?: string;",
        "  Inverter?: string;",
        "  ['Inverter Model']?: string;",
        "  ['Total Energy Yield Till Date']?: string;",
        "  ['CO2 Saving Till Date']?: string;",
        "  Date?: string;",
        "}",
        "",
        "export interface PortfolioItem {",
        "  id: number;",
        "  title: string;",
        "  slug: string;",
        "  link: string;",
        "  image: string;",
        "  filters: string[];",
        "  suburb: string | null;",
        "  state: string | null;",
        "  postcode: string | null;",
        "  details: PortfolioDetail[];",
        "}",
        "",
        f"// Auto-generated by scrape_portfolio.py ({len(items)} items)",
        "export const PORTFOLIO_DATA: PortfolioItem[] = [",
    ]
    for it in items:
        details_json = json.dumps(it.get("details", []), ensure_ascii=False)
        lines.append(
            "  { id: %d, title: %s, slug: %s, link: %s, image: %s, filters: %s, "
            "suburb: %s, state: %s, postcode: %s, details: %s },"
            % (
                it["id"],
                esc(it["title"]),
                esc(it["slug"]),
                esc(it["link"]),
                esc(it["image"]),
                json.dumps(it["filters"], ensure_ascii=False),
                esc(it["suburb"]),
                esc(it["state"]),
                esc(it["postcode"]),
                details_json,
            )
        )
    lines.append("];")

    with open(out_path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))


def main():
    parser = argparse.ArgumentParser(description="Scrape regenpower.com/portfolio/ (list + detail pages)")
    parser.add_argument("--pages", type=int, default=40, help="Max archive pages to fetch (default: 40)")
    parser.add_argument("--delay", type=float, default=1.5, help="Seconds between requests (default: 1.5)")
    parser.add_argument("--out", type=str, default="portfolio_data.json", help="Output JSON file path")
    parser.add_argument("--ts-out", type=str, default=None, help="Optional: also write a .ts file")
    parser.add_argument("--details-only", action="store_true",
                         help="Skip archive scraping; load items from --in and only fetch detail pages")
    parser.add_argument("--in", dest="in_path", type=str, default=None,
                         help="Input JSON (required if --details-only)")
    parser.add_argument("--skip-details", action="store_true",
                         help="Only do archive scraping, skip detail pages entirely")
    parser.add_argument("--resume", action="store_true",
                         help="When fetching details, skip items that already have details filled in")
    args = parser.parse_args()

    if args.details_only:
        if not args.in_path or not os.path.exists(args.in_path):
            print("Error: --details-only requires --in <existing_json_file>", file=sys.stderr)
            sys.exit(1)
        with open(args.in_path, "r", encoding="utf-8") as f:
            items = json.load(f)
        print(f"Loaded {len(items)} items from {args.in_path}")
    else:
        items = scrape_archive(max_pages=args.pages, delay=args.delay)
        with open(args.out, "w", encoding="utf-8") as f:
            json.dump(items, f, indent=2, ensure_ascii=False)
        print(f"\nSaved {len(items)} items (list only) to {args.out}")

    if not args.skip_details:
        print(f"\nStarting detail page scraping for {len(items)} items...\n")
        items = scrape_details_for_items(items, delay=args.delay, resume=args.resume)

        with open(args.out, "w", encoding="utf-8") as f:
            json.dump(items, f, indent=2, ensure_ascii=False)
        print(f"\nSaved {len(items)} items (with details) to {args.out}")

    if args.ts_out:
        to_ts(items, args.ts_out)
        print(f"Saved TypeScript data to {args.ts_out}")

    filt_counter = Counter()
    state_counter = Counter()
    items_with_details = 0
    for it in items:
        for f in it["filters"]:
            filt_counter[f] += 1
        if it["state"]:
            state_counter[it["state"]] += 1
        if it.get("details"):
            items_with_details += 1

    print("\nCategory counts:")
    for k, v in filt_counter.most_common():
        print(f"  {k}: {v}")
    print("\nState counts:")
    for k, v in state_counter.most_common():
        print(f"  {k}: {v}")
    print(f"\nItems with detail specs found: {items_with_details}/{len(items)}")


if __name__ == "__main__":
    main()

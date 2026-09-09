#!/usr/bin/env python3
"""
Scraper for Regen Power commercial and off-grid case studies.

Scrapes:
- Commercial recent projects: https://regenpower.com/commercial-solar-systems/our-recent-projects/
- Off-grid case studies: https://regenpower.com/off-grid/case-studies/

Output format:
- title & subtitle for feature card
- casestudydetails: [
    {
      "caseStudyname": "...",
      "title": "...",
      "casestudyDescription": "...",
      "details": ["...", "..."],
      "description": ["...", "..."]
    }
  ]
  where "System Design" is converted to "System Architecture" with details below it.
- tables: same 2D array format as existing case_studies.json
- pdf_url, images, meta_description, body_text

Requirements:
    pip install requests beautifulsoup4

Usage:
    python scrape_regenpower_case_studies.py [-o case_studies.json] [-d 1.0]
"""

import argparse
import json
import re
import sys
import time
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup

BASE_URL = "https://regenpower.com"
COMMERCIAL_LISTING_URL = "https://regenpower.com/commercial-solar-systems/our-recent-projects/"
OFFGRID_LISTING_URL = "https://regenpower.com/off-grid/case-studies/"

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/124.0.0.0 Safari/537.36"
    )
}

# Known system sizes and locations matching the feature cards grid
KNOWN_PROJECT_INFO = {
    "case-study-illawarra-medical-center": {
        "title": "Illawarra Medical Centre, Ballajura, WA",
        "subtitle": "50kW Solar PV System",
        "system_size": "50kW",
        "location": "Ballajura, WA",
        "card_title": "50kW",
        "card_subtitle": "Illawarra Medical Centre, Ballajura, WA",
    },
    "case-study-perth-yha": {
        "title": "Perth City YHA, Perth, WA",
        "subtitle": "37kW Rooftop On-Grid Solar PV System",
        "system_size": "37kW",
        "location": "Perth, WA",
        "card_title": "37kW",
        "card_subtitle": "Perth City YHA, Perth, WA",
    },
    "case-study-smithfield": {
        "title": "Warehouse, Smithfield, NSW",
        "subtitle": "100kW Rooftop On-Grid Solar PV System",
        "system_size": "100kW",
        "location": "Smithfield, NSW",
        "card_title": "100kW",
        "card_subtitle": "Smithfield, NSW",
    },
    "case-study-dubbo": {
        "title": "Autobarn Store, Dubbo, NSW",
        "subtitle": "40kW Rooftop On-Grid Solar PV System",
        "system_size": "40kW",
        "location": "Dubbo, NSW",
        "card_title": "40kW",
        "card_subtitle": "Dubbo, NSW",
    },
    "case-study-kewdale": {
        "title": "Advanta Furniture Company, Kewdale, WA",
        "subtitle": "30kW Rooftop On-Grid Solar PV System",
        "system_size": "30kW",
        "location": "Kewdale, WA",
        "card_title": "30kW",
        "card_subtitle": "Kewdale, WA",
    },
    "case-study-duncraig": {
        "title": "Duncraig Medical Center, Perth, WA",
        "subtitle": "10kW Rooftop On-Grid Solar PV System",
        "system_size": "10kW",
        "location": "Duncraig, WA",
        "card_title": "10kW",
        "card_subtitle": "Duncraig, WA",
    },
    "case-study-banasurasagar-reservoir": {
        "title": "Banasurasagr Reservoir, Wayanadu, Kerala",
        "subtitle": "500kWp Floating Solar Farm",
        "system_size": "500kWp",
        "location": "Wayanadu, Kerala",
        "card_title": "500kWp",
        "card_subtitle": "Banasurasagar Reservoir, Wayanadu, Kerala",
    },
    "solar-case-study-saint-mary-coptic-church": {
        "title": "Saint Mary Coptic Orthodox Church",
        "subtitle": "30kW Commercial Solar Installation",
        "system_size": "30kW",
        "location": "Australia",
        "card_title": "30kW",
        "card_subtitle": "Saint Mary Coptic Orthodox Church",
    },
    "case-study-others": {
        "title": "Commercial Solar Systems Showcase",
        "subtitle": "Recent Commercial Solar Projects Across Australia",
        "system_size": "Commercial",
        "location": "Australia",
        "card_title": "Commercial",
        "card_subtitle": "Various Commercial Installations",
    },
}


def get_soup(url, session):
    resp = session.get(url, headers=HEADERS, timeout=30)
    resp.raise_for_status()
    return BeautifulSoup(resp.text, "html.parser")


def find_case_study_links(session):
    """Find all unique case-study page URLs from commercial recent projects,
    off-grid case studies, and navigation."""
    links = set()
    listing_urls = [COMMERCIAL_LISTING_URL, OFFGRID_LISTING_URL]

    for listing in listing_urls:
        try:
            soup = get_soup(listing, session)
            for a in soup.find_all("a", href=True):
                href = a["href"]
                full = urljoin(BASE_URL, href)
                path = urlparse(full).path
                if "case-study" in path or "case_study" in path:
                    # Skip listing index itself
                    if full.rstrip("/") not in [u.rstrip("/") for u in listing_urls]:
                        links.add(full.rstrip("/") + "/")
        except requests.RequestException as e:
            print(f"Warning: could not fetch listing {listing}: {e}", file=sys.stderr)

    return sorted(links)


def clean_text(el):
    return re.sub(r"\s+", " ", el.get_text(" ", strip=True)).strip()


def parse_slug(url):
    parts = [p for p in urlparse(url).path.split("/") if p]
    return parts[-1] if parts else ""


def extract_case_study(url, session):
    soup = get_soup(url, session)
    slug = parse_slug(url)
    known = KNOWN_PROJECT_INFO.get(slug, {})

    data = {
        "url": url,
        "title": known.get("title"),
        "subtitle": known.get("subtitle"),
        "system_size": known.get("system_size"),
        "location": known.get("location"),
        "card_title": known.get("card_title"),
        "card_subtitle": known.get("card_subtitle"),
        "meta_description": None,
        "pdf_url": None,
        "images": [],
        "casestudydetails": [],
        "body_text": [],
        "tables": [],
    }

    # Meta description
    meta = soup.find("meta", attrs={"name": "description"}) or soup.find(
        "meta", attrs={"property": "og:description"}
    )
    if meta and meta.get("content"):
        data["meta_description"] = meta["content"].strip()

    # Content wrapper
    main = soup.find("main") or soup.find(id="content") or soup.body

    if not main:
        return data

    # 1. Title & Subtitle fallback if not in known dict
    h2 = main.find("h2")
    h3 = main.find("h3")
    h4 = main.find("h4")

    if not data["title"]:
        if h2 and clean_text(h2):
            raw_title = clean_text(h2)
            raw_title = re.sub(r"^case study\s*[-:]*\s*", "", raw_title, flags=re.I).strip()
            data["title"] = raw_title
        elif h3 and clean_text(h3):
            data["title"] = clean_text(h3)
        elif soup.title:
            data["title"] = clean_text(soup.title)

    if not data["subtitle"]:
        if h4 and clean_text(h4):
            data["subtitle"] = clean_text(h4)
        elif h3 and h2 and clean_text(h3) != data["title"]:
            data["subtitle"] = clean_text(h3)

    # 2. Extract PDF URL
    pdf_link = main.find("a", href=re.compile(r"\.pdf$", re.I))
    if pdf_link:
        data["pdf_url"] = urljoin(BASE_URL, pdf_link["href"])

    # 3. Extract content images
    seen_imgs = set()
    for img in main.find_all("img", src=True):
        src = urljoin(BASE_URL, img["src"])
        if "wp-content/uploads" not in src:
            continue
        if any(skip in src.lower() for skip in ["logo", "fevicon", "icon"]):
            continue
        if src not in seen_imgs:
            seen_imgs.add(src)
            data["images"].append(src)

    # 4. Extract tables (retaining exact existing 2D rows format)
    for table in main.find_all("table"):
        rows = []
        for tr in table.find_all("tr"):
            cells = [clean_text(td) for td in tr.find_all(["td", "th"])]
            if cells:
                rows.append(cells)
        if rows:
            data["tables"].append(rows)

    # 5. Extract all body paragraphs for backwards compatibility
    for p in main.find_all("p"):
        txt = clean_text(p)
        if txt and len(txt) > 10:
            if not any(skip in txt.lower() for skip in ["copyright", "all rights reserved", "leave a reply", "leave a comment"]):
                data["body_text"].append(txt)

    # 6. Extract casestudydetails:[] with section name, details, and System Design -> System Architecture
    sections = []
    curr_title = "Find Your Way"
    curr_paragraphs = []

    for el in main.descendants:
        # Match headings: h2, h3, h4, h5, h6
        if el.name in ["h2", "h3", "h4", "h5", "h6"]:
            t = clean_text(el)
            if not t or len(t) > 100:
                continue
            # Skip boilerplate / widget headers
            if any(skip in t.lower() for skip in ["leave a reply", "comment", "navigation", "recent posts", "search", "archives", "categories"]):
                continue
            if re.match(r"^case study\s*[-:]+", t, re.I):
                continue

            # Check if this heading represents "system design" -> change to "System Architecture"
            if re.search(r"system\s+(analysis\s*&\s*)?design", t, re.I):
                t = "System Architecture"

            if curr_paragraphs:
                sections.append({
                    "caseStudyname": curr_title,
                    "title": curr_title,
                    "casestudyDescription": "\n\n".join(curr_paragraphs),
                    "description": curr_paragraphs,
                    "details": curr_paragraphs,
                })
                curr_paragraphs = []
            curr_title = t

        elif el.name == "p":
            txt = clean_text(el)
            if txt and len(txt) > 10:
                if not any(skip in txt.lower() for skip in ["copyright", "all rights reserved", "leave a comment", "leave a reply"]):
                    # Avoid duplicate paragraphs right after each other
                    if not curr_paragraphs or curr_paragraphs[-1] != txt:
                        curr_paragraphs.append(txt)

    if curr_paragraphs:
        sections.append({
            "caseStudyname": curr_title,
            "title": curr_title,
            "casestudyDescription": "\n\n".join(curr_paragraphs),
            "description": curr_paragraphs,
            "details": curr_paragraphs,
        })

    # Clean up empty or duplicate sections
    cleaned_sections = []
    seen_titles = set()
    for s in sections:
        if s["details"]:
            # If multiple "System Architecture" sections exist, merge them
            if s["title"] == "System Architecture" and "System Architecture" in seen_titles:
                for existing in cleaned_sections:
                    if existing["title"] == "System Architecture":
                        existing["details"].extend(s["details"])
                        existing["description"].extend(s["description"])
                        existing["casestudyDescription"] = "\n\n".join(existing["details"])
                continue

            seen_titles.add(s["title"])
            cleaned_sections.append(s)

    data["casestudydetails"] = cleaned_sections

    return data


def main():
    parser = argparse.ArgumentParser(description="Scrape Regen Power case studies to JSON")
    parser.add_argument(
        "-o", "--output", default="case_studies.json", help="Output JSON file path"
    )
    parser.add_argument(
        "-d", "--delay", type=float, default=1.0, help="Delay in seconds between requests"
    )
    args = parser.parse_args()

    session = requests.Session()

    print(f"Finding case study links...", file=sys.stderr)
    links = find_case_study_links(session)
    print(f"Found {len(links)} case study links", file=sys.stderr)

    results = []
    for i, url in enumerate(links, 1):
        print(f"[{i}/{len(links)}] Scraping {url}", file=sys.stderr)
        try:
            case_study = extract_case_study(url, session)
            results.append(case_study)
        except requests.RequestException as e:
            print(f"  ERROR fetching {url}: {e}", file=sys.stderr)
        time.sleep(args.delay)

    with open(args.output, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2, ensure_ascii=False)

    print(f"Saved {len(results)} case studies to {args.output}", file=sys.stderr)


if __name__ == "__main__":
    main()